import type { SiteContent } from '@/types/content';

const ALEKSEJS_PHOTO =
  'https://www.divesport.lv/wp-content/uploads/2018/03/28471732_10211943317674024_4428251208978217532_n-288x300.jpg';
const LIENE_PHOTO =
  'https://www.divesport.lv/wp-content/uploads/2018/03/16363_442442555824078_915371131_n-150x150.jpg';

const aleksejs = {
  name: 'Алексей Кравчук',
  photoUrl: ALEKSEJS_PHOTO,
  certs: ['PADI Master Scuba Diver Trainer #627929', 'IANTD Normoxic Trimix Instructor Trainer #7428'],
  quote:
    'Уже много лет я обучаю людей плавать с аквалангом, знакомлю их с другим миром нашей планеты. Загадочным, тихим, поражающим своим величием!',
  extra: 'Блог: divesport.blogspot.com',
};

const liene = {
  name: 'Лиене Клементьева',
  photoUrl: LIENE_PHOTO,
  certs: ['Divemaster IANTD'],
  quote:
    'В путешествиях мы можем не только отдохнуть и открыть новые земли, но и обогатить свой опыт. Мне нравятся маршруты, выходящие за пределы протоптанных туристических троп.',
};

const ru: SiteContent = {
  lang: 'ru',
  meta: {
    home: { title: 'Divesport — Дайвинг-клуб в Латвии', description: 'Divesport — дайвинг-клуб в Латвии с 2003 года.' },
    'par-mums': { title: 'О нас — Divesport', description: 'О дайвинг-клубе Divesport — основан в 2003 году.' },
    apmaciba: { title: 'Обучение — Divesport', description: 'Обучение дайвингу для всех уровней.' },
    'apmaciba-kursi': { title: 'Курсы — Divesport', description: 'Курсы PADI и IANTD в клубе Divesport.' },
    'apmaciba-specializacijas': { title: 'Специализации — Divesport', description: 'Специализации дайвинга.' },
    'apmaciba-tehniska-nirsana': { title: 'Технический дайвинг — Divesport', description: 'Обучение тримиксу IANTD.' },
    'apmaciba-instruktoru-kursi': { title: 'Курсы инструкторов — Divesport', description: 'Стань инструктором.' },
    celojumi: { title: 'Путешествия — Divesport', description: 'Дайвинг-путешествия по всему миру.' },
    'celojumi-foto': { title: 'Фото — Divesport', description: 'Фотографии с путешествий.' },
    inventars: { title: 'Инвентарь — Divesport', description: 'Аренда, ремонт, заправка баллонов.' },
    'inventars-noma': { title: 'Аренда инвентаря — Divesport', description: 'Полная аренда снаряжения.' },
    'inventars-remonts': { title: 'Ремонт — Divesport', description: 'Ремонт инвентаря для дайвинга.' },
    'inventars-balonu-uzpildisana': { title: 'Заправка баллонов — Divesport', description: 'Заправка воздухом и найтроксом.' },
    kontakti: { title: 'Контакты — Divesport', description: 'Контактная информация Divesport.' },
  },
  nav: [
    { label: 'О нас', slug: 'par-mums' },
    {
      label: 'Обучение',
      slug: 'apmaciba',
      children: [
        { label: 'Курсы', slug: 'apmaciba-kursi' },
        { label: 'Специализации', slug: 'apmaciba-specializacijas' },
        { label: 'Технический дайвинг', slug: 'apmaciba-tehniska-nirsana' },
        { label: 'Курсы инструкторов', slug: 'apmaciba-instruktoru-kursi' },
      ],
    },
    { label: 'Путешествия', slug: 'celojumi' },
    {
      label: 'Инвентарь',
      slug: 'inventars',
      children: [
        { label: 'Аренда инвентаря', slug: 'inventars-noma' },
        { label: 'Ремонт', slug: 'inventars-remonts' },
        { label: 'Заправка баллонов', slug: 'inventars-balonu-uzpildisana' },
      ],
    },
    { label: 'Контакты', slug: 'kontakti' },
  ],
  langSwitcherOtherLabel: 'LV',
  footer: { blogLabel: 'Блог', copyright: 'Divesport. Все права защищены.' },
  breadcrumbHome: 'Divesport',
  contactInfo: {
    address: 'Stiebru iela 15, Mežāres, Babītes pagasts, LV-2101',
    phone: '+371 292 84178',
    email: 'divesport.lv@gmail.com',
    instructor: 'Алексей Кравчук — PADI MSDT, EFR, IANTD Instructor Trainer (Normoxic Trimix)',
  },
  form: {
    name: 'Имя',
    email: 'Эл. почта',
    category: 'Тип запроса',
    categoryOptions: ['Курсы', 'Путешествия', 'Инвентарь', 'Другой вопрос'],
    courseCategoryValue: 'Курсы',
    course: 'Курс',
    coursePlaceholder: '— Выбери курс —',
    startDate: 'Желаемая дата начала',
    startDateHint: '(необязательно, но желательно)',
    message: 'Сообщение',
    submit: 'Отправить заявку',
    submitSending: 'Отправка...',
    successMessage: 'Спасибо! Сообщение отправлено — ответим в ближайшее время.',
    genericError: 'Не удалось отправить. Попробуйте ещё раз или напишите напрямую на почту.',
    networkError: 'Нет соединения с интернетом или сервер недоступен. Попробуйте ещё раз.',
    missingKeyError: 'Форма ещё не подключена к Web3Forms — добавьте свой access_key.',
    requiredFieldsError: 'Пожалуйста, заполните все обязательные поля.',
    courseTemplate: (course) =>
      `Интересует курс: ${course}. Пожалуйста, свяжитесь со мной, чтобы обсудить доступные даты.`,
    tripCategoryValue: 'Путешествия',
    tripTemplate: (tripTitle) =>
      `Интересует поездка: ${tripTitle}. Пожалуйста, свяжитесь со мной, чтобы обсудить даты и бронирование.`,
  },
  home: {
    heroEyebrow: 'Дайвинг-клуб · с 2003 года',
    heroTitleLines: ['Курсы дайвинга', 'Подводные работы', 'Путешествия', 'Аренда и обслуживание снаряжения'],
    heroCtaPrimary: 'Начать обучение',
    heroCtaSecondary: 'Связаться',
    quickPathsTitle: 'Что вы ищете?',
    quickPathsSubtitle: '2003 · PADI MSDT · Инструкторы IANTD Trimix',
    quickPaths: [
      { icon: '🎓', title: 'Начни нырять', description: 'От первого погружения до сертификата', slug: 'apmaciba-kursi' },
      { icon: '✈️', title: 'Путешествуй с нами', description: 'Дайвинг-поездки по всему миру', slug: 'celojumi' },
      { icon: '🛠️', title: 'Инвентарь', description: 'Аренда, ремонт, заправка баллонов', slug: 'inventars' },
      { icon: '📞', title: 'Свяжись с нами', description: 'Есть вопросы? Ответим быстро', slug: 'kontakti' },
    ],
    aboutEyebrow: 'О клубе',
    aboutTitle: 'С 2003 года под поверхностью',
    aboutText:
      'Дайвинг-клуб DIVESPORT начал работу в 2003 году и с тех пор познакомил десятки людей с тихим, загадочным миром под водой. Работаем как с теми, кто ныряет впервые, так и с опытными дайверами, идущими к техническому дайвингу и сертификатам тримикс.',
    aboutCta: 'Больше о клубе и команде',
    team: [aleksejs, liene],
    coursesEyebrow: '18m · граница открытой воды',
    coursesTitle: 'Обучение',
    coursesText: 'Курсы для начинающих и опытных дайверов — от первого вдоха под водой до сертификата инструктора.',
    badgeCards: [
      {
        iconUrl: 'https://www.divesport.lv/wp-content/uploads/2018/02/Bronze-Medal-s-maskoj-2.png',
        title: 'Курсы',
        description: 'Базовые сертификационные курсы для тех, кто только начинает свой путь в мире дайвинга.',
        slug: 'apmaciba-kursi',
        ctaLabel: 'Смотреть курсы',
      },
      {
        iconUrl: 'https://www.divesport.lv/wp-content/uploads/2018/02/Serebro-s-maskoj-2.png',
        title: 'Специализации',
        description: 'Углублённые навыки — ночные погружения, навигация, дайвинг на затонувших объектах.',
        slug: 'apmaciba-specializacijas',
        ctaLabel: 'Узнать больше',
      },
      {
        iconUrl: 'https://www.divesport.lv/wp-content/uploads/2018/03/Golden-Medal-sparka.png',
        title: 'Технический дайвинг',
        description: 'Тримикс и декомпрессионный дайвинг для опытных дайверов, желающих идти глубже и дольше.',
        slug: 'apmaciba-tehniska-nirsana',
        ctaLabel: 'Узнать больше',
      },
      {
        iconUrl: 'https://www.divesport.lv/wp-content/uploads/2018/03/Silver-Medal-IANTD.png',
        title: 'Курсы инструкторов',
        description: 'Стань сертифицированным инструктором и обучай других открывать для себя подводный мир.',
        slug: 'apmaciba-instruktoru-kursi',
        ctaLabel: 'Узнать больше',
      },
    ],
    travelEyebrow: '30m · граница рекреационного дайвинга',
    travelTitle: 'Путешествия',
    travelText:
      'Организуем дайвинг-поездки и связанные с дайвингом мероприятия по всему миру. Мы не останавливаемся на самых известных местах — с помощью местных жителей ищем маршруты, раскрывающие как нетронутую природу, так и местную культуру и быт.',
    travelCtaPrimary: 'Узнать о ближайших поездках',
    travelCtaSecondary: 'Смотреть фото по направлениям',
    travelImages: [
      'https://www.divesport.lv/wp-content/uploads/2018/04/IMG_9549-1-900x370.jpg',
      'https://www.divesport.lv/wp-content/uploads/2018/04/IMG_1448-1-900x370.jpg',
      'https://www.divesport.lv/wp-content/uploads/2018/04/P1155193-1-900x370.jpg',
    ],
    gearEyebrow: '40m · граница тримикса',
    gearTitle: 'Инвентарь',
    gearCards: [
      {
        title: 'Аренда инвентаря',
        description: 'Полный комплект снаряжения для дайвинга в аренду — от первого погружения до технической конфигурации.',
        slug: 'inventars-noma',
      },
      {
        title: 'Ремонт и обслуживание',
        items: [
          'Ремонт сухих костюмов — манжеты, молнии, замена ботинок, проверка герметичности',
          'Ремонт клапанов, установка сухих перчаток',
          'Ежегодное обслуживание регуляторов и компенсаторов плавучести',
          'Ремонт мокрых костюмов',
          'Проверка баллонов и гидротест, ремонт вентилей',
          'Ремонт и обслуживание компрессоров высокого давления',
          'Замена батареек в дайв-компьютерах',
        ],
        slug: 'inventars-remonts',
      },
      {
        title: 'Заправка баллонов',
        description: 'Заправка баллонов воздухом и найтроксом в клубе на месте.',
        slug: 'inventars-balonu-uzpildisana',
      },
    ],
    galleryEyebrow: 'Галерея',
    galleryTitle: 'Кадры из глубины',
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
    galleryNote: 'Хотите добавить больше фотографий — просто замените адреса изображений в файле контента.',
    contactEyebrow: 'Контакты',
    contactTitle: 'Поговорим о погружении',
    contactText: 'Звоните, пишите или заполните форму — ответим быстро.',
  },
  about: {
    heroTitle: 'О клубе',
    heroLede: 'Дайвинг-клуб DIVESPORT начал работу в 2003 году.',
    intro:
      'С момента основания мы познакомили десятки людей с тихим, загадочным миром под водой — от первого пробного погружения до сертификата инструктора. Работаем как с теми, кто ныряет впервые, так и с опытными дайверами, идущими к техническому дайвингу и триксу.',
    team: [
      { ...aleksejs, extra: 'Блог Алексея: divesport.blogspot.com' },
      {
        ...liene,
        quote:
          'В путешествиях мы можем не только полноценно отдохнуть и открыть новые земли, но и обогатить свой опыт и внутренний мир. Мне нравится составлять маршруты, которые выходят за пределы протоптанных туристических троп.',
        extra: 'Огромное желание познавать мир и любовь к путешествиям привели её к дайвингу в 2007 году.',
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
    heroTitle: 'Обучение',
    heroLede: 'Курсы для начинающих и опытных дайверов — от первого вдоха под водой до сертификата инструктора.',
    cards: [
      {
        iconUrl: 'https://www.divesport.lv/wp-content/uploads/2018/02/Bronze-Medal-s-maskoj-2.png',
        title: 'Курсы',
        description: 'Базовые сертификационные курсы для тех, кто только начинает свой путь в мире дайвинга.',
        slug: 'apmaciba-kursi',
        ctaLabel: 'Смотреть курсы',
      },
      {
        iconUrl: 'https://www.divesport.lv/wp-content/uploads/2018/02/Serebro-s-maskoj-2.png',
        title: 'Специализации',
        description: 'Углублённые навыки — ночные погружения, навигация, дайвинг на затонувших объектах.',
        slug: 'apmaciba-specializacijas',
        ctaLabel: 'Узнать больше',
      },
      {
        iconUrl: 'https://www.divesport.lv/wp-content/uploads/2018/03/Golden-Medal-sparka.png',
        title: 'Технический дайвинг',
        description: 'Тримикс и декомпрессионный дайвинг для опытных дайверов, желающих идти глубже и дольше.',
        slug: 'apmaciba-tehniska-nirsana',
        ctaLabel: 'Узнать больше',
      },
      {
        iconUrl: 'https://www.divesport.lv/wp-content/uploads/2018/03/Silver-Medal-IANTD.png',
        title: 'Курсы инструкторов',
        description: 'Стань сертифицированным инструктором и обучай других открывать для себя подводный мир.',
        slug: 'apmaciba-instruktoru-kursi',
        ctaLabel: 'Узнать больше',
      },
    ],
  },
  apmacibaKursi: {
    heroTitle: 'Курсы',
    heroLede: 'Выбери курс — и запишись сразу же, с уже заполненной заявкой.',
    tiers: [
      {
        title: 'Начни здесь',
        courses: [
          {
            tag: 'Попробуй',
            title: 'Intro dive (пробное погружение)',
            description:
              'Летом проводится в одном из карьеров под Ригой, зимой — в бассейне. Выдаётся всё необходимое снаряжение, а первое погружение проходит в сопровождении инструктора.',
            price: '60 €',
            bookingValue: 'Intro dive (60 €)',
          },
          {
            tag: 'Восстанови навыки',
            title: 'Check dive (проверочное погружение)',
            description: 'Специально для тех, кто давно не нырял. Опытный инструктор поможет восстановить забытые навыки.',
            price: '30 €',
            bookingValue: 'Check dive (30 €)',
          },
        ],
      },
      {
        title: 'Сертификационные курсы',
        courses: [
          {
            tag: 'Самый популярный',
            tagVariant: 'popular',
            title: 'PADI Open Water Diver',
            description:
              'Самый популярный курс — пропуск в увлекательный мир подводных приключений. Включает теоретический курс, 5 погружений в бассейне, 4 погружения в открытой воде и итоговый экзамен. Сертификат бессрочный, признан во всём мире. Доступен с 10 лет. Аренда бассейна и снаряжение включены.',
            price: '400 €',
            bookingValue: 'PADI Open Water Diver (400 €)',
          },
          {
            tag: 'Продолжение',
            title: 'PADI Advanced Open Water Diver',
            description:
              'Требуется сертификат OWD или эквивалент. Допуск к погружениям на глубину до 30 м. Включает 5 погружений: глубоководное, навигация, сухой костюм, обогащённый воздух, ночное погружение.',
            price: '300 €',
            bookingValue: 'PADI Advanced Open Water Diver (300 €)',
          },
          {
            tag: 'Требование',
            title: 'Emergency First Response',
            description: 'Курс оказания первой медицинской помощи, 3 часа. Требуется для Rescue Diver, Divemaster или инструктора.',
            price: '100 €',
            bookingValue: 'Emergency First Response (100 €)',
          },
          {
            tag: 'Продолжение',
            title: 'Rescue Diver',
            description:
              'Требуется Emergency First Response и AOWD или эквивалент. 5 погружений, отработка навыков спасения, 4 теоретических занятия.',
            price: '300 €',
            bookingValue: 'Rescue Diver (300 €)',
          },
        ],
      },
      {
        title: 'Профессиональный уровень',
        courses: [
          {
            tag: 'Профессионал',
            title: 'Divemaster',
            description:
              'Требуется Emergency First Response и AOWD или эквивалент. Первый профессиональный уровень — право работать гидом по дайвингу в любом дайв-центре мира. 7 полных дней программы.',
            price: '550 €',
            bookingValue: 'Divemaster (550 €)',
          },
        ],
      },
    ],
    bookButtonLabel: 'Записаться',
    bookingEyebrow: 'Запись на курс',
    bookingTitle: 'Запишись на курс',
    bookingText: 'Нажми «Записаться» у нужного курса выше — эта форма заполнится автоматически. Затем добавь своё имя и email.',
    bookingNote: 'Не уверены, какой курс подходит вашему уровню подготовки? Просто напишите об этом в сообщении — поможем выбрать.',
    subnav: [
      { label: 'Специализации →', slug: 'apmaciba-specializacijas' },
      { label: 'Технический дайвинг →', slug: 'apmaciba-tehniska-nirsana' },
      { label: 'Курсы инструкторов →', slug: 'apmaciba-instruktoru-kursi' },
    ],
  },
  apmacibaSpecializacijas: {
    heroTitle: 'Специализации',
    heroLede: 'Углублённые навыки для уже сертифицированных дайверов, желающих расширить свои умения.',
    intro: 'Когда базовый сертификат уже получен, следующим шагом обычно становится специализация.',
    specialties: [
      { title: 'Ночные погружения', description: 'Ориентация и безопасное погружение в темноте с фонарём.' },
      { title: 'Навигация', description: 'Использование компаса и естественных ориентиров для уверенного перемещения под водой.' },
      { title: 'Дайвинг на затонувших объектах', description: 'Безопасное исследование затонувших судов — планирование и оценка рисков.' },
    ],
    note: 'Продолжительность, стоимость и требования для каждой специализации зависят от вашего опыта.',
    cta: 'Спросить о специализациях',
    subnav: [
      { label: 'Курсы →', slug: 'apmaciba-kursi' },
      { label: 'Технический дайвинг →', slug: 'apmaciba-tehniska-nirsana' },
      { label: 'Курсы инструкторов →', slug: 'apmaciba-instruktoru-kursi' },
    ],
  },
  apmacibaTehniskaNirsana: {
    heroTitle: 'Технический дайвинг',
    heroLede: 'Тримикс и декомпрессионный дайвинг для опытных дайверов, желающих идти глубже и дольше.',
    paragraphs: [
      'Наш инструктор Алексей Кравчук — IANTD Normoxic Trimix Instructor Trainer (сертификат #7428) — обучение проходит по международным стандартам IANTD.',
      'Технический дайвинг предназначен для дайверов, желающих выйти за пределы рекреационного дайвинга.',
    ],
    cta: 'Обсудить свой путь к тримиксу',
    instructor: aleksejs,
    subnav: [
      { label: 'Курсы →', slug: 'apmaciba-kursi' },
      { label: 'Специализации →', slug: 'apmaciba-specializacijas' },
      { label: 'Курсы инструкторов →', slug: 'apmaciba-instruktoru-kursi' },
    ],
  },
  apmacibaInstruktoruKursi: {
    heroTitle: 'Курсы инструкторов',
    heroLede: 'Стань сертифицированным инструктором и обучай других открывать для себя подводный мир.',
    paragraphs: [
      'Если уровень Divemaster уже достигнут — путь инструктора станет следующим шагом. Наш клуб возглавляет Алексей Кравчук, PADI Master Scuba Diver Trainer.',
      'Подготовка инструкторов требует индивидуального подхода — график и объём программы подбираются под опыт каждого кандидата.',
    ],
    cta: 'Обсудить путь инструктора',
    subnav: [
      { label: 'Курсы →', slug: 'apmaciba-kursi' },
      { label: 'Специализации →', slug: 'apmaciba-specializacijas' },
      { label: 'Технический дайвинг →', slug: 'apmaciba-tehniska-nirsana' },
    ],
  },
  celojumiHub: {
    heroTitle: 'Путешествия',
    heroLede:
      'Дайвинг-путешествия по всему миру — с помощью местных жителей открываем места вне привычных туристических троп.',
    tripBookButtonLabel: 'Записаться на эту поездку',
    bookingEyebrow: 'Запись',
    bookingTitle: 'Запишись на поездку',
    bookingText:
      'Нажми «Записаться на эту поездку» у нужной поездки выше — эта форма заполнится автоматически. Затем добавь своё имя и email.',
  },
  celojumiFoto: {
    heroTitle: 'Фото с путешествий',
    heroLede: 'Кадры из мест, где мы вместе погружались — у каждого своя температура воды, видимость и характер.',
    destinations: [
      { name: 'Таиланд', imageUrl: 'https://www.divesport.lv/wp-content/uploads/2018/04/IMG_9549-1-900x370.jpg' },
      { name: 'Египет', imageUrl: 'https://www.divesport.lv/wp-content/uploads/2018/04/IMG_1448-1-900x370.jpg' },
      { name: 'Индонезия', imageUrl: 'https://www.divesport.lv/wp-content/uploads/2018/04/P1155193-1-900x370.jpg' },
      { name: 'Камбоджа', imageUrl: 'https://www.divesport.lv/wp-content/uploads/2019/03/divesport-sl2-960x395.jpg' },
      {
        name: 'Норвегия',
        imageUrl: 'https://www.divesport.lv/wp-content/uploads/2019/03/22095860_1896830913674661_2776940025745771315_o-1280x527.jpg',
      },
      { name: 'Дайв-сафари Мальдивы', imageUrl: 'https://www.divesport.lv/wp-content/uploads/2018/02/puteshestvija-1.jpg' },
    ],
    note: 'Хотите увидеть больше кадров с конкретной поездки или добавить новые фото? Замените адреса изображений в файле контента.',
  },
  inventarsHub: {
    heroTitle: 'Инвентарь',
    heroLede: 'Аренда, ремонт и заправка баллонов — от первого погружения до технической конфигурации.',
    cards: [
      {
        iconUrl: '',
        title: 'Аренда инвентаря',
        description: 'Полный комплект снаряжения для дайвинга в аренду.',
        slug: 'inventars-noma',
        ctaLabel: 'Узнать больше',
      },
      {
        iconUrl: '',
        title: 'Ремонт и обслуживание',
        description: 'Ежегодное обслуживание и ремонт регуляторов, компенсаторов, костюмов и баллонов на месте.',
        slug: 'inventars-remonts',
        ctaLabel: 'Узнать больше',
      },
      {
        iconUrl: '',
        title: 'Заправка баллонов',
        description: 'Заправка баллонов воздухом и найтроксом в клубе на месте, с ценами за литр.',
        slug: 'inventars-balonu-uzpildisana',
        ctaLabel: 'Смотреть цены',
      },
    ],
  },
  inventarsNoma: {
    heroTitle: 'Аренда инвентаря',
    heroLede: 'Полный комплект снаряжения для дайвинга в аренду — от первого погружения до технической конфигурации.',
    paragraphs: [
      'В клубе доступно снаряжение в аренду как для начинающих, так и для опытных дайверов — регуляторы, компенсаторы плавучести, костюмы, баллоны, маски, ласты и дайв-компьютеры.',
      'Стоимость аренды зависит от вида снаряжения и срока аренды — свяжитесь с нами, чтобы узнать о наличии и ценах.',
    ],
    cta: 'Спросить об аренде',
    subnav: [
      { label: 'Ремонт и обслуживание →', slug: 'inventars-remonts' },
      { label: 'Заправка баллонов →', slug: 'inventars-balonu-uzpildisana' },
    ],
  },
  inventarsRemonts: {
    heroTitle: 'Ремонт и обслуживание',
    heroLede: 'В нашем клубе вы можете пройти ежегодное обслуживание и ремонт своего снаряжения.',
    items: [
      { text: 'Ремонт сухих костюмов — манжеты, молнии, замена ботинок, проверка герметичности' },
      { text: 'Ремонт клапанов, установка сухих перчаток' },
      { text: 'Ежегодное обслуживание и ремонт регуляторов и компенсаторов плавучести' },
      { text: 'Ремонт мокрых костюмов' },
      { text: 'Ежегодная проверка баллонов и гидротест, ремонт и обслуживание вентилей' },
      { text: 'Ремонт и обслуживание компрессоров высокого давления' },
      { text: 'Замена батареек питания в дайв-компьютерах' },
    ],
    cta: 'Записаться на ремонт',
    subnav: [
      { label: 'Аренда инвентаря →', slug: 'inventars-noma' },
      { label: 'Заправка баллонов →', slug: 'inventars-balonu-uzpildisana' },
    ],
  },
  inventarsBalonuUzpildisana: {
    heroTitle: 'Заправка баллонов',
    heroLede: 'Заправка баллонов воздухом и найтроксом в клубе на месте.',
    rows: [
      { label: 'Найтрокс 21–40%, баллон 15 литров, 200 бар', price: '7 €' },
      { label: 'Воздух, баллон 12–15 литров, 200 бар', price: '4 €' },
    ],
    note: 'По вопросам аренды и заправки баллонов для технического дайвинга — O2, тримикс — просьба обращаться лично к инструктору Алексею: +371 292 84178.',
    subnav: [
      { label: 'Аренда инвентаря →', slug: 'inventars-noma' },
      { label: 'Ремонт и обслуживание →', slug: 'inventars-remonts' },
    ],
  },
  kontakti: {
    heroTitle: 'Поговорим о погружении',
    heroLede: 'Звоните, пишите или заполните форму — ответим быстро.',
  },
};

export default ru;
