document.addEventListener('DOMContentLoaded', () => {

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

    console.log('Browser Detection:', { isSafari, isChrome, isFirefox, isEdge });

    return { isSafari, isChrome, isFirefox, isEdge };
  };

  // Appliquer les classes de navigateur au body
  const browserInfo = detectBrowser();
  const bodyElement = document.body;

  if (browserInfo.isSafari) {
    bodyElement.classList.add('browser-safari');
    console.log('Safari detected - Applying Safari-specific optimizations');
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

    console.log('Safari: Force repaint after transition');

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
  const initializeTechWave = () => {
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
      console.log(`TechWave Performance: ${visibleTiles}/${totalTiles} tuiles animées`);
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
        console.log('TechWave: Distribution forcée nécessaire - trop de répétitions détectées');
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

      console.log(`TechWave: Distribution forcée appliquée - ${mostFrequentTech} espacé avec ratio ${spacing}:1`);
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
      tempScroller.style.whiteSpace = 'nowrap'; // Ensure tiles don't wrap
      tempScroller.style.display = 'flex'; // Mimic scroller's display
      tempScroller.style.gap = `${GAP_REM}rem`; // Mimic scroller's gap
      tempScroller.appendChild(populateFragment(uniqueTechListPart));
      document.body.appendChild(tempScroller);
      const singleSetWidth = tempScroller.scrollWidth;
      document.body.removeChild(tempScroller);

      const containerWidth = containerElement.clientWidth;
      let copiesToAppend = 1;

      // To ensure no black spaces appear, we will be extremely generous with copies.
      // This creates a very long strip of tiles, ensuring content is always available.
      // We aim for at least 10-15 full sets of the unique technologies.
      copiesToAppend = Math.max(15, Math.ceil((containerWidth * 2) / singleSetWidth)); // Ensure at least 15 copies or enough to cover container twice.

      console.log(`Debug Scroller: uniqueTechListPart.length=${uniqueTechListPart.length}, singleSetWidth=${singleSetWidth.toFixed(2)}px, containerWidth=${containerWidth}px, copiesToAppend=${copiesToAppend}`);

      for (let i = 0; i < copiesToAppend; i++) {
        scroller.appendChild(populateFragment(uniqueTechListPart));
      }

      containerElement.appendChild(scroller);
      const contentTotalWidth = scroller.scrollWidth; // Get the full width of the scroller with all copies

      return { scrollerElement: scroller, contentTotalWidth: contentTotalWidth };
    };

    function startPingPongAnimation(scrollerData) {
      const contentWidth = scrollerData.contentTotalWidth;
      const containerWidth = waveContainer.clientWidth;

      if (contentWidth <= containerWidth) {
        if (scrollerData.element) scrollerData.element.style.transform = `translateX(0px)`;
        return;
      }

      // Calculate initial position to center the content
      // This ensures the animation starts from a middle point, far from actual DOM ends
      let currentX = -(contentWidth / 2 - containerWidth / 2);

      const SCROLL_SPEED_FACTOR = 0.5;
      // Removed TRIGGER_OFFSET_FROM_EDGE_PX as it's no longer needed with large content

      const leftScrollLimit = 0;
      const rightScrollLimit = -(contentWidth - containerWidth);

      // Ensure initial currentX is within the actual valid range of motion
      currentX = Math.max(rightScrollLimit, Math.min(leftScrollLimit, currentX));

      if (scrollerData.element) {
        scrollerData.element.style.transform = `translateX(${currentX}px)`;
      } else {
        console.error('TechWave Error: scrollerData.element is null. Cannot apply initial transform.');
        return;
      }

      function animate() {
        if (!scrollerData.isPaused && scrollerData.element) {
          const currentAppliedSpeed = scrollerData.baseSign * sharedPongDirection * SCROLL_SPEED_FACTOR * globalSpeedMultiplier;
          currentX += currentAppliedSpeed;

          // Simple ping-pong logic: reverse direction when hitting absolute limits
          if (sharedPongDirection < 0) { // Moving left
            if (currentX <= rightScrollLimit) {
              currentX = rightScrollLimit; // Snap to limit
              sharedPongDirection *= -1; // Reverse direction
            }
          } else { // Moving right
            if (currentX >= leftScrollLimit) {
              currentX = leftScrollLimit; // Snap to limit
              sharedPongDirection *= -1; // Reverse direction
            }
          }

          // Ensure currentX never goes beyond absolute limits (safety net)
          currentX = Math.max(rightScrollLimit, Math.min(leftScrollLimit, currentX));

          scrollerData.element.style.transform = `translateX(${currentX}px)`;
        }
        scrollerData.animationFrameId = requestAnimationFrame(animate);
      }
      scrollerData.animationFrameId = requestAnimationFrame(animate);
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

    const scrollerData2 = createAndAttachScroller(shuffledPart2, animState2, waveContainer);
    animState2.element = scrollerData2.scrollerElement;
    animState2.contentTotalWidth = scrollerData2.contentTotalWidth;

    if (scrollerData1.scrollerElement) { void scrollerData1.scrollerElement.offsetHeight; }
    if (scrollerData2.scrollerElement) { void scrollerData2.scrollerElement.offsetHeight; }

    animationStates.forEach((state, index) => {
      if (state && state.element && state.contentTotalWidth > 0) {
        setTimeout(() => startPingPongAnimation(state), 16);
      } else {
        console.warn(`TechWave: Cannot start ping-pong for state index ${index} due to invalid state, element, or zero content width.`, state);
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

  initializeTechWave();

  // --- Contact CTA Popup Logic ---
  const setupContactPopup = () => {
    const contactCtaBtn = document.getElementById('contact-cta-btn');
    const contactPopup = document.getElementById('contact-cta-links');

    if (!contactCtaBtn || !contactPopup) {
      console.warn('Contact CTA button or popup not found! Skipping contact popup setup.');
      return;
    }

    let isAnimating = false;

    const showPopup = () => {
      if (isAnimating) return;
      isAnimating = true;

      contactCtaBtn.setAttribute('aria-expanded', 'true');
      contactCtaBtn.classList.add('active');
      contactPopup.hidden = false;

      // Force reflow to ensure the element is rendered before animation
      contactPopup.offsetHeight;

      contactPopup.classList.add('show');

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

    const getPathFromUrl = (url) => {
      const a = document.createElement('a');
      a.href = url;
      return a.pathname.replace(/\/$/, '') || '/';
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

        // Ajouter transitioning aussi sur desktop si pas déjà fait par navigateTo
        if (!document.body.classList.contains('transitioning')) {
          document.body.classList.add('transitioning');
        }
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
        return; // Exit as transition is not used
      }

      // Start the transition (only if useTransition is true)
      waveElement.style.display = 'block';
      waveElement.classList.remove('wave-transition-sweep-out');
      waveElement.classList.add('wave-transition-sweep-in');

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

              // Restaurer l'état normal
              document.body.classList.remove('transitioning');

              // Restaurer le style top sur mobile uniquement
              const isMobile = window.matchMedia('(max-width: 768px)').matches;
              if (isMobile) {
                document.body.style.top = '';
              }

              // Safari: Force repaint après transition pour éviter le contenu figé
              setTimeout(() => window.forceRepaintSafari(), 50);
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
        console.warn(`Route not found for path: ${path}. Defaulting to freelance-content.`);
        path = '/';
      }

      // Capturer la position de scroll actuelle sur mobile AVANT showSection
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      let scrollPosition = 0;
      if (isMobile && useTransition) {
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        // Sauvegarder la position pour éviter le jump visuel
        document.body.style.top = `-${scrollPosition}px`;
        document.body.classList.add('transitioning');
      }

      // Utiliser showSection qui contient déjà toute la logique d'animation
      showSection(ROUTES[path], useTransition);

      updateNavActive(path);

      if (push) {
        if (getPathFromUrl(window.location.href) !== path) {
          window.history.pushState({ path }, '', path);
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

        if (getPathFromUrl(window.location.href) !== path) {
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

        if (path && getPathFromUrl(window.location.href) !== path) {
          e.preventDefault();
          navigateTo(path, true, true); // Use transition for clicks
        }
      });
    });

    // Handle browser's back/forward buttons
    window.addEventListener('popstate', () => {
      const path = getPathFromUrl(window.location.href);
      navigateTo(path, false, true); // Use transition for popstate
    });

    // Initial load: navigate to the current URL's path, but without transition
    const initialPath = getPathFromUrl(window.location.href);
    navigateTo(initialPath, false, false); // <--- HERE IS THE KEY CHANGE

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

  // --- CV Sections Scroll Activation for Mobile ---
  const setupCVScrollActivation = () => {
    // Only activate on mobile/tablet devices or when hover is not available
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
      window.matchMedia('(max-width: 1024px)').matches;

    if (!isTouchDevice) {
      return; // Exit early on desktop devices with hover capability
    }

    const cvSections = document.querySelectorAll('#cv-content .cv-section');

    if (cvSections.length === 0) {
      return; // No CV sections found
    }

    // Configuration for the intersection observer
    const observerOptions = {
      root: null, // Use viewport as root
      rootMargin: '-20% 0px -20% 0px', // Trigger when section is 20% visible from top and bottom
      threshold: [0.3, 0.7] // Trigger at 30% and 70% visibility
    };

    // Track currently active sections to avoid unnecessary DOM manipulations
    const activeSections = new Set();

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const section = entry.target;
        const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.3;

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
      sectionObserver.observe(section);
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
    window.addEventListener('popstate', cleanupCVSections);

    // Handle orientation changes and resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Re-trigger intersection checks after resize
        cvSections.forEach(section => {
          sectionObserver.unobserve(section);
          sectionObserver.observe(section);
        });
      }, 250);
    });
  };

  // Initialize CV scroll activation
  setupCVScrollActivation();

  // Re-initialize when navigating to CV page
  const reinitializeCVOnPageChange = () => {
    const isCvPage = document.body.classList.contains('cv-dark-mode');
    if (isCvPage) {
      // Small delay to ensure DOM is ready
      setTimeout(setupCVScrollActivation, 100);
    }
  };

  // Listen for page changes to reinitialize CV functionality
  window.addEventListener('popstate', reinitializeCVOnPageChange);

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
});
