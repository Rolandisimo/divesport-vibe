import { useLang } from '@/context/LangContext';

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
          <a href="https://www.facebook.com/divinglatvia/" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="https://www.instagram.com/divesport/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="https://www.youtube.com/channel/UCBKWVcXiG8IjdEr9qEJiuAQ" target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          <a href="http://divesport.blogspot.com" target="_blank" rel="noopener noreferrer">
            {content.footer.blogLabel}
          </a>
        </div>
        <p className="footer__copy">
          © {year} {content.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
