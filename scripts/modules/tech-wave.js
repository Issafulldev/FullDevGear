const DEBUG = false;

export function initializeTechWave() {
  const waveContainer = document.querySelector('.tech-wave-container');
  if (!waveContainer) { return; }

  const start = () => {
    observer && observer.disconnect();
    initializeTechWaveNow();
  };

  const rect = waveContainer.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    initializeTechWaveNow();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { start(); }
      });
    },
    { root: null, rootMargin: '0px 0px 100px 0px', threshold: 0 },
  );
  observer.observe(waveContainer);

  function initializeTechWaveNow() {
    const TILE_WIDTH_REM = 6.5;
    const GAP_REM = 1.5;

    const tileVisibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const tile = entry.target;
          if (entry.isIntersecting) { tile.classList.add('visible'); }
          else { tile.classList.remove('visible'); }
        });
        if (DEBUG) {
          const visibleTiles = waveContainer.querySelectorAll('.tech-tile.visible').length;
          const totalTiles = waveContainer.querySelectorAll('.tech-tile').length;
          console.log(`TechWave Performance: ${visibleTiles}/${totalTiles} tiles animated`);
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 },
    );

    const BASE_TECHNOLOGIES = [
      { name: 'HTML5', path: './assets/icons/html5.svg' },
      { name: 'CSS', path: './assets/icons/css.svg' },
      { name: 'JavaScript', path: './assets/icons/javascript.svg' },
      { name: 'TypeScript', path: './assets/icons/typescript.svg' },
      { name: 'React', path: './assets/icons/react.svg' },
      { name: 'Vue.js', path: './assets/icons/vuedotjs.svg' },
      { name: 'Angular', path: './assets/icons/angular.svg' },
      { name: 'Svelte', path: './assets/icons/svelte.svg' },
      { name: 'Next.js', path: './assets/icons/nextdotjs.svg' },
      { name: 'Tailwind', path: './assets/icons/tailwindcss.svg' },
      { name: 'Bootstrap', path: './assets/icons/bootstrap.svg' },
      { name: 'Sass', path: './assets/icons/sass.svg' },
      { name: 'SCSS', path: './assets/icons/scss.svg' },
      { name: 'Node.js', path: './assets/icons/nodedotjs.svg' },
      { name: 'Express', path: './assets/icons/express.svg' },
      { name: 'Fastify', path: './assets/icons/fastify.svg' },
      { name: 'Bun', path: './assets/icons/bun.svg' },
      { name: 'Deno', path: './assets/icons/deno.svg' },
      { name: 'PHP', path: './assets/icons/php.svg' },
      { name: 'Django', path: './assets/icons/django.svg' },
      { name: 'Python', path: './assets/icons/python.svg' },
      { name: 'PostgreSQL', path: './assets/icons/postgresql.svg' },
      { name: 'MySQL', path: './assets/icons/mysql.svg' },
      { name: 'MongoDB', path: './assets/icons/mongodb.svg' },
      { name: 'SQLite', path: './assets/icons/sqlite.svg' },
      { name: 'Redis', path: './assets/icons/redis.svg' },
      { name: 'Supabase', path: './assets/icons/supabase.svg' },
      { name: 'GraphQL', path: './assets/icons/graphql.svg' },
      { name: 'Docker', path: './assets/icons/docker.svg' },
      { name: 'Kubernetes', path: './assets/icons/kubernetes.svg' },
      { name: 'Git', path: './assets/icons/git.svg' },
      { name: 'GitHub', path: './assets/icons/github.svg' },
      { name: 'Vite', path: './assets/icons/vite.svg' },
      { name: 'WordPress', path: './assets/icons/wordpress.svg' },
      { name: 'Shopify', path: './assets/icons/shopify.svg' },
      { name: 'Joomla', path: './assets/icons/joomla.svg' },
      { name: 'OpenAI', path: './assets/icons/openai.svg' },
      { name: 'Claude', path: './assets/icons/claude.svg' },
      { name: 'Gemini', path: './assets/icons/googlegemini.svg' },
    ];

    const TECH_BRAND_COLORS_FOR_TILES = [
      // Web Fundamentals
      { name: 'html5', tileBackground: '#E34C26', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: 'Invented in 1990' },
      { name: 'css', tileBackground: '#663399', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: 'Styles everything beautifully' },
      { name: 'javascript', tileBackground: '#F7DF1E', iconColor: '#000000', textColor: '#000000', description: 'Created in just 10 days!', featured: true },
      { name: 'typescript', tileBackground: '#3178C6', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: 'Reduces bugs by 15%', featured: true },

      // Frontend Frameworks & Libraries
      { name: 'react', tileBackground: '#61DAFB', iconColor: '#000000', textColor: '#000000', description: 'Uses Virtual DOM', featured: true },
      { name: 'vue.js', tileBackground: '#4FC08D', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: 'Created by ex-Googler' },
      { name: 'angular', tileBackground: '#DD0031', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: 'TypeScript by default', featured: true },
      { name: 'svelte', tileBackground: '#FF3E00', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: 'No runtime needed' },
      { name: 'next.js', tileBackground: '#0070F3', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: 'SSR & static generation', featured: true },

      // CSS Frameworks & Tools
      { name: 'tailwind', tileBackground: '#06B6D4', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: '500+ utility classes', featured: true },
      { name: 'bootstrap', tileBackground: '#7952B3', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: 'Created by Twitter 2011', featured: true },
      { name: 'sass', tileBackground: '#CC6699', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: 'First CSS preprocessor' },
      { name: 'scss', tileBackground: '#CC6699', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: 'Modern Sass syntax' },

      // Backend & Runtimes
      { name: 'node.js', tileBackground: '#339933', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: "Uses Chrome's V8 engine", featured: true },
      { name: 'express', tileBackground: '#404040', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: 'Most popular Node.js framework' },
      { name: 'fastify', tileBackground: '#202020', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: '76,000 requests/second' },
      { name: 'bun', tileBackground: '#FFF000', iconColor: '#000000', textColor: '#000000', description: '4x faster than Node.js' },
      { name: 'deno', tileBackground: '#2F2F2F', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: 'By Node.js creator' },
      { name: 'php', tileBackground: '#777BB4', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: 'Powers 79% of websites' },
      { name: 'django', tileBackground: '#092E20', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: "Don't Repeat Yourself" },
      { name: 'python', tileBackground: '#3776AB', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: 'Named after Monty Python!' },

      // Databases & Storage
      { name: 'postgresql', tileBackground: '#336791', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: '30+ years, native JSON', featured: true },
      { name: 'mysql', tileBackground: '#4479A1', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: 'Used by FB, Google, Twitter' },
      { name: 'mongodb', tileBackground: '#47A248', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: 'BSON data storage' },
      { name: 'sqlite', tileBackground: '#003B57', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: 'Most deployed database' },
      { name: 'redis', tileBackground: '#DC382D', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: '1M+ operations/second' },
      { name: 'supabase', tileBackground: '#3ECF8E', iconColor: '#000000', textColor: '#000000', description: 'Open-source Firebase' },

      // APIs & GraphQL
      { name: 'graphql', tileBackground: '#E10098', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: 'Developed by Facebook 2012' },

      // DevOps & Tools
      { name: 'docker', tileBackground: '#2496ED', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: 'Revolutionized deployment', featured: true },
      { name: 'kubernetes', tileBackground: '#326CE5', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: 'Millions of containers', featured: true },
      { name: 'git', tileBackground: '#F05032', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: 'By Linux creator' },
      { name: 'github', tileBackground: '#181717', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: '200M+ repositories' },
      { name: 'vite', tileBackground: '#41d1ff', iconColor: 'original', textColor: '#FFFFFF', description: '100x faster than Webpack' },

      // CMS & E‑commerce
      { name: 'wordpress', tileBackground: '#21759B', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: '40% of all websites' },
      { name: 'shopify', tileBackground: '#7AB55C', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: '$200B+ sales annually' },
      { name: 'joomla', tileBackground: '#5091CD', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: '3% of global websites' },

      // AI & ML
      { name: 'openai', tileBackground: '#412991', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: '100M users in 2 months' },
      { name: 'claude', tileBackground: '#CC785C', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: '150K+ word analysis' },
      { name: 'gemini', tileBackground: '#4285F4', iconColor: '#FFFFFF', textColor: '#FFFFFF', description: 'Multimodal AI' },
    ];

    const techStyleMap = TECH_BRAND_COLORS_FOR_TILES.reduce((acc, tech) => {
      acc[tech.name.toUpperCase()] = { ...tech };
      return acc;
    }, {});

    const DEFAULT_STYLE = {
      tileBackground: '#222222',
      iconColor: 'default',
      textColor: '#CCCCCC',
      description: 'No description available.'
    };

    waveContainer.innerHTML = '';

    let globalSpeedMultiplier = 1.0;

    const shuffleArray = (array) => {
      if (array.length <= 1) { return [...array]; }
      const groups = {};
      array.forEach((item) => {
        if (!groups[item.name]) { groups[item.name] = []; }
        groups[item.name].push(item);
      });
      Object.keys(groups).forEach((name) => {
        for (let i = groups[name].length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [groups[name][i], groups[name][j]] = [groups[name][j], groups[name][i]];
        }
      });
      const result = [];
      const groupNames = Object.keys(groups);
      const maxGroupSize = Math.max(...Object.values(groups).map((g) => g.length));
      for (let round = 0; round < maxGroupSize; round++) {
        const roundOrder = [...groupNames];
        if (round % 3 === 1) { roundOrder.reverse(); }
        else if (round % 3 === 2) {
          for (let i = 0; i < roundOrder.length - 1; i += 2) {
            [roundOrder[i], roundOrder[i + 1]] = [roundOrder[i + 1], roundOrder[i]];
          }
        }
        roundOrder.forEach((name) => {
          if (groups[name][round]) { result.push(groups[name][round]); }
        });
      }
      return result;
    };

    const shuffledUniqueTechnologies = shuffleArray(BASE_TECHNOLOGIES);
    const midPoint = Math.ceil(shuffledUniqueTechnologies.length / 2);
    const shuffledPart1 = shuffledUniqueTechnologies.slice(0, midPoint);
    const shuffledPart2 = shuffledUniqueTechnologies.slice(midPoint);

    const animationStates = [
      { isReverse: false, baseSign: -1, isPaused: false, animationFrameId: null, element: null, contentTotalWidth: 0 },
      { isReverse: true, baseSign: 1, isPaused: false, animationFrameId: null, element: null, contentTotalWidth: 0 },
    ];

    function createTechTile(tech, currentAnimState) {
      const tile = document.createElement('div');
      tile.classList.add('tech-tile');
      const techNameUpper = tech.name.toUpperCase();
      const styleInfo = techStyleMap[techNameUpper] || DEFAULT_STYLE;
      if (styleInfo.featured) { tile.classList.add('featured-tile'); }
      tile.style.backgroundColor = styleInfo.tileBackground;
      tile.style.setProperty('--tile-glow-color', styleInfo.tileBackground);
      tileVisibilityObserver.observe(tile);
      const frontFace = document.createElement('div');
      frontFace.classList.add('tile-face', 'tile-front');
      const logoElement = document.createElement('img');
      logoElement.classList.add('tech-tile-logo');
      logoElement.src = tech.path;
      logoElement.alt = tech.name;
      logoElement.loading = 'lazy';
      logoElement.classList.remove('logo-use-original-colors', 'logo-force-color-white', 'logo-force-color-black');
      if (styleInfo.iconColor === 'original') { logoElement.classList.add('logo-use-original-colors'); }
      else if (styleInfo.iconColor === '#FFFFFF') { logoElement.classList.add('logo-force-color-white'); }
      else if (styleInfo.iconColor === '#000000') { logoElement.classList.add('logo-force-color-black'); }
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
        } else if (currentAnimState) {
          currentAnimState.isPaused = false;
        }
      };
      tile.addEventListener('click', flipCard);
      return tile;
    }

    function createAndAttachScroller(uniqueTechListPart, animState, containerElement) {
      const scroller = document.createElement('div');
      scroller.classList.add('tech-tiles-scroller');
      scroller.setAttribute('tabindex', '0');
      const populateFragment = (list) => {
        const fragment = document.createDocumentFragment();
        list.forEach((tech) => fragment.appendChild(createTechTile(tech, animState)));
        return fragment;
      };
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
      const copiesToAppend = Math.max(2, Math.ceil(containerWidth / singleSetWidth) + 1);
      for (let i = 0; i < copiesToAppend; i++) { scroller.appendChild(populateFragment(uniqueTechListPart)); }
      containerElement.appendChild(scroller);
      const contentTotalWidth = scroller.scrollWidth;
      return { scrollerElement: scroller, singleSetWidth, contentTotalWidth };
    }

    function startInfiniteLoopAnimation(scrollerState) {
      const element = scrollerState.element;
      if (!element) { return; }
      let currentX = 0;
      const SCROLL_SPEED_PX = 0.5;
      const setWidth = scrollerState.singleSetWidth || 0;
      const step = () => {
        if (!scrollerState.isPaused && element) {
          const dir = scrollerState.baseSign;
          const applied = dir * SCROLL_SPEED_PX * globalSpeedMultiplier;
          currentX += applied;
          if (dir < 0 && Math.abs(currentX) >= setWidth) { currentX += setWidth; }
          if (dir > 0 && currentX > 0) { currentX -= setWidth; }
          element.style.transform = `translateX(${currentX}px)`;
        }
        scrollerState.animationFrameId = requestAnimationFrame(step);
      };
      scrollerState.animationFrameId = requestAnimationFrame(step);
    }

    const scrollerData1 = createAndAttachScroller(shuffledPart1, animationStates[0], waveContainer);
    animationStates[0].element = scrollerData1.scrollerElement;
    animationStates[0].contentTotalWidth = scrollerData1.contentTotalWidth;
    animationStates[0].singleSetWidth = scrollerData1.singleSetWidth;

    const scrollerData2 = createAndAttachScroller(shuffledPart2, animationStates[1], waveContainer);
    animationStates[1].element = scrollerData2.scrollerElement;
    animationStates[1].contentTotalWidth = scrollerData2.contentTotalWidth;
    animationStates[1].singleSetWidth = scrollerData2.singleSetWidth;

    if (scrollerData1.scrollerElement) { void scrollerData1.scrollerElement.offsetHeight; }
    if (scrollerData2.scrollerElement) { void scrollerData2.scrollerElement.offsetHeight; }

    animationStates.forEach((state) => {
      if (state && state.element && state.contentTotalWidth > 0 && state.singleSetWidth > 0) {
        setTimeout(() => startInfiniteLoopAnimation(state), 16);
      } else {
        console.warn('TechWave: Cannot start loop due to invalid state.', state);
      }
    });

    waveContainer.addEventListener('mousemove', (event) => {
      const rect = waveContainer.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const containerWidth = rect.width;
      const MIN_SPEED_FACTOR = 0.6;
      const MAX_SPEED_FACTOR = 1.4;
      const SPEED_DECAY_RATE = 2;
      const normalizedDist = Math.abs(mouseX - containerWidth / 2) / (containerWidth / 2);
      globalSpeedMultiplier =
        MIN_SPEED_FACTOR + (MAX_SPEED_FACTOR - MIN_SPEED_FACTOR) * Math.pow(normalizedDist, SPEED_DECAY_RATE);
      globalSpeedMultiplier = Math.max(0.1, Math.min(globalSpeedMultiplier, 2.0));
    });
    waveContainer.addEventListener('mouseleave', () => {
      globalSpeedMultiplier = 1.0;
    });
  }
}


