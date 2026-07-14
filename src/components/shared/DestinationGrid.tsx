import { useLightbox } from '@/context/LightboxContext';
import type { Destination } from '@/types/content';

export function DestinationGrid({ destinations }: { destinations: Destination[] }) {
  const lightbox = useLightbox();

  return (
    <div className="dest-grid">
      {destinations.map((dest) => (
        <div
          key={dest.name}
          className="dest-card"
          style={{ backgroundImage: `url('${dest.imageUrl}')` }}
          role="button"
          tabIndex={0}
          onClick={() => lightbox.open({ url: dest.imageUrl, caption: dest.name })}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              lightbox.open({ url: dest.imageUrl, caption: dest.name });
            }
          }}
        >
          <span>{dest.name}</span>
        </div>
      ))}
    </div>
  );
}
