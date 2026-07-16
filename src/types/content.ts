export type Lang = 'lv' | 'ru';

export interface NavChild {
  label: string;
  slug: Slug;
}

export interface NavItem {
  label: string;
  slug: Slug;
  children?: NavChild[];
}

export interface TeamMember {
  name: string;
  photoUrl: string;
  certs: string[];
  quote: string;
  extra?: string;
}

export interface Course {
  tag: string;
  tagVariant?: 'default' | 'popular';
  title: string;
  description: string;
  price: string; // e.g. "400 €"
  /** Value stored in the course <select>; must be unique per course. */
  bookingValue: string; // e.g. "PADI Open Water Diver (400 €)"
}

export interface CourseTier {
  title: string;
  courses: Course[];
}

export interface Destination {
  name: string;
  imageUrl: string;
}

export interface GalleryPhoto {
  imageUrl: string;
  caption?: string;
}

export interface QuickPath {
  icon: string;
  title: string;
  description: string;
  slug: Slug;
}

export interface RepairItem {
  text: string;
}

export interface PriceRow {
  label: string;
  price: string;
}

export interface BadgeCard {
  iconUrl: string;
  title: string;
  description: string;
  slug: Slug;
  ctaLabel: string;
}

/** Every distinct "kind" of page in the site, shared across both languages. */
export type Slug =
  | 'home'
  | 'par-mums'
  | 'apmaciba'
  | 'apmaciba-kursi'
  | 'apmaciba-specializacijas'
  | 'apmaciba-tehniska-nirsana'
  | 'apmaciba-instruktoru-kursi'
  | 'celojumi'
  | 'celojumi-foto'
  | 'inventars'
  | 'inventars-noma'
  | 'inventars-remonts'
  | 'inventars-balonu-uzpildisana'
  | 'kontakti';

export interface FormLabels {
  name: string;
  email: string;
  category: string;
  categoryOptions: string[];
  /** The category option that should be preselected when arriving via a course booking button. */
  courseCategoryValue: string;
  course: string;
  coursePlaceholder: string;
  startDate: string;
  startDateHint: string;
  message: string;
  submit: string;
  submitSending: string;
  successMessage: string;
  genericError: string;
  networkError: string;
  missingKeyError: string;
  requiredFieldsError: string;
  courseTemplate: (course: string) => string;
  /** The category option that should be preselected when arriving via a trip booking button. */
  tripCategoryValue: string;
  tripTemplate: (tripTitle: string) => string;
}

export interface SiteContent {
  lang: Lang;
  meta: Record<Slug, { title: string; description: string }>;
  nav: NavItem[];
  langSwitcherOtherLabel: string;
  footer: {
    blogLabel: string;
    copyright: string;
  };
  breadcrumbHome: string;
  contactInfo: {
    address: string;
    phone: string;
    email: string;
    instructor: string;
  };
  form: FormLabels;
  home: {
    heroEyebrow: string;
    heroTitleLines: string[];
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    quickPathsTitle: string;
    quickPathsSubtitle: string;
    quickPaths: QuickPath[];
    aboutEyebrow: string;
    aboutTitle: string;
    aboutText: string;
    aboutCta: string;
    team: TeamMember[];
    coursesEyebrow: string;
    coursesTitle: string;
    coursesText: string;
    badgeCards: BadgeCard[];
    travelEyebrow: string;
    travelTitle: string;
    travelText: string;
    travelCtaPrimary: string;
    travelCtaSecondary: string;
    travelImages: string[];
    gearEyebrow: string;
    gearTitle: string;
    gearCards: { title: string; description?: string; items?: string[]; slug: Slug }[];
    galleryEyebrow: string;
    galleryTitle: string;
    galleryPhotos: GalleryPhoto[];
    galleryNote: string;
    contactEyebrow: string;
    contactTitle: string;
    contactText: string;
  };
  about: {
    heroTitle: string;
    heroLede: string;
    intro: string;
    team: TeamMember[];
    galleryPhotos: GalleryPhoto[];
  };
  apmacibaHub: {
    heroTitle: string;
    heroLede: string;
    cards: BadgeCard[];
  };
  apmacibaKursi: {
    heroTitle: string;
    heroLede: string;
    tiers: CourseTier[];
    bookButtonLabel: string;
    bookingEyebrow: string;
    bookingTitle: string;
    bookingText: string;
    bookingNote: string;
    subnav: NavChild[];
  };
  apmacibaSpecializacijas: {
    heroTitle: string;
    heroLede: string;
    intro: string;
    specialties: { title: string; description: string }[];
    note: string;
    cta: string;
    subnav: NavChild[];
  };
  apmacibaTehniskaNirsana: {
    heroTitle: string;
    heroLede: string;
    paragraphs: string[];
    cta: string;
    instructor: TeamMember;
    subnav: NavChild[];
  };
  apmacibaInstruktoruKursi: {
    heroTitle: string;
    heroLede: string;
    paragraphs: string[];
    cta: string;
    subnav: NavChild[];
  };
  celojumiHub: {
    heroTitle: string;
    heroLede: string;
    tripBookButtonLabel: string;
    bookingEyebrow: string;
    bookingTitle: string;
    bookingText: string;
  };
  celojumiFoto: {
    heroTitle: string;
    heroLede: string;
    destinations: Destination[];
    note: string;
  };
  inventarsHub: {
    heroTitle: string;
    heroLede: string;
    cards: BadgeCard[];
  };
  inventarsNoma: {
    heroTitle: string;
    heroLede: string;
    paragraphs: string[];
    cta: string;
    subnav: NavChild[];
  };
  inventarsRemonts: {
    heroTitle: string;
    heroLede: string;
    items: RepairItem[];
    cta: string;
    subnav: NavChild[];
  };
  inventarsBalonuUzpildisana: {
    heroTitle: string;
    heroLede: string;
    rows: PriceRow[];
    note: string;
    subnav: NavChild[];
  };
  kontakti: {
    heroTitle: string;
    heroLede: string;
  };
}
