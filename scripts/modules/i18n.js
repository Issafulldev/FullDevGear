// Lightweight i18n module
const I18N_STORAGE_KEY = 'fdg_lang';
const SUPPORTED_LANGS = ['en', 'fr'];

const TRANSLATIONS = {
  en: {
    skip_content: 'Skip to content',
    nav_cv: 'CV',
    hero_title:
      '<span class="nowrap-desktop">CODE, NO-CODE, AI:</span> <br> DIGITAL GROWTH, <br> BUSINESS BLISS.',
    hero_subtitle:
      'Transforming ideas into powerful digital solutions. From custom development to no-code platforms and AI integration, I deliver comprehensive web solutions that drive results.',
    build_gallery_title: 'Build Gallery',
    build_gallery_desc: 'Explore my completed projects with GitHub previews and live demonstrations.',
    label_completed: 'Completed',
    label_active: 'Active',
    code_craft_title: 'Code & Craft',
    code_craft_desc:
      'Expert development across the full stack, from responsive front-ends to scalable back-end architectures.',
    digital_alchemy_title: 'Digital Alchemy',
    digital_alchemy_desc:
      'Turning complex business requirements into elegant, user-friendly digital experiences.',
    tech_horizons_title: 'Tech Horizons',
    tech_horizons_desc: "We're always looking for new and exciting tech to add to our platform.",
    solution_stack_title: 'Solution Stack',
    client_victories_title: 'Client victories',
    success_playbook_title: 'Success Playbook',
    skill_spectrum_title: 'Skill Spectrum',
    trust_chronicles_title: 'Trust Chronicles',
    zero_to_launch_title: 'Zero To Launch',
    generic_list_desc:
      "We've compiled a list of the most successful people in the software industry and what they've done to get there.",
    contact_title: "Let's Build Tomorrow",
    form_name_label: 'Name',
    form_name_placeholder: 'Your Name',
    form_email_label: 'Email',
    form_email_placeholder: 'Your Email',
    form_message_label: 'Message',
    form_message_placeholder: 'Tell me about your project...',
    form_submit: 'Send Message',
    // Success banner
    success_title: 'Message sent successfully',
    success_message: 'Thank you for contacting us! We will study your project carefully and get back to you very quickly to discuss the next steps.',
    success_btn_portfolio: 'Discover my projects',
    success_btn_home: 'Back to home',
    cooldown_title: 'Send another form in',
    cooldown_subtitle: 'We will contact you well before that!',
    resend_title: 'Another project?',
    resend_btn: 'New message',
    transparent_build_rates_title: 'Transparent Build Rates',
    roi_pricing_title: 'ROI-Driven Pricing',
    cv_title: 'Full-stack Web Developer',
    cv_status: 'Available for opportunities',
    cv_summary_title: 'Summary',
    cv_summary_text:
      'Passionate Junior Web Developer, recently graduated. Hands-on experience in building web applications using React.js, Node.js, HTML/CSS, and JavaScript. Backed by 7 years of experience in customer success roles within SaaS companies, offering a deep understanding of client needs and excellent communication skills. Eager to contribute to innovative projects within a dynamic team environment.',
    cv_experience_title: 'Experience - Projects',
    cv_exp1_title: 'Full Stack Web Developer',
    cv_exp1_period: '2023 - Today',
    cv_exp1_subtitle: "Associate's degree in web development",
    cv_exp1_b1: 'Mastered HTML, CSS, Javascript, Node.js and React',
    cv_exp1_b2: 'Completed 4 major projects mastering ecommerce aspect of web developing',
    cv_exp1_b3: 'Got skilled on both frontend and backend web development',
    cv_exp2_title: 'Customer Success Manager',
    cv_exp2_period: '2019 - 2023',
    cv_exp2_subtitle: 'Selligent - Paris',
    cv_exp2_b1: 'Supported marketing campaigns using CRM and automation tools',
    cv_exp2_b2: 'Delivered client training on marketing platform features',
    cv_exp2_b3: 'Managed content localization for diverse markets',
    cv_exp2_b4: 'Developed onboarding strategies to boost product adoption',
    cv_exp3_title: 'Customer Success Manager',
    cv_exp3_period: '2016 - 2019',
    cv_exp3_subtitle: 'Launchmetrics - Paris',
    cv_exp3_b1: 'Onboarded new clients',
    cv_exp3_b2: 'Managed projects in collaboration with Technical Project Managers',
    cv_exp3_b3: 'Detected opportunities and forwarding it to sales',
    cv_exp3_b4: 'Kept up-to-date the key opinion leaders and users',
    cv_exp3_b5: 'Customer Support',
    cv_education_title: 'Education',
    cv_edu1_title: "Web Developer Associate's Degree",
    cv_edu1_subtitle: 'Openclassrooms',
    cv_edu2_title: "Business Associate's Degree",
    cv_edu2_subtitle: 'Lycée Saint-Lambert - Paris',
    cv_skills_title: 'Technical Skills',
    cv_softskills_title: 'Soft Skills',
    cv_languages_title: 'Languages',
    lang_french: 'French',
    lang_native: 'Native',
    lang_english: 'English',
    lang_fluent: 'Fluent',
    footer_contact_me: 'Contact Me',
    footer_follow_me: 'Follow Me',
    footer_quick_links: 'Quick Links',
    ql_freelance: 'Freelance Services',
    ql_resume: 'My Resume',
    ql_contact: 'Contact Form',
    ql_terms: 'Terms of Service',
    ql_privacy: 'Privacy Policy',
    // --- Legal pages (Terms & Privacy) ---
    last_updated_label: 'Last updated',
    back_to_site: 'Back to site',
    // Terms of Service
    tos_title: 'Terms of Service',
    tos_acceptance_title: '1. Acceptance',
    tos_acceptance_body:
      'By accessing this website, you agree to these Terms of Service.',
    tos_ip_title: '2. Intellectual Property',
    tos_ip_body:
      'All content and trademarks are the property of FullDevGear unless stated otherwise.',
    tos_limitations_title: '3. Limitations',
    tos_limitations_body:
      'This site is provided “as is”, without any express or implied warranties.',
    tos_contact_title: '4. Contact',
    tos_contact_body_html:
      'For any questions: <a href="mailto:issa@fulldevgear.com">issa@fulldevgear.com</a>.',
    // Privacy Policy
    privacy_title: 'Privacy Policy',
    privacy_data_title: 'Data collected',
    privacy_data_body:
      'This site does not collect personal data without your consent. External links to Calendly/Telegram/WhatsApp may apply their own policies.',
    privacy_cookies_title: 'Cookies',
    privacy_cookies_body: 'No third-party tracking cookies.',
    privacy_contact_title: 'Contact',
    privacy_contact_body_html:
      'To exercise your rights: <a href="mailto:issa@fulldevgear.com">issa@fulldevgear.com</a>.',
  },
  fr: {
    skip_content: 'Aller au contenu',
    nav_cv: 'CV',
    hero_title:
      '<span class="nowrap-desktop">CODE, NO-CODE, IA :</span> <br> CROISSANCE DIGITALE, <br> BUSINESS SEREIN.',
    hero_subtitle:
      "Je transforme vos idées en solutions digitales performantes. Du sur‑mesure au no‑code, avec intégration de l'IA, je livre des solutions web complètes et efficaces.",
    build_gallery_title: 'Galerie de Projets',
    build_gallery_desc:
      'Parcourez mes projets réalisés avec aperçu GitHub et démonstrations en ligne.',
    label_completed: 'Terminé',
    label_active: 'Actif',
    code_craft_title: 'Code & Savoir‑faire',
    code_craft_desc:
      'Expertise full‑stack, du front réactif aux architectures back‑end scalables.',
    digital_alchemy_title: 'Alchimie Digitale',
    digital_alchemy_desc: 'Transformer des besoins complexes en expériences élégantes et fluides.',
    tech_horizons_title: 'Horizons Tech',
    tech_horizons_desc:
      'Nous explorons sans cesse de nouvelles technologies à ajouter à la plateforme.',
    solution_stack_title: 'Stack de Solutions',
    client_victories_title: 'Succès Clients',
    success_playbook_title: 'Playbook du Succès',
    skill_spectrum_title: 'Spectre de Compétences',
    trust_chronicles_title: 'Chroniques de Confiance',
    zero_to_launch_title: 'De Zéro au Lancement',
    generic_list_desc:
      "Nous avons compilé les figures les plus marquantes du software et leurs chemins vers la réussite.",
    contact_title: 'Construisons Demain',
    form_name_label: 'Nom',
    form_name_placeholder: 'Votre nom',
    form_email_label: 'Email',
    form_email_placeholder: 'Votre email',
    form_message_label: 'Message',
    form_message_placeholder: 'Parlez‑moi de votre projet…',
    form_submit: 'Envoyer',
    // Bannière de succès
    success_title: 'Message envoyé avec succès',
    success_message: 'Merci de nous avoir contactés ! Nous allons étudier votre projet avec attention et revenir vers vous très rapidement pour discuter de la suite.',
    success_btn_portfolio: 'Découvrir mes projets',
    success_btn_home: 'Retour à l\'accueil',
    cooldown_title: 'Envoyer un autre formulaire dans',
    cooldown_subtitle: 'Nous vous recontacterons bien avant !',
    resend_title: 'Un autre projet ?',
    resend_btn: 'Nouveau message',
    transparent_build_rates_title: 'Tarifs de Construction Transparants',
    roi_pricing_title: 'Tarification orientée ROI',
    cv_title: 'Développeur Web Full‑stack',
    cv_status: 'Disponible pour opportunités',
    cv_summary_title: 'Résumé',
    cv_summary_text:
      "Développeur web junior passionné, récemment diplômé. Expérience pratique en React.js, Node.js, HTML/CSS et JavaScript. Fort de 7 ans en Customer Success dans des SaaS, je comprends les enjeux clients et communique efficacement. Motivé pour contribuer à des projets innovants au sein d'équipes dynamiques.",
    cv_experience_title: 'Expériences - Projets',
    cv_exp1_title: 'Développeur Web Full Stack',
    cv_exp1_period: "2023 - Aujourd'hui",
    cv_exp1_subtitle: "Diplôme de développeur web (Bac+2)",
    cv_exp1_b1: 'Maîtrise de HTML, CSS, Javascript, Node.js et React',
    cv_exp1_b2: '4 projets majeurs réalisés, focus e‑commerce',
    cv_exp1_b3: 'Compétences front‑end et back‑end',
    cv_exp2_title: 'Customer Success Manager',
    cv_exp2_period: '2019 - 2023',
    cv_exp2_subtitle: 'Selligent - Paris',
    cv_exp2_b1: 'Support de campagnes marketing via CRM et automation',
    cv_exp2_b2: 'Formations clients sur les fonctionnalités de la plateforme',
    cv_exp2_b3: 'Localisation des contenus pour des marchés variés',
    cv_exp2_b4: "Stratégies d'onboarding pour booster l'adoption",
    cv_exp3_title: 'Customer Success Manager',
    cv_exp3_period: '2016 - 2019',
    cv_exp3_subtitle: 'Launchmetrics - Paris',
    cv_exp3_b1: 'Onboarding des nouveaux clients',
    cv_exp3_b2: 'Gestion de projets avec les chefs de projet techniques',
    cv_exp3_b3: 'Détection d’opportunités et transmission aux ventes',
    cv_exp3_b4: 'Mise à jour continue des KOL et utilisateurs',
    cv_exp3_b5: 'Support client',
    cv_education_title: 'Formation',
    cv_edu1_title: 'Diplôme Développeur Web (Bac+2)',
    cv_edu1_subtitle: 'OpenClassrooms',
    cv_edu2_title: 'BTS Commerce',
    cv_edu2_subtitle: 'Lycée Saint‑Lambert - Paris',
    cv_skills_title: 'Compétences Techniques',
    cv_softskills_title: 'Soft Skills',
    cv_languages_title: 'Langues',
    lang_french: 'Français',
    lang_native: 'Natif',
    lang_english: 'Anglais',
    lang_fluent: 'Courant',
    footer_contact_me: 'Me contacter',
    footer_follow_me: 'Me suivre',
    footer_quick_links: 'Liens rapides',
    ql_freelance: 'Prestations Freelance',
    ql_resume: 'Mon CV',
    ql_contact: 'Formulaire de contact',
    ql_terms: "Conditions d'utilisation",
    ql_privacy: 'Politique de confidentialité',
    // --- Pages légales (CGU & Confidentialité) ---
    last_updated_label: 'Dernière mise à jour',
    back_to_site: 'Retour au site',
    // Conditions d'utilisation
    tos_title: "Conditions d'utilisation",
    tos_acceptance_title: '1. Acceptation',
    tos_acceptance_body:
      "En accédant à ce site, vous acceptez ces conditions d’utilisation.",
    tos_ip_title: '2. Propriété intellectuelle',
    tos_ip_body:
      'Le contenu et les marques appartiennent à FullDevGear sauf mention contraire.',
    tos_limitations_title: '3. Limitations',
    tos_limitations_body:
      'Ce site est fourni « tel quel ». Aucune garantie expresse ou implicite.',
    tos_contact_title: '4. Contact',
    tos_contact_body_html:
      'Pour toute question : <a href="mailto:issa@fulldevgear.com">issa@fulldevgear.com</a>.',
    // Politique de confidentialité
    privacy_title: 'Politique de confidentialité',
    privacy_data_title: 'Données collectées',
    privacy_data_body:
      "Ce site ne collecte pas de données personnelles sans votre consentement. Les liens externes vers Calendly/Telegram/WhatsApp peuvent appliquer leurs propres politiques.",
    privacy_cookies_title: 'Cookies',
    privacy_cookies_body: 'Pas de cookies de tracking tiers.',
    privacy_contact_title: 'Contact',
    privacy_contact_body_html:
      'Pour exercer vos droits : <a href="mailto:issa@fulldevgear.com">issa@fulldevgear.com</a>.',
  },
};

const getInitialLang = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const fromUrl = urlParams.get('lang');
  if (fromUrl && SUPPORTED_LANGS.includes(fromUrl)) {
    return fromUrl;
  }
  const saved = localStorage.getItem(I18N_STORAGE_KEY);
  if (saved && SUPPORTED_LANGS.includes(saved)) { return saved; }
  return 'en';
};

const setHtmlLangAttr = (lang) => {
  document.documentElement.setAttribute('lang', lang);
};

const applyTranslations = (lang) => {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key && dict[key] !== null) {
      el.textContent = dict[key];
    }
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (key && dict[key] !== null) {
      el.innerHTML = dict[key];
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key && dict[key] !== null) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  const flag = lang === 'en' ? '🇬🇧' : '🇫🇷';
  const code = lang.toUpperCase();
  const toggleBtn = document.querySelector('[data-lang-toggle]');
  if (toggleBtn) {
    toggleBtn.textContent = `${flag} ${code}`;
    toggleBtn.setAttribute('aria-label', lang === 'en' ? 'Change language' : 'Changer de langue');
    toggleBtn.setAttribute('title', lang === 'en' ? 'Change language' : 'Changer de langue');
  }
  const toggleMenuLink = document.querySelector('[data-lang-toggle-menu]');
  if (toggleMenuLink) {
    toggleMenuLink.textContent = `${flag} ${code}`;
    toggleMenuLink.setAttribute('aria-label', lang === 'en' ? 'Change language' : 'Changer de langue');
    toggleMenuLink.setAttribute('title', lang === 'en' ? 'Change language' : 'Changer de langue');
  }
};

// Fonction pour écouter les changements de langue
let langChangeCallbacks = [];

const switchLanguage = (nextLang) => {
  const lang = SUPPORTED_LANGS.includes(nextLang) ? nextLang : 'en';
  localStorage.setItem(I18N_STORAGE_KEY, lang);
  setHtmlLangAttr(lang);
  applyTranslations(lang);

  // Notifier tous les callbacks
  langChangeCallbacks.forEach(callback => callback(lang));

  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  history.replaceState(null, '', url.toString());
};

export const initI18n = () => {
  const current = getInitialLang();
  setHtmlLangAttr(current);
  applyTranslations(current);
  const toggleBtn = document.querySelector('[data-lang-toggle]');
  const toggleMenuLink = document.querySelector('[data-lang-toggle-menu]');
  const handler = (e) => {
    if (e) { e.preventDefault(); }
    const now = localStorage.getItem(I18N_STORAGE_KEY) || current;
    const next = now === 'en' ? 'fr' : 'en';
    switchLanguage(next);
  };
  if (toggleBtn) { toggleBtn.addEventListener('click', handler); }
  if (toggleMenuLink) { toggleMenuLink.addEventListener('click', handler); }
};

// Export pour obtenir la langue actuelle et les traductions
export const getCurrentLang = () => {
  return localStorage.getItem(I18N_STORAGE_KEY) || getInitialLang();
};

export const getTranslation = (key) => {
  const lang = getCurrentLang();
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  return dict[key] || key;
};

export const onLanguageChange = (callback) => {
  langChangeCallbacks.push(callback);
};


