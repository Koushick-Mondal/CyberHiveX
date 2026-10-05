import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Download } from 'lucide-react';
import { SectionHeader, Button } from '../components/ui';
import { downloadLocalFile } from './downloadLocalFile';
import './pages.css';

const interests = [
  { id: 'SECURITY_ASSESSMENT', label: 'Security assessment' },
  { id: 'BUSINESS', label: 'Business enquiry' },
  { id: 'PARTNERSHIP', label: 'Partnership discussion' },
  { id: 'GENERAL', label: 'General enquiry' },
  { id: 'MSME', label: 'MSME platform licensing' },
  { id: 'ENTERPRISE', label: 'Enterprise Rakshak AI licensing' },
  { id: 'RED_TEAM', label: 'Authorized red teaming' },
  { id: 'OSINT', label: 'External exposure & OSINT assessment' },
  { id: 'FORENSICS', label: 'Digital forensics & response planning' },
  { id: 'CUSTOM', label: 'Custom infrastructure requirements' },
];
const engagementOptions = [
  { id: 'SECURITY_ASSESSMENT', name: 'Security assessment', description: 'Understand authorized assets, exposure, and priorities.', topics: ['Goals and systems in scope', 'Ownership and test boundaries', 'Useful deliverables'] },
  { id: 'BUSINESS', name: 'Business enquiry', description: 'Discuss platform evaluation or a scoped security engagement.', topics: ['Organization requirements', 'Deployment constraints', 'Commercial discussion'] },
  { id: 'PARTNERSHIP', name: 'Partnership', description: 'Explore a potential technical or business collaboration.', topics: ['Proposed collaboration', 'Relevant capabilities', 'A practical next discussion'] },
  { id: 'GENERAL', name: 'General enquiry', description: 'Ask a non-sensitive question about CyberHiveX.', topics: ['Website or product question', 'Request a verified channel', 'No confidential incident evidence'] },
];
interface ContactForm { name: string; email: string; company: string; orgType: string; message: string }
type FieldKey = keyof ContactForm;
type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type FieldErrors = Partial<Record<FieldKey, string>>;
interface PreparedRequest extends ContactForm { interest: string; deliveryStatus: string }
type DeliveryState = 'idle' | 'loading' | 'success' | 'error';
const emptyForm: ContactForm = { name: '', email: '', company: '', orgType: 'SECURITY_ASSESSMENT', message: '' };
// Public configuration only. Delivery stays on the site's own origin.
const configuredEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT || '';
const contactEndpoint = /^\/(?!\/)[a-zA-Z0-9/_-]+$/.test(configuredEndpoint) ? configuredEndpoint : '';

function validateRequest(data: ContactForm): FieldErrors {
  const errors: FieldErrors = {};
  if (data.name.trim().length < 2) errors.name = 'Enter your full name (at least 2 characters).';
  if (!/^[^\s@]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(data.email.trim())) errors.email = 'Enter a valid email address.';
  if (data.company.trim() && data.company.trim().length < 2) errors.company = 'Enter an organization name of at least 2 characters, or leave it blank.';
  if (data.name.length > 120 || data.email.length > 254 || data.company.length > 180 || data.message.length > 3000) errors.message = 'Review the field length limits before preparing your request.';
  if (!interests.some((item) => item.id === data.orgType)) errors.orgType = 'Choose an area of interest.';
  if (data.message.trim().length < 10) errors.message = 'Describe your requirements in at least 10 characters.';
  return errors;
}

function requestText(request: PreparedRequest) {
  return [
    'CYBERHIVEX — LOCAL INQUIRY DRAFT',
    `Delivery status: ${request.deliveryStatus}`,
    '',
    `Name: ${request.name}`,
    `Email: ${request.email}`,
    `Organization: ${request.company}`,
    `Interest: ${request.interest}`,
    '',
    'Requirements:',
    request.message,
  ].join('\n');
}

export default function LicensingContactPage() {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [prepared, setPrepared] = useState<PreparedRequest | null>(null);
  const [status, setStatus] = useState('');
  const [delivery, setDelivery] = useState<DeliveryState>('idle');
  const [deliveryMessage, setDeliveryMessage] = useState('');
  const fieldRefs = useRef<Partial<Record<FieldKey, FieldElement | null>>>({});
  const pendingRequest = useRef<AbortController | null>(null);
  useEffect(() => () => pendingRequest.current?.abort(), []);

  const updateField = (key: FieldKey, value: string) => {
    setFormData((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
    setPrepared(null);
    setStatus('');
    setDelivery('idle');
    setDeliveryMessage('');
  };

  const sendRequest = async () => {
    if (!prepared || !contactEndpoint || pendingRequest.current) return;
    if (!navigator.onLine) {
      setDelivery('error');
      setDeliveryMessage('You appear to be offline. Your draft is not sent. Reconnect or download a copy.');
      return;
    }
    const controller = new AbortController();
    pendingRequest.current = controller;
    setDelivery('loading');
    setDeliveryMessage('Sending your request…');
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const { deliveryStatus: _localStatus, ...request } = prepared;
      const response = await fetch(contactEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        credentials: 'same-origin', redirect: 'error', signal: controller.signal, body: JSON.stringify(request),
      });
      if (!response.ok) throw new Error('delivery-failed');
      const receipt: unknown = await response.json();
      if (typeof receipt !== 'object' || receipt === null || !('success' in receipt) || receipt.success !== true) throw new Error('unconfirmed-delivery');
      setPrepared(current => current ? { ...current, deliveryStatus: 'Server receipt confirmed' } : null);
      setDelivery('success');
      setDeliveryMessage('The server confirmed receipt of your inquiry. No assessment has been scheduled yet.');
    } catch {
      setDelivery('error');
      setDeliveryMessage('Receipt could not be confirmed. The server may have received your request; no automatic retry was made. Download your draft or verify receipt before trying again.');
    } finally {
      window.clearTimeout(timeout);
      pendingRequest.current = null;
    }
  };

  const prepareRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateRequest(formData);
    setErrors(nextErrors);
    const invalidField = (Object.keys(nextErrors) as FieldKey[])[0];
    if (invalidField) {
      setPrepared(null);
      setStatus('Please review the highlighted fields. Nothing has been sent.');
      fieldRefs.current[invalidField]?.focus();
      return;
    }
    setPrepared({
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
      orgType: formData.orgType,
      interest: interests.find((item) => item.id === formData.orgType)?.label ?? 'General enquiry',
      message: formData.message.trim(),
      deliveryStatus: 'Local draft only — not sent',
    });
    setStatus('Your request is prepared locally. Nothing has been sent. You can download a copy below.');
  };

  const fieldAttributes = (key: FieldKey) => ({
    id: `contact-${key}`,
    name: key,
    value: formData[key],
    required: key !== 'company',
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `contact-${key}-error` : undefined,
    ref: (element: FieldElement | null) => { fieldRefs.current[key] = element; },
    onChange: (event: ChangeEvent<FieldElement>) => updateField(key, event.target.value),
  });
  const fieldError = (key: FieldKey) => errors[key] && <span id={`contact-${key}-error`} className="pg-field-error">{errors[key]}</span>;

  return (
    <div className="chx-pages pg-contact">
      <div className="cyber-container">
        <header className="pg-hero">
          <div className="pg-eyebrow">Assessment &amp; licensing</div>
          <h1>Understand your digital exposure.</h1>
          <p className="pg-lead">Outline your platform licensing or assessment requirements. Scope, deployment, support terms, and commercial details are determined through a separate agreed engagement.</p>
        </header>

        <section aria-label="Engagement interests">
          <SectionHeader number="01" eyebrow="Choose a starting point" title="What would you like to explore?" description="These are areas of interest, not fixed packages or service commitments." />
          <div className="pg-grid pg-enquiry-options">
            {engagementOptions.map((option) => (
              <article className={`pg-card pg-interest-card ${formData.orgType === option.id ? 'is-selected' : ''}`} key={option.id}>
                <h3>{option.name}</h3>
                <p>{option.description}</p>
                <ul className="pg-list">{option.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
                <Button type="button" variant="outline" disabled={delivery === 'loading'} aria-pressed={formData.orgType === option.id} onClick={() => updateField('orgType', option.id)}>{formData.orgType === option.id ? 'Selected interest' : `Select ${option.name.toLowerCase()}`}</Button>
              </article>
            ))}
          </div>
        </section>

        <section className="pg-section pg-contact-grid" aria-labelledby="contact-heading">
          <div className="pg-contact-intro">
            <div className="pg-eyebrow">Your inquiry</div>
            <h2 id="contact-heading">Start with your goals and scope.</h2>
            <p>Describe the environment you are responsible for, the questions you want answered, and any constraints. Red-team and active testing engagements require explicit authorization and documented scope.</p>
            <aside className="pg-facts" aria-label="Company details">
              <dl>
                <div><dt>Company</dt><dd>CyberHiveX Technologies</dd></div>
                <div><dt>Headquarters</dt><dd>Greater Noida, Uttar Pradesh, India</dd></div>
                <div><dt>Platform</dt><dd>Rakshak AI</dd></div>
              </dl>
            </aside>
          </div>

          <div className="pg-panel">
            <h3>Prepare your request</h3>
            <p className="pg-note">{contactEndpoint ? <><strong>Review before sending.</strong> Prepare your request, then choose Send request to submit it to CyberHiveX. Delivery is only confirmed after the server acknowledges receipt.</> : <><strong>Contact integration is not configured.</strong> This form prepares a local draft only. It does not send an email, create a support ticket, or schedule an assessment. You can review and download your request.</>}</p>
            <form className="pg-form" onSubmit={prepareRequest} noValidate>
              <fieldset className="pg-fields pg-fieldset" disabled={delivery === 'loading'}>
                <div className="pg-field">
                  <label htmlFor="contact-name">Full name <span aria-hidden="true">*</span></label>
                  <input {...fieldAttributes('name')} type="text" autoComplete="name" maxLength={120} />
                  {fieldError('name')}
                </div>
                <div className="pg-field">
                  <label htmlFor="contact-email">Email address <span aria-hidden="true">*</span></label>
                  <input {...fieldAttributes('email')} type="email" autoComplete="email" maxLength={254} />
                  {fieldError('email')}
                </div>
                <div className="pg-field">
                  <label htmlFor="contact-company">Organization (optional)</label>
                  <input {...fieldAttributes('company')} type="text" autoComplete="organization" maxLength={180} />
                  {fieldError('company')}
                </div>
                <div className="pg-field">
                  <label htmlFor="contact-orgType">Primary interest <span aria-hidden="true">*</span></label>
                  <select {...fieldAttributes('orgType')}>{interests.map((interest) => <option key={interest.id} value={interest.id}>{interest.label}</option>)}</select>
                  {fieldError('orgType')}
                </div>
                <div className="pg-field pg-field-wide">
                  <label htmlFor="contact-message">Requirements &amp; context <span aria-hidden="true">*</span></label>
                  <textarea {...fieldAttributes('message')} rows={5} minLength={10} maxLength={3000} placeholder="Describe your goals, systems in scope, and deployment requirements." />
                  {fieldError('message')}
                </div>
              </fieldset>
              <p className="pg-form-hint">Fields marked * are required. Keep credentials and confidential incident evidence out of this draft. {contactEndpoint ? 'Preparing a draft stays local. Sending shares these details with the configured site endpoint.' : 'Details stay in this page until you download them; they are not saved by the site.'}</p>
              <div className="pg-actions"><Button type="submit" className="btn-cyber-primary" disabled={delivery === 'loading'}>Prepare local request</Button></div>
              <p className="pg-form-hint" role="status">{status}</p>
            </form>
            {prepared && (
              <section className="pg-request-preview" aria-labelledby="request-preview-heading">
                <h3 id="request-preview-heading">Review your local draft</h3>
                <pre>{requestText(prepared)}</pre>
                <div className="pg-actions">
                  {contactEndpoint && <Button type="button" disabled={delivery === 'loading' || delivery === 'success'} onClick={sendRequest}>{delivery === 'loading' ? 'Sending…' : delivery === 'success' ? 'Receipt confirmed' : 'Send request'}</Button>}
                  <Button type="button" variant="outline" onClick={() => downloadLocalFile('cyberhivex-inquiry.txt', requestText(prepared))}><Download size={16} aria-hidden="true" /> Download .txt</Button>
                  <Button type="button" variant="outline" onClick={() => downloadLocalFile('cyberhivex-inquiry.json', JSON.stringify(prepared, null, 2), 'application/json')}><Download size={16} aria-hidden="true" /> Download .json</Button>
                </div>
                <p className="pg-form-hint" role={delivery === 'error' ? 'alert' : 'status'}>{deliveryMessage}</p>
              </section>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
