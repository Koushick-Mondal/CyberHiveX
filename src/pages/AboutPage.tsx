import { ArrowRight } from 'lucide-react';
import { SectionHeader, RouteLink } from '../components/ui';
import type { PageProps } from '../types/site';
import './pages.css';

const focusAreas = [
  ['Artificial intelligence', 'Helping analysts organize security signals and investigate patterns with context.'],
  ['Cyber defense', 'Connecting asset visibility, exposure review, and practical hardening priorities.'],
  ['Threat intelligence', 'Relating indicators and observed activity to the systems that matter to your organization.'],
  ['Security automation', 'Designing repeatable workflows with clear ownership and human review points.'],
  ['Authorized security testing', 'Evaluating applications, APIs, and cloud environments against an agreed scope.'],
  ['Incident investigation', 'Reconstructing event timelines and supporting evidence-led response decisions.'],
];

export default function AboutPage({ setActivePage }: PageProps) {
  return (
    <div className="chx-pages pg-about">
      <div className="cyber-container">
        <header className="pg-hero pg-hero-grid">
          <div>
            <div className="pg-eyebrow">About CyberHiveX</div>
            <h1>Building a more resilient digital future.</h1>
            <p className="pg-lead">CyberHiveX Technologies is an independent, privately held cybersecurity technology company based in Greater Noida, India. Our work brings together AI, threat intelligence, security automation, and authorized testing.</p>
            <div className="pg-actions">
              <RouteLink page="rakshak" onNavigate={setActivePage} className="btn-cyber-primary">Explore Rakshak AI <ArrowRight size={16} aria-hidden="true" /></RouteLink>
              <RouteLink page="licensing" onNavigate={setActivePage} className="btn-cyber-outline">Discuss an engagement</RouteLink>
            </div>
          </div>
          <aside className="pg-facts" aria-label="Company overview">
            <dl>
              <div><dt>Company</dt><dd>CyberHiveX Technologies</dd></div>
              <div><dt>Headquarters</dt><dd>Greater Noida, Uttar Pradesh, India</dd></div>
              <div><dt>Flagship platform</dt><dd>Rakshak AI</dd></div>
              <div><dt>Focus</dt><dd>Computer &amp; network security</dd></div>
            </dl>
          </aside>
        </header>

        <section aria-labelledby="about-approach" className="pg-grid-two">
          <div>
            <div className="pg-eyebrow">Our approach</div>
            <h2 id="about-approach">Know the threat.<br />Understand the system.</h2>
          </div>
          <div>
            <p>Effective security begins with a clear picture of the environment: what is exposed, which signals need attention, and who is responsible for the next decision.</p>
            <p className="pg-lead">We develop Rakshak AI and security services around that workflow, combining technical investigation with practical remediation guidance.</p>
          </div>
        </section>

        <section className="pg-section" aria-label="Mission, vision and values">
          <SectionHeader number="01" eyebrow="Mission · Vision · Values" title="Principles for useful security work." description="Proposed editorial principles for CyberHiveX; statements of direction rather than measured outcomes or guarantees." />
          <div className="pg-grid-two">
            <article className="pg-card"><span className="pg-label">Mission</span><h3>Make the next security decision clearer.</h3><p>Bring asset context, evidence, and practical review workflows together so teams can understand exposure and act on agreed priorities.</p></article>
            <article className="pg-card"><span className="pg-label">Vision</span><h3>Resilience that grows with the organization.</h3><p>Work toward security that connects investigation, human judgment, and repeatable improvement across growing teams and complex environments.</p></article>
          </div>
          <ul className="pg-principles">
            <li><strong>Evidence over certainty.</strong><span>Separate observed facts, hypotheses, and limitations.</span></li>
            <li><strong>Authorization before action.</strong><span>Agree scope and decision ownership before testing or changes.</span></li>
            <li><strong>Human accountability.</strong><span>Keep analysts and system owners in control of consequential decisions.</span></li>
            <li><strong>Practical improvement.</strong><span>Connect findings to achievable remediation and verification.</span></li>
          </ul>
        </section>

        <section className="pg-section" aria-label="Areas of work">
          <SectionHeader number="02" eyebrow="Areas of work" title="Technology with a defensive purpose." description="Explore the capabilities behind our approach to visibility, investigation, and response." />
          <div className="pg-grid">
            {focusAreas.map(([title, description], index) => (
              <article className="pg-card" key={title}>
                <span className="pg-card-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <RouteLink page="capabilities" onNavigate={setActivePage} className="pg-card-link">Explore our capabilities <ArrowRight size={16} aria-hidden="true" /></RouteLink>
        </section>

        <section className="pg-section" aria-label="Leadership">
          <SectionHeader number="03" eyebrow="Leadership" title="The people building CyberHiveX." description="Founder-led, with a focus on the work ahead." />
          <div className="pg-grid-two">
            <article className="pg-card pg-leader">
              <span className="pg-initials" aria-hidden="true">SR</span>
              <div><h3>Samir Raja</h3><p>Founder</p></div>
            </article>
            <article className="pg-card pg-leader">
              <span className="pg-initials" aria-hidden="true">KM</span>
              <div><h3>Koushick Mondal</h3><p>Co-founder</p></div>
            </article>
          </div>
        </section>

        <section className="pg-cta" aria-label="Discuss your security needs">
          <div><h2>Start with your security priorities.</h2><p>Assessment scope, deployment requirements, and success criteria begin with a conversation. Active testing requires explicit authorization.</p></div>
          <RouteLink page="licensing" onNavigate={setActivePage} className="btn-cyber-primary">Prepare an inquiry <ArrowRight size={16} aria-hidden="true" /></RouteLink>
        </section>
      </div>
    </div>
  );
}
