import { useLang } from '@/context/LangContext';
import { SocialLinks } from '@/components/shared/SocialLinks';

export function Footer() {
  const { content } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          DIVE<span>SPORT</span>
        </div>
        <div className="footer__social">
          <SocialLinks variant="full" />
        </div>
        <p className="footer__copy">
          © {year} {content.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
