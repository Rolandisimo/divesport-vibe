import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLang } from '@/context/LangContext';
import { useWeb3FormsSubmit } from '@/hooks/useWeb3FormsSubmit';

const WEB3FORMS_ACCESS_KEY = 'cd60fdfe-806c-4a06-854b-8ad6852cfef9';

export interface BookingRequest {
  /** The course's booking value, e.g. "PADI Open Water Diver (400 €)" */
  course: string;
  /** Increments on every click so the same course can be re-selected and still re-trigger the effect. */
  nonce: number;
}

interface ContactFormProps {
  /** A short, distinct label sent as the Web3Forms "from_name" so submissions are easy to tell apart in the inbox. */
  fromName: string;
  /** When present, renders the Course + Preferred date fields and the course <select>. */
  courseOptions?: string[];
  /** Set by a parent page when a course card's booking button is clicked. */
  bookingRequest?: BookingRequest | null;
  /** Gives the wrapping <section> an id so booking buttons can scroll to it. */
  sectionId?: string;
}

export function ContactForm({ fromName, courseOptions, bookingRequest, sectionId }: ContactFormProps) {
  const { content } = useLang();
  const { form: labels } = content;
  const { status, submit } = useWeb3FormsSubmit(WEB3FORMS_ACCESS_KEY);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState(labels.categoryOptions[0]);
  const [course, setCourse] = useState('');
  const [startDate, setStartDate] = useState('');
  const [message, setMessage] = useState('');
  const [botcheck, setBotcheck] = useState(false);
  const [errorText, setErrorText] = useState('');

  const nameInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Reset the localized default category whenever the language changes.
  useEffect(() => {
    setCategory((prev) => (labels.categoryOptions.includes(prev) ? prev : labels.categoryOptions[0]));
  }, [labels.categoryOptions]);

  // Prefill from a course booking click, then scroll to this form and focus Name.
  useEffect(() => {
    if (!bookingRequest) return;
    setCategory(labels.courseCategoryValue);
    setCourse(bookingRequest.course);
    setMessage(labels.courseTemplate(bookingRequest.course));
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const timer = setTimeout(() => nameInputRef.current?.focus(), 450);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingRequest]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (botcheck) return; // honeypot tripped; silently drop

    if (!name || !email || !message) {
      setErrorText(labels.requiredFieldsError);
      return;
    }

    const payload: Record<string, string> = { from_name: fromName, name, email, category, message };
    if (courseOptions) {
      payload.course = course;
      payload.start_date = startDate;
    }

    const result = await submit(payload);
    if (result.success) {
      setName('');
      setEmail('');
      setCourse('');
      setStartDate('');
      setMessage('');
      setErrorText('');
    } else if (result.message === 'missing-key') {
      setErrorText(labels.missingKeyError);
    } else if (result.message === 'network') {
      setErrorText(labels.networkError);
    } else {
      setErrorText(result.message ?? labels.genericError);
    }
  }

  const isSending = status === 'sending';

  return (
    <div className="form-wrap" id={sectionId} ref={sectionRef}>
      <div className="form__banner" role="status" aria-live="polite">
        {status === 'success' ? labels.successMessage : ''}
      </div>
      <div className="form__banner form__banner--error" role="alert" aria-live="assertive">
        {status === 'error' ? errorText || labels.genericError : ''}
      </div>

      <form className="form" onSubmit={handleSubmit}>
        {/* Honeypot: invisible to real visitors; bots that fill every field trip it. */}
        <input
          type="checkbox"
          name="botcheck"
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
          checked={botcheck}
          onChange={(e) => setBotcheck(e.target.checked)}
        />

        <div className="form__row">
          <label htmlFor="name">{labels.name}</label>
          <input
            type="text"
            id="name"
            required
            ref={nameInputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form__row">
          <label htmlFor="email">{labels.email}</label>
          <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form__row">
          <label htmlFor="category">{labels.category}</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {labels.categoryOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {courseOptions && (
          <>
            <div className="form__row">
              <label htmlFor="course">{labels.course}</label>
              <select id="course" value={course} onChange={(e) => setCourse(e.target.value)}>
                <option value="">{labels.coursePlaceholder}</option>
                {courseOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="form__row">
              <label htmlFor="start_date">
                {labels.startDate} <span className="form__optional">{labels.startDateHint}</span>
              </label>
              <input type="date" id="start_date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
          </>
        )}

        <div className="form__row">
          <label htmlFor="message">{labels.message}</label>
          <textarea id="message" rows={5} required value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>

        <button type="submit" className="btn btn--solid btn--full" disabled={isSending}>
          {isSending ? labels.submitSending : labels.submit}
        </button>
      </form>
    </div>
  );
}
