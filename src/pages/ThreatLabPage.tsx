import { useCallback, useEffect, useRef, useState } from 'react';
import type { PageProps } from '../types/site';
import { Download, Play, RotateCcw } from 'lucide-react';
import { RouteLink, Button } from '../components/ui';
import { PageTabs } from './pageTools';
import { downloadLocalFile } from './downloadLocalFile';
import './pages.css';

const scenarios = [
  {
    id: 'ddos', label: 'API traffic flood', detail: 'T1498 · Network denial of service',
    environment: 'api.shop.example · 192.0.2.18',
    description: 'A scripted spike in API requests prompts a review of traffic patterns and a proposed edge-control response.',
    logs: [
      '[SIGNAL] Sample request-volume anomaly observed at api.shop.example.',
      '[TRIAGE] Compare the fictional traffic pattern with the sample baseline.',
      '[ANALYSIS] Repeated request signatures suggest an automated traffic source.',
      '[REVIEW] Analyst reviews potential user impact and proposed edge controls.',
      '[SIMULATED ACTION] An approved rate-limit change is recorded in the demo.',
      '[VERIFY] Sample events illustrate checking service behavior after the change.',
      '[OUTCOME] Script complete. Review control effectiveness and remaining exposure.',
    ],
  },
  {
    id: 'kerberos', label: 'Identity misuse', detail: 'T1558.003 · Kerberoasting',
    environment: 'workstation.corp.example · 198.51.100.24',
    description: 'Fictional identity events illustrate how unusual service-ticket activity might be investigated before a containment decision.',
    logs: [
      '[SIGNAL] Sample workstation requests an unusual group of service tickets.',
      '[TRIAGE] Review sample service-account access and account ownership.',
      '[ANALYSIS] Correlate fictional ticket requests with workstation activity.',
      '[REVIEW] Analyst evaluates the hypothesis and evidence limitations.',
      '[SIMULATED ACTION] An approved host-isolation decision is recorded in the demo.',
      '[VERIFY] Sample follow-up checks examine account access and credential hygiene.',
      '[OUTCOME] Script complete. Findings require real evidence in an actual investigation.',
    ],
  },
  {
    id: 'iam', label: 'Cloud permission drift', detail: 'T1098 · Account manipulation',
    environment: 'cloud-audit.example · 203.0.113.42',
    description: 'A fictional privilege-change event demonstrates an identity review and a proposed permission rollback.',
    logs: [
      '[SIGNAL] Sample audit log contains a new privileged policy assignment.',
      '[TRIAGE] Identify the fictional principal, resource, and change owner.',
      '[ANALYSIS] Compare sample permissions with the documented access baseline.',
      '[REVIEW] Analyst checks whether the change was approved and business-required.',
      '[SIMULATED ACTION] An approved permission rollback is recorded in the demo.',
      '[VERIFY] Sample follow-up checks review affected sessions and remaining access.',
      '[OUTCOME] Script complete. No cloud accounts or policies were changed.',
    ],
  },
  {
    id: 'supplychain', label: 'Dependency anomaly', detail: 'T1195.002 · Software supply chain',
    environment: 'build.corp.example · 192.0.2.60',
    description: 'A fictional build event illustrates reviewing an unexpected dependency behavior and pausing artifact promotion.',
    logs: [
      '[SIGNAL] Sample dependency review flags unexpected installation behavior.',
      '[TRIAGE] Compare the fictional package manifest with the approved baseline.',
      '[ANALYSIS] Sample artifact behavior suggests an unexpected outbound connection.',
      '[REVIEW] Analyst examines provenance and decides whether to hold the build.',
      '[SIMULATED ACTION] A build hold and artifact-review task are recorded in the demo.',
      '[VERIFY] Sample follow-up checks review dependency changes and release approval.',
      '[OUTCOME] Script complete. No builds, packages, or repositories were modified.',
    ],
  },
] as const;

type ScenarioId = typeof scenarios[number]['id'];

export default function ThreatLabPage({ setActivePage }: PageProps) {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioId>('ddos');
  const [isRunning, setIsRunning] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [status, setStatus] = useState('Ready');
  const timers = useRef<number[]>([]);
  const runVersion = useRef(0);
  const runningRef = useRef(false);
  const consoleRef = useRef<HTMLDivElement>(null);
  const current = scenarios.find((scenario) => scenario.id === selectedScenario) ?? scenarios[0];

  const stopTimers = useCallback(() => {
    runVersion.current += 1;
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    runningRef.current = false;
  }, []);

  useEffect(() => () => stopTimers(), [stopTimers]);
  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleLogs]);

  const reset = () => {
    stopTimers();
    setIsRunning(false);
    setConsoleLogs([]);
    setStatus('Ready');
  };
  const selectScenario = (id: ScenarioId) => {
    reset();
    setSelectedScenario(id);
  };
  const runSimulation = () => {
    if (runningRef.current) return;
    stopTimers();
    const version = runVersion.current;
    runningRef.current = true;
    setIsRunning(true);
    setConsoleLogs([]);
    setStatus('Playing scripted events');
    timers.current = current.logs.map((line, index) => window.setTimeout(() => {
      if (version !== runVersion.current) return;
      setConsoleLogs((previous) => [...previous, `[DEMO ${String(index + 1).padStart(2, '0')}] ${line}`]);
      if (index === 2) setStatus('Illustrating analyst review');
      if (index === current.logs.length - 1) {
        runningRef.current = false;
        timers.current = [];
        setIsRunning(false);
        setStatus('Demo complete');
      }
    }, (index + 1) * 550));
  };

  const downloadOutput = () => {
    if (isRunning || !consoleLogs.length) return;
    const output = [
      'CYBERHIVEX THREAT LAB — DEMO DATA',
      'Scripted local simulation. Fictional assets. Not a live incident report.',
      'Playback timing is illustrative, not measured detection or response performance.',
      `Scenario: ${current.label}`,
      `Reference technique: ${current.detail}`,
      `Fictional environment: ${current.environment}`,
      `Playback status: ${status}`,
      '',
      ...consoleLogs,
    ].join('\n');
    downloadLocalFile(`cyberhivex-demo-${current.id}.txt`, output);
  };

  return (
    <div className="chx-pages pg-threatlab">
      <div className="cyber-container">
        <header className="pg-hero">
          <div className="pg-eyebrow">Threat Lab</div>
          <h1>Explore a security investigation, step by step.</h1>
          <p className="pg-lead">Choose a fictional scenario and play a local event sequence. This educational simulation illustrates an analyst workflow; it does not detect threats, execute attacks, or change live systems.</p>
        </header>

        <PageTabs id="scenario" label="Demo scenarios" items={scenarios} value={selectedScenario} onChange={selectScenario} className="pg-scenario-tabs" />
        <section className="pg-demo" role="tabpanel" tabIndex={0} id={`scenario-panel-${selectedScenario}`} aria-labelledby={`scenario-tab-${selectedScenario}`}>
          <div className="pg-demo-heading"><h2>{current.label}</h2><span className="pg-demo-tag">DEMO DATA / LOCAL SIMULATION</span></div>
          <p>{current.description}</p>
          <div className="pg-lab-summary"><div><span className="pg-label">Fictional environment</span><p>{current.environment}</p></div><div><span className="pg-label">Reference technique</span><p>{current.detail}</p></div></div>
          <div className="pg-actions">
            <Button type="button" className="btn-cyber-primary" onClick={runSimulation} disabled={isRunning}><Play size={16} aria-hidden="true" />{isRunning ? 'Playing demo…' : 'Run simulation'}</Button>
            <Button type="button" variant="outline" onClick={reset}><RotateCcw size={16} aria-hidden="true" />Reset</Button>
            <Button type="button" variant="outline" onClick={downloadOutput} disabled={isRunning || consoleLogs.length === 0}><Download size={16} aria-hidden="true" />Download demo output</Button>
          </div>
          <p className="pg-lab-status" role="status">{status} · {consoleLogs.length} of {current.logs.length} scripted events</p>
          <div className="pg-console" ref={consoleRef} role="log" tabIndex={0} aria-label="Scripted fictional event log" aria-live="polite" aria-relevant="additions">
            {consoleLogs.length === 0 ? <span className="pg-console-empty">Ready to play. Select “Run simulation” to show the fictional event sequence.</span> : <ol>{consoleLogs.map((line, index) => <li className={line.includes('[OUTCOME]') ? 'pg-log-outcome' : undefined} key={`${selectedScenario}-${index}`}>{line}</li>)}</ol>}
          </div>
          <p className="pg-demo-caption">All events are scripted DEMO DATA. Domains and IPs are reserved for examples. Playback timing is illustrative, not measured product performance. Downloads contain only the events produced by your completed demo run.</p>
        </section>

        <section className="pg-cta" aria-label="Discuss authorized security testing">
          <div><h2>Plan an authorized assessment.</h2><p>Real security testing starts with approved systems, objectives, exclusions, and rules of engagement.</p></div>
          <RouteLink page="licensing" onNavigate={setActivePage} className="btn-cyber-primary">Prepare an assessment request</RouteLink>
        </section>
      </div>
    </div>
  );
}
