import { Pause, Play, RotateCcw, SkipForward } from 'lucide-react';
import { SCENE_EVENT, SCENE_STAGES, type SceneStageId } from './securitySceneFixtures';

interface TelemetryProps { stageIndex: number; stage: SceneStageId; playing: boolean; reducedMotion: boolean; finished: boolean; onPlay: () => void; onNext: () => void; onReset: () => void }
export default function SecurityTelemetry({ stageIndex, stage, playing, reducedMotion, finished, onPlay, onNext, onReset }: TelemetryProps) {
  const current = SCENE_STAGES[stageIndex];
  const showEvent = !['idle', 'monitoring'].includes(stage);
  const riskValue = showEvent ? `${SCENE_EVENT.risk} · fixture` : 'UNSET · fixture';
  return <div className="sc-telemetry">
    <div className="sc-stage-heading"><span className="sc-mono">{String(stageIndex + 1).padStart(2, '0')} / 08</span><strong role="status" key={stage}>{current.label}</strong><span className="sc-source-label">SIMULATED</span></div>
    <p className="sc-stage-description">{finished ? 'Prepared sequence complete. Returned to simulated monitoring; no real incident or response.' : current.detail}</p>
    <div className="sc-event-metadata" aria-label="Simulated telemetry details">
      <span><small>EVENT ID</small><strong>{SCENE_EVENT.id}</strong></span>
      <span><small>STATUS</small><strong>{SCENE_EVENT.status}</strong></span>
      <span><small>RISK</small><strong>{riskValue}</strong></span>
      <span><small>CONFIDENCE</small><strong>{SCENE_EVENT.confidence}% · authored</strong></span>
      <span><small>SOURCE</small><strong>{SCENE_EVENT.source}</strong></span>
    </div>
    <div className="sc-playback-controls">
      {!reducedMotion && <button type="button" onClick={onPlay}>{playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}{playing ? 'Pause demo sequence' : finished ? 'Replay demo sequence' : 'Play demo sequence'}</button>}
      <button type="button" onClick={onNext}><SkipForward size={14} aria-hidden="true" />Next simulation stage</button>
      <button type="button" onClick={onReset} aria-label="Reset hero simulation"><RotateCcw size={14} aria-hidden="true" /><span>Reset</span></button>
    </div>
    <p className="sc-playback-note">{reducedMotion ? 'Reduced motion · Use Next to inspect each static stage.' : 'One scripted cycle. Pauses offscreen; playback timing is illustrative.'}</p>
  </div>;
}
