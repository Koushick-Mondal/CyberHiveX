import { useId, type CSSProperties } from 'react';
import SecurityCore from './SecurityCore';
import { SCENE_NODE_ACTIVITY, SECURITY_NODES, type SceneStageId } from './securitySceneFixtures';
import DataConnections from './DataConnections';

interface NetworkProps { selected: string; onSelect: (id: string) => void; stage: SceneStageId; detailId: string }
export default function SecurityNetwork({ selected, onSelect, stage, detailId }: NetworkProps) {
  const gridId = useId();
  const active = SCENE_NODE_ACTIVITY[stage];
  return <div className="sc-topology">
    <svg className="sc-network-art" viewBox="0 0 560 410" aria-hidden="true" focusable="false">
      <defs><pattern id={gridId} width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0v28" fill="none" stroke="#223749" strokeWidth=".6" /><circle cx="0" cy="0" r="1.2" fill="#425a71" /></pattern></defs>
      <rect x="0" y="0" width="560" height="410" fill={`url(#${gridId})`} className="sc-grid" />
      <ellipse className="sc-atmosphere" cx="280" cy="210" rx="140" ry="118" fill="#2d526f" />
      <g className="sc-grid-cells" fill="none" stroke="#7097b7"><path d="M112 84h28v28h-28z M420 224h28v28h-28z M168 308h28v28h-28z" /></g>
      <DataConnections mobile={false} selected={selected} stage={stage} />
      <DataConnections mobile selected={selected} stage={stage} />
      <ellipse key={`pulse-${stage}`} className="sc-security-pulse" cx="280" cy="224" rx="108" ry="48" />
      <path className="sc-scan" d="M60 195h440" />
      <SecurityCore active={stage === 'analyzing' || stage === 'correlating'} />
      <text className="sc-layer-label" x="280" y="372">CONTEXT → EVIDENCE → REVIEW</text>
    </svg>
    <div className="sc-node-layer" role="group" aria-label="Inspect fictional security network nodes">{SECURITY_NODES.map(node => <button
      type="button" key={node.id} className={`sc-node ${node.mobileX === undefined ? 'sc-node--desktop' : ''} ${active.includes(node.id) ? 'sc-node--event' : ''}`}
      style={{ '--node-x': `${node.x}%`, '--node-y': `${node.y}%`, '--node-mobile-x': `${node.mobileX ?? node.x}%`, '--node-mobile-y': `${node.mobileY ?? node.y}%` } as CSSProperties}
      aria-pressed={selected === node.id} aria-controls={detailId} aria-label={`Inspect ${node.id}: ${node.label}, ${node.risk} scenario risk`}
      onPointerEnter={() => onSelect(node.id)} onFocus={() => onSelect(node.id)} onClick={() => onSelect(node.id)}>
      <span className="sc-node-id">{node.id}</span><span className="sc-node-type">{node.label}</span><span className={`sc-node-risk sc-node-risk--${node.risk.toLowerCase()}`}>{node.risk}</span>
    </button>)}</div>
  </div>;
}
