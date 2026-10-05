import { useId, useState } from 'react';
import { Globe, Database, Radar, Cpu, GitMerge, Scale, FileCheck, ShieldCheck } from 'lucide-react';

const stages = [
  { name: 'Environment', icon: Globe, title: 'Start with an agreed scope.', description: 'Identify the applications, infrastructure, and identities relevant to the assessment.', artifact: 'Asset inventory · Ownership · Boundaries' },
  { name: 'Security data', icon: Database, title: 'Gather the available evidence.', description: 'Bring together authorized logs, assessment findings, and public exposure observations. Coverage depends on the agreed data sources.', artifact: 'Logs · Findings · Exposure observations' },
  { name: 'Intelligence', icon: Radar, title: 'Add relevant threat context.', description: 'Compare observations with vulnerability information and relevant adversary behaviors.', artifact: 'Vulnerability references · Threat context' },
  { name: 'Rakshak AI', icon: Cpu, title: 'Support analyst understanding.', description: 'AI-assisted analysis helps organize security information and explain potential findings. Analysts review evidence and recommendations.', artifact: 'Working hypotheses · Evidence summaries' },
  { name: 'Correlation', icon: GitMerge, title: 'Connect related observations.', description: 'Link evidence across assets and events to build a more complete picture of possible activity.', artifact: 'Related events · Incident context' },
  { name: 'Risk analysis', icon: Scale, title: 'Put business impact first.', description: 'Consider asset importance, exposure, and the strength of the evidence when setting priorities.', artifact: 'Impact assessment · Priority · Confidence' },
  { name: 'Guidance', icon: FileCheck, title: 'Make the next step clear.', description: 'Translate findings into an executive summary and actionable technical recommendations.', artifact: 'Executive brief · Remediation actions' },
  { name: 'Response', icon: ShieldCheck, title: 'Act through approved workflows.', description: 'Review and authorize defensive changes, track their implementation, and validate the results.', artifact: 'Approved actions · Review · Retesting' },
];

export default function SecurityIntelligencePipeline() {
  const [selectedStage, setSelectedStage] = useState(3);
  const panelId = useId();
  const current = stages[selectedStage];
  return (
    <div className="ch-pipeline">
      <div className="ch-section-heading">
        <span className="ch-eyebrow">04 / Conceptual architecture</span>
        <h2>From security data to a decision.</h2>
        <p>An illustrative intelligence flow, with human review at the point of action. Select a layer to inspect its role.</p>
      </div>
      <ol className="ch-pipeline-track" aria-label="Conceptual security intelligence flow">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return <li key={stage.name}><button type="button" className={selectedStage === index ? 'is-active' : ''} aria-pressed={selectedStage === index} aria-controls={panelId} onClick={() => setSelectedStage(index)}><Icon size={20} aria-hidden="true" /><span>{stage.name}</span></button></li>;
        })}
      </ol>
      <div id={panelId} key={selectedStage} className="ch-pipeline-detail" aria-live="polite" aria-atomic="true">
        <div><span className="ch-eyebrow">Layer {String(selectedStage + 1).padStart(2, '0')} / {current.name}</span><h3>{current.title}</h3><p>{current.description}</p></div>
        <div className="ch-output"><span>Illustrative information</span><strong>{current.artifact}</strong></div>
      </div>
      <p className="ch-small-note">Conceptual architecture. This diagram does not represent a connected or deployed environment.</p>
    </div>
  );
}
