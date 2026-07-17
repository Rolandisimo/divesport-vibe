import { useSocialLinks } from '@/hooks/useSocialLinks';
import { getSocialIcon } from '@/components/icons/SocialIcons';

interface SocialLinksProps {
  /** compact: icon only when matched (topbar). full: icon + title always shown (footer). */
  variant: 'compact' | 'full';
}

export function SocialLinks({ variant }: SocialLinksProps) {
  const links = useSocialLinks();

  return (
    <>
      {links.map((link) => {
        const Icon = getSocialIcon(link.url);
        return (
          <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.title} className="social-link" key={link.url}>
            {Icon && <Icon className="social-link__icon" />}
            {(variant === 'full' || !Icon) && <span>{link.title}</span>}
          </a>
        );
      })}
    </>
  );
}
