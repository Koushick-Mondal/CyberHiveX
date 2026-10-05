import { useId, useState } from 'react';
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const steps = [
  { name: 'Discover', headline: 'Know what needs protecting.', purpose: 'Map the agreed digital environment and its public exposure.', actions: ['Confirm asset ownership and assessment boundaries', 'Inventory domains, applications, cloud services, and identities'], output: 'An asset and exposure inventory' },
  { name: 'Detect', headline: 'Recognize signals worth investigating.', purpose: 'Review available security data for suspicious activity and weaknesses.', actions: ['Review authentication, endpoint, and network signals', 'Document observations and evidence gaps'], output: 'Security observations for review' },
  { name: 'Analyze', headline: 'Turn observations into context.', purpose: 'Connect findings with asset context and relevant threat intelligence.', actions: ['Correlate related events and supporting evidence', 'Separate confirmed findings from working hypotheses'], output: 'An evidence-led analysis' },
  { name: 'Prioritize', headline: 'Focus on meaningful business risk.', purpose: 'Evaluate exposure, likely impact, and the importance of affected assets.', actions: ['Assess exploitability and business consequences', 'Agree owners and remediation priorities'], output: 'A prioritized risk register' },
  { name: 'Defend', headline: 'Strengthen the right controls.', purpose: 'Plan and apply proportionate improvements within approved change processes.', actions: ['Address patches, access controls, and configuration', 'Validate changes with the asset owner'], output: 'A documented remediation plan' },
  { name: 'Respond', headline: 'Handle incidents with a clear plan.', purpose: 'Coordinate investigation, containment, and recovery for confirmed incidents.', actions: ['Preserve relevant evidence and agree containment', 'Track recovery tasks and communications'], output: 'An incident record and response actions' },
  { name: 'Learn', headline: 'Understand what happened and why.', purpose: 'Review incident evidence and the effectiveness of defensive controls.', actions: ['Reconstruct the event timeline', 'Capture root causes, limitations, and lessons'], output: 'A post-incident review' },
  { name: 'Strengthen', headline: 'Bring learning back into defense.', purpose: 'Retest changes and refine the next cycle of discovery and assessment.', actions: ['Verify remediation within the authorized scope', 'Update procedures and security priorities'], output: 'A refreshed security baseline' },
];

export default function SecurityLifecycleSection({ onSelectCapability }: { onSelectCapability?: () => void }) {
  const [activeStep, setActiveStep] = useState(0);
  const panelId = useId();
  const current = steps[activeStep];
  const hoverEnabled = useMediaQuery('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  return (
    <div className="ch-lifecycle">
      <div className="ch-section-heading">
        <span className="ch-eyebrow">Continuous security framework</span>
        <h2>Eight stages. One connected defense.</h2>
        <p>Select a stage to follow the CyberHiveX security lifecycle. Each step informs the next.</p>
      </div>
      <ol className="ch-lifecycle-track" aria-label="Security lifecycle stages">
        {steps.map((step, index) => (
          <li key={step.name}>
            <button type="button" className={index === activeStep ? 'is-active' : ''} aria-pressed={index === activeStep} aria-controls={panelId} onPointerEnter={event => { if (hoverEnabled && event.pointerType === 'mouse') setActiveStep(index); }} onClick={() => setActiveStep(index)}>
              <span className="ch-stage-circle">{String(index + 1).padStart(2, '0')}</span>
              <span>{step.name}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="ch-cycle-note"><RefreshCw size={13} aria-hidden="true" /> Learning feeds the next discovery cycle</div>
      <div className="ch-stage-detail" key={activeStep} id={panelId} aria-live="polite" aria-atomic="true">
        <div>
          <span className="ch-eyebrow">Stage {String(activeStep + 1).padStart(2, '0')} / {current.name}</span>
          <h3>{current.headline}</h3>
          <dl className="ch-lifecycle-meta"><div><dt>Purpose</dt><dd>{current.purpose}</dd></div><div><dt>Inputs</dt><dd>{activeStep === 0 ? 'Approved asset boundaries, owners, and available environment records.' : steps[activeStep - 1].output}</dd></div></dl>
        </div>
        <div>
          <dl className="ch-lifecycle-meta"><div><dt>Analysis</dt><dd>{current.actions[0]}</dd></div><div><dt>Output</dt><dd>{current.output}</dd></div><div><dt>Security action</dt><dd>{current.actions[1]}</dd></div></dl>
        </div>
      </div>
      <div className="ch-stage-footer">
        {onSelectCapability && <button type="button" className="ch-text-link" onClick={onSelectCapability}>Explore the capabilities <ArrowRight size={15} aria-hidden="true" /></button>}
        <div className="ch-stage-navigation">
          <button type="button" aria-label="Previous lifecycle stage" onClick={() => setActiveStep((activeStep + 7) % 8)}><ArrowLeft size={16} aria-hidden="true" /> Previous</button>
          <button type="button" aria-label="Next lifecycle stage" onClick={() => setActiveStep((activeStep + 1) % 8)}>Next <ArrowRight size={16} aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  );
}
