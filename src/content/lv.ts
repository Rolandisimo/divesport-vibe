import type { SiteContent } from '@/types/content';

const ALEKSEJS_PHOTO =
  'https://www.divesport.lv/wp-content/uploads/2018/03/28471732_10211943317674024_4428251208978217532_n-288x300.jpg';
const LIENE_PHOTO =
  'https://www.divesport.lv/wp-content/uploads/2018/03/16363_442442555824078_915371131_n-150x150.jpg';

const aleksejs = {
  name: 'Aleksejs Kravčuks',
  photoUrl: ALEKSEJS_PHOTO,
  certs: ['PADI Master Scuba Diver Trainer #627929', 'IANTD Normoxic Trimix Instructor Trainer #7428'],
  quote:
    'Jau daudzu gadu garumā es apmācu cilvēkus peldēt ar akvalangu, iepazīstinu viņus ar citu mūsu planētas pasauli — noslēpumainu, klusu, kas pārsteidz ar savu lieliskumu.',
  extra: 'Blogs: divesport.blogspot.com',
};

const liene = {
  name: 'Liene Klementjeva',
  photoUrl: LIENE_PHOTO,
  certs: ['Divemaster IANTD'],
  quote:
    'Ceļojumos mēs varam ne tikai atpūsties un izzināt jaunas zemes, bet arī bagātināt savu pieredzi. Man patīk maršruti, kas iziet ārpus iestaigātās tūrista takas — ar vietējo palīdzību var atrast īstas, neskartas pērles.',
};

const lv: SiteContent = {
  lang: 'lv',
  meta: {
    home: { title: 'Divesport — Niršanas klubs Latvijā', description: 'Divesport — niršanas klubs Latvijā kopš 2003. gada.' },
    'par-mums': { title: 'Par mums — Divesport', description: 'Par Divesport niršanas klubu — dibināts 2003. gadā.' },
    apmaciba: { title: 'Apmācība — Divesport', description: 'Niršanas apmācība visiem līmeņiem.' },
    'apmaciba-kursi': { title: 'Kursi — Divesport', description: 'PADI un IANTD kursi Divesport klubā.' },
    'apmaciba-specializacijas': { title: 'Specializācijas — Divesport', description: 'Niršanas specializācijas.' },
    'apmaciba-tehniska-nirsana': { title: 'Tehniskā niršana — Divesport', description: 'IANTD trimix apmācība.' },
    'apmaciba-instruktoru-kursi': { title: 'Instruktoru kursi — Divesport', description: 'Kļūsti par instruktoru.' },
    celojumi: { title: 'Ceļojumi — Divesport', description: 'Niršanas ceļojumi visā pasaulē.' },
    'celojumi-foto': { title: 'Foto — Divesport', description: 'Fotogrāfijas no ceļojumiem.' },
    inventars: { title: 'Inventārs — Divesport', description: 'Noma, remonts, balonu uzpilde.' },
    'inventars-noma': { title: 'Inventāra noma — Divesport', description: 'Pilna niršanas aprīkojuma noma.' },
    'inventars-remonts': { title: 'Remonts — Divesport', description: 'Niršanas inventāra remonts.' },
    'inventars-balonu-uzpildisana': { title: 'Balonu uzpildīšana — Divesport', description: 'Gaisa un nitrox uzpilde.' },
    kontakti: { title: 'Kontakti — Divesport', description: 'Divesport kontaktinformācija.' },
  },
  nav: [
    { label: 'Par mums', slug: 'par-mums' },
    {
      label: 'Apmācība',
      slug: 'apmaciba',
      children: [
        { label: 'Kursi', slug: 'apmaciba-kursi' },
        { label: 'Specializācijas', slug: 'apmaciba-specializacijas' },
        { label: 'Tehniskā niršana', slug: 'apmaciba-tehniska-nirsana' },
        { label: 'Instruktoru kursi', slug: 'apmaciba-instruktoru-kursi' },
      ],
    },
    { label: 'Ceļojumi', slug: 'celojumi', children: [{ label: 'Foto', slug: 'celojumi-foto' }] },
    {
      label: 'Inventārs',
      slug: 'inventars',
      children: [
        { label: 'Inventāra noma', slug: 'inventars-noma' },
        { label: 'Remonts', slug: 'inventars-remonts' },
        { label: 'Balonu uzpildīšana', slug: 'inventars-balonu-uzpildisana' },
      ],
    },
    { label: 'Kontakti', slug: 'kontakti' },
  ],
  langSwitcherOtherLabel: 'RU',
  footer: { blogLabel: 'Blogs', copyright: 'Divesport. Visas tiesības aizsargātas.' },
  breadcrumbHome: 'Divesport',
  contactInfo: {
    address: 'Stiebru iela 15, Mežāres, Babītes pagasts, LV-2101',
    phone: '+371 292 84178',
    email: 'divesport.lv@gmail.com',
    instructor: 'Aleksejs Kravčuks — PADI MSDT, EFR, IANTD Instructor Trainer (Normoxic Trimix)',
  },
  form: {
    name: 'Vārds',
    email: 'E-pasts',
    category: 'Pieprasījuma veids',
    categoryOptions: ['Kursi', 'Ceļojumi', 'Inventārs', 'Cits jautājums'],
    courseCategoryValue: 'Kursi',
    course: 'Kurss',
    coursePlaceholder: '— Izvēlies kursu —',
    startDate: 'Vēlamais sākuma datums',
    startDateHint: '(nav obligāts, bet ieteicams)',
    message: 'Ziņa',
    submit: 'Nosūtīt pieteikumu',
    submitSending: 'Sūta...',
    successMessage: 'Paldies! Ziņa nosūtīta — atbildēsim tuvākajā laikā.',
    genericError: 'Neizdevās nosūtīt. Pamēģini vēlreiz vai raksti tieši uz e-pastu.',
    networkError: 'Nav interneta savienojuma vai serveris nav sasniedzams. Pamēģini vēlreiz.',
    missingKeyError: 'Forma vēl nav pievienota Web3Forms — pievieno savu access_key vērtību.',
    requiredFieldsError: 'Lūdzu, aizpildi visus obligātos laukus.',
    courseTemplate: (course) =>
      `Interesē kurss: ${course}. Lūdzu, sazinieties ar mani, lai pārrunātu pieejamos datumus.`,
  },
  home: {
    heroEyebrow: 'Niršanas klubs · kopš 2003',
    heroTitleLines: ['Niršanas kursi', 'Zemūdens darbi', 'Ceļojumi', 'Inventāra noma un apkalpošana'],
    heroCtaPrimary: 'Sākt apmācību',
    heroCtaSecondary: 'Sazināties',
    quickPathsTitle: 'Ko meklē?',
    quickPathsSubtitle: '2003 · PADI MSDT · IANTD Trimix instruktori',
    quickPaths: [
      { icon: '🎓', title: 'Sāc nirt', description: 'No pirmās ieniršanas līdz sertifikātam', slug: 'apmaciba-kursi' },
      { icon: '✈️', title: 'Ceļo ar mums', description: 'Niršanas ceļojumi visā pasaulē', slug: 'celojumi' },
      { icon: '🛠️', title: 'Inventārs', description: 'Noma, remonts, balonu uzpilde', slug: 'inventars' },
      { icon: '📞', title: 'Sazinies', description: 'Jautājumi? Atbildēsim ātri', slug: 'kontakti' },
    ],
    aboutEyebrow: 'Par klubu',
    aboutTitle: 'Kopš 2003. gada zem virsmas',
    aboutText:
      'Niršanas klubs DIVESPORT uzsāka darbu 2003. gadā un kopš tā laika ir iepazīstinājis desmitiem cilvēku ar klusu, noslēpumainu pasauli zem ūdens. Strādājam gan ar tiem, kas nirst pirmo reizi, gan ar pieredzējušiem daiveriem, kuri virzās uz tehnisko niršanu un trimix sertifikātiem.',
    aboutCta: 'Vairāk par klubu un komandu',
    team: [aleksejs, liene],
    coursesEyebrow: '18m · atklātā ūdens robeža',
    coursesTitle: 'Apmācība',
    coursesText: 'Kursi iesācējiem un pieredzējušiem daiveriem — no pirmā elpas vilciena zem ūdens līdz instruktora sertifikātam.',
    badgeCards: [
      {
        iconUrl: 'https://www.divesport.lv/wp-content/uploads/2018/02/Bronze-Medal-s-maskoj-2.png',
        title: 'Kursi',
        description: 'Pamata sertifikācijas kursi tiem, kas tikai sāk savu ceļu niršanas pasaulē.',
        slug: 'apmaciba-kursi',
        ctaLabel: 'Skatīt kursus',
      },
      {
        iconUrl: 'https://www.divesport.lv/wp-content/uploads/2018/02/Serebro-s-maskoj-2.png',
        title: 'Specializācijas',
        description: 'Padziļinātas iemaņas — nakts niršana, navigācija, vraku niršana un citas jomas.',
        slug: 'apmaciba-specializacijas',
        ctaLabel: 'Uzzināt vairāk',
      },
      {
        iconUrl: 'https://www.divesport.lv/wp-content/uploads/2018/03/Golden-Medal-sparka.png',
        title: 'Tehniskā niršana',
        description: 'Trimix un dekompresijas niršana pieredzējušiem daiveriem, kas grib doties dziļāk un ilgāk.',
        slug: 'apmaciba-tehniska-nirsana',
        ctaLabel: 'Uzzināt vairāk',
      },
      {
        iconUrl: 'https://www.divesport.lv/wp-content/uploads/2018/03/Silver-Medal-IANTD.png',
        title: 'Instruktoru kursi',
        description: 'Kļūsti par sertificētu instruktoru un māci citus atklāt zemūdens pasauli.',
        slug: 'apmaciba-instruktoru-kursi',
        ctaLabel: 'Uzzināt vairāk',
      },
    ],
    travelEyebrow: '30m · rekreatīvās niršanas robeža',
    travelTitle: 'Ceļojumi',
    travelText:
      'Organizējam niršanas ceļojumus un ar daivingu saistītus pasākumus visā pasaulē. Mēs neapstājamies pie pazīstamākajām vietām — ar vietējo iedzīvotāju palīdzību meklējam maršrutus, kas atklāj gan neskartu dabu, gan vietējo kultūru un sadzīvi.',
    travelCtaPrimary: 'Uzzināt par tuvākajiem ceļojumiem',
    travelCtaSecondary: 'Skatīt foto pa galamērķiem',
    travelImages: [
      'https://www.divesport.lv/wp-content/uploads/2018/04/IMG_9549-1-900x370.jpg',
      'https://www.divesport.lv/wp-content/uploads/2018/04/IMG_1448-1-900x370.jpg',
      'https://www.divesport.lv/wp-content/uploads/2018/04/P1155193-1-900x370.jpg',
    ],
    gearEyebrow: '40m · trimix robeža',
    gearTitle: 'Inventārs',
    gearCards: [
      {
        title: 'Inventāra noma',
        description: 'Pilns komplekts niršanas aprīkojuma nomai — no pirmās nirtes līdz tehniskajai konfigurācijai.',
        slug: 'inventars-noma',
      },
      {
        title: 'Remonts un apkalpošana',
        items: [
          'Sauso tērpu remonts — aproces, rāvējslēdzēji, boti, hermētiskuma pārbaude',
          'Vārstu remonts, sauso cimdu uzstādīšana',
          'Regulatoru un peldspējas kompensatoru ikgadēja apkalpošana',
          'Slapjo tērpu remonts',
          'Balonu pārbaude un hidrotests, ventiļu remonts',
          'Augstspiediena kompresoru remonts un apkalpošana',
          'Barošanas bateriju nomaiņa niršanas datoros',
        ],
        slug: 'inventars-remonts',
      },
      {
        title: 'Balonu uzpildīšana',
        description: 'Gaisa un nitrox balonu uzpildīšana klubā uz vietas.',
        slug: 'inventars-balonu-uzpildisana',
      },
    ],
    galleryEyebrow: 'Galerija',
    galleryTitle: 'Kadri no dzelmes',
    galleryPhotos: [
      { imageUrl: 'https://www.divesport.lv/wp-content/uploads/2019/03/divesport-sl2-960x395.jpg' },
      { imageUrl: 'https://www.divesport.lv/wp-content/uploads/2018/04/IMG_9549-1-900x370.jpg' },
      { imageUrl: 'https://www.divesport.lv/wp-content/uploads/2018/04/IMG_1448-1-900x370.jpg' },
      { imageUrl: 'https://www.divesport.lv/wp-content/uploads/2018/04/P1155193-1-900x370.jpg' },
      { imageUrl: 'https://www.divesport.lv/wp-content/uploads/2019/03/22095860_1896830913674661_2776940025745771315_o-1280x527.jpg' },
      { imageUrl: 'https://www.divesport.lv/wp-content/uploads/2018/02/obuchenie-3.jpg' },
      { imageUrl: 'https://www.divesport.lv/wp-content/uploads/2018/02/puteshestvija-1.jpg' },
      { imageUrl: 'https://www.divesport.lv/wp-content/uploads/2019/03/equipment1.png' },
    ],
    galleryNote: 'Vēlas pievienot vairāk bilžu — vienkārši nomaini attēlu adreses satura failā ar savām jaunajām fotogrāfijām.',
    contactEyebrow: 'Kontakti',
    contactTitle: 'Runāsim par nirumu',
    contactText: 'Zvani, raksti vai aizpildi formu — atbildēsim ātri.',
  },
  about: {
    heroTitle: 'Par klubu',
    heroLede: 'Daivinga klubs DIVESPORT uzsāka darbu 2003. gadā.',
    intro:
      'Kopš dibināšanas esam iepazīstinājuši desmitiem cilvēku ar klusu, noslēpumainu pasauli zem ūdens — no pirmās izmēģinājuma ieniršanas līdz instruktora sertifikātam. Strādājam gan ar tiem, kas nirst pirmo reizi, gan ar pieredzējušiem daiveriem, kuri virzās uz tehnisko niršanu un trimix sertifikātiem.',
    team: [
      { ...aleksejs, extra: 'Alekseja blogs: divesport.blogspot.com' },
      {
        ...liene,
        quote:
          'Ceļojumos mēs varam ne tikai pilnvērtīgi atpūsties un izzināt jaunas zemes, bet arī bagātināt savu pieredzi un iekšējo pasauli. Man patīk organizēt ceļojumu maršrutus, kas iziet ārpus ierastās tūrista iemītās takas — ar vietējo iedzīvotāju palīdzību varam atrast īstas, neskartas pērles. Neatlieciet savus piedzīvojumus uz rītdienu, atļaujiet tiem sākties jau tagad.',
        extra: 'Milzīga vēlme iepazīt pasauli un mīlestība uz ceļojumiem 2007. gadā ir atvedušas pie daivinga.',
      },
    ],
    galleryPhotos: [
      { imageUrl: 'https://www.divesport.lv/wp-content/uploads/2018/03/16363_442442555824078_915371131_n.jpg' },
      { imageUrl: 'https://www.divesport.lv/wp-content/uploads/2018/03/img_0784.jpg' },
      { imageUrl: 'https://www.divesport.lv/wp-content/uploads/2018/03/10653453_786569794744684_9133255501418871629_n.jpg' },
      { imageUrl: 'https://www.divesport.lv/wp-content/uploads/2018/03/img_0785.jpg' },
    ],
  },
  apmacibaHub: {
    heroTitle: 'Apmācība',
    heroLede: 'Kursi iesācējiem un pieredzējušiem daiveriem — no pirmā elpas vilciena zem ūdens līdz instruktora sertifikātam.',
    cards: [
      {
        iconUrl: 'https://www.divesport.lv/wp-content/uploads/2018/02/Bronze-Medal-s-maskoj-2.png',
        title: 'Kursi',
        description: 'Pamata sertifikācijas kursi tiem, kas tikai sāk savu ceļu niršanas pasaulē.',
        slug: 'apmaciba-kursi',
        ctaLabel: 'Skatīt kursus',
      },
      {
        iconUrl: 'https://www.divesport.lv/wp-content/uploads/2018/02/Serebro-s-maskoj-2.png',
        title: 'Specializācijas',
        description: 'Padziļinātas iemaņas — nakts niršana, navigācija, vraku niršana un citas jomas.',
        slug: 'apmaciba-specializacijas',
        ctaLabel: 'Uzzināt vairāk',
      },
      {
        iconUrl: 'https://www.divesport.lv/wp-content/uploads/2018/03/Golden-Medal-sparka.png',
        title: 'Tehniskā niršana',
        description: 'Trimix un dekompresijas niršana pieredzējušiem daiveriem, kas grib doties dziļāk un ilgāk.',
        slug: 'apmaciba-tehniska-nirsana',
        ctaLabel: 'Uzzināt vairāk',
      },
      {
        iconUrl: 'https://www.divesport.lv/wp-content/uploads/2018/03/Silver-Medal-IANTD.png',
        title: 'Instruktoru kursi',
        description: 'Kļūsti par sertificētu instruktoru un māci citus atklāt zemūdens pasauli.',
        slug: 'apmaciba-instruktoru-kursi',
        ctaLabel: 'Uzzināt vairāk',
      },
    ],
  },
  apmacibaKursi: {
    heroTitle: 'Kursi',
    heroLede: 'Izvēlies kursu — un piesakies uzreiz, ar jau aizpildītu pieprasījumu.',
    tiers: [
      {
        title: 'Sāc šeit',
        courses: [
          {
            tag: 'Izmēģini',
            title: 'Intro dive (izmēģinājuma ieniršana)',
            description:
              'Vasaras sezonā notiek vienā no karjeriem Rīgas apkaimē, ziemas sezonā — baseinā. Tiek izsniegts viss nepieciešamais inventārs niršanai, un savu pirmo ieniršanu zemūdens pasaulē veiksiet instruktora pavadībā.',
            price: '60 €',
            bookingValue: 'Intro dive (60 €)',
          },
          {
            tag: 'Atsvaidzini',
            title: 'Check dive (pārbaudes ieniršana)',
            description:
              'Īpaši tiem, kuri sen nav niruši. Pieredzējis instruktors palīdzēs atjaunināt aizmirstās iemaņas pirms došanās atpakaļ ūdenī.',
            price: '30 €',
            bookingValue: 'Check dive (30 €)',
          },
        ],
      },
      {
        title: 'Sertifikācijas kursi',
        courses: [
          {
            tag: 'Populārākais',
            tagVariant: 'popular',
            title: 'PADI Open Water Diver (apmācības iesākuma kurss)',
            description:
              'Vispopulārākais kurss — caurlaide uz aizraujošo piedzīvojumu zemūdens pasaulē. Ietver teorētisko kursu, 5 ieniršanas baseinā, 4 ieniršanas atklātā ūdenī un noslēguma eksāmenu. Pēc kursa iegūsi starptautiski atzītu PADI Open Water Diver sertifikātu bez derīguma termiņa ierobežojuma. Pieejams no 10 gadu vecuma. Baseina noma un niršanas inventārs iekļauti kursa cenā.',
            price: '400 €',
            bookingValue: 'PADI Open Water Diver (400 €)',
          },
          {
            tag: 'Turpinājums',
            title: 'PADI Advanced Open Water Diver',
            description:
              'Nepieciešams OWD sertifikāts vai līdzvērtīgs. Pēc sekmīgas kursa iziešanas nirējs saņem atļauju ienirt līdz 30 m. Ietver 5 ieniršanas ar teoriju: dziļūdens ieniršana, navigācija, ieniršana sausā tērpā, ieniršana ar bagātinātu gaisu un ieniršana nakts laikā.',
            price: '300 €',
            bookingValue: 'PADI Advanced Open Water Diver (300 €)',
          },
          {
            tag: 'Prasība',
            title: 'Emergency First Response',
            description:
              'Pirmās medicīniskās palīdzības sniegšanas kurss, ilgums 3 stundas. Nepieciešams, iestājoties Rescue Diver, Divemaster vai instruktora kursos.',
            price: '100 €',
            bookingValue: 'Emergency First Response (100 €)',
          },
          {
            tag: 'Turpinājums',
            title: 'Rescue Diver',
            description:
              'Nepieciešams Emergency First Response un AOWD sertifikāts vai līdzvērtīgs. Ietver 5 ieniršanas, nelaimē nonākušu akvalangistu glābšanas iemaņu atstrādāšanu un 4 teorētiskās nodarbības.',
            price: '300 €',
            bookingValue: 'Rescue Diver (300 €)',
          },
        ],
      },
      {
        title: 'Profesionālais līmenis',
        courses: [
          {
            tag: 'Profesionālis',
            title: 'Divemaster',
            description:
              'Nepieciešams Emergency First Response un AOWD sertifikāts vai līdzvērtīgs. Pirmais profesionālais līmenis, kas dod tiesības strādāt par zemūdens niršanas gidu jebkurā daivinga centrā pasaulē. Programma paredzēta 7 pilnām dienām.',
            price: '550 €',
            bookingValue: 'Divemaster (550 €)',
          },
        ],
      },
    ],
    bookButtonLabel: 'Pieteikties',
    bookingEyebrow: 'Pieteikšanās',
    bookingTitle: 'Piesakies kursam',
    bookingText: 'Uzklikšķini "Pieteikties" pie kursa augstāk — šī forma automātiski sagatavosies. Pēc tam pievieno savu vārdu un e-pastu.',
    bookingNote: 'Neesi pārliecināts, kurš kurss ir piemērots tavam pieredzes līmenim? Vienkārši uzraksti to ziņā — palīdzēsim izvēlēties.',
    subnav: [
      { label: 'Specializācijas →', slug: 'apmaciba-specializacijas' },
      { label: 'Tehniskā niršana →', slug: 'apmaciba-tehniska-nirsana' },
      { label: 'Instruktoru kursi →', slug: 'apmaciba-instruktoru-kursi' },
    ],
  },
  apmacibaSpecializacijas: {
    heroTitle: 'Specializācijas',
    heroLede: 'Padziļinātas iemaņas jau sertificētiem daiveriem, kas grib paplašināt savas prasmes konkrētos virzienos.',
    intro: 'Kad pamatsertifikāts ir rokā, nākamais solis parasti ir specializācija — padziļināta apmācība kādā konkrētā niršanas jomā.',
    specialties: [
      { title: 'Nakts niršana', description: 'Orientēšanās un droša niršana tumsā ar lukturi — pavisam cita zemūdens pasaule pēc saulrieta.' },
      { title: 'Navigācija', description: 'Kompasa un dabisko orientieru izmantošana, lai pārliecinoši pārvietotos zem ūdens.' },
      { title: 'Vraku niršana', description: 'Droša izpēte pie nogrimušiem kuģiem — plānošana, riska izvērtēšana un pareiza tehnika.' },
    ],
    note: 'Katras specializācijas ilgums, cena un priekšnosacījumi atšķiras atkarībā no tavas iepriekšējās pieredzes.',
    cta: 'Jautāt par specializācijām',
    subnav: [
      { label: 'Kursi →', slug: 'apmaciba-kursi' },
      { label: 'Tehniskā niršana →', slug: 'apmaciba-tehniska-nirsana' },
      { label: 'Instruktoru kursi →', slug: 'apmaciba-instruktoru-kursi' },
    ],
  },
  apmacibaTehniskaNirsana: {
    heroTitle: 'Tehniskā niršana',
    heroLede: 'Trimix un dekompresijas niršana pieredzējušiem daiveriem, kas grib doties dziļāk un ilgāk.',
    paragraphs: [
      'Mūsu instruktors Aleksejs Kravčuks ir IANTD Normoxic Trimix Instructor Trainer (sertifikāts #7428) — tehniskās niršanas apmācība notiek pēc starptautiskiem IANTD standartiem.',
      'Tehniskā niršana paredzēta daiveriem, kas vēlas pārsniegt rekreatīvās niršanas robežas — ilgāku pieturas laiku, lielāku dziļumu un sarežģītāku gāzu plānošanu.',
    ],
    cta: 'Pārrunāt savu ceļu uz trimix',
    instructor: aleksejs,
    subnav: [
      { label: 'Kursi →', slug: 'apmaciba-kursi' },
      { label: 'Specializācijas →', slug: 'apmaciba-specializacijas' },
      { label: 'Instruktoru kursi →', slug: 'apmaciba-instruktoru-kursi' },
    ],
  },
  apmacibaInstruktoruKursi: {
    heroTitle: 'Instruktoru kursi',
    heroLede: 'Kļūsti par sertificētu instruktoru un māci citus atklāt zemūdens pasauli.',
    paragraphs: [
      'Ja Divemaster līmenis jau ir sasniegts un vēlies iet tālāk — instruktora ceļš ir nākamais solis. Mūsu klubu vada Aleksejs Kravčuks, PADI Master Scuba Diver Trainer.',
      'Instruktoru sagatavošana prasa individuālu pieeju — grafiks, priekšnosacījumi un apjoms tiek pielāgoti katra kandidāta iepriekšējai pieredzei.',
    ],
    cta: 'Pārrunāt instruktora ceļu',
    subnav: [
      { label: 'Kursi →', slug: 'apmaciba-kursi' },
      { label: 'Specializācijas →', slug: 'apmaciba-specializacijas' },
      { label: 'Tehniskā niršana →', slug: 'apmaciba-tehniska-nirsana' },
    ],
  },
  celojumiHub: {
    heroTitle: 'Ceļojumi',
    heroLede: 'Šajā sadaļā jūs varat iepazīties ar plānotiem ceļojumiem, kurus organizē mūsu klubs.',
    paragraphs: [
      'Organizējam niršanas ceļojumus un ar daivingu saistītus pasākumus visā pasaulē. Mēs neapstājamies pie pazīstamākajām vietām — ar vietējo iedzīvotāju palīdzību meklējam maršrutus, kas atklāj gan neskartu dabu, gan vietējo kultūru un sadzīvi.',
      'Aktuālie galamērķi un datumi mainās sezonāli — sazinies ar mums, lai uzzinātu, kas ir ieplānots tuvākajā laikā.',
    ],
    ctaPrimary: 'Uzzināt par tuvākajiem ceļojumiem',
    ctaSecondary: 'Skatīt foto',
    images: [
      'https://www.divesport.lv/wp-content/uploads/2018/04/IMG_9549-1-900x370.jpg',
      'https://www.divesport.lv/wp-content/uploads/2018/04/IMG_1448-1-900x370.jpg',
      'https://www.divesport.lv/wp-content/uploads/2018/04/P1155193-1-900x370.jpg',
    ],
  },
  celojumiFoto: {
    heroTitle: 'Foto no ceļojumiem',
    heroLede: 'Kadri no galamērķiem, kur kopā nirām — katrs ar savu ūdens temperatūru, redzamību un raksturu.',
    destinations: [
      { name: 'Taizeme', imageUrl: 'https://www.divesport.lv/wp-content/uploads/2018/04/IMG_9549-1-900x370.jpg' },
      { name: 'Ēģipte', imageUrl: 'https://www.divesport.lv/wp-content/uploads/2018/04/IMG_1448-1-900x370.jpg' },
      { name: 'Indonēzija', imageUrl: 'https://www.divesport.lv/wp-content/uploads/2018/04/P1155193-1-900x370.jpg' },
      { name: 'Kambodža', imageUrl: 'https://www.divesport.lv/wp-content/uploads/2019/03/divesport-sl2-960x395.jpg' },
      {
        name: 'Norvēģija',
        imageUrl: 'https://www.divesport.lv/wp-content/uploads/2019/03/22095860_1896830913674661_2776940025745771315_o-1280x527.jpg',
      },
      { name: 'Dive-safari Maldīvija', imageUrl: 'https://www.divesport.lv/wp-content/uploads/2018/02/puteshestvija-1.jpg' },
    ],
    note: 'Vēlas redzēt vairāk no konkrēta ceļojuma vai pievienot jaunas bildes? Nomaini vai papildini attēlu adreses satura failā.',
  },
  inventarsHub: {
    heroTitle: 'Inventārs',
    heroLede: 'Noma, remonts un balonu uzpildīšana — no pirmās nirtes līdz tehniskajai konfigurācijai.',
    cards: [
      {
        iconUrl: '',
        title: 'Inventāra noma',
        description: 'Pilns komplekts niršanas aprīkojuma nomai — sākot no pirmās nirtes līdz tehniskajai konfigurācijai.',
        slug: 'inventars-noma',
        ctaLabel: 'Uzzināt vairāk',
      },
      {
        iconUrl: '',
        title: 'Remonts un apkalpošana',
        description: 'Ikgadēja regulatoru, BCD, tērpu un balonu apkalpošana un remonts uz vietas klubā.',
        slug: 'inventars-remonts',
        ctaLabel: 'Uzzināt vairāk',
      },
      {
        iconUrl: '',
        title: 'Balonu uzpildīšana',
        description: 'Gaisa un nitrox balonu uzpildīšana klubā uz vietas, ar cenām par litru.',
        slug: 'inventars-balonu-uzpildisana',
        ctaLabel: 'Skatīt cenas',
      },
    ],
  },
  inventarsNoma: {
    heroTitle: 'Inventāra noma',
    heroLede: 'Pilns komplekts niršanas aprīkojuma nomai — no pirmās nirtes līdz tehniskajai konfigurācijai.',
    paragraphs: [
      'Klubā pieejams aprīkojums nomai gan iesācējiem, gan pieredzējušiem daiveriem — regulatori, peldspējas kompensatori (BCD), slapjie un sausie tērpi, baloni, maskas, spurvēdas un niršanas datori.',
      'Nomas cenas atkarīgas no aprīkojuma veida un nomas ilguma — sazinies ar mums, lai uzzinātu pieejamību un cenas savam braucienam.',
    ],
    cta: 'Jautāt par nomu',
    subnav: [
      { label: 'Remonts un apkalpošana →', slug: 'inventars-remonts' },
      { label: 'Balonu uzpildīšana →', slug: 'inventars-balonu-uzpildisana' },
    ],
  },
  inventarsRemonts: {
    heroTitle: 'Remonts un apkalpošana',
    heroLede: 'Mūsu klubā jūs varat iziet jūsu inventāra ikgadējo apkalpošanu un remontu.',
    items: [
      { text: 'Sauso tērpu remonts — aproces, rāvējslēdzēji, botu nomaiņa, hermētiskuma pārbaude' },
      { text: 'Vārstu remonts, sauso cimdu uzstādīšana' },
      { text: 'Ikgadēja regulatoru un peldspējas kompensatoru apkalpošana un remonts' },
      { text: 'Slapjo tērpu remonts' },
      { text: 'Ikgadēja balonu pārbaude un hidrotests, ventiļu remonts un apkalpošana' },
      { text: 'Augstspiediena kompresoru remonts un apkalpošana' },
      { text: 'Barošanas bateriju nomaiņa niršanas datoros' },
    ],
    cta: 'Pieteikt remontu',
    subnav: [
      { label: 'Inventāra noma →', slug: 'inventars-noma' },
      { label: 'Balonu uzpildīšana →', slug: 'inventars-balonu-uzpildisana' },
    ],
  },
  inventarsBalonuUzpildisana: {
    heroTitle: 'Balonu uzpildīšana',
    heroLede: 'Gaisa un nitrox balonu uzpildīšana klubā uz vietas.',
    rows: [
      { label: 'Nitrox 21–40%, 15 litru balons, 200 bar', price: '7 €' },
      { label: 'Gaiss, 12–15 litru balons, 200 bar', price: '4 €' },
    ],
    note: 'Tehniskās niršanas nomas un balonu uzpildes — O2, Trimix — jautājumos lūdzam griezties personīgi pie instruktora Alekseja: +371 292 84178.',
    subnav: [
      { label: 'Inventāra noma →', slug: 'inventars-noma' },
      { label: 'Remonts un apkalpošana →', slug: 'inventars-remonts' },
    ],
  },
  kontakti: {
    heroTitle: 'Runāsim par nirumu',
    heroLede: 'Zvani, raksti vai aizpildi formu — atbildēsim ātri.',
  },
};

export default lv;
