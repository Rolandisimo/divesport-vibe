import { useLang } from '@/context/LangContext';

export function ContactDetails() {
  const { lang, content } = useLang();
  const { contactInfo } = content;

  const labels =
    lang === 'ru'
      ? { address: 'Адрес', phone: 'Телефон', email: 'Эл. почта', instructor: 'Инструктор' }
      : { address: 'Adrese', phone: 'Tālrunis', email: 'E-pasts', instructor: 'Instruktors' };

  return (
    <>
      <ul className="contact-info">
        <li>
          <span>{labels.address}</span> {contactInfo.address}
        </li>
        <li>
          <span>{labels.phone}</span> <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>{contactInfo.phone}</a>
        </li>
        <li>
          <span>{labels.email}</span> <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
        </li>
        <li>
          <span>{labels.instructor}</span> {contactInfo.instructor}
        </li>
      </ul>

      <div className="map">
        <iframe
          src="https://maps.google.com/maps?q=Stiebru%20iela%2015%2C%20Me%C5%BE%C4%81res%2C%20Bab%C4%ABtes%20pagasts%2C%20LV-2101&t=m&z=13&output=embed"
          width="100%"
          height="260"
          style={{ border: 0 }}
          loading="lazy"
          title="Divesport karte"
        />
      </div>
    </>
  );
}
