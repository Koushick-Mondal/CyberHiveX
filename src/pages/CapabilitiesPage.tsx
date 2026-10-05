import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { PageProps } from '../types/site';
import { ArrowRight } from 'lucide-react';
import { RouteLink, Button } from '../components/ui';
import { PageTabs } from './pageTools';
import { capabilities } from './capabilityData';
import type { CapabilityId } from './capabilityData';
import './pages.css';

type ExposureResult = { domain: string; api: string; admin: string };

function OsintDemo() {
  const [target, setTarget] = useState('acme.example');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExposureResult | null>(null);
  const [error, setError] = useState('');
  const timer = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => () => { if (timer.current !== null) window.clearTimeout(timer.current); }, []);

  const reset = () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
    setIsRunning(false);
    setResult(null);
    setError('');
  };
  const simulate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (timer.current !== null) return;
    const domain = target.trim().toLowerCase();
    const isReserved = domain.endsWith('.example') && domain.length <= 253 && domain.split('.').every((part) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(part));
    if (!isReserved) {
      setError('Use a fictional .example domain, such as acme.example. No live domains are scanned.');
      inputRef.current?.focus();
      return;
    }
    setTarget(domain);
    setError('');
    setResult(null);
    setIsRunning(true);
    timer.current = window.setTimeout(() => {
      setResult({ domain, api: `api.${domain}`, admin: `admin.${domain}` });
      setIsRunning(false);
      timer.current = null;
    }, 900);
  };

  return (
    <section className="pg-demo" aria-labelledby="osint-demo-heading">
      <div className="pg-demo-heading"><h3 id="osint-demo-heading">Explore an exposure review</h3><span className="pg-demo-tag">DEMO DATA</span></div>
      <p>A local illustration using fictional assets. No DNS lookups, scans, or network requests are performed. Results are fixed sample data, not findings about a real organization.</p>
      <form className="pg-demo-form" onSubmit={simulate} noValidate>
        <label htmlFor="osint-domain">Fictional domain (.example only)</label>
        <div className="pg-input-row">
          <input ref={inputRef} id="osint-domain" name="demo-domain" type="text" value={target} disabled={isRunning} maxLength={253} autoComplete="off" spellCheck={false} aria-invalid={Boolean(error)} aria-describedby="osint-domain-help" onChange={(event) => { setTarget(event.target.value); setResult(null); setError(''); }} />
          <Button type="submit" className="btn-cyber-primary" disabled={isRunning}>{isRunning ? 'Preparing demo…' : 'Run local demo'}</Button>
          <Button type="button" variant="outline" onClick={reset}>Reset</Button>
        </div>
        <p id="osint-domain-help" className="pg-demo-caption">{error || 'Example: acme.example. All IP addresses shown are reserved documentation addresses.'}</p>
      </form>
      <p className="pg-demo-caption" role="status">{isRunning ? 'Preparing fictional exposure data.' : result ? 'Demo complete. Fictional sample findings are shown below.' : 'Ready to prepare sample data.'}</p>
      {result && <div className="pg-demo-report">
        <div className="pg-demo-heading"><h3>Sample report: {result.domain}</h3><span className="pg-demo-tag">FICTIONAL / NOT VERIFIED</span></div>
        <dl>
          <div><dt>Sample application</dt><dd>{result.api} · 192.0.2.18 · HTTPS 443</dd></div>
          <div><dt>Sample management interface</dt><dd>{result.admin} · 198.51.100.24 · HTTPS 8443</dd></div>
          <div><dt>Fictional mail finding</dt><dd>DMARC policy missing in sample records</dd></div>
          <div><dt>Suggested review</dt><dd>Confirm ownership, restrict administrative access, review mail policy</dd></div>
        </dl>
      </div>}
    </section>
  );
}

export default function CapabilitiesPage({ setActivePage }: PageProps) {
  const [activeTab, setActiveTab] = useState<CapabilityId>('threat-intel');
  const current = capabilities.find((item) => item.id === activeTab) ?? capabilities[0];
  return (
    <div className="chx-pages pg-capabilities">
      <div className="cyber-container">
        <header className="pg-hero">
          <div className="pg-eyebrow">Capabilities</div>
          <h1>Clarity across your security workflow.</h1>
          <p className="pg-lead">Explore the technical disciplines behind CyberHiveX—from external exposure review to incident investigation and authorized security testing.</p>
        </header>
        <div className="pg-tab-layout">
          <PageTabs id="capability" label="Security capabilities" items={capabilities} value={activeTab} onChange={setActiveTab} orientation="vertical" />
          <section className="pg-panel" role="tabpanel" tabIndex={0} id={`capability-panel-${activeTab}`} aria-labelledby={`capability-tab-${activeTab}`}>
            <div className="pg-eyebrow">{current.label}</div>
            <h2>{current.title}</h2>
            <p>{current.description}</p>
            <h3>Typical review topics</h3>
            <div className="pg-grid-two">{current.topics.map(([title, description]) => <article className="pg-deliverable" key={title}><h3>{title}</h3><p>{description}</p></article>)}</div>
            {activeTab === 'osint' && <OsintDemo />}
            {activeTab === 'red-team' && <section aria-labelledby="redteam-process">
              <h3 id="redteam-process">Authorization first. Evidence throughout.</h3>
              <ol className="pg-steps">{['Agree scope & authorization', 'Review the approved surface', 'Run agreed test scenarios', 'Assess defensive visibility', 'Document evidence & impact', 'Plan remediation', 'Retest agreed findings'].map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol>
            </section>}
            {activeTab === 'incident-response' && <section aria-labelledby="response-process"><h3 id="response-process">A structured response lifecycle</h3><ol className="pg-steps">{['Detect', 'Contain', 'Investigate', 'Eradicate', 'Recover', 'Improve'].map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol></section>}
            <div className="pg-actions"><RouteLink page="licensing" onNavigate={setActivePage} className="btn-cyber-primary">Discuss assessment scope <ArrowRight size={16} aria-hidden="true" /></RouteLink></div>
          </section>
        </div>
      </div>
    </div>
  );
}
