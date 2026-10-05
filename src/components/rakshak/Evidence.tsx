import { useId, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { SEVERITIES, type SecurityEvent, type Severity, type SeverityFilter } from './fixtures';

export function Risk({ level }: { level: Severity }) {
  return <span className={`rk-risk rk-risk--${level.toLowerCase()}`}>{level}</span>;
}
export function Explanation({ event }: { event: SecurityEvent }) {
  return <div className="rk-explanation">
    <div><span className="rk-label">Pattern analysis · prepared</span><p>{event.analysis}</p></div>
    <div><span className="rk-label">Evidence</span><p>{event.evidence}</p></div>
    <div><span className="rk-label">Risk assessment</span><Risk level={event.risk} /><p>{event.rationale}</p></div>
    <div><span className="rk-label">Fixture confidence · {event.confidence}%</span><p>Authored demonstration value; not a probability of compromise or live model confidence.</p></div>
    <div><span className="rk-label">Business impact</span><p>{event.impact}</p></div>
    <div><span className="rk-label">Contributing factors</span><ul>{event.factors.map(factor => <li key={factor}>{factor}</li>)}</ul></div>
    <div><span className="rk-label">Recommendation</span><p>{event.recommendation}</p></div>
    <div><span className="rk-label">Action</span><p>Owner validation and human approval required. Local review changes no security controls.</p></div>
  </div>;
}
export function Inspector({ event }: { event: SecurityEvent }) {
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  return <section className="rk-inspector" aria-label="Selected event inspector">
    <div className="rk-inspector-top"><span className="rk-label">Selected event</span><span className="rk-mono">{event.id}</span></div>
    <h4>{event.title}</h4><div className="rk-inspector-meta"><Risk level={event.risk} /><span className="rk-mono">{event.target}</span><span>{event.status}</span></div>
    <dl className="rk-asset-meta"><div><dt>Time · UTC</dt><dd>{event.time}</dd></div><div><dt>Event type</dt><dd>{event.category}</dd></div><div><dt>Source</dt><dd>{event.source}</dd></div></dl>
    <p>{event.analysis}</p>
    <button type="button" className="rk-text-button" aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded(!expanded)}>{expanded ? 'Hide explanation' : 'Inspect evidence & recommendation'}<ChevronDown size={15} aria-hidden="true" /></button>
    {expanded && <div id={id}><Explanation event={event} /></div>}
  </section>;
}
export function RiskFilters({ value, onChange }: { value: SeverityFilter; onChange: (value: SeverityFilter) => void }) {
  const levels: SeverityFilter[] = ['All', ...SEVERITIES];
  return <div className="rk-filters" role="group" aria-label="Filter events by risk">{levels.map(level => <button type="button" key={level} aria-pressed={value === level} onClick={() => onChange(level)}>{level}</button>)}</div>;
}
export function SearchField({ value, onChange, label }: { value: string; onChange: (value: string) => void; label: string }) {
  return <label className="rk-search"><Search size={16} aria-hidden="true" /><span className="rk-sr-only">{label}</span><input type="search" value={value} onChange={event => onChange(event.target.value)} placeholder={label} /></label>;
}
export function SelectFilter({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return <label className="rk-select-filter">{label}<select aria-label={label} value={value} onChange={event => onChange(event.target.value)}>{options.map(option => <option key={option}>{option}</option>)}</select></label>;
}
export function Empty({ onClear, title = 'No matching records' }: { onClear: () => void; title?: string }) {
  return <div className="rk-empty"><h4>{title}</h4><p>Try a different search or filter.</p><button type="button" className="rk-button" onClick={onClear}>Clear filters</button></div>;
}
export function EventTable({ events, selectedId, onSelect, detailed = true }: { events: SecurityEvent[]; selectedId: string; onSelect: (id: string) => void; detailed?: boolean }) {
  return <div className="rk-table-wrap" tabIndex={0} role="region" aria-label="Scrollable fictional event table"><table className={`rk-table ${detailed ? 'rk-table--wide' : ''}`}>
    <caption>Fictional events · 2026-01-15 UTC · Select to inspect evidence</caption>
    <thead><tr><th scope="col">Time / type</th><th scope="col">Event / asset</th><th scope="col">Severity</th>{detailed && <><th scope="col">Source / description</th><th scope="col">Risk rationale</th></>}<th scope="col">AI review state / action</th></tr></thead>
    <tbody>{events.map(event => <tr key={event.id} className={selectedId === event.id ? 'is-selected' : ''}>
      <td><time className="rk-mono">{event.time}</time><span className="rk-table-secondary">{event.category}</span></td>
      <td><button className="rk-event-link" type="button" aria-pressed={selectedId === event.id} onClick={() => onSelect(event.id)}>{event.title}</button><span className="rk-table-secondary rk-mono">{event.target}</span></td>
      <td><Risk level={event.risk} /></td>{detailed && <><td><span className="rk-mono">{event.source}</span><span className="rk-table-secondary">{event.analysis}</span></td><td>{event.rationale}</td></>}
      <td>{event.status}<span className="rk-table-secondary">Prepared explanation · no inference</span><button type="button" className="rk-text-button" onClick={() => onSelect(event.id)}>Inspect {event.id}</button></td>
    </tr>)}</tbody>
  </table></div>;
}
export function RiskDistribution({ events }: { events: SecurityEvent[] }) {
  return <div className="rk-risk-chart"><h4>Risk distribution</h4><p className="rk-footnote">Counts of scenario labels, not predicted scores.</p>{SEVERITIES.map(level => { const count = events.filter(event => event.risk === level).length; return <div key={level} className="rk-chart-row"><Risk level={level} /><div className="rk-bar-track"><span className={`rk-bar rk-bar--${level.toLowerCase()}`} style={{ width: `${events.length ? count / events.length * 100 : 0}%` }} /></div><span className="rk-mono">{count}</span></div>; })}</div>;
}
