import { useState } from 'react';
import { FORENSIC_RECORDS, OSINT_NODES } from './investigationFixtures';
import { Explanation, Risk } from './Evidence';
import { FIXTURE_DATE, type SecurityEvent } from './fixtures';

export function OSINT() {
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState(0);
  const node = OSINT_NODES[selected];
  return <><div className="rk-callout"><p><strong>SIMULATED OSINT DATA</strong> · research.example and its subdomains are reserved fictional examples. No scans, DNS queries, scraping or external requests.</p></div>
    <ol className="rk-node-flow" aria-label="Prepared OSINT node progression">{OSINT_NODES.slice(0, progress + 1).map((item, index) => <li key={item.label}><button type="button" className="rk-button" aria-pressed={selected === index} onClick={() => setSelected(index)}><span>{index + 1}. {item.label}</span><span className="rk-mono">{item.value}</span></button></li>)}</ol>
    <section className="rk-inspector" aria-label="Selected OSINT node"><span className="rk-label">Prepared node {selected + 1} of {OSINT_NODES.length}</span><h4>{node.label}</h4><p className="rk-mono">{node.value}</p><p>{node.evidence}</p><p>{node.analysis}</p></section>
    <div className="rk-toolbar"><button type="button" className="rk-button rk-button--primary" disabled={progress === OSINT_NODES.length - 1} onClick={() => { setProgress(progress + 1); setSelected(progress + 1); }}>Reveal next prepared node</button><button type="button" className="rk-button" onClick={() => { setProgress(0); setSelected(0); }}>Reset OSINT demo</button><span className="rk-footnote" role="status">{progress + 1} of {OSINT_NODES.length} prepared nodes visible</span></div>
  </>;
}
export function DigitalForensics({ onInspect }: { onInspect: (id: string) => void }) {
  const [newest, setNewest] = useState(false);
  const rows = newest ? [...FORENSIC_RECORDS].reverse() : FORENSIC_RECORDS;
  return <><div className="rk-callout"><p>Prepared evidence bundle · No collection, disk analysis, hashes, or verified chain of custody. Fixture confidence is authored and does not establish authenticity. Missing gateway interval: 12:00–12:03 UTC.</p></div><div className="rk-toolbar"><p>{FIXTURE_DATE} · UTC</p><button type="button" className="rk-button" onClick={() => setNewest(!newest)}>{newest ? 'Newest first' : 'Oldest first'}</button></div>
    <div className="rk-findings">{rows.map(record => <details key={record.id}><summary><time className="rk-mono">{record.time} UTC</time><span>{record.title}</span></summary><div><dl className="rk-evidence-list"><div><dt>Evidence ID</dt><dd>{record.id}</dd></div><div><dt>Source</dt><dd>{record.source}</dd></div><div><dt>Evidence</dt><dd>{record.evidence}</dd></div><div><dt>Fixture confidence</dt><dd>{record.confidence}% · authored, not model inference</dd></div><div><dt>Analysis / uncertainty</dt><dd>{record.analysis}</dd></div></dl><button type="button" className="rk-text-button" onClick={() => onInspect(record.eventId)}>Inspect linked event {record.eventId}</button></div></details>)}</div>
  </>;
}
export function IncidentTimeline({ events }: { events: SecurityEvent[] }) {
  const [newest, setNewest] = useState(false);
  const rows = [...events].sort((a, b) => newest ? b.time.localeCompare(a.time) : a.time.localeCompare(b.time));
  return <><div className="rk-toolbar"><p className="rk-footnote">{FIXTURE_DATE} · UTC · Prepared chronology and local additions</p><button type="button" className="rk-button" onClick={() => setNewest(!newest)}>{newest ? 'Newest first' : 'Oldest first'}</button></div><ol className="rk-timeline">{rows.map(event => <li key={event.id}><time className="rk-mono">{event.time}</time><details className="rk-timeline-detail"><summary>{event.title}<span className="rk-table-secondary">{event.id} · {event.category} · {event.status}</span></summary><p>Source: {event.source} · Asset: {event.target}</p><Explanation event={event} /></details><Risk level={event.risk} /></li>)}</ol></>;
}
