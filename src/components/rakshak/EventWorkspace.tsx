import { useState } from 'react';
import { Empty, EventTable, Inspector, RiskDistribution, RiskFilters, SearchField } from './Evidence';
import { SEVERITIES, type SecurityEvent, type SeverityFilter } from './fixtures';

export default function EventWorkspace({ events, selectedId, onSelect, riskMode = false, query, setQuery }: { events: SecurityEvent[]; selectedId: string; onSelect: (id: string) => void; riskMode?: boolean; query: string; setQuery: (value: string) => void }) {
  const [filter, setFilter] = useState<SeverityFilter>('All');
  const [detailed, setDetailed] = useState(false);
  const filtered = events.filter(event => (filter === 'All' || event.risk === filter) && `${event.title} ${event.id} ${event.target} ${event.source} ${event.category}`.toLowerCase().includes(query.trim().toLowerCase()));
  const rows = riskMode ? [...filtered].sort((a, b) => SEVERITIES.indexOf(a.risk) - SEVERITIES.indexOf(b.risk)) : filtered;
  const selected = rows.find(event => event.id === selectedId);
  return <>{riskMode && <RiskDistribution events={events} />}<div className="rk-toolbar"><SearchField label="Search events, assets, or IPs" value={query} onChange={setQuery} /><RiskFilters value={filter} onChange={setFilter} /></div>
    <p className="rk-result-count" aria-live="polite">{rows.length} of {events.length} demo events{riskMode ? ' · highest scenario priority first' : ''}</p>
    <div className="rk-toolbar"><button type="button" className="rk-button" aria-pressed={detailed} onClick={() => setDetailed(!detailed)}>{detailed ? 'Hide extended columns' : 'Show extended columns'}</button><span className="rk-footnote">Source, description and risk reasoning are also available in the selected event.</span></div>
    {rows.length ? <EventTable events={rows} selectedId={selectedId} onSelect={onSelect} detailed={detailed} /> : <Empty title="No matching events" onClear={() => { setQuery(''); setFilter('All'); }} />}
    {selected ? <Inspector event={selected} /> : rows.length > 0 && <p className="rk-footnote">Select a matching event to inspect evidence and uncertainty.</p>}
  </>;
}
