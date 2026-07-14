import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useLang } from './LangContext';

interface LightboxImage {
  url: string;
  caption?: string;
}

interface LightboxContextValue {
  open: (image: LightboxImage) => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const { lang } = useLang();
  const [image, setImage] = useState<LightboxImage | null>(null);

  useEffect(() => {
    document.body.classList.toggle('lightbox-open', image !== null);
  }, [image]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setImage(null);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const closeLabel = lang === 'ru' ? 'Закрыть' : 'Aizvērt';

  return (
    <LightboxContext.Provider value={{ open: setImage }}>
      {children}
      <div className={`lightbox${image ? ' open' : ''}`} onClick={(e) => e.target === e.currentTarget && setImage(null)}>
        <button type="button" className="lightbox__close" aria-label={closeLabel} onClick={() => setImage(null)}>
          ✕
        </button>
        <div className="lightbox__frame">
          {image && <img className="lightbox__img" src={image.url} alt={image.caption ?? ''} />}
        </div>
        <p className="lightbox__caption">{image?.caption}</p>
      </div>
    </LightboxContext.Provider>
  );
}

export function useLightbox(): LightboxContextValue {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error('useLightbox must be used within a LightboxProvider');
  return ctx;
}
