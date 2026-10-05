import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Badge, RouteLink, SectionHeader } from '../components/ui';
import type { PageProps } from '../types/site';
import { PageTabs } from './pageTools';
import { serviceCatalogue, serviceCategories } from './serviceCatalogue';
import type { ServiceCategory } from './serviceCatalogue';
import './pages.css';

const scopeQuestions: Record<ServiceCategory, string[]> = {
  investigation: ['Which data sources and artifacts are available for review?', 'What question must the investigation answer?', 'Who owns collection permissions and evidence handling?'],
  assurance: ['Which applications, APIs, networks, or cloud assets are authorized?', 'What exclusions, test windows, and stop conditions apply?', 'What report and retest requirements would be useful?'],
  operations: ['Which workflows or response responsibilities need attention?', 'What access and approvals are available?', 'Which integration and business continuity constraints apply?'],
  organization: ['What are your environment boundaries and team capacity?', 'Which controls and responsibilities already exist?', 'What outcomes and procurement requirements should shape the work?'],
  platform: ['Which analyst workflow are you evaluating?', 'What data, deployment, and integration requirements apply?', 'What functionality and commercial availability need confirmation?'],
};

export default function PricingPage({ setActivePage }: PageProps) {
  const [category, setCategory] = useState<ServiceCategory>('assurance');
  const current = serviceCategories.find((item) => item.id === category) ?? serviceCategories[0];
  const services = serviceCatalogue.filter((item) => item.category === category);
  return <div className="chx-pages pg-pricing"><div className="cyber-container">
    <header className="pg-hero"><div className="pg-eyebrow">Pricing & engagements</div><h1>Custom scope.<br />Custom quote.</h1><p className="pg-lead">Cybersecurity work depends on your systems, objectives, access, and deliverables. We begin with a scoping conversation rather than a fixed-price plan.</p><Badge>QUOTE-BASED ENGAGEMENTS</Badge></header>
    <section aria-label="Quote category chooser"><SectionHeader number="01" eyebrow="Build the conversation" title="What kind of work do you need?" description="Choose a category to see typical scope and deliverables. Selection stays on this page; it does not submit a quote request." /><PageTabs id="quote-category" label="Quote categories" items={serviceCategories} value={category} onChange={setCategory} />
      <section className="pg-panel" role="tabpanel" tabIndex={0} id={`quote-category-panel-${category}`} aria-labelledby={`quote-category-tab-${category}`}><div className="pg-eyebrow">{current.label}</div><h2>Define the work before the quote.</h2><div className="pg-grid-two"><div><h3>Scoping questions</h3><ul className="pg-list">{scopeQuestions[category].map((question) => <li key={question}>{question}</li>)}</ul></div><div><h3>Typical working outputs</h3><ul className="pg-list">{services.map((service) => <li key={service.id}><strong>{service.label}:</strong> {service.deliverable}</li>)}</ul></div></div><p className="pg-note">The proposal defines the agreed assets, approach, deliverables, dependencies, timing, exclusions, and commercial terms. Platform availability and licensing options require confirmation. Response support and scheduling are agreed separately.</p><div className="pg-actions"><RouteLink page="licensing" onNavigate={setActivePage} className="btn-cyber-primary">Request a scoping discussion <ArrowRight size={16} aria-hidden="true" /></RouteLink><RouteLink page="services" onNavigate={setActivePage} className="btn-cyber-outline">Review service scopes</RouteLink></div></section>
    </section>
    <section className="pg-section" aria-label="How a quote is prepared"><SectionHeader number="02" eyebrow="From inquiry to scope" title="A proposal with clear boundaries." /><ol className="pg-flow"><li><span className="pg-card-number">01</span><h3>Share the objective</h3><p>Describe the business problem, environment size, and desired output without credentials or confidential evidence.</p></li><li><span className="pg-card-number">02</span><h3>Review requirements</h3><p>Confirm ownership, permissions, access, integrations, and operational constraints.</p></li><li><span className="pg-card-number">03</span><h3>Agree the proposal</h3><p>Review scope, deliverables, responsibilities, timing, and commercial terms.</p></li><li><span className="pg-card-number">04</span><h3>Authorize the work</h3><p>Confirm the engagement and explicit testing authorization before active assessment begins.</p></li></ol></section>
  </div></div>;
}
