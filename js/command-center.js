/**
 * CYBERHIVEX TECHNOLOGY — SOC Command Center Dashboard Controller (Section 12)
 * High-fidelity enterprise security operations telemetry preview with live simulated stream.
 */
import { cyberAudio } from './audio.js';

export function initCommandCenter() {
  const eventsLog = document.getElementById('soc-events-stream');
  if (!eventsLog) return;

  const threatPill = document.getElementById('soc-threat-level-pill');
  const riskScoreVal = document.getElementById('soc-risk-score');
  const activeThreatsVal = document.getElementById('soc-active-threats');

  // Realistic Simulated Security Event Stream
  const sampleLogs = [
    { type: 'defense', msg: 'Zero-Trust mutual TLS handshake verified for IAM::svc-billing' },
    { type: 'threat', msg: 'Anomalous egress port sweep detected from DMZ::gw-04 — Port quarantined' },
    { type: 'defense', msg: 'Autonomous behavioral baseline model re-calibrated across 48,210 endpoints' },
    { type: 'threat', msg: 'Suspicious PowerShell encoded invocation intercepted on node wks-fin-109' },
    { type: 'defense', msg: 'Cryptographic identity attestation verified via hardware TPM key' },
    { type: 'threat', msg: 'Brute-force credential stuffing probe blocked from AS48291 (IP pool blacklisted)' },
    { type: 'defense', msg: 'Memory integrity sanitizer active: ASLR & control flow guard enforced' },
    { type: 'defense', msg: 'Telemetry ingress rate: 1.84M events/sec — Latency: 0.94ms' },
    { type: 'threat', msg: 'DNS tunneling probe intercepted at recursive resolver — Request sinkholed' }
  ];

  function getTimestamp() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const ms = String(now.getMilliseconds()).padStart(3, '0');
    return `${h}:${m}:${s}.${ms}`;
  }

  function addLogEntry(item) {
    const entry = document.createElement('div');
    entry.className = `log-entry ${item.type}`;
    entry.innerHTML = `
      <span class="log-time">${getTimestamp()}</span>
      <span class="log-msg">${item.msg}</span>
      <span class="log-status">${item.type === 'threat' ? 'BLOCKED' : 'VERIFIED'}</span>
    `;

    eventsLog.insertBefore(entry, eventsLog.firstChild);

    // Keep log buffer bounded
    if (eventsLog.children.length > 20) {
      eventsLog.removeChild(eventsLog.lastChild);
    }
  }

  // Seed initial log entries
  sampleLogs.slice(0, 6).forEach(item => addLogEntry(item));

  // Stream live logs periodically
  let logInterval = setInterval(() => {
    const randomItem = sampleLogs[Math.floor(Math.random() * sampleLogs.length)];
    addLogEntry(randomItem);
  }, 2400);

  // Interactive Threat Level Selector
  const threatButtons = document.querySelectorAll('.soc-threat-level-btn');
  threatButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const level = btn.getAttribute('data-level');
      threatButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (threatPill) {
        threatPill.textContent = level;
        threatPill.className = `hud-status-tag level-${level.toLowerCase()}`;
      }

      if (level === 'CRITICAL' || level === 'HIGH') {
        cyberAudio.playAlert();
        if (riskScoreVal) riskScoreVal.textContent = '74.2';
        if (activeThreatsVal) activeThreatsVal.textContent = '3 ACTIVE [ISOLATING]';
      } else {
        cyberAudio.playClick();
        if (riskScoreVal) riskScoreVal.textContent = '98.8';
        if (activeThreatsVal) activeThreatsVal.textContent = '0 INTRUSIONS';
      }
    });
  });
}
