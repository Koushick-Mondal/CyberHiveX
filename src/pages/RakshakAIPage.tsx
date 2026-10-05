import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronRight, Layers, ShieldCheck } from 'lucide-react';
import RakshakCommandCenterPreview from '../components/RakshakCommandCenterPreview';
import { Badge, RouteLink, SectionHeader } from '../components/ui';
import type { PageProps } from '../types/site';

const WORKFLOW = [
  {
    title: 'Security data', tag: 'Collect context',
    description: 'Start with the records a team needs to understand its environment: authentication logs, asset inventories, and configuration changes.',
    input: 'Example sign-in log and a four-asset inventory.',
    output: 'A consistent event record with source, target, time, and category.',
    checkpoint: 'Confirm data coverage and permissions before connecting real sources.',
    example: '12:04:31 · 192.0.2.41 → auth.example.com · Unsuccessful sign-ins',
  },
  {
    title: 'AI analysis', tag: 'Explain the signal',
    description: 'The intended analysis layer turns an event into a readable hypothesis, keeping supporting evidence and uncertainty visible.',
    input: 'A normalized authentication event.',
    output: 'A plain-language explanation linked to the original evidence.',
    checkpoint: 'Validate the hypothesis. This demo uses prepared text; no model inference runs.',
    example: 'Repeated unsuccessful sign-ins may warrant review. Account compromise is not established.',
  },
  {
    title: 'Threat intelligence', tag: 'Connect the evidence',
    description: 'Place a signal in context by comparing related records. Shared indicators can guide an investigation without asserting attacker identity.',
    input: 'A sign-in record and a sample gateway record with a shared source.',
    output: 'An illustrative relationship between two records.',
    checkpoint: 'A shared IP address is context, not proof of malicious intent.',
    example: '192.0.2.41 appears in two fictional records for auth.example.com.',
  },
  {
    title: 'Risk assessment', tag: 'Set the priority',
    description: 'Combine exposure, asset context, and strength of evidence so a reviewer can decide what deserves attention first.',
    input: 'An exposure finding for api.example.com.',
    output: 'A medium-risk example with a readable reason for its priority.',
    checkpoint: 'Confirm business impact and verify reachability before changing the priority.',
    example: 'Medium · Public diagnostic route listed; exploitation has not been established.',
  },
  {
    title: 'Actionable insights', tag: 'Make the next step clear',
    description: 'Present a practical recommendation alongside the evidence and assumptions it depends on.',
    input: 'The sample diagnostic-endpoint finding.',
    output: 'A recommendation to verify access controls and review the need for public access.',
    checkpoint: 'The service owner reviews the proposed change and its operational impact.',
    example: 'Verify api.example.com:8080/debug, then restrict unnecessary public access.',
  },
  {
    title: 'Security response', tag: 'Review, then act',
    description: 'A real response requires an authorized owner, an agreed change, and verification. The demo ends with a local review state and an exportable record.',
    input: 'A recommendation and its supporting evidence.',
    output: 'A locally reviewed item and a labelled fictional report.',
    checkpoint: 'No firewall update, containment, scan, or remediation occurs in this preview.',
    example: 'Mark reviewed locally → export the demo record → discuss your real workflow.',
  },
];

export default function RakshakAIPage({ setActivePage }: PageProps) {
  const [activeStep, setActiveStep] = useState(2);
  const dashboardRef = useRef<HTMLElement>(null);
  const stage = WORKFLOW[activeStep];

  function openDashboard() {
    dashboardRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    dashboardRef.current?.focus({ preventScroll: true });
  }

  return (
    <div className="rk-product-page">
      <section className="rk-product-header cyber-container">
        <div className="rk-product-intro">
          <p className="rk-product-eyebrow"><span>Rakshak AI</span><span>Security intelligence platform</span></p>
          <h1>Security Intelligence,<br />Built for Action.</h1>
           <p className="rk-product-lead">Rakshak AI brings asset context, security events and investigation evidence into one reviewer-led workspace. Explore thirteen connected modules with fictional data, prepared explanations and practical next steps.</p>
          <div className="rk-product-actions"><button type="button" className="btn-cyber-primary" onClick={openDashboard}>Explore the demo <ArrowRight size={17} aria-hidden="true" /></button><RouteLink page="licensing" onNavigate={setActivePage} className="btn-cyber-outline">Discuss Rakshak AI</RouteLink></div>
          <p className="rk-product-note">Interactive product demonstration · Fictional data · No connected monitoring</p>
        </div>
        <aside className="rk-product-positioning" aria-label="Product approach"><ShieldCheck size={27} aria-hidden="true" /><span className="rk-product-eyebrow">Designed around decisions</span><h2>Evidence first.<br />Context always.</h2><p>An investigation should tell you what happened, why it matters, and what to review next.</p><ul><li><Check size={16} aria-hidden="true" />Inspect the evidence behind an event</li><li><Check size={16} aria-hidden="true" />See the reasoning behind a risk label</li><li><Check size={16} aria-hidden="true" />Keep the response with the reviewer</li></ul></aside>
      </section>

      <section className="rk-product-section cyber-container" ref={dashboardRef} tabIndex={-1} aria-label="Interactive Rakshak AI workspace">
         <SectionHeader number="01" eyebrow="13-module product workspace" title="One investigation. The context you need." description="Explore inventory, intelligence, OSINT, forensics and a reviewer-led response. Every interaction uses prepared fixtures and runs locally in this browser; no external model or security action." />
        <RakshakCommandCenterPreview onNavigateContact={setActivePage ? () => setActivePage('licensing') : undefined} />
      </section>

      <section className="rk-product-section rk-architecture-section">
        <div className="cyber-container">
          <SectionHeader number="02" eyebrow="Interactive architecture" title="From raw signal to reviewed response." description="Follow the intended workflow, one stage at a time. Select a stage to inspect its input, output, and review checkpoint." />
          <div className="rk-architecture">
            <div className="rk-workflow-steps" role="group" aria-label="Inspect architecture stages">{WORKFLOW.map((item, index) => <button type="button" key={item.title} aria-pressed={activeStep === index} aria-controls="rk-workflow-detail" onClick={() => setActiveStep(index)}><span className="rk-stage-number">{String(index + 1).padStart(2, '0')}</span><span>{item.title}</span><ChevronRight size={16} aria-hidden="true" /></button>)}</div>
            <div className="rk-workflow-detail" id="rk-workflow-detail">
              <div className="rk-workflow-detail-top"><Badge tone="blue">Stage {activeStep + 1} of 6</Badge><span>{stage.tag}</span></div>
              <h3>{stage.title}</h3><p className="rk-stage-description">{stage.description}</p>
              <div className="rk-stage-io"><div><span>Input</span><p>{stage.input}</p></div><ArrowRight size={20} aria-hidden="true" /><div><span>Output</span><p>{stage.output}</p></div></div>
              <div className="rk-stage-example"><Layers size={17} aria-hidden="true" /><div><span>Example · DEMO DATA</span><p>{stage.example}</p></div></div>
              <div className="rk-stage-checkpoint"><ShieldCheck size={19} aria-hidden="true" /><p><strong>Review checkpoint</strong>{stage.checkpoint}</p></div>
              <div className="rk-stage-navigation"><button type="button" className="btn-cyber-outline" disabled={activeStep === 0} onClick={() => setActiveStep(current => current - 1)}><ArrowLeft size={15} aria-hidden="true" />Previous stage</button><button type="button" className="btn-cyber-outline" disabled={activeStep === WORKFLOW.length - 1} onClick={() => setActiveStep(current => current + 1)}>Next stage<ArrowRight size={15} aria-hidden="true" /></button></div>
            </div>
          </div>
        </div>
      </section>

      <section className="rk-product-section cyber-container">
        <SectionHeader number="03" eyebrow="Built for the reviewer" title="A clearer path through security work." />
        <div className="rk-product-principles"><article><span>01 / Investigate</span><h3>Keep evidence close.</h3><p>Move from an event to its source context, asset record, and timeline without losing the thread.</p></article><article><span>02 / Prioritize</span><h3>Understand the risk.</h3><p>Inspect a reasoned priority alongside the assumptions and uncertainty behind it.</p></article><article><span>03 / Decide</span><h3>Make review useful.</h3><p>Turn findings into understandable next steps and a shareable investigation record.</p></article></div>
        <div className="rk-product-cta"><div><h2>Start with your security workflow.</h2><p>Discuss your environment, the data you work with, and where clearer intelligence would help.</p></div><RouteLink page="licensing" onNavigate={setActivePage} className="btn-cyber-primary">Start a conversation <ArrowRight size={17} aria-hidden="true" /></RouteLink></div>
      </section>
    </div>
  );
}
