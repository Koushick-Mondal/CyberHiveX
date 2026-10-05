import { useState } from 'react';
import type { PageProps } from '../types/site';
import { ArrowRight } from 'lucide-react';
import { SectionHeader, RouteLink } from '../components/ui';
import { PageTabs } from './pageTools';
import './pages.css';

const audiences = {
  msme: {
    label: 'MSMEs & growing teams',
    title: 'Practical security for lean teams.',
    description: 'Start with a manageable view of your assets and a prioritized set of actions. A focused scope helps smaller IT teams decide where to invest their time.',
    items: [
      ['Asset visibility', 'Review websites, APIs, and cloud services to establish an agreed inventory.'],
      ['Exposure review', 'Identify weaknesses in authorized systems and discuss remediation priorities.'],
      ['Investigation workflow', 'Explore how Rakshak AI can organize security signals for analyst review.'],
      ['Response preparation', 'Document ownership, escalation paths, and recovery steps before an incident.'],
    ],
    scope: 'Useful starting context: your primary applications, current security tools, IT ownership, and the issues you want to resolve.',
  },
  enterprise: {
    label: 'Enterprise & complex environments',
    title: 'A scoped approach to complex environments.',
    description: 'Align investigation, security testing, and response processes across distributed teams. Integration and deployment requirements should be evaluated against your environment.',
    items: [
      ['Telemetry requirements', 'Map relevant data sources, ownership, retention needs, and integration constraints.'],
      ['Authorized adversary emulation', 'Define objectives, approved assets, exclusions, and rules of engagement before testing.'],
      ['Investigation & evidence', 'Plan the event sources and evidence-handling procedures required for incident review.'],
      ['Deployment planning', 'Discuss hosting, access boundaries, operational responsibility, and review requirements.'],
    ],
    scope: 'Useful starting context: your environment boundaries, existing SOC workflow, integration dependencies, and procurement requirements.',
  },
};
const checklist = [
  { id: 'mfa', label: 'Multi-factor authentication is enabled for privileged and externally accessible accounts.', short: 'Review authentication coverage' },
  { id: 'inventory', label: 'An asset inventory exists with owners for applications, APIs, and cloud resources.', short: 'Establish asset ownership' },
  { id: 'monitoring', label: 'Security logs are collected and someone is responsible for reviewing alerts.', short: 'Clarify monitoring responsibility' },
  { id: 'response', label: 'An incident response plan defines escalation, containment approval, and recovery steps.', short: 'Document response procedures' },
  { id: 'testing', label: 'Authorized security testing is scoped, documented, and followed by remediation review.', short: 'Plan scoped security testing' },
];

type AudienceId = keyof typeof audiences;
const audienceTabs: { id: AudienceId; label: string }[] = [
  { id: 'msme', label: audiences.msme.label },
  { id: 'enterprise', label: audiences.enterprise.label },
];

export default function SolutionsPage({ setActivePage }: PageProps) {
  const [activeTier, setActiveTier] = useState<AudienceId>('msme');
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const current = audiences[activeTier];
  const checkedCount = checklist.filter((item) => answers[item.id]).length;
  const remaining = checklist.filter((item) => !answers[item.id]);

  return (
    <div className="chx-pages pg-solutions">
      <div className="cyber-container">
        <header className="pg-hero">
          <div className="pg-eyebrow">Solutions</div>
          <h1>Security shaped around your organization.</h1>
          <p className="pg-lead">Find a starting point for your team, then define the environment, objectives, and operational requirements for a useful engagement.</p>
        </header>

        <PageTabs id="audience" label="Organization audience" items={audienceTabs} value={activeTier} onChange={setActiveTier} />
        <section className="pg-panel" role="tabpanel" tabIndex={0} id={`audience-panel-${activeTier}`} aria-labelledby={`audience-tab-${activeTier}`}>
          <div className="pg-eyebrow">{current.label}</div>
          <h2>{current.title}</h2>
          <p>{current.description}</p>
          <div className="pg-grid-two">
            {current.items.map(([title, description]) => <article className="pg-deliverable" key={title}><h3>{title}</h3><p>{description}</p></article>)}
          </div>
          <p className="pg-note">{current.scope}</p>
          <div className="pg-actions">
            <RouteLink page="licensing" onNavigate={setActivePage} className="btn-cyber-primary">Explore engagement options <ArrowRight size={16} aria-hidden="true" /></RouteLink>
            <RouteLink page="threatlab" onNavigate={setActivePage} className="btn-cyber-outline">Try the local demo</RouteLink>
          </div>
        </section>

        <section className="pg-section" aria-label="Security readiness self-review">
          <SectionHeader number="01" eyebrow="Planning tool" title="A readiness checklist, for your own review." description="Mark the practices you believe are in place. This self-review is not a validated security score, audit, or assurance of protection. Answers stay in this page and are not submitted." />
          <div className="pg-panel pg-review-grid">
            <div>
              <h3>Practices to discuss</h3>
              <ul className="pg-checklist">
                {checklist.map((item) => (
                  <li key={item.id}><label htmlFor={`review-${item.id}`}>
                    <input id={`review-${item.id}`} type="checkbox" checked={Boolean(answers[item.id])} onChange={(event) => setAnswers((previous) => ({ ...previous, [item.id]: event.target.checked }))} />
                    <span>{item.label}</span>
                  </label></li>
                ))}
              </ul>
              <button type="button" className="pg-text-button" onClick={() => setAnswers({})}>Clear checklist</button>
            </div>
            <aside className="pg-review-summary" aria-label="Self-review summary">
              <span className="pg-label">Self-reported practices</span>
              <strong aria-live="polite">{checkedCount} of {checklist.length} marked</strong>
              <progress value={checkedCount} max={checklist.length} aria-label="Practices marked in self-review" />
              <p>{remaining.length ? 'Topics you may want to review next:' : 'All topics marked. Confirm that the controls work as intended and keep supporting evidence.'}</p>
              {remaining.length > 0 && <ul className="pg-list">{remaining.map((item) => <li key={item.id}>{item.short}</li>)}</ul>}
            </aside>
          </div>
        </section>

        <section className="pg-cta" aria-label="Next step">
          <div><h2>Turn priorities into a scoped plan.</h2><p>Use the checklist to frame a discussion about your environment and the areas that need deeper investigation.</p></div>
          <RouteLink page="licensing" onNavigate={setActivePage} className="btn-cyber-primary">Prepare an assessment request</RouteLink>
        </section>
      </div>
    </div>
  );
}
