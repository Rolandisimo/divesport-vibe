import { useLang } from '@/context/LangContext';
import { LangSwitcher } from './LangSwitcher';
import { SocialLinks } from '@/components/shared/SocialLinks';
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
            <SocialLinks variant="compact" />
          </div>
          <LangSwitcher currentSlug={currentSlug} />
        </div>
      </div>
    </div>
  );
}
