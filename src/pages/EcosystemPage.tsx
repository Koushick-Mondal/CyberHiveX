import { useState } from 'react';
import type { PageProps } from '../types/site';
import { ArrowRight } from 'lucide-react';
import { SectionHeader, RouteLink } from '../components/ui';
import { PageTabs } from './pageTools';
import './pages.css';

const stages = [
  { id: 'discover', number: '01', label: 'Discover', title: 'Build an agreed picture of your assets.', description: 'Establish the systems, services, and owners in scope. Record gaps and uncertain ownership before treating discovered assets as part of the environment.', input: 'Approved asset scope and available inventory', actions: ['Review public-facing assets', 'Reconcile cloud and application inventories', 'Confirm ownership and exclusions'], output: 'An inventory with ownership and review gaps' },
  { id: 'detect', number: '02', label: 'Detect', title: 'Surface activity that deserves attention.', description: 'Review the relevant event sources and identify unusual behavior or signals. Coverage and data quality determine what can be observed.', input: 'Security logs and agreed signal sources', actions: ['Review collection coverage', 'Establish useful behavioral baselines', 'Identify events for investigation'], output: 'Signals with source and coverage context' },
  { id: 'analyze', number: '03', label: 'Analyze', title: 'Investigate before reaching a conclusion.', description: 'Connect related events, examine supporting evidence, and distinguish hypotheses from verified findings. Keep uncertainty visible to the analyst.', input: 'Signals, event context, and supporting artifacts', actions: ['Correlate related events', 'Review relevant attack techniques', 'Document evidence and alternative explanations'], output: 'An investigation summary and open questions' },
  { id: 'prioritize', number: '04', label: 'Prioritize', title: 'Bring business context to the decision.', description: 'Consider asset importance, exposure, available evidence, and response options. Priorities are a decision aid, not a prediction of every possible incident.', input: 'Investigation findings and asset criticality', actions: ['Discuss potential business impact', 'Assess relevant exposure', 'Assign an owner and next step'], output: 'A prioritized action list with ownership' },
  { id: 'defend', number: '05', label: 'Defend', title: 'Apply approved defensive changes.', description: 'Translate findings into scoped hardening work. Changes should be reviewed for operational impact, approved by the responsible owner, and verified afterward.', input: 'Prioritized findings and change permissions', actions: ['Plan configuration changes', 'Review access boundaries', 'Verify remediation against evidence'], output: 'Documented changes and verification results' },
  { id: 'respond', number: '06', label: 'Respond', title: 'Coordinate investigation and containment.', description: 'Follow the agreed incident process to contain activity, preserve useful evidence, and plan recovery. Actions depend on available access and business approvals.', input: 'Incident context and approved playbooks', actions: ['Escalate to the responsible team', 'Review containment options', 'Preserve evidence and plan recovery'], output: 'An incident record and recovery plan' },
  { id: 'learn', number: '07', label: 'Learn', title: 'Turn events into useful lessons.', description: 'Review what happened, how it was observed, and where the process was unclear. Record improvements without assuming that every contributing factor is known.', input: 'Incident records and operational feedback', actions: ['Review the event timeline', 'Discuss detection and process gaps', 'Assign improvement actions'], output: 'A lessons-learned review with owners' },
  { id: 'strengthen', number: '08', label: 'Strengthen', title: 'Revisit controls as the environment changes.', description: 'Feed lessons into inventories, procedures, and scoped validation. Authorized retesting checks agreed findings and informs the next review.', input: 'Improvement actions and updated requirements', actions: ['Update security baselines', 'Run authorized retests', 'Review coverage and responsibilities'], output: 'Updated controls and a next review plan' },
] as const;
const dataflow = [
  ['Collect context', 'Approved asset information, relevant security logs, and threat context.'],
  ['Investigate', 'Rakshak AI supports organizing signals and investigation priorities.'],
  ['Review & decide', 'Analysts examine evidence and agree on the appropriate next action.'],
  ['Act & improve', 'Approved changes, documented results, and lessons for the next review.'],
];

export default function EcosystemPage({ setActivePage }: PageProps) {
  const [activeStage, setActiveStage] = useState<typeof stages[number]['id']>('discover');
  const current = stages.find((stage) => stage.id === activeStage) ?? stages[0];
  return (
    <div className="chx-pages pg-ecosystem">
      <div className="cyber-container">
        <header className="pg-hero">
          <div className="pg-eyebrow">Security ecosystem</div>
          <h1>A connected workflow.<br />A clearer next decision.</h1>
          <p className="pg-lead">Security work connects discovery, investigation, approved action, and learning. Explore how those disciplines fit together in the CyberHiveX approach.</p>
        </header>

        <section aria-label="Conceptual security workflow">
          <SectionHeader number="01" eyebrow="Conceptual architecture" title="Context to action, with review built in." description="A workflow overview. Actual data sources, integrations, and action permissions are defined for each deployment." />
          <ol className="pg-flow">{dataflow.map(([title, description], index) => <li key={title}><span className="pg-card-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
        </section>

        <section className="pg-section" aria-label="Security lifecycle stages">
          <SectionHeader number="02" eyebrow="Explore the lifecycle" title="Eight stages. One continuous review." description="Choose a stage to inspect its inputs, review activities, and expected working output. Use arrow keys to move between stages." />
          <PageTabs id="lifecycle" label="Security lifecycle stages" items={stages} value={activeStage} onChange={setActiveStage} className="pg-cycle-tabs" />
          <section className="pg-panel" role="tabpanel" tabIndex={0} id={`lifecycle-panel-${activeStage}`} aria-labelledby={`lifecycle-tab-${activeStage}`}>
            <div className="pg-eyebrow">Stage {current.number} / {current.label}</div>
            <div className="pg-stage-detail">
              <div><h2>{current.title}</h2><p>{current.description}</p></div>
              <div><h3>Review activities</h3><ul className="pg-list">{current.actions.map((action) => <li key={action}>{action}</li>)}</ul></div>
            </div>
            <div className="pg-grid-two">
              <div className="pg-deliverable"><h3>Input</h3><p>{current.input}</p></div>
              <div className="pg-deliverable"><h3>Working output</h3><p>{current.output}</p></div>
            </div>
          </section>
        </section>

        <section className="pg-section" aria-label="Working principles">
          <SectionHeader number="03" eyebrow="Working principles" title="Visibility, evidence, ownership." />
          <div className="pg-grid">
            <article className="pg-card"><h3>Know the scope</h3><p>Start with assets, permissions, and responsibilities. Active testing requires explicit authorization.</p></article>
            <article className="pg-card"><h3>Keep evidence visible</h3><p>Show the source, limitations, and reasoning behind a finding or proposed action.</p></article>
            <article className="pg-card"><h3>Close the review loop</h3><p>Document decisions, verify agreed changes, and revisit the workflow as requirements evolve.</p></article>
          </div>
        </section>

        <section className="pg-cta" aria-label="Explore the simulated workflow">
          <div><h2>See the workflow in a local simulation.</h2><p>The Threat Lab uses scripted fictional events to illustrate an investigation sequence. It does not connect to live systems.</p></div>
          <RouteLink page="threatlab" onNavigate={setActivePage} className="btn-cyber-primary">Open Threat Lab <ArrowRight size={16} aria-hidden="true" /></RouteLink>
        </section>
      </div>
    </div>
  );
}
