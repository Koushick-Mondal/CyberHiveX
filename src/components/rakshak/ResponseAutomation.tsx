import { useState } from 'react';
import { RESPONSE_STAGES } from './fixtures';

export default function ResponseAutomation() {
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState(0);
  const [approved, setApproved] = useState(false);
  const [complete, setComplete] = useState(false);
  const gated = progress === 2 && !approved;
  function advance() {
    if (gated || complete) return;
    if (progress === RESPONSE_STAGES.length - 1) setComplete(true);
    else { setProgress(progress + 1); setSelected(progress + 1); }
  }
  return <><div className="rk-callout"><p><strong>DEMO LOCAL</strong> · No API, monitoring, containment or remediation. Stages illustrate a reviewer-led workflow; approval only unlocks a local UI state.</p></div>
    <ol className="rk-response-stages" aria-label="Seven-stage local response workflow">{RESPONSE_STAGES.map((stage, index) => <li key={stage.name}><button type="button" className="rk-button" aria-pressed={selected === index} onClick={() => setSelected(index)}><span>{index + 1}. {stage.name}</span><small>{complete || index < progress ? 'Simulated complete' : index === progress ? 'Current simulation stage' : 'Pending simulation'}</small></button></li>)}</ol>
    <section className="rk-inspector" aria-label="Selected response stage"><span className="rk-label">Stage {selected + 1} of 7 · {complete || selected < progress ? 'Simulated complete' : selected === progress ? 'Current' : 'Pending'}</span><h4>{RESPONSE_STAGES[selected].name}</h4><p>{RESPONSE_STAGES[selected].detail}</p></section>
    {progress === 2 && <div className="rk-approval"><h4>Human approval checkpoint</h4><p>Before the containment illustration, review the fictional evidence and change impact. This checkbox records demo approval only.</p><label><input type="checkbox" checked={approved} onChange={event => setApproved(event.target.checked)} />Approve local containment illustration</label></div>}
    <div className="rk-toolbar"><button type="button" className="rk-button rk-button--primary" disabled={gated || complete} onClick={advance}>{progress === 6 ? 'Complete local simulation' : 'Advance local simulation'}</button><button type="button" className="rk-button" onClick={() => { setProgress(0); setSelected(0); setApproved(false); setComplete(false); }}>Reset response demo</button></div>
    <p className="rk-footnote" role="status">{complete ? 'Seven-stage simulation complete. No real response action performed.' : gated ? 'Waiting for demo approval before Contain.' : `${RESPONSE_STAGES[progress].name} is the current local simulation stage.`}</p>
  </>;
}
