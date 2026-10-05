import { useId } from 'react';

export default function SecurityCore({ active }: { active: boolean }) {
  const id = useId().replace(/:/g, '');
  return <g className={`sc-core ${active ? 'is-analyzing' : ''}`}>
    <defs>
      <linearGradient id={`${id}-top`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8298ab" /><stop offset=".5" stopColor="#354e66" /><stop offset="1" stopColor="#617f99" /></linearGradient>
      <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#243e55" /><stop offset="1" stopColor="#132a40" /></linearGradient>
    </defs>
    <g className="sc-core-base"><path d="M140 282 280 222 420 282 280 342Z" fill="#122336" stroke="#31485e" /><path d="M140 282v9l140 60 140-60v-9" fill="none" stroke="#22384c" /><path d="M172 282 280 236 388 282 280 328Z" fill="none" stroke="#46617a" strokeDasharray="4 8" /></g>
    <g className="sc-core-rings"><ellipse className="sc-ring-inner" cx="280" cy="223" rx="139" ry="55" fill="none" stroke="#54758f" strokeWidth="1" strokeDasharray="140 32 48 24" /><ellipse className="sc-ring-outer" cx="280" cy="223" rx="151" ry="62" fill="none" stroke="#34506a" strokeWidth="1" strokeDasharray="25 8" /></g>
    <g className="sc-precision-frame" fill="none" stroke="#58778e" strokeWidth=".7"><path d="M202 143v-13h18 M340 130h18v13 M202 258v13h18 M340 271h18v-13" /></g>
    <g className="sc-core-shell">
    <path d="M280 126 346 162 346 246 280 282 214 246 214 162Z" fill="#142a3e" stroke="#7692a8" strokeWidth="1.5" />
    <path d="M280 126 346 162 280 198 214 162Z" fill={`url(#${id}-top)`} stroke="#91a7b8" />
    <path d="M214 162 280 198 280 282 214 246Z" fill={`url(#${id}-side)`} stroke="#56738b" />
    <path d="M280 198 346 162 346 246 280 282Z" fill="#1a3248" stroke="#56738b" />
    <path d="M280 138 324 162 280 186 236 162Z" fill="#17364e" stroke="#a3c5e0" />
    <path d="M266 154h28v16h-28z M271 159h18v6h-18z" fill="none" stroke="#afcce3" />
    <g className="sc-core-channels" fill="none" stroke="#759eba" strokeWidth="1.5"><path d="M229 179v56l33 18 M241 186v41l21 12 M331 179v56l-33 18 M319 186v41l-21 12" /><path d="M280 269v-17" /><path d="M268 259v-12 M292 259v-12" /></g>
    <g fill="#b6d2e5"><circle cx="229" cy="235" r="2" /><circle cx="331" cy="235" r="2" /><circle cx="280" cy="266" r="2" /></g>
    <path d="M228 194h104v39H228z" fill="#0d2133" stroke="#536f88" />
    <text x="280" y="209" className="sc-core-name">RAKSHAK AI</text><text x="280" y="224" className="sc-core-subtitle">SECURITY INTELLIGENCE</text>
    <path className="sc-core-signal" d="M241 172 280 150 319 172" fill="none" stroke="#c0dbf0" strokeWidth="2" />
    </g>
  </g>;
}
