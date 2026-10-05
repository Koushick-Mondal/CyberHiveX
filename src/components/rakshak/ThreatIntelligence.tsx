import { useState } from 'react';
import { INDICATORS, SEVERITIES } from './fixtures';
import { Empty, Risk, SearchField, SelectFilter } from './Evidence';

export default function ThreatIntelligence() {
  const [query, setQuery] = useState('');
  const [severity, setSeverity] = useState('All');
  const [type, setType] = useState('All');
  const [status, setStatus] = useState('All');
  const [source, setSource] = useState('All');
  const [time, setTime] = useState('All');
  const [selected, setSelected] = useState(INDICATORS[0].id);
  const rows = INDICATORS.filter(item => (severity === 'All' || item.severity === severity) && (type === 'All' || item.type === type) && (status === 'All' || item.status === status) && (source === 'All' || item.source === source) && (time === 'All' || (time === 'Before 12:06 UTC' ? item.first < '12:06:00' : item.first >= '12:06:00')) && `${item.id} ${item.value} ${item.assets.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase()));
  const active = rows.find(item => item.id === selected);
  function clear() { setQuery(''); setSeverity('All'); setType('All'); setStatus('All'); setSource('All'); setTime('All'); }
  return <><div className="rk-callout"><p>Prepared local intelligence only · Reserved example domains/IPs · No reputation lookup, threat feed or attribution. Confidence values are authored fixture percentages.</p></div>
    <div className="rk-toolbar"><SearchField label="Search indicators or assets" value={query} onChange={setQuery} /></div>
    <div className="rk-filter-grid"><SelectFilter label="Severity" value={severity} onChange={setSeverity} options={['All', ...SEVERITIES]} /><SelectFilter label="Indicator type" value={type} onChange={setType} options={['All', ...new Set(INDICATORS.map(item => item.type))]} /><SelectFilter label="Status" value={status} onChange={setStatus} options={['All', ...new Set(INDICATORS.map(item => item.status))]} /><SelectFilter label="Source" value={source} onChange={setSource} options={['All', ...new Set(INDICATORS.map(item => item.source))]} /><SelectFilter label="First observed window" value={time} onChange={setTime} options={['All', 'Before 12:06 UTC', 'From 12:06 UTC']} /><button type="button" className="rk-button" onClick={clear}>Clear filters</button></div>
    <p className="rk-result-count" aria-live="polite">{rows.length} of {INDICATORS.length} prepared indicators</p>
    {rows.length ? <div className="rk-table-wrap" tabIndex={0} role="region" aria-label="Scrollable threat intelligence table"><table className="rk-table rk-table--intel"><caption>Threat intelligence fixtures · 2026-01-15 UTC</caption><thead><tr><th scope="col">Indicator / type</th><th scope="col">Severity / status</th><th scope="col">Source</th><th scope="col">Fixture confidence</th><th scope="col">First / last observed</th><th scope="col">Affected example assets</th><th scope="col">Prepared inference</th></tr></thead><tbody>{rows.map(item => <tr key={item.id} className={selected === item.id ? 'is-selected' : ''}><td><button type="button" className="rk-event-link rk-mono" aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}>{item.value}</button><span className="rk-table-secondary">{item.id} · {item.type}</span></td><td><Risk level={item.severity} /><span className="rk-table-secondary">{item.status}</span></td><td>{item.source}</td><td>{item.confidence}% · authored</td><td>{item.first}<span className="rk-table-secondary">{item.last}</span></td><td>{item.assets.join(', ')}</td><td>{item.inference}</td></tr>)}</tbody></table></div> : <Empty onClear={clear} />}
    {active && <section className="rk-inspector" aria-label="Selected indicator context"><span className="rk-label">{active.id} · local prepared inference</span><h4>{active.value}</h4><p>{active.inference}</p><p>Fixture confidence: {active.confidence}%. This describes authored evidence support, not maliciousness probability. External validation is absent.</p><p>Related fictional assets: {active.assets.join(', ')}.</p></section>}
  </>;
}
