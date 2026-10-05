import { Pause, Play, RotateCcw, SkipForward } from 'lucide-react';
import { SCENE_EVENT, SCENE_STAGES, type SceneStageId } from './securitySceneFixtures';

interface TelemetryProps { stageIndex: number; stage: SceneStageId; playing: boolean; reducedMotion: boolean; finished: boolean; onPlay: () => void; onNext: () => void; onReset: () => void }
export default function SecurityTelemetry({ stageIndex, stage, playing, reducedMotion, finished, onPlay, onNext, onReset }: TelemetryProps) {
  const current = SCENE_STAGES[stageIndex];
  const showEvent = !['idle', 'monitoring'].includes(stage);
  return <div className="sc-telemetry">
    <div className="sc-stage-heading"><span className="sc-mono">{String(stageIndex + 1).padStart(2, '0')} / 08</span><strong role="status" key={stage}>{current.label}</strong><span className="sc-source-label">SIMULATED</span></div>
    <p className="sc-stage-description">{finished ? 'Prepared sequence complete. Returned to simulated monitoring; no real incident or response.' : current.detail}</p>
    <div className="sc-event-metadata"><span>EVENT <strong>{showEvent ? SCENE_EVENT.id : 'PREPARED SCENARIO'}</strong></span><span>{['risk', 'recommendation', 'resolved'].includes(stage) ? <>PRIORITY <strong>{SCENE_EVENT.risk} · fixture</strong></> : <>SOURCE <strong>Demo telemetry</strong></>}</span></div>
    <div className="sc-playback-controls">
      {!reducedMotion && <button type="button" onClick={onPlay}>{playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}{playing ? 'Pause demo sequence' : finished ? 'Replay demo sequence' : 'Play demo sequence'}</button>}
      <button type="button" onClick={onNext}><SkipForward size={14} aria-hidden="true" />Next simulation stage</button>
      <button type="button" onClick={onReset} aria-label="Reset hero simulation"><RotateCcw size={14} aria-hidden="true" /><span>Reset</span></button>
    </div>
    <p className="sc-playback-note">{reducedMotion ? 'Reduced motion · Use Next to inspect each static stage.' : 'One scripted cycle. Pauses offscreen; playback timing is illustrative.'}</p>
  </div>;
}
