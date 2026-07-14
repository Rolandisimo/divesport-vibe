import { useLightbox } from '@/context/LightboxContext';
import type { GalleryPhoto } from '@/types/content';

export function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const lightbox = useLightbox();

  return (
    <div className="gallery">
      {photos.map((photo) => (
        <div
          key={photo.imageUrl}
          className="gallery__item"
          style={{ backgroundImage: `url('${photo.imageUrl}')` }}
          role="button"
          tabIndex={0}
          onClick={() => lightbox.open({ url: photo.imageUrl, caption: photo.caption })}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              lightbox.open({ url: photo.imageUrl, caption: photo.caption });
            }
          }}
        />
      ))}
    </div>
  );
}
