import { ArrowRight } from 'lucide-react';

const models = [
  { title: 'Reactive security', label: 'When an incident occurs', stages: ['Attack', 'Detect', 'Investigate', 'Respond'], description: 'Identify and contain an incident, preserve evidence, and restore operations.', outcome: 'An essential response capability.' },
  { title: 'Proactive defense', label: 'Before and between incidents', stages: ['Discover', 'Assess', 'Analyze', 'Prioritize', 'Defend', 'Monitor', 'Improve'], description: 'Understand exposure, address important weaknesses, and test whether controls work.', outcome: 'Preparation that complements incident response.' },
];

export default function ProactiveVsReactive({ onExploreCapabilities }: { onExploreCapabilities?: () => void }) {
  return (
    <div className="ch-comparison">
      <div className="ch-section-heading">
        <span className="ch-eyebrow">02 / Defense philosophy</span>
        <h2>Move from reaction to readiness.</h2>
        <p>A resilient security program prepares for threats and responds when they occur. Both matter.</p>
      </div>
      <div className="ch-comparison-columns">
        {models.map((model, i) => (
          <div className={`ch-comparison-model ${i === 1 ? 'ch-comparison-proactive' : ''}`} key={model.title}>
            <span className="ch-eyebrow">{model.label}</span>
            <h3>{model.title}</h3>
            <ol className="ch-inline-flow" aria-label={`${model.title} sequence`}>
              {model.stages.map(stage => <li key={stage}>{stage}</li>)}
            </ol>
            <p>{model.description}</p>
            <strong>{model.outcome}</strong>
          </div>
        ))}
      </div>
      {onExploreCapabilities && <button type="button" className="ch-text-link" onClick={onExploreCapabilities}>Explore security capabilities <ArrowRight size={16} aria-hidden="true" /></button>}
    </div>
  );
}
