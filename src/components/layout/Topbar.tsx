import { useLang } from '@/context/LangContext';
import { LangSwitcher } from './LangSwitcher';
import type { Slug } from '@/types/content';

export function Topbar({ currentSlug }: { currentSlug: Slug }) {
  const { content } = useLang();

  return (
    <div className="topbar">
      <div className="topbar__inner">
        <div className="topbar__contact">
          <a href={`tel:${content.contactInfo.phone.replace(/\s/g, '')}`}>{content.contactInfo.phone}</a>
          <span className="dot">·</span>
          <a href={`mailto:${content.contactInfo.email}`}>{content.contactInfo.email}</a>
        </div>
        <div className="topbar__right" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="topbar__social">
            <a href="https://www.facebook.com/divinglatvia/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              FB
            </a>
            <a href="https://www.instagram.com/divesport/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              IG
            </a>
            <a
              href="https://www.youtube.com/channel/UCBKWVcXiG8IjdEr9qEJiuAQ"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              YT
            </a>
          </div>
          <LangSwitcher currentSlug={currentSlug} />
        </div>
      </div>
    </div>
  );
}
