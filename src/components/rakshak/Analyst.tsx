import { useState, type FormEvent } from 'react';
import { ANALYST_QUESTIONS, UNSUPPORTED_ANSWER } from './investigationFixtures';
import { type SecurityEvent } from './fixtures';

interface Exchange { question: string; answer: string; eventId: string }
export default function Analyst({ events, selectedId, onSelect }: { events: SecurityEvent[]; selectedId: string; onSelect: (id: string) => void }) {
  const [question, setQuestion] = useState('');
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const selected = events.find(event => event.id === selectedId) ?? events[0];
  function ask(input: string) {
    const normalized = input.trim().toLowerCase().replace(/[?.!]+$/, '');
    const match = ANALYST_QUESTIONS.find(item => item.toLowerCase().replace(/[?]+$/, '') === normalized);
    const answers: Record<typeof ANALYST_QUESTIONS[number], string> = {
      'Summarize selected event': `Prepared analysis: ${selected.analysis} Evidence: ${selected.evidence} Uncertainty: ${selected.impact}`,
      'What evidence supports the risk?': `Evidence: ${selected.evidence} Scenario priority: ${selected.risk}. ${selected.rationale} Factors: ${selected.factors.join('; ')}. Fixture confidence ${selected.confidence}% is authored, not a compromise probability.`,
      'Is compromise confirmed?': 'No. None of these fictional records establishes compromise, attacker identity, or malicious intent. Coverage and authenticity are unverified. No inference is performed.',
      'What should we do next?': `Prepared recommendation: ${selected.recommendation} Have the authorized owner validate evidence and approve any real change. This demo performs no action.`,
    };
    setExchanges(current => [...current, { question: input.trim(), answer: match ? answers[match] : UNSUPPORTED_ANSWER, eventId: selected.id }]);
    setQuestion('');
  }
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (question.trim()) ask(question); }
  return <><div className="rk-callout"><p><strong>Prepared local Q&A only.</strong> No external model, inference, retrieval or threat determination. Suggested questions use the selected fictional evidence; other input receives an uncertainty response.</p></div>
    <label className="rk-select-filter">Evidence context<select aria-label="Evidence context" value={selectedId} onChange={event => onSelect(event.target.value)}>{events.map(event => <option value={event.id} key={event.id}>{event.id} · {event.title}</option>)}</select></label>
    <div className="rk-question-list">{ANALYST_QUESTIONS.map(item => <button type="button" className="rk-button" key={item} onClick={() => ask(item)}>{item}</button>)}</div>
    <div className="rk-conversation" role="log" aria-label="Local analyst conversation" aria-live="polite">{exchanges.length ? exchanges.map((exchange, index) => <article key={`${exchange.eventId}-${index}`}><span className="rk-label">Your question · {exchange.eventId}</span><p>{exchange.question}</p><span className="rk-label">Prepared response · no inference</span><p>{exchange.answer}</p></article>) : <p className="rk-footnote">Select a question to inspect the fixture evidence.</p>}</div>
    <form className="rk-analyst-form" onSubmit={submit}><label className="rk-select-filter">Ask about the fictional evidence<input value={question} onChange={event => setQuestion(event.target.value)} maxLength={500} placeholder="Use a suggested question, or try your own" /></label><button type="submit" className="rk-button rk-button--primary" disabled={!question.trim()}>Ask locally</button><button type="button" className="rk-button" onClick={() => { setExchanges([]); setQuestion(''); }}>Clear conversation</button></form>
  </>;
}
