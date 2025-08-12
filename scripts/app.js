import { initI18n as initI18nModule } from './modules/i18n.js';
import { initializeTechWave as initializeTechWaveModule } from './modules/tech-wave.js';
import { setupContactForm as setupContactFormModule } from './modules/form.js';
import { createRouter as createRouterModule } from './modules/router.js';
import { setupCVScrollActivation } from './modules/cv.js';

// Make CV activation available for router module hooks
window.setupCVScrollActivation = setupCVScrollActivation;

document.addEventListener('DOMContentLoaded', () => {
  const DEBUG = false;
  // --- Lightweight i18n ---
  const I18N_STORAGE_KEY = 'fdg_lang';
  const SUPPORTED_LANGS = ['en', 'fr'];
  const TRANSLATIONS = {
    en: {
      skip_content: 'Skip to content',
      nav_cv: 'CV',
      hero_title: '<span class="nowrap-desktop">CODE, NO-CODE, AI:</span> <br> DIGITAL GROWTH, <br> BUSINESS BLISS.',
      hero_subtitle: 'Transforming ideas into powerful digital solutions. From custom development to no-code platforms and AI integration, I deliver comprehensive web solutions that drive results.',
      build_gallery_title: 'Build Gallery',
      build_gallery_desc: 'Explore my completed projects with GitHub previews and live demonstrations.',
      label_completed: 'Completed',
      label_active: 'Active',
      code_craft_title: 'Code & Craft',
      code_craft_desc: 'Expert development across the full stack, from responsive front-ends to scalable back-end architectures.',
      digital_alchemy_title: 'Digital Alchemy',
      digital_alchemy_desc: 'Turning complex business requirements into elegant, user-friendly digital experiences.',
      tech_horizons_title: 'Tech Horizons',
      tech_horizons_desc: "We're always looking for new and exciting tech to add to our platform.",
      solution_stack_title: 'Solution Stack',
      client_victories_title: 'Client victories',
      success_playbook_title: 'Success Playbook',
      skill_spectrum_title: 'Skill Spectrum',
      trust_chronicles_title: 'Trust Chronicles',
      zero_to_launch_title: 'Zero To Launch',
      generic_list_desc: "We've compiled a list of the most successful people in the software industry and what they've done to get there.",
      contact_title: "Let's Build Tomorrow",
      form_name_label: 'Name',
      form_name_placeholder: 'Your Name',
      form_email_label: 'Email',
      form_email_placeholder: 'Your Email',
      form_message_label: 'Message',
      form_message_placeholder: 'Tell me about your project...',
      form_submit: 'Send Message',
      transparent_build_rates_title: 'Transparent Build Rates',
      roi_pricing_title: 'ROI-Driven Pricing',
      cv_title: 'Full-stack Web Developer',
      cv_status: 'Available for opportunities',
      cv_summary_title: 'Summary',
      cv_summary_text: 'Passionate Junior Web Developer, recently graduated. Hands-on experience in building web applications using React.js, Node.js, HTML/CSS, and JavaScript. Backed by 7 years of experience in customer success roles within SaaS companies, offering a deep understanding of client needs and excellent communication skills. Eager to contribute to innovative projects within a dynamic team environment.',
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
    },
    fr: {
      skip_content: 'Aller au contenu',
      nav_cv: 'CV',
      hero_title: '<span class="nowrap-desktop">CODE, NO-CODE, IA :</span> <br> CROISSANCE DIGITALE, <br> BUSINESS SEREIN.',
      hero_subtitle: "Je transforme vos idées en solutions digitales performantes. Du sur‑mesure au no‑code, avec intégration de l'IA, je livre des solutions web complètes et efficaces.",
      build_gallery_title: 'Galerie de Projets',
      build_gallery_desc: 'Parcourez mes projets réalisés avec aperçu GitHub et démonstrations en ligne.',
      label_completed: 'Terminé',
      label_active: 'Actif',
      code_craft_title: 'Code & Savoir‑faire',
      code_craft_desc: "Expertise full‑stack, du front réactif aux architectures back‑end scalables.",
      digital_alchemy_title: 'Alchimie Digitale',
      digital_alchemy_desc: 'Transformer des besoins complexes en expériences élégantes et fluides.',
      tech_horizons_title: 'Horizons Tech',
      tech_horizons_desc: "Nous explorons sans cesse de nouvelles technologies à ajouter à la plateforme.",
      solution_stack_title: 'Stack de Solutions',
      client_victories_title: 'Succès Clients',
      success_playbook_title: 'Playbook du Succès',
      skill_spectrum_title: 'Spectre de Compétences',
      trust_chronicles_title: 'Chroniques de Confiance',
      zero_to_launch_title: 'De Zéro au Lancement',
      generic_list_desc: "Nous avons compilé les figures les plus marquantes du software et leurs chemins vers la réussite.",
      contact_title: 'Construisons Demain',
      form_name_label: 'Nom',
      form_name_placeholder: 'Votre nom',
      form_email_label: 'Email',
      form_email_placeholder: 'Votre email',
      form_message_label: 'Message',
      form_message_placeholder: 'Parlez‑moi de votre projet…',
      form_submit: 'Envoyer',
      transparent_build_rates_title: 'Tarifs de Construction Transparants',
      roi_pricing_title: 'Tarification orientée ROI',
      cv_title: 'Développeur Web Full‑stack',
      cv_status: 'Disponible pour opportunités',
      cv_summary_title: 'Résumé',
      cv_summary_text: "Développeur web junior passionné, récemment diplômé. Expérience pratique en React.js, Node.js, HTML/CSS et JavaScript. Fort de 7 ans en Customer Success dans des SaaS, je comprends les enjeux clients et communique efficacement. Motivé pour contribuer à des projets innovants au sein d'équipes dynamiques.",
      cv_experience_title: 'Expériences - Projets',
      cv_exp1_title: 'Développeur Web Full Stack',
      cv_exp1_period: '2023 - Aujourd\'hui',
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
      ql_terms: 'Conditions d\'utilisation',
      ql_privacy: 'Politique de confidentialité',
    }
  };

  const getInitialLang = () => {
    // 1) URL param has priority
    const urlParams = new URLSearchParams(window.location.search);
    const fromUrl = urlParams.get('lang');
    if (fromUrl && SUPPORTED_LANGS.includes(fromUrl)) {
      return fromUrl;
    }
    // 2) Persisted value
    const saved = localStorage.getItem(I18N_STORAGE_KEY);
    if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
    // 3) Default to English
    return 'en';
  };

  const setHtmlLangAttr = (lang) => {
    document.documentElement.setAttribute('lang', lang);
  };

  const applyTranslations = (lang) => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    // Elements with textContent
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key && dict[key] != null) {
        el.textContent = dict[key];
      }
    });
    // Elements with innerHTML
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (key && dict[key] != null) {
        el.innerHTML = dict[key];
      }
    });
    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key && dict[key] != null) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    // Update toggle label (button and menu item) with flag + code
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

  const switchLanguage = (nextLang) => {
    const lang = SUPPORTED_LANGS.includes(nextLang) ? nextLang : 'en';
    localStorage.setItem(I18N_STORAGE_KEY, lang);
    setHtmlLangAttr(lang);
    applyTranslations(lang);
    // Sync URL parameter without reloading
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    history.replaceState(null, '', url.toString());
  };

  const initI18n = () => {
    const current = getInitialLang();
    setHtmlLangAttr(current);
    applyTranslations(current);
    const toggleBtn = document.querySelector('[data-lang-toggle]');
    const toggleMenuLink = document.querySelector('[data-lang-toggle-menu]');
    const handler = (e) => {
      if (e) e.preventDefault();
      const now = localStorage.getItem(I18N_STORAGE_KEY) || current;
      const next = now === 'en' ? 'fr' : 'en';
      switchLanguage(next);
    };
    if (toggleBtn) toggleBtn.addEventListener('click', handler);
    if (toggleMenuLink) toggleMenuLink.addEventListener('click', handler);
  };

  // --- Détection du navigateur pour optimisations spécifiques ---
  const detectBrowser = () => {
    const userAgent = navigator.userAgent;
    const vendor = navigator.vendor;

    // Détection Safari précise
    const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent) &&
      /apple/i.test(vendor) &&
      !window.chrome;

    // Détection Chrome
    const isChrome = /chrome/i.test(userAgent) &&
      /google/i.test(vendor) &&
      !!window.chrome;

    // Détection Firefox
    const isFirefox = /firefox/i.test(userAgent);

    // Détection Edge
    const isEdge = /edg/i.test(userAgent);

    if (DEBUG) console.log('Browser Detection:', { isSafari, isChrome, isFirefox, isEdge });

    return { isSafari, isChrome, isFirefox, isEdge };
  };

  // Appliquer les classes de navigateur au body
  const browserInfo = detectBrowser();
  const bodyElement = document.body;

  if (browserInfo.isSafari) {
    bodyElement.classList.add('browser-safari');
    if (DEBUG) console.log('Safari detected - Applying Safari-specific optimizations');
  } else if (browserInfo.isChrome) {
    bodyElement.classList.add('browser-chrome');
  } else if (browserInfo.isFirefox) {
    bodyElement.classList.add('browser-firefox');
  } else if (browserInfo.isEdge) {
    bodyElement.classList.add('browser-edge');
  } else {
    bodyElement.classList.add('browser-other');
  }

  // --- Fonctions d'optimisation Safari (portée globale) ---
  window.forceRepaintSafari = () => {
    if (!browserInfo.isSafari) return;

    if (DEBUG) console.log('Safari: Force repaint after transition');

    // Méthode 1: Force reflow en lisant des propriétés calculées
    const mainContent = document.querySelector('main#main-content');
    if (mainContent) {
      const computedStyle = window.getComputedStyle(mainContent);
      void computedStyle.getPropertyValue('transform');
      void mainContent.offsetHeight;
      void mainContent.scrollTop;
    }

    // Méthode 2: Force repaint temporaire
    document.body.style.transform = 'translateZ(0)';
    setTimeout(() => {
      document.body.style.transform = '';
    }, 10);

    // Méthode 3: Scroll micro-ajustement pour déclencher le rendu
    const currentScrollY = window.scrollY;
    window.scrollTo(0, currentScrollY + 1);
    requestAnimationFrame(() => {
      window.scrollTo(0, currentScrollY);
    });

    // Méthode 4: Force l'invalidation des animations CSS
    const sections = document.querySelectorAll('.main-content-area:not([hidden])');
    sections.forEach(section => {
      const animatedElements = section.querySelectorAll('[data-animation-item]');
      animatedElements.forEach(el => {
        // Force un reflow minimal
        void el.offsetHeight;
        // Trigger une re-animation légère
        el.style.transform = 'translateZ(0.01px)';
        requestAnimationFrame(() => {
          el.style.transform = '';
        });
      });
    });
  };

  // --- Constantes globales pour la configuration ---
  const REM_TO_PX = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const TILE_WIDTH_REM = 6.5;
  const GAP_REM = 1.5;
  const EFFECTIVE_UNIT_WIDTH_PX = (TILE_WIDTH_REM + GAP_REM) * REM_TO_PX;

  // --- Tech Wave Container Initialization ---
  const initializeTechWaveNow = () => {
    const waveContainer = document.querySelector('.tech-wave-container');
    if (!waveContainer) {
      console.warn('Tech wave container (.tech-wave-container) not found! Skipping tech wave initialization.');
      return;
    }

    // Intersection Observer pour optimiser les animations des tuiles
    // TOUTES les tuiles visibles auront l'animation, aucune limitation
    const tileVisibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const tile = entry.target;
        if (entry.isIntersecting) {
          // Tuile visible - activer l'animation (TOUTES les tuiles visibles)
          tile.classList.add('visible');
        } else {
          // Tuile non visible - désactiver l'animation
          tile.classList.remove('visible');
        }
      });

      // Debug: compter les tuiles animées
      const visibleTiles = waveContainer.querySelectorAll('.tech-tile.visible').length;
      const totalTiles = waveContainer.querySelectorAll('.tech-tile').length;
      if (DEBUG) console.log(`TechWave Performance: ${visibleTiles}/${totalTiles} tuiles animées`);
    }, {
      root: null, // Observer par rapport à la fenêtre du navigateur (viewport)
      rootMargin: '0px', // Pas de marge - animation exactement quand visible dans la fenêtre
      threshold: 0.1 // Déclencher quand 10% de la tuile est visible dans la fenêtre
    });

    const BASE_TECHNOLOGIES = [
      // Core Web Technologies
      { name: 'HTML5', path: './assets/icons/html5.svg' }, { name: 'CSS', path: './assets/icons/css.svg' },
      { name: 'JavaScript', path: './assets/icons/javascript.svg' }, { name: 'TypeScript', path: './assets/icons/typescript.svg' },

      // Frontend Frameworks & Libraries
      { name: 'React', path: './assets/icons/react.svg' }, { name: 'Vue.js', path: './assets/icons/vuedotjs.svg' },
      { name: 'Angular', path: './assets/icons/angular.svg' }, { name: 'Svelte', path: './assets/icons/svelte.svg' },
      { name: 'Next.js', path: './assets/icons/nextdotjs.svg' },

      // CSS Frameworks & Tools
      { name: 'Tailwind', path: './assets/icons/tailwindcss.svg' }, { name: 'Bootstrap', path: './assets/icons/bootstrap.svg' },
      { name: 'Sass', path: './assets/icons/sass.svg' }, { name: 'SCSS', path: './assets/icons/scss.svg' },

      // Backend Technologies
      { name: 'Node.js', path: './assets/icons/nodedotjs.svg' }, { name: 'Express', path: './assets/icons/express.svg' },
      { name: 'Fastify', path: './assets/icons/fastify.svg' }, { name: 'Bun', path: './assets/icons/bun.svg' },
      { name: 'Deno', path: './assets/icons/deno.svg' }, { name: 'PHP', path: './assets/icons/php.svg' },
      { name: 'Django', path: './assets/icons/django.svg' }, { name: 'Python', path: './assets/icons/python.svg' },

      // Databases & Storage
      { name: 'PostgreSQL', path: './assets/icons/postgresql.svg' }, { name: 'MySQL', path: './assets/icons/mysql.svg' },
      { name: 'MongoDB', path: './assets/icons/mongodb.svg' }, { name: 'SQLite', path: './assets/icons/sqlite.svg' },
      { name: 'Redis', path: './assets/icons/redis.svg' }, { name: 'Supabase', path: './assets/icons/supabase.svg' },

      // APIs & GraphQL
      { name: 'GraphQL', path: './assets/icons/graphql.svg' },

      // DevOps & Tools
      { name: 'Docker', path: './assets/icons/docker.svg' }, { name: 'Kubernetes', path: './assets/icons/kubernetes.svg' },
      { name: 'Git', path: './assets/icons/git.svg' }, { name: 'GitHub', path: './assets/icons/github.svg' },
      { name: 'Vite', path: './assets/icons/vite.svg' },

      // CMS & E-commerce
      { name: 'WordPress', path: './assets/icons/wordpress.svg' }, { name: 'Shopify', path: './assets/icons/shopify.svg' },
      { name: 'Joomla', path: './assets/icons/joomla.svg' },

      // AI & Machine Learning
      { name: 'OpenAI', path: './assets/icons/openai.svg' }, { name: 'Claude', path: './assets/icons/claude.svg' },
      { name: 'Gemini', path: './assets/icons/googlegemini.svg' }
    ];

    const TECH_BRAND_COLORS_FOR_TILES = [
      // Programming Languages - Featured
      { name: "javascript", tileBackground: "#F7DF1E", iconColor: "#000000", textColor: "#000000", description: "Created in just 10 days!", featured: true },
      { name: "typescript", tileBackground: "#3178C6", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Reduces bugs by 15%", featured: true },
      { name: "python", tileBackground: "#3776AB", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Named after Monty Python!", featured: true },
      { name: "php", tileBackground: "#777BB4", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Powers 79% of websites" },
      { name: "ruby", tileBackground: "#CC342D", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Designed for happiness" },
      { name: "go", tileBackground: "#00ADD8", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Compiles lightning fast" },
      { name: "rust", tileBackground: "#DEA584", iconColor: "#000000", textColor: "#000000", description: "Prevents 70% of security bugs" },
      { name: "kotlin", tileBackground: "#7F52FF", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Google's preferred for Android" },
      { name: "swift", tileBackground: "#FA7343", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "2.6x faster than Objective-C" },
      { name: "sql", tileBackground: "#CC3333", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Essential since 1974" },

      // Web Fundamentals
      { name: "html5", tileBackground: "#E34C26", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Invented in 1990" },
      { name: "css", tileBackground: "#663399", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Styles everything beautifully" },

      // Frontend Frameworks - Featured
      { name: "react", tileBackground: "#61DAFB", iconColor: "#000000", textColor: "#000000", description: "Uses Virtual DOM", featured: true },
      { name: "angular", tileBackground: "#DD0031", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "TypeScript by default", featured: true },
      { name: "vue.js", tileBackground: "#4FC08D", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Created by ex-Googler" },
      { name: "svelte", tileBackground: "#FF3E00", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "No runtime needed" },
      { name: "next.js", tileBackground: "#0070F3", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "SSR & static generation", featured: true },
      { name: "nuxt.js", tileBackground: "#00C58E", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Next.js for Vue" },
      { name: "gatsby", tileBackground: "#663399", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Blazing fast static sites" },
      { name: "astro", tileBackground: "#FF5D01", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Mix React, Vue & Svelte" },
      { name: "solid.js", tileBackground: "#2C4F7C", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "2x faster than React" },
      { name: "qwik", tileBackground: "#BC2525", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Instant loading" },
      { name: "jquery", tileBackground: "#0769AD", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "95% of sites in 2015" },

      // State Management
      { name: "redux", tileBackground: "#764ABC", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Facebook's Flux architecture" },
      { name: "zustand", tileBackground: "#2D3748", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Only 3KB, replaces Redux" },
      { name: "jotai", tileBackground: "#6366F1", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Atomic state management" },
      { name: "recoil", tileBackground: "#336699", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Facebook's React state" },
      { name: "pinia", tileBackground: "#FDCF39", iconColor: "#000000", textColor: "#000000", description: "Official Vuex successor" },
      { name: "vuex", tileBackground: "#4FC08D", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Inspired by Redux" },
      { name: "rxjs", tileBackground: "#B724C4", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Observable streams" },

      // CSS Frameworks & Tools - Featured
      { name: "tailwind", tileBackground: "#06B6D4", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "500+ utility classes", featured: true },
      { name: "bootstrap", tileBackground: "#7952B3", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Created by Twitter 2011", featured: true },
      { name: "sass", tileBackground: "#CC6699", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "First CSS preprocessor" },
      { name: "scss", tileBackground: "#CC6699", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Modern Sass syntax" },
      { name: "less", tileBackground: "#1D365D", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "JavaScript compilation" },
      { name: "styled-components", tileBackground: "#DB7093", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "CSS-in-JS for React" },
      { name: "emotion", tileBackground: "#DD0031", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Better than styled-comp" },

      // Build Tools
      { name: "vite", tileBackground: "#41d1ff", iconColor: "original", textColor: "#FFFFFF", description: "100x faster than Webpack" },
      { name: "webpack", tileBackground: "#8DD6F9", iconColor: "#000000", textColor: "#000000", description: "Bundles 200+ file types" },
      { name: "babel", tileBackground: "#F9DC3E", iconColor: "#000000", textColor: "#000000", description: "JS for all browsers" },
      { name: "eslint", tileBackground: "#4B32C3", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Detects 200+ errors" },
      { name: "prettier", tileBackground: "#F7B93E", iconColor: "#000000", textColor: "#000000", description: "Auto code formatting" },

      // Backend & Runtime - Featured
      { name: "node.js", tileBackground: "#339933", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Uses Chrome's V8 engine", featured: true },
      { name: "express", tileBackground: "#404040", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Most popular Node.js framework" },
      { name: "nestjs", tileBackground: "#EA2845", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Angular for backend" },
      { name: "koa", tileBackground: "#4A4A4A", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Created by Express team" },
      { name: "fastify", tileBackground: "#202020", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "76,000 requests/second" },
      { name: "django", tileBackground: "#092E20", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Don't Repeat Yourself" },
      { name: "flask", tileBackground: "#1F1F1F", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Micro-framework, 1000 lines" },
      { name: "fastapi", tileBackground: "#009688", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Auto OpenAPI docs" },
      { name: "laravel", tileBackground: "#FF2D20", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Most popular PHP" },
      { name: "symfony", tileBackground: "#1A1A1A", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Reusable components" },
      { name: "ruby on rails", tileBackground: "#CC0000", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Convention over config" },
      { name: "gin", tileBackground: "#00ADD8", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "40x faster than others" },
      { name: "echo", tileBackground: "#4CAF50", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Performant Go framework" },
      { name: "spring boot", tileBackground: "#6DB33F", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Simplifies Java dev" },
      { name: "ktor", tileBackground: "#007F52", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Built by JetBrains" },
      { name: "asp.net core", tileBackground: "#512BD4", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Cross-platform .NET" },
      { name: "bun", tileBackground: "#FFF000", iconColor: "#000000", textColor: "#000000", description: "4x faster than Node.js" },
      { name: "deno", tileBackground: "#2F2F2F", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "By Node.js creator" },

      // Databases - Featured
      { name: "postgresql", tileBackground: "#336791", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "30+ years, native JSON", featured: true },
      { name: "mysql", tileBackground: "#4479A1", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Used by FB, Google, Twitter" },
      { name: "mariadb", tileBackground: "#003545", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "MySQL fork by creator" },
      { name: "sqlite", tileBackground: "#003B57", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Most deployed database" },
      { name: "mongodb", tileBackground: "#47A248", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "BSON data storage" },
      { name: "redis", tileBackground: "#DC382D", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "1M+ operations/second" },
      { name: "elasticsearch", tileBackground: "#005571", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Real-time TB indexing" },
      { name: "dynamodb", tileBackground: "#23354E", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Millions requests/second" },
      { name: "firestore", tileBackground: "#FFCA28", iconColor: "#000000", textColor: "#000000", description: "Real-time sync" },
      { name: "supabase", tileBackground: "#3ECF8E", iconColor: "#000000", textColor: "#000000", description: "Open-source Firebase" },
      { name: "planetscale", tileBackground: "#1C1C1C", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Uses YouTube's Vitess" },
      { name: "cockroachdb", tileBackground: "#697A8D", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Survives datacenter fails" },
      { name: "faunadb", tileBackground: "#6633CC", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Global ACID transactions" },
      { name: "oracle database", tileBackground: "#F80000", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Since 1979" },

      // APIs & GraphQL
      { name: "rest", tileBackground: "#669900", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Defined by Roy Fielding 2000" },
      { name: "graphql", tileBackground: "#E10098", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Developed by Facebook 2012" },
      { name: "grpc", tileBackground: "#00B0D1", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "HTTP/2 + Protocol Buffers" },
      { name: "trpc", tileBackground: "#2585FF", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "End-to-end type safety" },
      { name: "stripe api", tileBackground: "#635BFF", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Billions processed annually" },
      { name: "twilio api", tileBackground: "#F22F46", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "SMS to 180+ countries" },
      { name: "google maps api", tileBackground: "#4285F4", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Used by Uber & Airbnb" },
      { name: "openai api", tileBackground: "#4CAF50", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Powers 1000s AI apps" },
      { name: "apollo", tileBackground: "#3F20BA", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Simplifies GraphQL" },

      // DevOps & Tools - Featured
      { name: "git", tileBackground: "#F05032", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "By Linux creator" },
      { name: "github", tileBackground: "#181717", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "200M+ repositories" },
      { name: "gitlab", tileBackground: "#FC6D26", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Integrated CI/CD" },
      { name: "bitbucket", tileBackground: "#2684FF", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Atlassian since 2010" },
      { name: "docker", tileBackground: "#2496ED", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Revolutionized deployment", featured: true },
      { name: "kubernetes", tileBackground: "#326CE5", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Millions of containers", featured: true },
      { name: "jenkins", tileBackground: "#D24939", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "1800+ plugins" },
      { name: "github actions", tileBackground: "#2088FF", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Win, Mac, Linux builds" },
      { name: "circleci", tileBackground: "#343434", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Infinite test parallelization" },

      // Cloud Platforms
      { name: "vercel", tileBackground: "#1A1A1A", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "10 second deploys" },
      { name: "netlify", tileBackground: "#00C7B7", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Popularized JAMstack" },
      { name: "aws", tileBackground: "#FF9900", iconColor: "#000000", textColor: "#000000", description: "70% cloud market" },
      { name: "gcp", tileBackground: "#4285F4", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Google Search infrastructure" },
      { name: "azure", tileBackground: "#0078D4", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "50% annual growth" },
      { name: "heroku", tileBackground: "#430098", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Invented PaaS" },
      { name: "digitalocean", tileBackground: "#008BFF", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Focuses on simplicity" },
      { name: "firebase", tileBackground: "#FFCA28", iconColor: "#000000", textColor: "#000000", description: "0 to millions scaling" },

      // Design & Testing Tools
      { name: "figma", tileBackground: "#F24E1E", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Runs in browser" },
      { name: "storybook", tileBackground: "#FF4785", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Isolates components" },
      { name: "cypress", tileBackground: "#04C38E", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Tests like real user" },
      { name: "playwright", tileBackground: "#2E8F01", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Chrome, Firefox, Safari" },
      { name: "jest", tileBackground: "#C21325", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Maintained by Meta" },
      { name: "vitest", tileBackground: "#6DAB22", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Jest compatible, faster" },
      { name: "postman", tileBackground: "#FF6C37", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "20M+ users" },
      { name: "insomnia", tileBackground: "#584984", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "GraphQL & REST focus" },

      // Web Servers & Infrastructure
      { name: "nginx", tileBackground: "#269539", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "400M+ websites" },
      { name: "apache", tileBackground: "#D22128", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Since 1995" },
      { name: "terraform", tileBackground: "#7B42BC", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Manages any infrastructure" },
      { name: "ansible", tileBackground: "#EE0000", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Agentless automation" },

      // CMS & E-commerce
      { name: "wordpress", tileBackground: "#21759B", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "40% of all websites" },
      { name: "shopify", tileBackground: "#7AB55C", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "$200B+ sales annually" },
      { name: "joomla", tileBackground: "#5091CD", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "3% of global websites" },

      // AI & Machine Learning
      { name: "openai", tileBackground: "#412991", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "100M users in 2 months" },
      { name: "claude", tileBackground: "#CC785C", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "150K+ word analysis" },
      { name: "gemini", tileBackground: "#4285F4", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Multimodal AI" },
    ];

    const techStyleMap = TECH_BRAND_COLORS_FOR_TILES.reduce((acc, tech) => {
      acc[tech.name.toUpperCase()] = {
        ...tech,
        description: tech.description || 'A cool technology.'
      };
      return acc;
    }, {});

    const DEFAULT_STYLE = {
      tileBackground: '#222222',
      iconColor: 'default',
      textColor: '#CCCCCC',
      description: 'No description available.'
    };

    waveContainer.innerHTML = '';

    let sharedPongDirection = 1;
    let globalSpeedMultiplier = 1.0;

    // Fonction robuste pour distribuer les technologies sans doublons adjacents
    const shuffleArray = (array) => {
      if (array.length <= 1) return [...array];

      // Étape 1: Analyser la fréquence de chaque technologie
      const techCounts = {};
      array.forEach(item => {
        techCounts[item.name] = (techCounts[item.name] || 0) + 1;
      });

      // Étape 2: Détecter si nous avons trop de répétitions pour certaines technologies
      const maxCount = Math.max(...Object.values(techCounts));
      const totalTechs = Object.keys(techCounts).length;

      // Si une technologie apparaît plus de la moitié du nombre total de types,
      // nous devons utiliser une distribution forcée
      if (maxCount > Math.ceil(totalTechs / 2)) {
        if (DEBUG) console.log('TechWave: Distribution forcée nécessaire - trop de répétitions détectées');
        return distributeWithForcedSpacing(array, techCounts);
      }

      // Étape 3: Distribution round-robin optimisée pour cas normaux
      const groups = {};
      array.forEach(item => {
        if (!groups[item.name]) groups[item.name] = [];
        groups[item.name].push(item);
      });

      // Mélanger individuellement chaque groupe
      Object.keys(groups).forEach(name => {
        for (let i = groups[name].length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [groups[name][i], groups[name][j]] = [groups[name][j], groups[name][i]];
        }
      });

      // Distribution intelligente par vagues
      const result = [];
      const groupNames = Object.keys(groups);
      const maxGroupSize = Math.max(...Object.values(groups).map(g => g.length));

      // Mélanger l'ordre des groupes
      for (let i = groupNames.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [groupNames[i], groupNames[j]] = [groupNames[j], groupNames[i]];
      }

      // Distribution par rounds avec variation d'ordre
      for (let round = 0; round < maxGroupSize; round++) {
        const roundOrder = [...groupNames];

        // Varier l'ordre à chaque round pour plus de diversité
        if (round % 3 === 1) {
          roundOrder.reverse();
        } else if (round % 3 === 2) {
          // Mélange partiel
          for (let i = 0; i < roundOrder.length - 1; i += 2) {
            [roundOrder[i], roundOrder[i + 1]] = [roundOrder[i + 1], roundOrder[i]];
          }
        }

        roundOrder.forEach(name => {
          if (groups[name][round]) {
            result.push(groups[name][round]);
          }
        });
      }

      return result;
    };

    // Fonction de distribution avec espacement forcé pour les cas difficiles
    const distributeWithForcedSpacing = (array, techCounts) => {
      const result = [];
      const groups = {};

      // Regrouper par technologie
      array.forEach(item => {
        if (!groups[item.name]) groups[item.name] = [];
        groups[item.name].push(item);
      });

      // Identifier la technologie la plus fréquente
      const mostFrequentTech = Object.keys(techCounts).reduce((a, b) =>
        techCounts[a] > techCounts[b] ? a : b
      );

      const mostFrequentItems = groups[mostFrequentTech];
      delete groups[mostFrequentTech];

      // Créer un pool avec les autres technologies
      const otherItems = [];
      Object.values(groups).forEach(group => {
        otherItems.push(...group);
      });

      // Mélanger le pool d'autres technologies
      for (let i = otherItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [otherItems[i], otherItems[j]] = [otherItems[j], otherItems[i]];
      }

      // Distribution alternée: insérer les éléments fréquents entre les autres
      let otherIndex = 0;
      let frequentIndex = 0;

      // Calculer l'espacement idéal
      const spacing = Math.max(2, Math.floor(otherItems.length / mostFrequentItems.length));

      while (frequentIndex < mostFrequentItems.length || otherIndex < otherItems.length) {
        // Ajouter plusieurs éléments "autres" avant chaque élément fréquent
        for (let i = 0; i < spacing && otherIndex < otherItems.length; i++) {
          result.push(otherItems[otherIndex++]);
        }

        // Ajouter un élément de la technologie fréquente
        if (frequentIndex < mostFrequentItems.length) {
          result.push(mostFrequentItems[frequentIndex++]);
        }
      }

      // Ajouter les éléments restants
      while (otherIndex < otherItems.length) {
        result.push(otherItems[otherIndex++]);
      }

      if (DEBUG) console.log(`TechWave: Distribution forcée appliquée - ${mostFrequentTech} espacé avec ratio ${spacing}:1`);
      return result;
    };

    const createTechTile = (tech, currentAnimState) => {
      const tile = document.createElement('div');
      tile.classList.add('tech-tile');

      const techNameUpper = tech.name.toUpperCase();
      const styleInfo = techStyleMap[techNameUpper] || DEFAULT_STYLE;

      if (styleInfo.featured) {
        tile.classList.add('featured-tile');
      }

      tile.style.backgroundColor = styleInfo.tileBackground;
      tile.style.setProperty('--tile-glow-color', styleInfo.tileBackground);

      // Enregistrer la tuile avec l'Intersection Observer
      tileVisibilityObserver.observe(tile);

      const frontFace = document.createElement('div');
      frontFace.classList.add('tile-face', 'tile-front');

      const logoElement = document.createElement('img');
      logoElement.classList.add('tech-tile-logo');
      logoElement.src = tech.path;
      logoElement.alt = tech.name;
      logoElement.loading = 'lazy';
      // Reset classes to avoid conflicts
      logoElement.classList.remove('logo-use-original-colors', 'logo-force-color-white', 'logo-force-color-black');
      if (styleInfo.iconColor === 'original') {
        logoElement.classList.add('logo-use-original-colors');
      } else if (styleInfo.iconColor === '#FFFFFF') {
        logoElement.classList.add('logo-force-color-white');
      } else if (styleInfo.iconColor === '#000000') {
        logoElement.classList.add('logo-force-color-black');
      } else if (typeof styleInfo.iconColor === 'string' && styleInfo.iconColor !== 'default') {
        logoElement.classList.add('logo-use-original-colors');
      }
      frontFace.appendChild(logoElement);

      const nameElement = document.createElement('div');
      nameElement.classList.add('tech-tile-name');
      nameElement.textContent = tech.name.toUpperCase();
      nameElement.style.color = styleInfo.textColor;
      frontFace.appendChild(nameElement);
      tile.appendChild(frontFace);

      const backFace = document.createElement('div');
      backFace.classList.add('tile-face', 'tile-back');
      if (styleInfo.description && styleInfo.description !== DEFAULT_STYLE.description) {
        backFace.textContent = styleInfo.description;
      }
      backFace.style.color = '#FFFFFF';
      tile.appendChild(backFace);

      let flipTimeoutId = null;
      const FLIP_TIMEOUT_MS = 10000;

      const flipCard = () => {
        tile.classList.toggle('is-flipped');
        if (flipTimeoutId) {
          clearTimeout(flipTimeoutId);
          flipTimeoutId = null;
        }
        if (tile.classList.contains('is-flipped')) {
          flipTimeoutId = setTimeout(() => {
            tile.classList.remove('is-flipped');
            flipTimeoutId = null;
          }, FLIP_TIMEOUT_MS);
        } else {
          if (currentAnimState) {
            currentAnimState.isPaused = false;
          }
        }
      };

      tile.addEventListener('click', flipCard);
      return tile;
    };

    const createAndAttachScroller = (uniqueTechListPart, animState, containerElement) => {
      const scroller = document.createElement('div');
      scroller.classList.add('tech-tiles-scroller');
      scroller.setAttribute('tabindex', '0');

      const populateFragment = (list) => {
        const fragment = document.createDocumentFragment();
        list.forEach((tech) => {
          const tile = createTechTile(tech, animState);
          fragment.appendChild(tile);
        });
        return fragment;
      };

      // Measure the width of one set of the unique technology part
      const tempScroller = document.createElement('div');
      tempScroller.style.visibility = 'hidden';
      tempScroller.style.position = 'absolute';
      tempScroller.style.whiteSpace = 'nowrap';
      tempScroller.style.display = 'flex';
      tempScroller.style.gap = `${GAP_REM}rem`;
      tempScroller.appendChild(populateFragment(uniqueTechListPart));
      document.body.appendChild(tempScroller);
      const singleSetWidth = tempScroller.scrollWidth;
      document.body.removeChild(tempScroller);

      const containerWidth = containerElement.clientWidth;
      // Ensure content width exceeds container by at least one set for seamless looping
      const copiesToAppend = Math.max(2, Math.ceil(containerWidth / singleSetWidth) + 1);

      if (DEBUG) console.log(`TechWave loop: setWidth=${singleSetWidth}px, container=${containerWidth}px, copies=${copiesToAppend}`);

      for (let i = 0; i < copiesToAppend; i++) {
        scroller.appendChild(populateFragment(uniqueTechListPart));
      }

      containerElement.appendChild(scroller);
      const contentTotalWidth = scroller.scrollWidth;

      return { scrollerElement: scroller, singleSetWidth, contentTotalWidth };
    };

    function startInfiniteLoopAnimation(scrollerState) {
      const element = scrollerState.element;
      if (!element) return;

      let currentX = 0;
      const SCROLL_SPEED_PX = 0.5; // base speed in px per frame
      const setWidth = scrollerState.singleSetWidth || 0;

      const step = () => {
        if (!scrollerState.isPaused && element) {
          const dir = scrollerState.baseSign; // -1 to move left, 1 to move right
          const applied = dir * SCROLL_SPEED_PX * globalSpeedMultiplier;
          currentX += applied;

          // Seamless wrap: when moving left beyond one set, wrap forward
          if (dir < 0 && Math.abs(currentX) >= setWidth) {
            currentX += setWidth; // e.g., -setWidth -> 0
          }
          // Moving right: keep currentX within [-setWidth, 0)
          if (dir > 0 && currentX > 0) {
            currentX -= setWidth;
          }

          element.style.transform = `translateX(${currentX}px)`;
        }
        scrollerState.animationFrameId = requestAnimationFrame(step);
      };
      scrollerState.animationFrameId = requestAnimationFrame(step);
    }

    const animationStates = [];

    const animState1 = {
      isReverse: false,
      baseSign: -1,
      isPaused: false,
      animationFrameId: null,
      element: null,
      contentTotalWidth: 0,
    };
    animationStates.push(animState1);

    const animState2 = {
      isReverse: true,
      baseSign: 1,
      isPaused: false,
      animationFrameId: null,
      element: null,
      contentTotalWidth: 0,
    };
    animationStates.push(animState2);

    // Shuffle the BASE_TECHNOLOGIES once to get a truly random and unique order
    const shuffledUniqueTechnologies = shuffleArray(BASE_TECHNOLOGIES);

    // Split the shuffled unique technologies for the two rows
    const midPoint = Math.ceil(shuffledUniqueTechnologies.length / 2);
    const shuffledPart1 = shuffledUniqueTechnologies.slice(0, midPoint);
    const shuffledPart2 = shuffledUniqueTechnologies.slice(midPoint);

    const scrollerData1 = createAndAttachScroller(shuffledPart1, animState1, waveContainer);
    animState1.element = scrollerData1.scrollerElement;
    animState1.contentTotalWidth = scrollerData1.contentTotalWidth;
    animState1.singleSetWidth = scrollerData1.singleSetWidth;

    const scrollerData2 = createAndAttachScroller(shuffledPart2, animState2, waveContainer);
    animState2.element = scrollerData2.scrollerElement;
    animState2.contentTotalWidth = scrollerData2.contentTotalWidth;
    animState2.singleSetWidth = scrollerData2.singleSetWidth;

    if (scrollerData1.scrollerElement) { void scrollerData1.scrollerElement.offsetHeight; }
    if (scrollerData2.scrollerElement) { void scrollerData2.scrollerElement.offsetHeight; }

    animationStates.forEach((state, index) => {
      if (state && state.element && state.contentTotalWidth > 0 && state.singleSetWidth > 0) {
        setTimeout(() => startInfiniteLoopAnimation(state), 16);
      } else {
        console.warn(`TechWave: Cannot start loop for state index ${index} due to invalid state, element, or widths.`, state);
      }
    });

    const MIN_SPEED_FACTOR = 0.6;
    const MAX_SPEED_FACTOR = 1.4;
    const SPEED_DECAY_RATE = 2;

    if (waveContainer) {
      waveContainer.addEventListener('mousemove', (event) => {
        const rect = waveContainer.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const containerWidth = rect.width;

        const normalizedDist = Math.abs(mouseX - containerWidth / 2) / (containerWidth / 2);
        globalSpeedMultiplier = MIN_SPEED_FACTOR + (MAX_SPEED_FACTOR - MIN_SPEED_FACTOR) * Math.pow(normalizedDist, SPEED_DECAY_RATE);
        globalSpeedMultiplier = Math.max(0.1, Math.min(globalSpeedMultiplier, 2.0));
      });

      waveContainer.addEventListener('mouseleave', () => {
        globalSpeedMultiplier = 1.0;
      });
    }

    // Fonction de nettoyage pour l'observer
    window.cleanupTechWaveObserver = () => {
      if (tileVisibilityObserver) {
        tileVisibilityObserver.disconnect();
      }
    };
  };

  // Lazy‑init Tech Wave: initialize only when container enters viewport
  const initializeTechWave = () => {
    const waveContainer = document.querySelector('.tech-wave-container');
    if (!waveContainer) return;
    const start = () => {
      observer && observer.disconnect();
      initializeTechWaveNow();
    };
    // If already visible, init immediately
    const rect = waveContainer.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      initializeTechWaveNow();
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          start();
        }
      });
    }, { root: null, rootMargin: '0px 0px 100px 0px', threshold: 0 });
    observer.observe(waveContainer);
  };

  initializeTechWaveModule();

  // Initialize i18n after initial DOM is ready
  initI18nModule();

  // --- Contact CTA Popup Logic ---
  const setupContactPopup = () => {
    const contactCtaBtn = document.getElementById('contact-cta-btn');
    const contactPopup = document.getElementById('contact-cta-links');

    if (!contactCtaBtn || !contactPopup) {
      console.warn('Contact CTA button or popup not found! Skipping contact popup setup.');
      return;
    }

    let isAnimating = false;

    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    let lastFocusedBeforeOpen = null;

    const trapFocus = (e) => {
      const focusable = contactPopup.querySelectorAll(focusableSelector);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const showPopup = () => {
      if (isAnimating) return;
      isAnimating = true;

      contactCtaBtn.setAttribute('aria-expanded', 'true');
      contactCtaBtn.classList.add('active');
      contactPopup.hidden = false;

      // Force reflow to ensure the element is rendered before animation
      contactPopup.offsetHeight;

      contactPopup.classList.add('show');

      // Focus management
      lastFocusedBeforeOpen = document.activeElement;
      const firstFocusable = contactPopup.querySelector(focusableSelector);
      if (firstFocusable) firstFocusable.focus();
      document.addEventListener('keydown', trapFocus);

      // Reset animation flag after animation completes
      setTimeout(() => {
        isAnimating = false;
      }, 500); // Match CSS transition duration
    };

    const hidePopup = () => {
      if (isAnimating) return;
      isAnimating = true;

      contactCtaBtn.setAttribute('aria-expanded', 'false');
      contactCtaBtn.classList.remove('active');
      contactPopup.classList.remove('show');

      // Restore focus and remove listeners
      document.removeEventListener('keydown', trapFocus);
      if (lastFocusedBeforeOpen) {
        try { lastFocusedBeforeOpen.focus(); } catch (_) { }
      }

      // Hide element after animation completes
      setTimeout(() => {
        contactPopup.hidden = true;
        isAnimating = false;
      }, 500); // Match CSS transition duration
    };

    const togglePopup = () => {
      const isExpanded = contactCtaBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        hidePopup();
      } else {
        showPopup();
      }
    };

    // Button click handler
    contactCtaBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      togglePopup();
    });

    // Close popup when clicking outside
    document.addEventListener('click', (event) => {
      const isExpanded = contactCtaBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded && !contactCtaBtn.contains(event.target) && !contactPopup.contains(event.target)) {
        hidePopup();
      }
    });

    // Close popup on Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && contactCtaBtn.getAttribute('aria-expanded') === 'true') {
        hidePopup();
        contactCtaBtn.focus(); // Return focus to button for accessibility
      }
    });

    // Add smooth hover effects for contact links
    const contactLinks = contactPopup.querySelectorAll('a[data-contact-link]');
    contactLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        if (!isAnimating) {
          link.style.transform = 'translateX(4px)';
        }
      });

      link.addEventListener('mouseleave', () => {
        if (!isAnimating) {
          link.style.transform = 'translateX(0)';
        }
      });
    });
  };

  setupContactPopup();

  // --- Navigation Dynamic Color Logic ---
  // --- Navigation Simple Color Logic (Ultra-optimisé) ---
  // Navigation color management removed - using fixed color like contact button

  // --- Header Scroll Effect ---
  const setupHeaderScrollEffect = () => {
    const header = document.querySelector('.header-container-logo-cta');
    if (!header) return;

    let isScrolled = false;
    const scrollThreshold = 50; // Pixels de scroll avant d'activer l'effet

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > scrollThreshold && !isScrolled) {
        header.classList.add('scrolled');
        isScrolled = true;
      } else if (scrollTop <= scrollThreshold && isScrolled) {
        header.classList.remove('scrolled');
        isScrolled = false;
      }
    };

    // Throttle pour optimiser les performances
    let scrollTimeout;
    const throttledHandleScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        handleScroll();
        scrollTimeout = null;
      }, 16); // ~60fps
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    // Vérifier l'état initial
    handleScroll();
  };

  setupHeaderScrollEffect();

  // --- SPA Routing & Transitions ---
  /* Keep original code path for safety, but prefer modular router */
  const SPA_ROUTING = (() => {
    const ROUTES = {
      '/': 'freelance-content',
      '/cv': 'cv-content',
    };
    const PAGE_TRANSITION_DURATION_MS = 500; // Keep this for consistency if needed for other timing

    let isTransitioning = false;
    const waveElement = document.getElementById('page-transition-wave');
    if (!waveElement) {
      console.error('Page transition wave element (#page-transition-wave) not found. SPA transitions will not work.');
      return {};
    }

    // Deprecated: path-based routing replaced by hash routing for static hosting
    const getPathFromUrl = (url) => {
      const fromHash = url.split('#')[1] || '';
      return fromHash ? `/${fromHash}` : '/';
    };

    /**
     * Affiche une section donnée avec une transition optionnelle.
     * @param {string} sectionId L'ID de la section à afficher.
     * @param {boolean} useTransition Indique si la transition de vague doit être utilisée.
     */
    const showSection = (sectionId, useTransition = true) => {
      if (isTransitioning && useTransition) {
        console.warn('Transition already in progress. Ignoring new navigation request.');
        return;
      }
      if (useTransition) {
        isTransitioning = true;
      }


      const allSections = document.querySelectorAll('.main-content-area');
      const sectionToShow = document.getElementById(sectionId);
      let sectionToHide = null;

      if (!sectionToShow) {
        console.error(`Section with ID '${sectionId}' not found.`);
        if (useTransition) isTransitioning = false;
        return;
      }

      // Find the currently visible section
      allSections.forEach(sec => {
        if (!sec.hidden && sec.id !== sectionId) { // Ensure it's not the target section itself
          sectionToHide = sec;
        }
      });

      // If the target section is already visible, or no actual change is needed, just finish.
      if (sectionToHide && sectionToHide.id === sectionToShow.id && useTransition) {
        console.log('Target section is already visible. No transition needed.');
        isTransitioning = false;
        return;
      }

      // Helper function to apply body class and trigger nav inversion with smooth timing
      const applyPageStyles = (targetSectionId) => {
        if (targetSectionId === 'cv-content') {
          document.body.classList.add('cv-dark-mode');
        } else {
          document.body.classList.remove('cv-dark-mode');
        }

        // Navigation color management removed - using fixed color
      };

      if (!useTransition) {
        // Direct display without transition for initial load
        allSections.forEach(sec => {
          sec.hidden = true;
          sec.classList.remove('fade-in', 'fade-out'); // Clean up any lingering animation classes
        });
        sectionToShow.hidden = false;

        applyPageStyles(sectionId);

        // Initialize CV scroll activation if navigating to CV page
        if (sectionId === 'cv-content') {
          setTimeout(setupCVScrollActivation, 50);
        }

        return; // Exit as transition is not used
      }

      // Start the transition (only if useTransition is true)
      waveElement.style.display = 'block';
      waveElement.classList.remove('wave-transition-sweep-out');

      // Sur mobile, forcer un repaint immédiat pour éviter les délais
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      if (isMobile) {
        // Forcer le navigateur à calculer immédiatement la position
        void waveElement.offsetHeight;
        // Petit délai pour laisser le navigateur se préparer
        requestAnimationFrame(() => {
          waveElement.classList.add('wave-transition-sweep-in');
        });
      } else {
        waveElement.classList.add('wave-transition-sweep-in');
      }

      waveElement.onanimationend = (event) => {
        if (event.animationName === 'wave-sweep-in') {
          waveElement.onanimationend = null; // Remove listener to prevent multiple calls

          // Hide old section if found
          if (sectionToHide) {
            sectionToHide.hidden = true;
            sectionToHide.classList.remove('fade-in', 'fade-out');
          }

          // Show new section
          sectionToShow.hidden = false;
          sectionToShow.classList.remove('fade-in', 'fade-out');

          // Scroll to top now - invisible because wave covers the screen
          window.scrollTo(0, 0);

          // Apply page styles with smooth timing
          applyPageStyles(sectionId);

          // Start sweep-out animation
          waveElement.classList.remove('wave-transition-sweep-in');
          waveElement.classList.add('wave-transition-sweep-out');

          waveElement.onanimationend = (event) => {
            if (event.animationName === 'wave-sweep-out') {
              waveElement.onanimationend = null;
              waveElement.style.display = 'none';
              waveElement.classList.remove('wave-transition-sweep-out');
              isTransitioning = false;



              // Safari: Force repaint après transition pour éviter le contenu figé
              setTimeout(() => window.forceRepaintSafari(), 50);

              // Initialize CV scroll activation if navigating to CV page
              if (sectionId === 'cv-content') {
                setTimeout(setupCVScrollActivation, 100);
              }
            }
          };
        }
      };
    };

    const updateNavActive = (currentPath) => {
      const navLinks = document.querySelectorAll('nav[aria-label="Main navigation"] a');
      navLinks.forEach(link => {
        const sectionId = link.getAttribute('data-section-toggle');
        const linkPath = Object.keys(ROUTES).find(key => ROUTES[key] === sectionId) || '/';

        if (linkPath === currentPath) {
          link.classList.add('nav-active');
        } else {
          link.classList.remove('nav-active');
        }
      });
    };

    const navigateTo = (path, push = true, useTransition = true) => {
      const sectionId = ROUTES[path];
      if (!sectionId) {
        if (DEBUG) console.warn(`Route not found for path: ${path}. Defaulting to freelance-content.`);
        path = '/';
      }

      // Utiliser showSection qui contient déjà toute la logique d'animation
      showSection(ROUTES[path], useTransition);

      updateNavActive(path);

      if (push) {
        const hash = `#${path === '/' ? '' : path.replace(/^\//, '')}`;
        if (window.location.hash !== hash) {
          window.location.hash = hash;
        }
      }
    };

    // Initialisation: Cacher toutes les sections et afficher celle par défaut SANS transition.
    document.querySelectorAll('.main-content-area').forEach(section => {
      section.hidden = true;
    });

    // Event listeners for main navigation
    document.querySelectorAll('nav[aria-label="Main navigation"] a').forEach(link => {
      link.addEventListener('click', e => {
        const sectionId = link.getAttribute('data-section-toggle');
        const path = Object.keys(ROUTES).find(key => ROUTES[key] === sectionId) || '/';

        const currentPath = window.location.hash.replace(/^#/, '') ? `/${window.location.hash.replace(/^#/, '')}` : '/';
        if (currentPath !== path) {
          e.preventDefault();
          navigateTo(path, true, true); // Use transition for clicks
        }
      });
    });

    // Event listeners for footer navigation
    document.querySelectorAll('footer nav a').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        let path = null;
        if (href === '#freelance') {
          path = '/';
        } else if (href === '#cv') {
          path = '/cv';
        }

        const currentPath = window.location.hash.replace(/^#/, '') ? `/${window.location.hash.replace(/^#/, '')}` : '/';
        if (path && currentPath !== path) {
          e.preventDefault();
          navigateTo(path, true, true); // Use transition for clicks
        }
      });
    });

    // Hash-based back/forward handling
    const getPathFromHash = () => {
      const raw = window.location.hash.replace(/^#/, '');
      return raw ? `/${raw}` : '/';
    };
    window.addEventListener('hashchange', () => {
      const path = getPathFromHash();
      navigateTo(path, false, true);
    });

    // Initial load: navigate using hash (static hosting safe)
    const initialPath = getPathFromHash();
    navigateTo(initialPath, false, false);

    // After initial load and navigation, make main content visible
    // This is to prevent FOUC on the initial load.
    const mainContent = document.querySelector('main#main-content');
    if (mainContent) {
      mainContent.style.opacity = '1';
    }

    return {
      navigateTo,
      showSection,
      updateNavActive
    };
  })();

  // Initialize modular router (non-breaking; it uses same DOM hooks)
  try { createRouterModule(); } catch (_) { }

  // --- CV Sections Scroll Activation for Mobile ---
  let cvSectionObserver = null; // Track the current observer to avoid multiple instances

  const setupCVScrollActivationInline = () => {
    // Only activate on mobile/tablet devices or when hover is not available
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
      window.matchMedia('(max-width: 1024px)').matches;

    if (!isTouchDevice) {
      return; // Exit early on desktop devices with hover capability
    }

    // Clean up existing observer to avoid duplicates
    if (cvSectionObserver) {
      cvSectionObserver.disconnect();
      cvSectionObserver = null;
    }

    const cvSections = document.querySelectorAll('#cv-content .cv-section');

    if (cvSections.length === 0) {
      return; // No CV sections found
    }

    // Configuration for the intersection observer
    const observerOptions = {
      root: null, // Use viewport as root
      rootMargin: '-10% 0px -10% 0px', // Trigger when section is 10% visible from top and bottom (less restrictive for mobile)
      threshold: [0.2, 0.5] // Trigger at 20% and 50% visibility (easier to trigger on mobile)
    };

    // Track currently active sections to avoid unnecessary DOM manipulations
    const activeSections = new Set();

    cvSectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const section = entry.target;
        const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.2;

        if (isVisible && !activeSections.has(section)) {
          // Section is becoming visible - activate it
          section.classList.add('cv-section-active');
          activeSections.add(section);

          // Add a subtle vibration feedback on mobile if supported
          if (navigator.vibrate && window.DeviceMotionEvent) {
            navigator.vibrate(50);
          }
        } else if (!isVisible && activeSections.has(section)) {
          // Section is becoming hidden - deactivate it
          section.classList.remove('cv-section-active');
          activeSections.delete(section);
        }
      });
    }, observerOptions);

    // Start observing all CV sections
    cvSections.forEach(section => {
      cvSectionObserver.observe(section);
    });

    // Clean up observer when navigating away from CV
    const cleanupCVSections = () => {
      const isCvPage = document.body.classList.contains('cv-dark-mode');
      if (!isCvPage) {
        // Clean up active states when leaving CV page
        activeSections.clear();
        cvSections.forEach(section => {
          section.classList.remove('cv-section-active');
        });
      }
    };

    // Listen for page changes to clean up CV sections
    document.addEventListener('DOMContentLoaded', cleanupCVSections);
    window.addEventListener('hashchange', cleanupCVSections);

    // Handle orientation changes and resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Re-trigger intersection checks after resize
        cvSections.forEach(section => {
          if (cvSectionObserver) {
            cvSectionObserver.unobserve(section);
            cvSectionObserver.observe(section);
          }
        });
      }, 250);
    });
  };

  // Initialize CV scroll activation
  setupCVScrollActivationInline();

  // Re-initialize when navigating to CV page
  const reinitializeCVOnPageChange = () => {
    const isCvPage = document.body.classList.contains('cv-dark-mode');
    if (isCvPage) {
      // Small delay to ensure DOM is ready
      setTimeout(setupCVScrollActivation, 100);
    }
  };

  // Listen for page changes to reinitialize CV functionality
  window.addEventListener('hashchange', reinitializeCVOnPageChange);
  try { window.addEventListener('hashchange', () => setupCVScrollActivation()); } catch (_) { }

  // --- Performance Optimization: Pause animations during scroll ---
  let scrollTimeout;
  let isScrolling = false;

  const handleScrollStart = () => {
    if (!isScrolling) {
      document.body.classList.add('scrolling');
      isScrolling = true;
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      document.body.classList.remove('scrolling');
      isScrolling = false;
    }, 150); // Resume animations 150ms after scroll stops
  };

  // Throttled scroll listener for better performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScrollStart();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // --- Contact form client-side validation & async submit ---
  const setupContactForm = () => {
    const form = document.querySelector('form[data-form-submit="contact"]');
    if (!form) return;
    const nameInput = form.querySelector('#contact-name');
    const emailInput = form.querySelector('#contact-email');
    const messageInput = form.querySelector('#contact-message');
    const status = form.querySelector('[data-form-status]');
    const errName = form.querySelector('#error-name');
    const errEmail = form.querySelector('#error-email');
    const errMessage = form.querySelector('#error-message');

    const setError = (el, errEl, message) => {
      if (errEl) errEl.textContent = message || '';
      if (message) {
        el.setAttribute('aria-invalid', 'true');
      } else {
        el.removeAttribute('aria-invalid');
      }
    };

    const validateName = () => {
      const value = nameInput.value.trim();
      if (value.length < 2) {
        setError(nameInput, errName, 'Please enter at least 2 characters.');
        return false;
      }
      setError(nameInput, errName, '');
      return true;
    };

    const validateEmail = () => {
      const value = emailInput.value.trim();
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(value)) {
        setError(emailInput, errEmail, 'Please enter a valid email address.');
        return false;
      }
      setError(emailInput, errEmail, '');
      return true;
    };

    const validateMessage = () => {
      const value = messageInput.value.trim();
      if (value.length < 10) {
        setError(messageInput, errMessage, 'Please enter at least 10 characters.');
        return false;
      }
      setError(messageInput, errMessage, '');
      return true;
    };

    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = '';
      const ok = [validateName(), validateEmail(), validateMessage()].every(Boolean);
      // Honeypot check
      const honey = form.querySelector('input[name="_honey"]');
      if (honey && honey.value) return; // silently drop bots
      if (!ok) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      const prevLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      try {
        const formData = new FormData(form);
        const res = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          form.reset();
          status.textContent = 'Message sent. Thank you!';
        } else {
          status.textContent = 'An error occurred. Please try again later.';
        }
      } catch (err) {
        status.textContent = 'Network error. Please try again later.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = prevLabel;
      }
    });
  };

  setupContactFormModule();

  // --- PWA Service Worker registration ---
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? '/sw.js'
        : './sw.js';
      navigator.serviceWorker.register(swUrl).catch(() => { });
    });
  }
});
