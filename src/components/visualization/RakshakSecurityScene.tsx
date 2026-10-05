import { useId, useState } from 'react';
import { SECURITY_NODES, SCENE_EVENT } from './securitySceneFixtures';
import { useSecurityScene } from './useSecurityScene';
import SecurityNetwork from './SecurityNetwork';
import SecurityTelemetry from './SecurityTelemetry';
import './security-scene.css';

export default function RakshakSecurityScene() {
  const { sceneRef, animated, reducedMotion, stage, stageIndex, playing, finished, togglePlayback, next, reset } = useSecurityScene();
  const detailId = useId();
  const [selectedId, setSelectedId] = useState('IDENTITY-017');
  const selected = SECURITY_NODES.find(node => node.id === selectedId) ?? SECURITY_NODES[0];
  return <div className={`sc-scene ${animated ? 'sc-scene--playing' : ''} ${reducedMotion ? 'sc-scene--reduced' : ''}`} data-stage={stage.id} ref={sceneRef} role="region" aria-label="Rakshak AI security intelligence visualization">
    <header className="sc-header"><div><span className="sc-eyebrow">Security intelligence core</span><strong>RAKSHAK AI</strong></div><div className="sc-header-meta"><span>FRAME 01</span><span>STATUS <strong>SIMULATED</strong></span></div><span className="sc-demo-badge">DEMO ENVIRONMENT</span></header>
    <SecurityNetwork selected={selectedId} onSelect={setSelectedId} stage={stage.id} detailId={detailId} />
    <section className="sc-node-inspector" id={detailId} aria-label="Selected fictional network node"><div className="sc-node-context" key={selected.id}><div><span className="sc-mono">{selected.id}</span><span>{selected.type} · {selected.status}</span></div><p>{selected.evidence}</p></div></section>
    <SecurityTelemetry stageIndex={stageIndex} stage={stage.id} playing={playing} reducedMotion={reducedMotion} finished={finished} onPlay={togglePlayback} onNext={next} onReset={reset} />
    <footer className="sc-footer"><span>Prepared evidence · No AI inference or live monitoring</span><span>Fixture confidence {SCENE_EVENT.confidence}% · authored, not a compromise probability</span></footer>
  </div>;
}
