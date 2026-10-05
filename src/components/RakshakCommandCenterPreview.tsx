import { Suspense, lazy, useId, useState, type FormEvent } from 'react';
import { ArrowRight, ChevronDown, ShieldCheck } from 'lucide-react';
import { EVENTS, HERO_EVENTS, MODULES, SEVERITIES, type ModuleId, type SecurityEvent, type Severity } from './rakshak/fixtures';
import { Explanation, Risk } from './rakshak/Evidence';
import EventWorkspace from './rakshak/EventWorkspace';
import './rakshak.css';

const Dashboard = lazy(() => import('./rakshak/Dashboard'));
const ThreatIntelligence = lazy(() => import('./rakshak/ThreatIntelligence'));
const AssetInventory = lazy(() => import('./rakshak/AssetInventory'));
const Vulnerabilities = lazy(() => import('./rakshak/Vulnerabilities'));
const DigitalForensics = lazy(() => import('./rakshak/Investigation').then(module => ({ default: module.DigitalForensics })));
const IncidentTimeline = lazy(() => import('./rakshak/Investigation').then(module => ({ default: module.IncidentTimeline })));
const OSINT = lazy(() => import('./rakshak/Investigation').then(module => ({ default: module.OSINT })));
const Analyst = lazy(() => import('./rakshak/Analyst'));
const ResponseAutomation = lazy(() => import('./rakshak/ResponseAutomation'));
const Recommendations = lazy(() => import('./rakshak/ReviewReports').then(module => ({ default: module.Recommendations })));
const Reports = lazy(() => import('./rakshak/ReviewReports').then(module => ({ default: module.Reports })));

export interface RakshakPreviewProps { compact?: boolean; onNavigateContact?: () => void }
export default function RakshakCommandCenterPreview({ compact = false, onNavigateContact }: RakshakPreviewProps) {
  const instanceId = useId();
  const [activeModule, setActiveModule] = useState<ModuleId>('security-events');
  const [events, setEvents] = useState<SecurityEvent[]>(EVENTS);
  const [selectedId, setSelectedId] = useState('EVT-9042');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [simulationOpen, setSimulationOpen] = useState(false);
  const [simulationRisk, setSimulationRisk] = useState<Severity>('Medium');
  const [notice, setNotice] = useState('');
  const [reviewedIds, setReviewedIds] = useState<string[]>([]);
  const module = MODULES.find(item => item.id === activeModule) ?? MODULES[0];
  function navigate(value: string) { const target = MODULES.find(item => item.id === value); if (target) { setActiveModule(target.id); setNotice(''); } }
  function inspect(id: string) { setSelectedId(id); setQuery(''); setActiveModule('security-events'); }
  function addDemoEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const sequence = events.length + 1;
    const added: SecurityEvent = { ...HERO_EVENTS[1], id: `EVT-DEMO-${String(sequence).padStart(3, '0')}`, time: `12:${String(8 + Math.floor((sequence - EVENTS.length - 1) / 60)).padStart(2, '0')}:${String((sequence - EVENTS.length - 1) % 60).padStart(2, '0')}`, title: 'Simulated configuration change', risk: simulationRisk, target: 'api.example.com', source: '203.0.113.42', status: 'Local simulation', category: 'Simulation', confidence: 70,
      analysis: 'You added a fictional configuration-change event to this browser session. No system was contacted or changed.', evidence: 'Prepared local scenario: a diagnostic route is marked changed on api.example.com. The demo button appends this authored fixture.', rationale: `${simulationRisk} is the scenario label you selected, not an AI-generated score or verified assessment.`, recommendation: 'Compare configuration against an approved baseline and have the owner validate the change.', impact: 'Scenario impact unverified. No real asset affected.', factors: ['User-selected scenario label', 'Prepared configuration fixture', 'No external validation'] };
    setEvents(current => [...current, added]); inspect(added.id); setSimulationOpen(false); setNotice(`${added.id} added locally. No security action was performed.`);
  }
  function toggleReview(id: string) { setReviewedIds(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]); setNotice(`${id} review state updated locally. No remediation performed.`); }
  return <div className={`rk-dashboard ${compact ? 'rk-dashboard--compact' : ''}`} role="region" aria-label={compact ? 'Rakshak AI compact interactive demo' : 'Rakshak AI interactive command center demo'}>
    <header className="rk-console-header"><div className="rk-console-brand"><ShieldCheck size={21} aria-hidden="true" /><div><strong>Rakshak AI</strong><span>Security command center</span></div></div><span className="rk-demo-label">DEMO ENVIRONMENT</span></header>
    <div className="rk-status-row"><span className="rk-operational"><i aria-hidden="true" />Demo UI: Operational</span><span>Prepared fictional fixtures · No connected monitoring or model inference</span></div>
    {compact ? <div className="rk-compact-body"><div className="rk-panel-heading"><h3>Security activity</h3><span className="rk-mono">Sample window · UTC</span></div><div className="rk-compact-events">{HERO_EVENTS.map(event => <div className="rk-compact-event" key={event.id}><button type="button" aria-expanded={expandedId === event.id} aria-controls={`${instanceId}-${event.id}`} onClick={() => setExpandedId(expandedId === event.id ? null : event.id)}><time className="rk-mono">{event.time}</time><span>{event.title}</span><Risk level={event.risk} /><ChevronDown size={15} aria-hidden="true" /></button>{expandedId === event.id && <div id={`${instanceId}-${event.id}`}><Explanation event={event} /></div>}</div>)}</div><div className="rk-compact-footer"><span>Fictional evidence. Human-reviewed decisions.</span><span>Click an event to inspect <ArrowRight size={14} aria-hidden="true" /></span></div></div> : <>
      <div className="rk-mobile-picker"><label>Command center module<select aria-label="Command center module" value={activeModule} onChange={event => navigate(event.target.value)}>{['Overview', 'Investigate', 'Review & respond'].map(group => <optgroup label={group} key={group}>{MODULES.filter(item => item.group === group).map(item => <option value={item.id} key={item.id}>{item.label}</option>)}</optgroup>)}</select></label></div>
      <div className="rk-workspace"><nav className="rk-module-nav" aria-label="Command center modules"><span className="rk-label">Workspace · 13 modules</span>{MODULES.map((item, index) => <button type="button" key={item.id} aria-current={activeModule === item.id ? 'true' : undefined} onClick={() => navigate(item.id)}><span className="rk-nav-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span>{item.label}</span></button>)}<p>DEMO DATA<br />Reserved example domains/IPs. All actions stay local.</p></nav>
        <div className="rk-main"><div className="rk-panel-heading"><div><span className="rk-label">Demo workspace / {module.group}</span><h3>{module.label}</h3><p>{module.description}</p></div><button type="button" className="rk-button" onClick={() => setSimulationOpen(!simulationOpen)} aria-expanded={simulationOpen} aria-controls={`${instanceId}-simulation`}>+ Simulate event</button></div>
          {simulationOpen && <form className="rk-simulation" id={`${instanceId}-simulation`} onSubmit={addDemoEvent}><div><strong>Add a fictional configuration event</strong><p>Appends a prepared record locally. No scan, attack or response is executed. Confidence stays fixture-defined.</p></div><label>Scenario risk<select aria-label="Scenario risk" value={simulationRisk} onChange={event => { const level = SEVERITIES.find(item => item === event.target.value); if (level) setSimulationRisk(level); }}>{SEVERITIES.map(level => <option key={level}>{level}</option>)}</select></label><button type="submit" className="rk-button rk-button--primary">Add demo event</button></form>}
          <div className="rk-module-content" key={activeModule}><Suspense fallback={<div className="rk-empty" role="status"><h4>Loading module</h4><p>Preparing the local demonstration…</p></div>}>
          {activeModule === 'dashboard' && <Dashboard events={events} reviewedIds={reviewedIds} onInspect={inspect} onReview={() => navigate('ai-recommendations')} />}
          {(activeModule === 'security-events' || activeModule === 'risk-analysis') && <EventWorkspace key={activeModule} events={events} selectedId={selectedId} onSelect={setSelectedId} query={query} setQuery={setQuery} riskMode={activeModule === 'risk-analysis'} />}
          {activeModule === 'threat-intelligence' && <ThreatIntelligence />}
          {activeModule === 'asset-discovery' && <AssetInventory onRelated={name => { setQuery(name); setActiveModule('security-events'); }} />}
          {activeModule === 'vulnerability-intelligence' && <Vulnerabilities onInspect={inspect} />}
          {activeModule === 'osint' && <OSINT />}
          {activeModule === 'digital-forensics' && <DigitalForensics onInspect={inspect} />}
          {activeModule === 'incident-timeline' && <IncidentTimeline events={events} />}
          {activeModule === 'ai-security-analyst' && <Analyst events={events} selectedId={selectedId} onSelect={setSelectedId} />}
          {activeModule === 'ai-recommendations' && <Recommendations events={events} reviewedIds={reviewedIds} onToggleReview={toggleReview} />}
          {activeModule === 'security-reports' && <Reports events={events} reviewedIds={reviewedIds} onNotice={setNotice} />}
          {activeModule === 'response-automation' && <ResponseAutomation />}
          </Suspense></div>
        </div>
      </div><footer className="rk-console-footer"><span>DEMO DATA · No connected monitoring or automated response.</span>{onNavigateContact && <button type="button" className="rk-text-button" onClick={onNavigateContact}>Discuss your environment <ArrowRight size={14} aria-hidden="true" /></button>}</footer><div className="rk-notice" role="status">{notice}</div>
    </>}
  </div>;
}
