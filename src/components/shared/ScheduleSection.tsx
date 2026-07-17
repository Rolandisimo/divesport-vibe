import { useState, type ReactNode } from 'react';

interface TabLabels {
  eyebrow: string;
  title: string;
  tab: string;
}

interface CtaConfig {
  label: string;
  onClick: () => void;
}

interface ScheduleSectionProps {
  id?: string;
  hasUpcoming: boolean;
  hasPast: boolean;
  upcomingLabels: TabLabels;
  pastLabels: TabLabels;
  emptyUpcomingMessage: string;
  emptyPastMessage: string;
  /** Shown in the empty-upcoming state — e.g. "Contact us about courses". */
  contactCta: CtaConfig;
  /** Shown alongside contactCta in the empty-upcoming state — jumps to the Past tab. Only
   *  rendered if there's actually a past archive to jump to. */
  pastCtaLabel: string;
  renderUpcoming: () => ReactNode;
  renderPast: () => ReactNode;
}

/**
 * The shared "upcoming / past" tab-switcher shell used by both the Ceļojumi trips section
 * and the Kursi course-schedule section. The Upcoming tab is always shown (per the trips
 * behavior this was modeled on) — if there's nothing upcoming, it shows an empty state with
 * a contact CTA and, if there's a past archive, a shortcut to it — rather than disappearing.
 */
export function ScheduleSection({
  id,
  hasUpcoming,
  hasPast,
  upcomingLabels,
  pastLabels,
  emptyUpcomingMessage,
  emptyPastMessage,
  contactCta,
  pastCtaLabel,
  renderUpcoming,
  renderPast,
}: ScheduleSectionProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  if (!hasUpcoming && !hasPast) return null;

  const labels = activeTab === 'upcoming' ? upcomingLabels : pastLabels;

  return (
    <section className="section" id={id} style={{ paddingTop: 48 }}>
      <div className="section__inner">
        <p className="section__eyebrow">{labels.eyebrow}</p>
        <h2 className="section__title">{labels.title}</h2>

        <div className="schedule-tabs">
          <button
            type="button"
            className={`schedule-tab${activeTab === 'upcoming' ? ' active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            {upcomingLabels.tab}
          </button>
          <button
            type="button"
            className={`schedule-tab${activeTab === 'past' ? ' active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            {pastLabels.tab}
          </button>
        </div>

        {activeTab === 'upcoming' &&
          (hasUpcoming ? (
            renderUpcoming()
          ) : (
            <div className="schedule-empty">
              <p>{emptyUpcomingMessage}</p>
              <div className="schedule-empty__actions">
                <button type="button" className="btn btn--solid" onClick={contactCta.onClick}>
                  {contactCta.label}
                </button>
                {hasPast && (
                  <button type="button" className="btn btn--ghost" onClick={() => setActiveTab('past')}>
                    {pastCtaLabel}
                  </button>
                )}
              </div>
            </div>
          ))}

        {activeTab === 'past' &&
          (hasPast ? (
            renderPast()
          ) : (
            <div className="schedule-empty">
              <p>{emptyPastMessage}</p>
            </div>
          ))}
      </div>
    </section>
  );
}
