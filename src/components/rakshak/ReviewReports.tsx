import { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { ASSETS, FIXTURE_DATE, INDICATORS, SEVERITIES, VULNERABILITIES, type SecurityEvent } from './fixtures';
import { Explanation, Risk, SelectFilter } from './Evidence';

interface ReviewProps { events: SecurityEvent[]; reviewedIds: string[]; onToggleReview: (id: string) => void }
export function Recommendations({ events, reviewedIds, onToggleReview }: ReviewProps) {
  const [state, setState] = useState('All');
  const rows = events.filter(event => state === 'All' || (state === 'Reviewed locally' ? reviewedIds.includes(event.id) : !reviewedIds.includes(event.id)));
  return <><div className="rk-callout"><p>Prepared example explanations; no AI model runs. Review status stays in this browser session and performs no remediation.</p></div><SelectFilter label="Recommendation review state" value={state} onChange={setState} options={['All', 'Awaiting review', 'Reviewed locally']} /><p className="rk-result-count" aria-live="polite">{rows.length} recommendations in this view</p><div className="rk-recommendations">{rows.map(event => <details key={event.id}><summary><span>{event.title}<small>{event.id} · {reviewedIds.includes(event.id) ? 'Reviewed locally' : 'Awaiting review'}</small></span><Risk level={event.risk} /></summary><div><p>{event.recommendation}</p><Explanation event={event} /><button type="button" className="rk-button" aria-pressed={reviewedIds.includes(event.id)} onClick={() => onToggleReview(event.id)}>{reviewedIds.includes(event.id) ? 'Reviewed · undo' : 'Mark reviewed locally'}</button></div></details>)}</div>{!rows.length && <div className="rk-empty"><h4>No recommendations in this view</h4><button type="button" className="rk-button" onClick={() => setState('All')}>Show all recommendations</button></div>}</>;
}
export function Reports({ events, reviewedIds, onNotice }: { events: SecurityEvent[]; reviewedIds: string[]; onNotice: (message: string) => void }) {
  const [format, setFormat] = useState('text');
  const distribution = Object.fromEntries(SEVERITIES.map(level => [level, events.filter(event => event.risk === level).length]));
  function download() {
    const report = {
      title: 'Rakshak AI — FICTIONAL DEMO DATA',
      notice: 'Local illustrative fixtures only. No connected monitoring, scans, external intelligence, AI inference, containment or security actions. Confidence values are authored, not probabilities. Review state is local.',
      fixtureDateUTC: FIXTURE_DATE, eventCount: events.length, riskDistribution: distribution, reviewedRecommendationIds: reviewedIds, assets: ASSETS, indicators: INDICATORS, findings: VULNERABILITIES, events,
    };
    const content = format === 'json' ? JSON.stringify(report, null, 2) : [report.title, report.notice, `Fixture date: ${FIXTURE_DATE} UTC`, '', `Events: ${events.length}`, ...SEVERITIES.map(level => `${level}: ${distribution[level]}`), `Locally reviewed IDs: ${reviewedIds.join(', ') || 'None'}`, '', 'FICTIONAL INVENTORY', ...ASSETS.map(asset => `${asset.name} | ${asset.address} | ${asset.environment} | ${asset.technology} | ${asset.risk} | ${asset.status}`), '', 'PREPARED INDICATORS', ...INDICATORS.map(item => `${item.id} | ${item.value} | ${item.severity} | ${item.confidence}% authored confidence | ${item.inference}`), '', 'DEMO FINDINGS (NOT CVEs)', ...VULNERABILITIES.map(item => `${item.id} | ${item.asset} | ${item.title} | ${item.severity} | ${item.exploitability} | ${item.recommendation}`), '', 'FICTIONAL EVENT RECORDS', ...events.flatMap(event => [`${event.id} | ${event.time} UTC | ${event.title} | ${event.risk}`, `Asset: ${event.target} | Source: ${event.source} | Type: ${event.category}`, `Analysis: ${event.analysis}`, `Evidence: ${event.evidence}`, `Risk rationale: ${event.rationale}`, `Fixture confidence: ${event.confidence}% (authored)`, `Impact: ${event.impact}`, `Factors: ${event.factors.join('; ')}`, `Recommendation: ${event.recommendation}`, `Local recommendation review: ${reviewedIds.includes(event.id) ? 'Reviewed' : 'Awaiting review'}`, ''])].join('\n');
    const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rakshak-fictional-demo-report.${format === 'json' ? 'json' : 'txt'}`;
    document.body.appendChild(link); link.click(); link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    onNotice('Fictional demo report prepared for download. Only local fixtures and review state are included.');
  }
  return <section className="rk-report"><FileText size={28} aria-hidden="true" /><span className="rk-demo-label">FICTIONAL DEMO DATA</span><h4>Local security review</h4><p>Inspect the export scope, then download a labelled snapshot of this session. No server request or environment assessment.</p><dl><div><dt>Sample events</dt><dd>{events.length}</dd></div><div><dt>Example assets</dt><dd>{ASSETS.length}</dd></div><div><dt>Recommendations reviewed</dt><dd>{reviewedIds.length}</dd></div></dl><details className="rk-report-scope"><summary>Inspect report scope</summary><p>Includes all four severity counts, event evidence, authored confidence, impact, recommendations, prepared asset/indicator/finding fixtures and local review IDs. No collected telemetry or real-world assessment.</p></details><div className="rk-report-actions"><label>Report format<select aria-label="Report format" value={format} onChange={event => setFormat(event.target.value)}><option value="text">Plain text (.txt)</option><option value="json">Structured data (.json)</option></select></label><button type="button" className="rk-button rk-button--primary" onClick={download}><Download size={16} aria-hidden="true" />Download demo report</button></div></section>;
}
