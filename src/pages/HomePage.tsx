import { useId, useState, type ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown, Check } from 'lucide-react';
import CyberCommandCenterHeroVisual from '../components/CyberCommandCenterHeroVisual';
import RakshakCommandCenterPreview from '../components/RakshakCommandCenterPreview';
import SecurityLifecycleSection from '../components/SecurityLifecycleSection';
import ProactiveVsReactive from '../components/ProactiveVsReactive';
import SecurityIntelligencePipeline from '../components/SecurityIntelligencePipeline';
import DefenseOperationsDeepDive from '../components/DefenseOperationsDeepDive';
import type { PageId, PageProps } from '../types/site';
import { RouteLink } from '../components/ui';
import { serviceCatalogue } from './serviceCatalogue';
import './home.css';

const services = serviceCatalogue.map(service => ({ title: service.label, scope: service.scope, output: service.deliverable }));

const audiences = [
  { name: 'Enterprises', summary: 'Coordinate security across complex environments.', detail: 'Align assessment priorities with existing security operations, distributed assets, and governance requirements.' },
  { name: 'MSMEs', summary: 'Make practical progress with a lean team.', detail: 'Focus on critical digital assets, clear findings, and achievable remediation priorities.' },
  { name: 'Digital businesses', summary: 'Build security into digital delivery.', detail: 'Review application, API, and cloud exposure alongside the teams responsible for developing and operating them.' },
  { name: 'Critical infrastructure', summary: 'Respect operational constraints.', detail: 'Define assessment boundaries around service continuity, system sensitivity, and authorized testing procedures.' },
  { name: 'IT & security teams', summary: 'Connect technical evidence with action.', detail: 'Use evidence-led analysis and clear reporting to support triage, remediation, and security planning.' },
];

const differentiators = [
  { title: 'Evidence before conclusions', description: 'Every sample finding keeps its source, reasoning, and uncertainty visible. Review the evidence—not just a severity label.' },
  { title: 'Context before urgency', description: 'Asset exposure and business impact help frame a priority. A signal alone is not a confirmed incident.' },
  { title: 'Ownership before action', description: 'A useful recommendation identifies what to verify and who should approve the next step. Automated changes require explicit authority.' },
];
const faqs = [
  { title: 'What is Rakshak AI?', answer: 'Rakshak AI is CyberHiveX’s flagship security intelligence platform. The interactive preview on this site uses simulated data to illustrate analysis, prioritization, and recommendations.' },
  { title: 'Does this website monitor or scan my systems?', answer: 'No. The dashboards and technical examples are demonstrations. Selecting an asset or a workflow does not connect to, scan, or change any system.' },
  { title: 'How does an assessment begin?', answer: 'Start by discussing your goals, asset ownership, scope, and operational constraints. Testing requires explicit authorization and agreed rules of engagement.' },
  { title: 'Can you work with our existing security tools?', answer: 'Tooling and data sources are reviewed during scoping. Specific integrations, deployment requirements, and availability must be confirmed for your engagement.' },
  { title: 'Does AI replace analyst judgment?', answer: 'AI-assisted analysis supports understanding and prioritization. Findings and proposed actions require evidence review and appropriate human authorization.' },
  { title: 'How is an engagement priced?', answer: 'Pricing is custom quote-based. We discuss your environment, scope, deliverables, deployment requirements, and operational constraints before any commercial terms are agreed.' },
];

function Heading({ number, eyebrow, title, description }: { number?: string; eyebrow: string; title: string; description?: string }) {
  return <div className="ch-section-heading"><span className="ch-eyebrow">{number ? `${number} / ` : ''}{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}

function Accordion<T extends { title: string }>({ items, renderContent, label }: { items: readonly T[]; renderContent: (item: T) => ReactNode; label: string }) {
  const [expanded, setExpanded] = useState<number | null>(0);
  const id = useId();
  return <div className="ch-accordion" aria-label={label}>{items.map((item, index) => {
    const open = index === expanded;
    return <div key={item.title} className={`ch-accordion-item ${open ? 'is-open' : ''}`}>
      <h3><button type="button" id={`${id}-trigger-${index}`} aria-expanded={open} aria-controls={`${id}-panel-${index}`} onClick={() => setExpanded(open ? null : index)}><span>{item.title}</span><ChevronDown size={18} aria-hidden="true" /></button></h3>
      <div id={`${id}-panel-${index}`} aria-labelledby={`${id}-trigger-${index}`} hidden={!open} className="ch-accordion-body">{renderContent(item)}</div>
    </div>;
  })}</div>;
}

export default function HomePage({ setActivePage }: PageProps) {
  const [audience, setAudience] = useState(0);
  const audienceId = useId();
  const navigate = (page: PageId) => setActivePage(page);
  const assessment = () => navigate('licensing');
  const explore = () => {
    const section = document.getElementById('rakshak-section');
    if (section) {
      section.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      section.focus({ preventScroll: true });
    } else navigate('rakshak');
  };
  return (
    <div className="ch-home">
      <section className="ch-home-hero">
        <div className="cyber-container ch-hero-layout">
          <div className="ch-hero-copy">
            <span className="ch-eyebrow">CyberHiveX Technologies / Digital Defense</span>
            <h1><span>AI-POWERED</span><span>PROACTIVE</span><span className="ch-title-accent">CYBER DEFENSE</span></h1>
            <p className="ch-hero-support">Security intelligence for the moment before an attack becomes an incident.</p>
            <p className="ch-hero-description">CyberHiveX builds AI-powered proactive cybersecurity solutions that help organizations understand digital exposure, detect threats, identify vulnerabilities, and strengthen digital resilience.</p>
            <div className="ch-hero-actions"><button type="button" className="btn-cyber-primary" onClick={explore}>Explore Rakshak AI <ArrowRight size={16} aria-hidden="true" /></button><button type="button" className="btn-cyber-outline" onClick={assessment}>Request Security Assessment <ArrowUpRight size={16} aria-hidden="true" /></button></div>
            <div className="ch-tagline">DETECT. DEFEND. DOMINATE.</div>
          </div>
          <CyberCommandCenterHeroVisual onExploreRakshak={explore} onRequestAssessment={assessment} />
        </div>
      </section>

      <section className="ch-capability-strip" aria-label="Core security expertise"><div className="cyber-container">{['Proactive security', 'AI-assisted intelligence', 'Security testing', 'Incident response', 'Digital forensics', 'Security automation'].map(item => <span key={item}>{item}</span>)}</div></section>

      <section className="ch-home-section ch-section-white" aria-label="Security intelligence evidence"><div className="cyber-container ch-evidence-layout"><div><Heading eyebrow="Security intelligence / Evidence first" title="A signal is the start of a question." description="The core connects assets, identity and threat context. The next step is understanding the evidence—not assuming an incident." /><ol className="ch-evidence-story"><li><span>01 / Observe</span><p>A prepared sign-in record contains repeated failures.</p></li><li><span>02 / Understand</span><p>Shared indicators add context, with uncertainty visible.</p></li><li><span>03 / Review</span><p>An owner validates the recommendation before any action.</p></li></ol><p className="ch-small-note">Fictional records. Authored risk labels and confidence. No monitoring, scanning or model inference.</p></div><RakshakCommandCenterPreview compact /></div></section>

      <section className="ch-home-section"><div className="cyber-container ch-problem-layout"><Heading eyebrow="The security problem" title="More signals do not always mean better decisions." description="Fragmented assets, isolated alerts, and unclear ownership make it difficult to know what needs attention. Proactive defense connects the environment, the evidence, and the next decision—before an incident defines the priority." /><div className="ch-problem-outcome"><span className="ch-eyebrow">The outcome to work toward</span><h3>Know the threat.<br />Protect the system.<br />Stay ahead.</h3><p>Visibility → Context → Priority → Reviewed action</p></div></div></section>

      <section className="ch-home-section ch-product-section" id="rakshak-section" tabIndex={-1} aria-label="Rakshak AI platform preview">
        <div className="cyber-container">
          <div className="ch-product-intro"><Heading number="01" eyebrow="Rakshak AI" title="Security Intelligence, Built for Action" description="Bring threat context, asset exposure, and incident evidence into one clear view. Explore how Rakshak AI supports the path from a finding to an informed decision." /><button type="button" className="ch-text-link" onClick={() => navigate('rakshak')}>Explore the platform <ArrowRight size={16} aria-hidden="true" /></button></div>
          <RakshakCommandCenterPreview onNavigateContact={assessment} />
          <div className="ch-product-principles"><span>Evidence-led analysis</span><span>Business-aware prioritization</span><span>Human-reviewed recommendations</span></div>
        </div>
      </section>

      <section className="ch-home-section"><div className="cyber-container"><ProactiveVsReactive onExploreCapabilities={() => navigate('capabilities')} /><SecurityLifecycleSection onSelectCapability={() => navigate('capabilities')} /></div></section>

      <section className="ch-home-section ch-section-white"><div className="cyber-container"><Heading number="03" eyebrow="Defense operations" title="Technical depth. Clear outcomes." description="Explore the working approach behind OSINT, digital forensics, red teaming, and incident response—one discipline at a time." /><DefenseOperationsDeepDive onNavigateAssessment={assessment} /></div></section>

      <section className="ch-home-section"><div className="cyber-container"><SecurityIntelligencePipeline /></div></section>

      <section className="ch-home-section ch-section-white"><div className="cyber-container ch-services-layout">
        <div className="ch-services-intro"><Heading number="05" eyebrow="Cyber defense services" title="The right expertise for your security priorities." description="From assessments and AI-assisted threat intelligence to investigation and automation. Every engagement starts with a defined scope." /><p className="ch-small-note">Security testing is performed only on explicitly authorized assets.</p><button type="button" className="ch-text-link" onClick={() => navigate('services')}>Explore the service catalogue <ArrowRight size={16} aria-hidden="true" /></button></div>
        <Accordion items={services} label="Security services" renderContent={item => <><p>{item.scope}</p><div className="ch-service-output"><span>Deliverable</span>{item.output}</div><button type="button" className="ch-text-link" onClick={assessment}>Discuss the scope <ArrowRight size={14} aria-hidden="true" /></button></>} />
      </div></section>

      <section className="ch-home-section"><div className="cyber-container ch-audience-layout">
        <Heading number="06" eyebrow="Who we serve" title="Built around your environment." description="Security priorities change with your organization. The approach should, too." />
        <div className="ch-audience-explorer"><div className="ch-audience-selector" role="group" aria-label="Organization type">{audiences.map((item, index) => <button type="button" key={item.name} className={audience === index ? 'is-active' : ''} aria-pressed={audience === index} aria-controls={audienceId} onClick={() => setAudience(index)}>{item.name}<ArrowRight size={15} aria-hidden="true" /></button>)}</div><div className="ch-audience-detail" id={audienceId} aria-live="polite" aria-atomic="true"><span className="ch-eyebrow">{audiences[audience].name}</span><h3>{audiences[audience].summary}</h3><p>{audiences[audience].detail}</p><button type="button" className="ch-text-link" onClick={() => navigate('solutions')}>Explore solutions <ArrowRight size={15} aria-hidden="true" /></button></div></div>
      </div></section>

      <section className="ch-home-section ch-section-white"><div className="cyber-container">
        <Heading number="07" eyebrow="Designed around decisions" title="Technical depth, without the mystery." description="The product experience is built around explainability and review—not unsupported claims about autonomous protection." />
        <div className="ch-differentiators">{differentiators.map(item => <article key={item.title}><Check size={20} aria-hidden="true" /><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
        <div className="ch-quote-callout"><p><strong>Every environment is different.</strong> Scope and requirements determine your custom quote.</p><RouteLink page="pricing" onNavigate={setActivePage} className="ch-text-link">Explore engagement pricing <ArrowRight size={16} aria-hidden="true" /></RouteLink></div>
      </div></section>

      <section className="ch-home-section"><div className="cyber-container ch-faq-layout"><Heading number="08" eyebrow="Frequently asked questions" title="Clarity before commitment." description="A few useful details about the platform preview and security engagements." /><Accordion items={faqs} label="Frequently asked questions" renderContent={item => <p>{item.answer}</p>} /></div></section>

      <section className="ch-about-band"><div className="cyber-container"><div><span className="ch-eyebrow">About CyberHiveX Technologies</span><h2>Building a more resilient digital future.</h2><p>An independent private cybersecurity technology company focused on helping organizations understand, manage, and strengthen their digital security posture.</p></div><button type="button" className="ch-text-link" onClick={() => navigate('about')}>Meet CyberHiveX <ArrowRight size={16} aria-hidden="true" /></button></div></section>

      <section className="ch-assessment-section"><div className="cyber-container ch-assessment-layout"><div><span className="ch-eyebrow">Your next step</span><h2>Understand your digital exposure.</h2><p>Identify vulnerabilities. Understand risk. Strengthen your defenses.</p></div><div><button type="button" className="btn-cyber-primary" onClick={assessment}>Request Security Assessment <ArrowUpRight size={16} aria-hidden="true" /></button><span className="ch-assessment-note">Defined scope. Authorized testing. Evidence-led recommendations.</span></div></div></section>
    </div>
  );
}
