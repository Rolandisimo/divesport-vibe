import type { ComponentType, SVGProps } from 'react';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M15 8.5h2V5.6h-2c-2 0-3.5 1.6-3.5 3.5v1.9H9.5v3H11.5V19h3v-6h2l.5-3h-2.5V9.6c0-.6.4-1.1 1-1.1z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" stroke="currentColor" strokeWidth={1.8} />
      <path d="M10 9.2l5.5 2.8-5.5 2.8V9.2z" fill="currentColor" />
    </svg>
  );
}

export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14.5 3h2.2c.2 1.5 1.2 2.8 2.8 3.2v2.3a5.9 5.9 0 0 1-2.8-.8v5.8a4.9 4.9 0 1 1-4.9-4.9c.2 0 .4 0 .6.03v2.3a2.6 2.6 0 1 0 2.1 2.55V3z" />
    </svg>
  );
}

export function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" fill="none" stroke="currentColor" strokeWidth={1.8} />
      <circle cx="8.2" cy="8.6" r="1.1" />
      <path d="M7.2 11h2v6.2h-2zM11 11h1.9v1.1c.4-.6 1.2-1.3 2.4-1.3 1.9 0 2.7 1.2 2.7 3v3.4h-2v-3c0-.8-.3-1.4-1.1-1.4-.8 0-1.3.5-1.3 1.4v3h-2z" />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 3a8.5 8.5 0 0 0-7.3 12.9L3.5 20l4.2-1.2A8.5 8.5 0 1 0 12 3zm0 2a6.5 6.5 0 1 1-3.4 12l-.3-.2-2.5.7.7-2.5-.2-.3A6.5 6.5 0 0 1 12 5zm-2 2.7c-.2 0-.4 0-.6.3-.2.2-.8.8-.8 2s.8 2.2 1 2.4c.1.1 1.6 2.6 4 3.6 2 .8 2.4.7 2.8.6.5-.1 1.5-.6 1.7-1.2.2-.5.2-1 .1-1.1-.1-.1-.3-.2-.5-.3l-1.8-.9c-.2-.1-.4-.1-.5.1-.2.2-.6.9-.8 1-.2.2-.3.2-.6.1-.3-.2-1.1-.4-2-1.3-.8-.7-1.3-1.5-1.4-1.8-.1-.2 0-.4.1-.5l.4-.5c.1-.1.1-.3 0-.4l-.8-1.9c-.2-.4-.4-.4-.5-.4z" />
    </svg>
  );
}

export function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.5 4L3.5 10.8l5 1.7 1.7 5.3 2.2-3.4 4.3 3.2L20.5 4z" />
    </svg>
  );
}

export function PinterestIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth={1.8} />
      <path d="M10.3 16.5L12 9.8M9.8 12.3a2.4 2.4 0 1 1 4 1.6c-.3.6-.9 1-1.6 1" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
    </svg>
  );
}

/** Domain patterns matched against a link's URL, checked in order — the first match wins. */
const ICON_MATCHERS: { pattern: RegExp; Icon: IconComponent }[] = [
  { pattern: /facebook\.com/i, Icon: FacebookIcon },
  { pattern: /instagram\.com/i, Icon: InstagramIcon },
  { pattern: /(youtube\.com|youtu\.be)/i, Icon: YouTubeIcon },
  { pattern: /tiktok\.com/i, Icon: TikTokIcon },
  { pattern: /(twitter\.com|x\.com)/i, Icon: XIcon },
  { pattern: /linkedin\.com/i, Icon: LinkedInIcon },
  { pattern: /(wa\.me|whatsapp\.com)/i, Icon: WhatsAppIcon },
  { pattern: /t\.me/i, Icon: TelegramIcon },
  { pattern: /pinterest\.com/i, Icon: PinterestIcon },
];

/** Returns the matching icon component for a social link's URL, or null if it's not one of
 *  the recognized standard platforms — callers should fall back to plain text in that case. */
export function getSocialIcon(url: string): IconComponent | null {
  return ICON_MATCHERS.find((m) => m.pattern.test(url))?.Icon ?? null;
}
