import { useId, useState } from 'react';
import { ArrowRight, Globe, FileSearch, Crosshair, ShieldAlert, Building2 } from 'lucide-react';

const disciplines = [
  { id: 'osint', name: 'OSINT', icon: Globe, title: 'Understand the public footprint.', summary: 'Trace an authorized organization’s public presence into a reviewable exposure assessment.', stages: [
    { name: 'Domain', detail: 'Confirm the organization’s approved domain boundary.', evidence: 'example.com · ownership review', output: 'Agreed assessment scope' },
    { name: 'Subdomains', detail: 'Review public DNS and certificate records for related services.', evidence: 'api.example.com · portal.example.com', output: 'Public asset inventory' },
    { name: 'DNS', detail: 'Inspect mail configuration and routing records.', evidence: 'SPF policy · DMARC policy · CNAME records', output: 'Configuration observations' },
    { name: 'Services', detail: 'Review exposed services only within the authorized testing scope.', evidence: 'HTTPS service on 198.51.100.22', output: 'Service exposure summary' },
    { name: 'Technology', detail: 'Record available technology indicators and their confidence.', evidence: 'Public headers · TLS configuration', output: 'Technology context' },
    { name: 'Exposure', detail: 'Validate potential issues and prioritize recommendations.', evidence: 'Illustrative finding: mail policy requires review', output: 'Prioritized exposure report' },
  ] },
  { id: 'forensics', name: 'Digital forensics', icon: FileSearch, title: 'Reconstruct the sequence. Preserve context.', summary: 'Explore a fictional incident timeline. Events are working observations, not proof of attribution.', stages: [
    { name: '08:41 / Authentication', detail: 'A sample log records repeated rejected sign-in attempts followed by a successful session.', evidence: 'Evidence reference DEMO-LOG-01 · identity service', output: 'Authentication activity for review' },
    { name: '08:44 / Execution', detail: 'A sample endpoint record shows an unfamiliar process. Its purpose requires investigation.', evidence: 'Evidence reference DEMO-ENDPOINT-02 · worker-03', output: 'Process and host context' },
    { name: '08:47 / File change', detail: 'A configuration change is recorded and compared with the authorized change history.', evidence: 'Evidence reference DEMO-FILE-03 · configuration snapshot', output: 'Change verification task' },
    { name: '08:53 / Connection', detail: 'An outbound connection to a documentation-range address is added to the timeline.', evidence: 'Evidence reference DEMO-NET-04 · 198.51.100.42', output: 'Network observation' },
    { name: '09:01 / Review', detail: 'The illustrative response team documents approved containment and evidence handling.', evidence: 'Evidence reference DEMO-CASE-05 · analyst case notes', output: 'Incident timeline and evidence register' },
  ] },
  { id: 'redteam', name: 'Red teaming', icon: Crosshair, title: 'Test the defense within clear boundaries.', summary: 'Authorized assessment only. Scope, permitted techniques, communications, and stop conditions are agreed before testing.', stages: [
    { name: 'Reconnaissance', detail: 'Understand the in-scope environment using permitted discovery techniques.', evidence: 'Written scope · approved asset list', output: 'Assessment plan' },
    { name: 'Assessment', detail: 'Identify potential weaknesses and paths relevant to the agreed objectives.', evidence: 'Control observations · candidate attack paths', output: 'Findings for validation' },
    { name: 'Validation', detail: 'Validate findings with techniques permitted by the rules of engagement.', evidence: 'Approved test record · analyst notes', output: 'Evidence-supported findings' },
    { name: 'Risk analysis', detail: 'Explain likely business consequences and affected controls.', evidence: 'Asset importance · evidence confidence', output: 'Prioritized risks' },
    { name: 'Reporting', detail: 'Present a concise executive brief and technical evidence.', evidence: 'Illustrative attack path · control gaps', output: 'Assessment report' },
    { name: 'Remediation', detail: 'Support the asset owner in planning corrective actions.', evidence: 'Owners · actions · agreed milestones', output: 'Remediation roadmap' },
    { name: 'Retesting', detail: 'Reassess the agreed findings after changes are implemented.', evidence: 'Retest observations · remaining limitations', output: 'Validation summary' },
  ] },
  { id: 'ir', name: 'Incident response', icon: ShieldAlert, title: 'A structured route through an incident.', summary: 'A conceptual response cycle. Decisions depend on the incident, available evidence, and organizational authority.', stages: [
    { name: 'Detect', detail: 'Review the alert and determine whether an incident needs investigation.', evidence: 'Sample alert · initial analyst review', output: 'Incident classification' },
    { name: 'Contain', detail: 'Agree proportionate isolation and access restrictions with the responsible team.', evidence: 'Approved containment plan', output: 'Containment record' },
    { name: 'Investigate', detail: 'Gather available evidence and reconstruct the incident sequence.', evidence: 'Case notes · event timeline', output: 'Investigation summary' },
    { name: 'Eradicate', detail: 'Remove confirmed causes and persistence within an approved recovery plan.', evidence: 'Verified findings · change records', output: 'Corrective actions' },
    { name: 'Recover', detail: 'Restore affected operations and verify the recovery with the asset owner.', evidence: 'Restoration checks · monitoring plan', output: 'Recovery validation' },
    { name: 'Improve', detail: 'Review lessons and update controls, procedures, and readiness.', evidence: 'Post-incident review · assigned improvements', output: 'Readiness improvements' },
  ] },
  { id: 'architecture', name: 'Organizational fit', icon: Building2, title: 'Match the approach to the organization.', summary: 'Illustrative engagement models. Actual architecture and delivery are agreed after reviewing requirements.', stages: [
    { name: 'Enterprise', detail: 'Start with existing security operations, distributed assets, data handling requirements, and internal change processes.', evidence: 'Existing tooling · security owners · governance needs', output: 'A scoped integration and assessment plan' },
    { name: 'MSME', detail: 'Start with critical services, public exposure, and practical remediation priorities for a lean team.', evidence: 'Key domains · applications · business priorities', output: 'A focused assessment and improvement roadmap' },
  ] },
];

export default function DefenseOperationsDeepDive({ onNavigateAssessment }: { onNavigateAssessment?: () => void }) {
  const [activeTab, setActiveTab] = useState('osint');
  const [selectedStep, setSelectedStep] = useState(0);
  const panelId = useId();
  const discipline = disciplines.find(item => item.id === activeTab) ?? disciplines[0];
  const current = discipline.stages[selectedStep];
  return (
    <div className="ch-operations">
      <div className="ch-operation-switch" role="group" aria-label="Explore defense disciplines">
        {disciplines.map(item => { const Icon = item.icon; return <button key={item.id} type="button" aria-pressed={item.id === activeTab} aria-controls={panelId} className={item.id === activeTab ? 'is-active' : ''} onClick={() => { setActiveTab(item.id); setSelectedStep(0); }}><Icon size={16} aria-hidden="true" />{item.name}</button>; })}
      </div>
      <div className="ch-operation-content" id={panelId}>
        <div className="ch-operation-heading"><div><h3>{discipline.title}</h3><p>{discipline.summary}</p></div><span className="ch-demo-label">DEMO DATA</span></div>
        <div className="ch-operation-explorer">
          <ol className={`ch-operation-stages ${activeTab === 'forensics' ? 'ch-forensic-timeline' : ''}`} aria-label={`${discipline.name} stages`}>
            {discipline.stages.map((stage, index) => <li key={stage.name}><button type="button" aria-pressed={selectedStep === index} aria-controls={`${panelId}-detail`} className={selectedStep === index ? 'is-active' : ''} onClick={() => setSelectedStep(index)}><span className="ch-technical">{String(index + 1).padStart(2, '0')}</span><span>{stage.name}</span><ArrowRight size={14} aria-hidden="true" /></button></li>)}
          </ol>
          <div className="ch-operation-inspector" id={`${panelId}-detail`} aria-live="polite" aria-atomic="true">
            <span className="ch-eyebrow">Inspect / {current.name}</span><h4>{current.detail}</h4>
            <div className="ch-sample-evidence"><span>Illustrative evidence</span><code>{current.evidence}</code></div>
            <div className="ch-output"><span>Expected output</span><strong>{current.output}</strong></div>
          </div>
        </div>
        <div className="ch-operation-footer"><span>Simulated examples. No scanning, evidence collection, or response actions are performed.</span>{onNavigateAssessment && <button type="button" className="ch-text-link" onClick={onNavigateAssessment}>Discuss an authorized assessment <ArrowRight size={15} aria-hidden="true" /></button>}</div>
      </div>
    </div>
  );
}
