import {createElement, useEffect, useState} from 'react';
import type {CSSProperties, ReactElement} from 'react';
import {AbsoluteFill, Composition, cancelRender, continueRender, delayRender, registerRoot, useCurrentFrame} from 'remotion';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-700.css';
import '@fontsource/inter/latin-800.css';
import '@fontsource/inter-tight/latin-800.css';
import tokens from '../../channels/us-personal-finance/visual-tokens.json';
import fixture from './canvas-spike.fixture.json';

// Bundled and typechecked offline. Browser and visual acceptance remain pending.
// API references: remotion.dev/docs/composition, /register-root and /delay-render.
export type CanvasSpikeProps = {mode: 'static' | 'dynamic'};
export type Point = {x: number; y: number};
export type Camera = Point & {scale: number};
export type Region = typeof fixture.regions[number];
export type DataValue = typeof fixture.dataset.values[number];
export type Label = Point & {id: string; text: string; fontSize: number; numeric: boolean; pairId: string};
export type DatumMark = Point & {id: string; valueId: string; value: number; width: number; height: number; radius: number; baseline: number; label: string; labelY: number};
export type FrameModel = {frame: number; camera: Camera; marks: readonly DatumMark[]; labels: readonly Label[]; focus: Point; morphProgress: number};
export type SourceLabel = Point & {id: string; regionId: string; text: string; fontSize: number; opacity: number; screenX: number; screenY: number; screenWidth: number; screenHeight: number};

export const COMPOSITION_ID = 'WP-004a-canvas-spike';
export const REQUIRED_FONTS = [
  {family: tokens.typography.family, weight: tokens.typography.weights.caption},
  {family: tokens.typography.family, weight: tokens.typography.weights.body},
  {family: tokens.typography.family, weight: tokens.typography.weights.section},
  {family: tokens.typography.family, weight: tokens.typography.weights.title},
  {family: tokens.typography.numeric, weight: tokens.typography.weights.title},
] as const;

const clamp = (value: number): number => Math.max(0, Math.min(1, value));
const lerp = (from: number, to: number, amount: number): number => from + (to - from) * amount;
const bezierCoordinate = (t: number, p1: number, p2: number): number => 3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t ** 2 * p2 + t ** 3;

// Invert the time coordinate; evaluating only Bezier y at elapsed time is wrong.
export function cameraEase(progress: number): number {
  const p = clamp(progress);
  if (p === 0 || p === 1) return p;
  let low = 0;
  let high = 1;
  for (let iteration = 0; iteration < 40; iteration += 1) {
    const middle = (low + high) / 2;
    if (bezierCoordinate(middle, 0.22, 0.36) < p) low = middle;
    else high = middle;
  }
  return bezierCoordinate((low + high) / 2, 1, 1);
}

function pathPosition(from: Point, to: Point, control: Point | undefined, progress: number): Point {
  return control
    ? {x: (1 - progress) ** 2 * from.x + 2 * (1 - progress) * progress * control.x + progress ** 2 * to.x,
      y: (1 - progress) ** 2 * from.y + 2 * (1 - progress) * progress * control.y + progress ** 2 * to.y}
    : {x: lerp(from.x, to.x, progress), y: lerp(from.y, to.y, progress)};
}

const CAMERA_PATHS = fixture.camera.segments.map((segment, index) => {
  const from = fixture.camera.keyframes[index];
  const to = fixture.camera.keyframes[index + 1];
  if (!from || !to) throw new Error('Camera segment is incomplete.');
  const control = 'controlPoint' in segment ? segment.controlPoint : undefined;
  const distances = [0];
  let previous = pathPosition(from, to, control, 0);
  let length = 0;
  for (let sample = 1; sample <= fixture.camera.drift.arcLengthSamples; sample += 1) {
    const point = pathPosition(from, to, control, sample / fixture.camera.drift.arcLengthSamples);
    length += Math.hypot(point.x - previous.x, point.y - previous.y);
    distances.push(length);
    previous = point;
  }
  const duration = (to.frame - from.frame) / fixture.benchmark.output.fps;
  const baselineFraction = fixture.camera.drift.speedWorldPxPerSecond * duration / length;
  if (!Number.isFinite(baselineFraction) || baselineFraction < 0 || baselineFraction > 1) throw new Error('Camera path is too short for the declared forward drift.');
  return {from, to, control, distances, length, baselineFraction};
});

export function evaluateCamera(frame: number): Camera {
  if (!Number.isFinite(frame) || frame < 0 || frame > 5399) throw new Error('Camera frame must be within 0..5399.');
  const keyframes = fixture.camera.keyframes;
  const index = Math.max(0, keyframes.findIndex((keyframe) => keyframe.frame > frame) - 1);
  const final = keyframes[keyframes.length - 1];
  if (!final) throw new Error('Camera keyframes are missing.');
  if (frame >= final.frame) return {x: final.x, y: final.y, scale: final.scale};
  const path = CAMERA_PATHS[index];
  if (!path) throw new Error('Camera path is missing.');
  const elapsed = (frame - path.from.frame) / (path.to.frame - path.from.frame);
  const progress = path.baselineFraction * elapsed + (1 - path.baselineFraction) * cameraEase(elapsed);
  const distance = progress * path.length;
  const upperIndex = Math.max(1, path.distances.findIndex((candidate) => candidate >= distance));
  const lower = path.distances[upperIndex - 1];
  const upper = path.distances[upperIndex];
  if (lower === undefined || upper === undefined || upper <= lower) throw new Error('Arc-length sample is invalid.');
  const parameter = (upperIndex - 1 + (distance - lower) / (upper - lower)) / fixture.camera.drift.arcLengthSamples;
  return {...pathPosition(path.from, path.to, path.control, parameter), scale: lerp(path.from.scale, path.to.scale, progress)};
}

export function projectPoint(point: Point, camera: Camera, speed = 1): Point {
  const origin = fixture.camera.keyframes[0];
  if (!origin) throw new Error('Initial camera is missing.');
  return {
    x: 960 + camera.scale * (point.x - origin.x - (camera.x - origin.x) * speed),
    y: 540 + camera.scale * (point.y - origin.y - (camera.y - origin.y) * speed),
  };
}

export function layerTransform(camera: Camera, speed: number): string {
  const projectedOrigin = projectPoint({x: 0, y: 0}, camera, speed);
  return `translate(${projectedOrigin.x}px, ${projectedOrigin.y}px) scale(${camera.scale})`;
}

function valuesForRegion(region: Region): readonly DataValue[] {
  if (region.id === 'comparison') return fixture.dataset.values.filter((value) => value.id === 'housing' || value.id === 'debt');
  if (region.id === 'detail') return fixture.dataset.values.filter((value) => value.id === 'saving');
  return fixture.dataset.values;
}

function usd(value: number): string {
  return `$${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export function getFrameModel(frame: number, mode: CanvasSpikeProps['mode']): FrameModel {
  if (mode !== 'static' && mode !== 'dynamic') throw new Error('Unknown benchmark mode.');
  if (!Number.isInteger(frame) || frame < 0 || frame >= fixture.benchmark.frameCount) throw new Error('Frame is outside the benchmark.');
  const visualFrame = mode === 'static' ? fixture.camera.staticFrame : frame;
  const camera = evaluateCamera(visualFrame);
  const morphProgress = cameraEase((visualFrame - fixture.morph.fromFrame) / (fixture.morph.toFrame - fixture.morph.fromFrame));
  const marks: DatumMark[] = [];
  const labels: Label[] = [];
  for (const region of fixture.regions) {
    const values = valuesForRegion(region);
    for (const [index, value] of values.entries()) {
      const centerX = region.bounds.x + (values.length === 1 ? 820 : values.length === 2 ? 650 + index * 500 : 360 + index * 320);
      const baseline = region.bounds.y + 650;
      const fullHeight = value.value / 1800 * 420;
      const progress = region.id === 'morph' ? morphProgress : 0;
      const width = lerp(160, 24, progress);
      const height = lerp(fullHeight, 24, progress);
      const top = baseline - fullHeight - 12 * progress;
      const id = `${region.id}-${value.id}`;
      marks.push({id, valueId: value.id, value: value.value, x: centerX - width / 2, y: top, width, height, radius: 12 * progress, baseline, label: value.label, labelY: baseline + 64});
      labels.push({id: `${id}-label`, pairId: id, text: value.label, x: centerX, y: baseline + 64, fontSize: 40, numeric: false});
      labels.push({id: `${id}-value`, pairId: id, text: usd(value.value), x: centerX, y: baseline - fullHeight - 34, fontSize: region.id === 'detail' ? 140 : 40, numeric: region.id === 'detail'});
    }
  }
  const activeKeyframes = fixture.camera.keyframes;
  const nextIndex = activeKeyframes.findIndex((keyframe) => keyframe.frame > visualFrame);
  const index = nextIndex === -1 ? activeKeyframes.length - 1 : Math.max(0, nextIndex - 1);
  const from = activeKeyframes[index];
  const to = activeKeyframes[Math.min(index + 1, activeKeyframes.length - 1)];
  if (!from || !to) throw new Error('Focus keyframe is missing.');
  const focusFor = (regionId: string): Point => {
    const mark = marks.find((candidate) => candidate.id === `${regionId}-${regionId === 'detail' ? 'saving' : 'housing'}`);
    if (!mark) throw new Error('Focus datum is missing.');
    return {x: mark.x + mark.width / 2, y: mark.y + Math.min(mark.height / 2, 48)};
  };
  const start = focusFor(from.regionId);
  const end = focusFor(to.regionId);
  const amount = from.frame === to.frame ? 0 : cameraEase((visualFrame - from.frame) / (to.frame - from.frame));
  // The revised camera has continuous forward path travel. Perceptual movement
  // and readability still need real visual acceptance; no decorative pulse is used.
  return {frame: visualFrame, camera, marks, labels, focus: {x: lerp(start.x, end.x, amount), y: lerp(start.y, end.y, amount)}, morphProgress};
}

// Conservative bounds are a pre-render guard, not a replacement for real glyph QA.
// Paired labels stay mounted and fade before the safe area; no data shape is hidden.
export function labelOpacity(label: Label, camera: Camera): number {
  const point = projectPoint(label, camera);
  const halfWidth = label.text.length * label.fontSize * camera.scale / 2;
  const height = label.fontSize * camera.scale;
  const clearance = Math.min(point.x - halfWidth - 96, 1824 - point.x - halfWidth, point.y - height - 54, 962 - point.y);
  return cameraEase(clamp(clearance / 32));
}

export function pairedLabelOpacity(label: Label, model: FrameModel): number {
  const pair = model.labels.filter((candidate) => candidate.pairId === label.pairId);
  return Math.min(...pair.map((candidate) => labelOpacity(candidate, model.camera)));
}

export function getSourceLabels(model: FrameModel): readonly SourceLabel[] {
  const source = fixture.sources[0];
  if (!source) throw new Error('Synthetic source is missing.');
  return fixture.regions.map((region) => {
    const x = Math.max(region.bounds.x + 220, model.camera.x - 864 / model.camera.scale);
    const y = region.bounds.y + 830;
    const point = projectPoint({x, y}, model.camera);
    const screenWidth = source.screenLabel.length * 24;
    const clearance = Math.min(1824 - point.x - screenWidth, point.y - 24 - 54, 1026 - point.y - 7.2);
    const associatedLabels = model.labels.filter((label) => label.id.startsWith(`${region.id}-`));
    const labelVisibility = Math.max(0, ...associatedLabels.map((label) => pairedLabelOpacity(label, model)));
    return {id: `${region.id}-source`, regionId: region.id, text: source.screenLabel, x, y,
      fontSize: 24 / model.camera.scale, opacity: labelVisibility * cameraEase(clamp(clearance / 32)),
      screenX: point.x, screenY: point.y - 24, screenWidth, screenHeight: 31.2};
  });
}

function useVerifiedFonts(): void {
  const [handle] = useState(() => delayRender('WP-004a pinned local fonts', {retries: 0}));
  useEffect(() => {
    let active = true;
    const loadFonts = async (): Promise<void> => {
      const specimen = 'Housing Debt Saving Other Source: Meridian, 2026-09-10 (synthetic) $1,800 $600 $900 $700';
      for (const font of REQUIRED_FONTS) {
        const descriptor = `${font.weight} 40px "${font.family}"`;
        const faces = await document.fonts.load(descriptor, specimen);
        if (faces.length === 0 || !faces.every((face) => face.status === 'loaded') || !document.fonts.check(descriptor, specimen)) {
          throw new Error(`Pinned font is unavailable: ${font.family} ${font.weight}`);
        }
      }
      await document.fonts.ready;
      if (active) continueRender(handle);
    };
    void loadFonts().catch((error: unknown) => {
      if (active) cancelRender(error instanceof Error ? error : new Error(String(error)));
    });
    return () => { active = false; };
  }, [handle]);
}

function WorldLayer({camera, speed, blur, children}: {camera: Camera; speed: number; blur: number; children: ReactElement}): ReactElement {
  return createElement('div', {style: {position: 'absolute', inset: 0, filter: blur ? `blur(${blur}px)` : undefined}, 'data-parallax-speed': speed, 'data-blur-px': blur},
    createElement('div', {style: {position: 'absolute', width: 6000, height: 3400, transformOrigin: '0 0', transform: layerTransform(camera, speed)}}, children));
}

export function CanvasSpike({mode}: CanvasSpikeProps): ReactElement {
  useVerifiedFonts();
  const model = getFrameModel(useCurrentFrame(), mode);
  const svgProps = {width: 6000, height: 3400, viewBox: '0 0 6000 3400', style: {overflow: 'visible'} as CSSProperties};
  const back = createElement('svg', svgProps,
    ...Array.from({length: 14}, (_, index) => createElement('path', {key: `grid-${index}`, d: `M ${index * 440} 0 V 3400`, stroke: tokens.palette.neutral, strokeWidth: 2, opacity: 0.18})),
    ...Array.from({length: 9}, (_, index) => createElement('path', {key: `cross-${index}`, d: `M 0 ${index * 420} H 6000`, stroke: tokens.palette.neutral, strokeWidth: 2, opacity: 0.12})));
  const middle = createElement('svg', {...svgProps, 'data-source-id': fixture.dataset.sourceId},
    createElement('path', {id: 'canvas-relationship-route', d: 'M1200 850 H3100 Q4200 850 4800 1900 Q4100 2750 3000 2550 H1250', fill: 'none', stroke: tokens.palette.neutral, strokeWidth: 4, opacity: 0.22}),
    ...fixture.regions.map((region) => createElement('path', {key: `${region.id}-zero-baseline`, id: `${region.id}-zero-baseline`, 'data-axis-min': 0, d: `M${region.bounds.x + 220} ${region.bounds.y + 650} h1240`, stroke: tokens.palette.neutral, strokeWidth: 3, fill: 'none'})),
    createElement('path', {id: 'structure-total', 'data-value': fixture.dataset.total, 'data-source-id': fixture.dataset.sourceId, d: 'M2300 2840 v36 h1200 v-36', fill: 'none', stroke: tokens.palette.neutral, strokeWidth: 4}),
    ...model.marks.map((mark) => createElement('rect', {key: mark.id, id: mark.id, 'data-value-id': mark.valueId, 'data-value': mark.value, 'data-source-id': fixture.dataset.sourceId, x: mark.x, y: mark.y, width: mark.width, height: mark.height, rx: mark.radius, fill: tokens.palette.ink})),
    ...model.labels.map((label) => createElement('text', {key: label.id, id: label.id, x: label.x, y: label.y, textAnchor: 'middle', fontFamily: label.numeric ? tokens.typography.numeric : tokens.typography.family, fontSize: label.fontSize, fontWeight: label.numeric ? tokens.typography.weights.title : tokens.typography.weights.body, fill: tokens.palette.ink, opacity: pairedLabelOpacity(label, model), style: {fontVariantNumeric: 'tabular-nums'}}, label.text)),
    ...getSourceLabels(model).map((source) => createElement('text', {key: source.id, id: source.id, 'data-source-id': fixture.dataset.sourceId, 'data-region-id': source.regionId, x: source.x, y: source.y, fontFamily: tokens.typography.family, fontSize: source.fontSize, fontWeight: tokens.typography.weights.caption, fill: tokens.palette.neutral, opacity: source.opacity}, source.text)),
    createElement('circle', {id: 'single-focus-marker', cx: model.focus.x, cy: model.focus.y, r: 25, fill: 'none', stroke: tokens.palette.accent, strokeWidth: 7}));
  const front = createElement('svg', svgProps,
    ...fixture.regions.map((region) => createElement('path', {key: `${region.id}-foreground-rail`, id: `${region.id}-foreground-rail`, d: `M${region.bounds.x - 160} ${region.bounds.y + 790} q110 -50 160 -170`, fill: 'none', stroke: tokens.palette.neutral, strokeWidth: 20, opacity: 0.22})));
  return <AbsoluteFill style={{backgroundColor: tokens.palette.paper, overflow: 'hidden', fontFamily: tokens.typography.family}} data-benchmark-mode={mode}>
    <WorldLayer camera={model.camera} speed={0.3} blur={3}>{back}</WorldLayer>
    <WorldLayer camera={model.camera} speed={1} blur={0}>{middle}</WorldLayer>
    <WorldLayer camera={model.camera} speed={1.3} blur={3}>{front}</WorldLayer>
  </AbsoluteFill>;
}

export function CanvasSpikeRoot(): ReactElement {
  return <Composition id={COMPOSITION_ID} component={CanvasSpike} defaultProps={{mode: 'dynamic'}} width={1920} height={1080} fps={30} durationInFrames={5400} />;
}

// The same root serves both variants. Mode freezes frame-derived transforms only;
// the authorized future renderer must still request all 5,400 static frames.
registerRoot(CanvasSpikeRoot);
