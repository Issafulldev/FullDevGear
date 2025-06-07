document.addEventListener('DOMContentLoaded', () => {

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

    const BASE_TECHNOLOGIES = [
      { name: 'HTML5', path: 'assets/icons/html5.svg' }, { name: 'CSS', path: 'assets/icons/css.svg' },
      { name: 'JavaScript', path: 'assets/icons/javascript.svg' }, { name: 'TypeScript', path: 'assets/icons/typescript.svg' },
      { name: 'React', path: 'assets/icons/react.svg' }, { name: 'Vue.js', path: 'assets/icons/vuedotjs.svg' },
      { name: 'Next.js', path: 'assets/icons/nextdotjs.svg' }, { name: 'Node.js', path: 'assets/icons/nodedotjs.svg' },
      { name: 'Bun', path: 'assets/icons/bun.svg' }, { name: 'Deno', path: 'assets/icons/deno.svg' },
      { name: 'Express', path: 'assets/icons/express.svg' }, { name: 'Fastify', path: 'assets/icons/fastify.svg' },
      { name: 'PHP', path: 'assets/icons/php.svg' }, { name: 'GraphQL', path: 'assets/icons/graphql.svg' },
      { name: 'PostgreSQL', path: 'assets/icons/postgresql.svg' }, { name: 'MySQL', path: 'assets/icons/mysql.svg' },
      { name: 'MongoDB', path: 'assets/icons/mongodb.svg' }, { name: 'SQLite', path: 'assets/icons/sqlite.svg' },
      { name: 'Supabase', path: 'assets/icons/supabase.svg' }, { name: 'Git', path: 'assets/icons/git.svg' },
      { name: 'GitHub', path: 'assets/icons/github.svg' }, { name: 'Vite', path: 'assets/icons/vite.svg' },
      { name: 'WordPress', path: 'assets/icons/wordpress.svg' }, { name: 'Shopify', path: 'assets/icons/shopify.svg' },
      { name: 'Joomla', path: 'assets/icons/joomla.svg' }, { name: 'OpenAI', path: 'assets/icons/openai.svg' },
      { name: 'Claude', path: 'assets/icons/claude.svg' }, { name: 'Gemini', path: 'assets/icons/googlegemini.svg' }
    ];

    const TECH_BRAND_COLORS_FOR_TILES = [
      { name: "bun", tileBackground: "#FFF000", iconColor: "#000000", textColor: "#000000", description: "An incredibly fast JavaScript runtime.", featured: true },
      { name: "claude", tileBackground: "#8A2BE2", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Anthropic's conversational and safe AI." },
      { name: "css", tileBackground: "#4A148C", iconColor: "original", textColor: "#FFFFFF", description: "Styling the web since 1996." },
      { name: "deno", tileBackground: "#3AA3A4", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Secure-by-default JavaScript runtime." },
      { name: "express", tileBackground: "#68A063", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "The minimalist Node.js web framework." },
      { name: "fastify", tileBackground: "#F40050", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Super-fast, lightweight Node.js web framework." },
      { name: "git", tileBackground: "#F05033", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Created by Linus Torvalds in 2005." },
      { name: "github", tileBackground: "#6e5494", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Hosts the world's largest open-source code." },
      { name: "gemini", tileBackground: "#4A0082", iconColor: "original", textColor: "#FFFFFF", description: "Google's most advanced multimodal AI model." },
      { name: "graphql", tileBackground: "#E10098", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "One query, multiple resources, very efficient." },
      { name: "html5", tileBackground: "#E34F26", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "The ubiquitous foundation of modern web." },
      { name: "javascript", tileBackground: "#F7DF1E", iconColor: "#000000", textColor: "#000000", description: "Was created in just 10 days." },
      { name: "joomla", tileBackground: "#5091CD", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Popular CMS, a strong WordPress competitor." },
      { name: "mongodb", tileBackground: "#47A248", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "A flexible NoSQL database." },
      { name: "mysql", tileBackground: "#4479A1", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "A widely used open-source relational database." },
      { name: "next.js", tileBackground: "#0070F3", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Makes React fast with SSR.", featured: true },
      { name: "node.js", tileBackground: "#339933", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Allows JavaScript on the server-side.", featured: true },
      { name: "openai", tileBackground: "#00A78F", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "AI pioneer, creator of GPT models." },
      { name: "php", tileBackground: "#777BB4", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Powers over 78% of existing websites." },
      { name: "postgresql", tileBackground: "#336791", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Robust, extensible open-source relational database." },
      { name: "react", tileBackground: "#61DAFB", iconColor: "#000000", textColor: "#000000", description: "JavaScript library for interactive UIs.", featured: true },
      { name: "shopify", tileBackground: "#96BF48", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Simplified e-commerce platform for everyone." },
      { name: "sqlite", tileBackground: "#003B57", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "The world's most widely deployed database." },
      { name: "supabase", tileBackground: "#3ECF8E", iconColor: "#000000", textColor: "#000000", description: "The open-source Firebase alternative." },
      { name: "typescript", tileBackground: "#3178C6", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Adds typing to JavaScript for reliable projects." },
      { name: "vite", tileBackground: "#1a1a2e", iconColor: "original", textColor: "#FFFFFF", description: "An incredibly fast web build tool." },
      { name: "vue.js", tileBackground: "#4FC08D", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "A progressive framework, easy to learn." },
      { name: "wordpress", tileBackground: "#21759B", iconColor: "#FFFFFF", textColor: "#FFFFFF", description: "Powers over 43% of the web." },
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

    const calculateTechnologiesForSet = (baseTechList, containerPxWidth, unitPxWidth) => {
      let technologiesForOneSet = [];
      if (baseTechList.length === 0) {
        console.warn('TechWave: baseTechnologies is empty. Wave will be empty.');
      } else if (containerPxWidth <= 0 || unitPxWidth <= 0) {
        console.warn(`TechWave: containerWidthPx (${containerPxWidth}) or effectiveUnitWidthPx (${unitPxWidth.toFixed(2)}) is invalid. Using fallback tile count.`);
        const FALLBACK_MIN_TILES = 20;
        let repeatsForFallback = Math.max(3, Math.ceil(FALLBACK_MIN_TILES / baseTechList.length));
        for (let i = 0; i < repeatsForFallback; i++) {
          technologiesForOneSet = technologiesForOneSet.concat(baseTechList);
        }
      } else {
        const BUFFER_UNITS_PERCENTAGE = 0.20; // 20% buffer
        const MIN_BUFFER_UNITS = 5;
        const MIN_REPEATS_FOR_LOOPING = 2;
        const MIN_TILES_OVERALL = 20;

        const numUnitsEstimate = Math.ceil(containerPxWidth / unitPxWidth);
        const bufferUnits = Math.max(MIN_BUFFER_UNITS, Math.ceil(numUnitsEstimate * BUFFER_UNITS_PERCENTAGE));
        const totalUnitsTarget = numUnitsEstimate + bufferUnits;
        let repeatsNeeded = Math.ceil(totalUnitsTarget / baseTechList.length);
        const minRepeatsForMinTiles = Math.ceil(MIN_TILES_OVERALL / baseTechList.length);
        repeatsNeeded = Math.max(repeatsNeeded, MIN_REPEATS_FOR_LOOPING, minRepeatsForMinTiles);

        for (let i = 0; i < repeatsNeeded; i++) {
          technologiesForOneSet = technologiesForOneSet.concat(baseTechList);
        }
      }
      return technologiesForOneSet;
    };

    // Fonction pour mélanger aléatoirement un tableau (Fisher-Yates shuffle)
    // avec évitement des doublons adjacents
    const shuffleArray = (array) => {
      const shuffled = [...array]; // Créer une copie pour ne pas modifier l'original

      // Premier mélange standard
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      // Deuxième passe : éliminer les doublons adjacents
      const maxAttempts = shuffled.length * 2; // Limite pour éviter les boucles infinies
      let attempts = 0;

      for (let i = 0; i < shuffled.length - 1 && attempts < maxAttempts; i++) {
        if (shuffled[i].name === shuffled[i + 1].name) {
          // Trouver une position différente pour échanger
          let swapIndex = -1;

          // Chercher un élément différent à échanger
          for (let j = i + 2; j < shuffled.length; j++) {
            if (shuffled[j].name !== shuffled[i].name &&
              (j === shuffled.length - 1 || shuffled[j].name !== shuffled[j + 1].name) &&
              (i === 0 || shuffled[j].name !== shuffled[i - 1].name)) {
              swapIndex = j;
              break;
            }
          }

          // Si on n'a pas trouvé vers la droite, chercher vers la gauche
          if (swapIndex === -1) {
            for (let j = 0; j < i; j++) {
              if (shuffled[j].name !== shuffled[i + 1].name &&
                (j === 0 || shuffled[j].name !== shuffled[j - 1].name) &&
                (j === shuffled.length - 1 || shuffled[j].name !== shuffled[j + 1].name)) {
                swapIndex = j;
                break;
              }
            }
          }

          // Effectuer l'échange si possible
          if (swapIndex !== -1) {
            [shuffled[i + 1], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[i + 1]];
          }

          attempts++;
        }
      }

      return shuffled;
    };

    // Calculer les technologies de base (sans mélange pour réutilisation)
    const baseTechnologiesForOneSet = calculateTechnologiesForSet(BASE_TECHNOLOGIES, waveContainer.clientWidth, EFFECTIVE_UNIT_WIDTH_PX);

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

    const createAndAttachScroller = (techList, animState, containerElement) => {
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

      let contentTotalWidth = 0;
      const offscreenContainer = document.createElement('div');
      offscreenContainer.style.position = 'absolute';
      offscreenContainer.style.visibility = 'hidden';
      offscreenContainer.style.pointerEvents = 'none';
      const scrollerCloneForMeasurement = scroller.cloneNode(false);
      scrollerCloneForMeasurement.appendChild(populateFragment(techList));
      offscreenContainer.appendChild(scrollerCloneForMeasurement);
      document.body.appendChild(offscreenContainer);
      contentTotalWidth = scrollerCloneForMeasurement.scrollWidth;
      document.body.removeChild(offscreenContainer);

      scroller.appendChild(populateFragment(techList));
      containerElement.appendChild(scroller);

      return { scrollerElement: scroller, contentTotalWidth: contentTotalWidth };
    };

    function startPingPongAnimation(scrollerData) {
      const contentWidth = scrollerData.contentTotalWidth;
      const containerWidth = waveContainer.clientWidth;

      if (contentWidth <= containerWidth) {
        if (scrollerData.element) scrollerData.element.style.transform = `translateX(0px)`;
        return;
      }

      const INITIAL_OFFSET_TILE_INDEX = 9;
      let currentX = 0;
      if (baseTechnologiesForOneSet && baseTechnologiesForOneSet.length > INITIAL_OFFSET_TILE_INDEX && EFFECTIVE_UNIT_WIDTH_PX > 0) {
        currentX = -(INITIAL_OFFSET_TILE_INDEX * EFFECTIVE_UNIT_WIDTH_PX);
      } else {
        console.warn(`TechWave: Not enough tiles in set (${baseTechnologiesForOneSet ? baseTechnologiesForOneSet.length : 'undefined'}) or invalid effectiveUnitWidthPx (${EFFECTIVE_UNIT_WIDTH_PX}). Starting at default position (0).`);
      }

      const SCROLL_SPEED_FACTOR = 0.5;
      const TRIGGER_OFFSET_FROM_EDGE_UNITS = 2;
      const triggerOffsetFromEdge = TRIGGER_OFFSET_FROM_EDGE_UNITS * EFFECTIVE_UNIT_WIDTH_PX;

      const leftScrollLimit = 0;
      const rightScrollLimit = -(contentWidth - containerWidth);

      if (currentX > leftScrollLimit) currentX = leftScrollLimit;
      if (currentX < rightScrollLimit) currentX = rightScrollLimit;

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

          let limitReached = false;
          if (currentAppliedSpeed < 0) {
            if (currentX <= rightScrollLimit + triggerOffsetFromEdge) {
              currentX = rightScrollLimit + triggerOffsetFromEdge;
              limitReached = true;
            }
          } else {
            if (currentX >= leftScrollLimit - triggerOffsetFromEdge) {
              currentX = leftScrollLimit - triggerOffsetFromEdge;
              limitReached = true;
            }
          }

          if (limitReached) {
            sharedPongDirection *= -1;
          }

          if (currentX > leftScrollLimit) currentX = leftScrollLimit;
          if (currentX < rightScrollLimit) currentX = rightScrollLimit;

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

    const scrollerData1 = createAndAttachScroller(shuffleArray(baseTechnologiesForOneSet), animState1, waveContainer);
    animState1.element = scrollerData1.scrollerElement;
    animState1.contentTotalWidth = scrollerData1.contentTotalWidth;

    const scrollerData2 = createAndAttachScroller(shuffleArray(baseTechnologiesForOneSet), animState2, waveContainer);
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
  const setupNavDynamicColor = () => {
    const bottomNav = document.querySelector('.header-container nav');

    if (!bottomNav) {
      console.warn('Bottom navigation not found for dynamic color setup. Skipping nav color setup.');
      return;
    }

    let currentBrightness = null;
    let animationFrame = null;
    let canvas, ctx;

    // Créer un canvas caché pour la détection de couleur
    const initCanvas = () => {
      canvas = document.createElement('canvas');
      ctx = canvas.getContext('2d');
      canvas.width = 1;
      canvas.height = 1;
      canvas.style.position = 'absolute';
      canvas.style.top = '-9999px';
      canvas.style.left = '-9999px';
      canvas.style.pointerEvents = 'none';
      document.body.appendChild(canvas);
    };

    const getNavPosition = () => {
      const navRect = bottomNav.getBoundingClientRect();
      return {
        x: navRect.left + navRect.width / 2,
        y: navRect.top + navRect.height / 2,
        width: navRect.width,
        height: navRect.height
      };
    };

    const calculateBrightness = (r, g, b) => {
      // Formule de luminance perceptuelle
      return (r * 299 + g * 587 + b * 114) / 1000;
    };

    const capturePixelColor = (x, y) => {
      try {
        // Temporairement cacher la nav pour capturer ce qui est en dessous
        const originalVisibility = bottomNav.style.visibility;
        const originalPointerEvents = bottomNav.style.pointerEvents;

        bottomNav.style.visibility = 'hidden';
        bottomNav.style.pointerEvents = 'none';

        // Forcer un reflow
        bottomNav.offsetHeight;

        // Utiliser html2canvas ou une approche alternative
        // Comme html2canvas n'est pas disponible, on va utiliser une approche différente

        // Trouver l'élément sous la position donnée
        const elementUnder = document.elementFromPoint(x, y);

        // Restaurer la nav
        bottomNav.style.visibility = originalVisibility;
        bottomNav.style.pointerEvents = originalPointerEvents;

        if (!elementUnder) {
          return { r: 230, g: 230, b: 230 }; // Couleur par défaut
        }

        // Obtenir la couleur de fond calculée
        const computedStyle = window.getComputedStyle(elementUnder);
        let bgColor = computedStyle.backgroundColor;

        // Si transparent, remonter dans la hiérarchie
        let currentElement = elementUnder;
        while ((bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') && currentElement.parentElement) {
          currentElement = currentElement.parentElement;
          bgColor = window.getComputedStyle(currentElement).backgroundColor;
        }

        // Parser la couleur RGB
        if (bgColor.startsWith('rgb')) {
          const matches = bgColor.match(/\d+/g);
          if (matches && matches.length >= 3) {
            return {
              r: parseInt(matches[0]),
              g: parseInt(matches[1]),
              b: parseInt(matches[2])
            };
          }
        }

        // Couleur par défaut si parsing échoue
        return { r: 230, g: 230, b: 230 };

      } catch (error) {
        console.warn('Erreur lors de la capture de couleur:', error);
        return { r: 230, g: 230, b: 230 };
      }
    };

    const detectBackgroundBrightness = () => {
      const navPos = getNavPosition();

      // Capturer la couleur au centre de la nav
      const { r, g, b } = capturePixelColor(navPos.x, navPos.y);

      return calculateBrightness(r, g, b);
    };

    const applyNavColorBasedOnBrightness = (brightness) => {
      // Utiliser une tolérance pour éviter les changements trop fréquents
      const TOLERANCE = 10;
      if (currentBrightness !== null && Math.abs(currentBrightness - brightness) < TOLERANCE) {
        return;
      }

      currentBrightness = brightness;

      // Seuil de luminosité pour déterminer si le fond est clair ou sombre
      const BRIGHTNESS_THRESHOLD = 125;

      if (brightness > BRIGHTNESS_THRESHOLD) {
        // Fond clair -> nav sombre (enlever nav-inverted pour avoir nav noire)
        if (bottomNav.classList.contains('nav-inverted')) {
          bottomNav.classList.remove('nav-inverted');
        }
      } else {
        // Fond sombre -> nav claire (ajouter nav-inverted pour avoir nav blanche)
        if (!bottomNav.classList.contains('nav-inverted')) {
          bottomNav.classList.add('nav-inverted');
        }
      }
    };

    const updateNavColor = () => {
      const brightness = detectBackgroundBrightness();
      applyNavColorBasedOnBrightness(brightness);
    };

    // Optimisation avec requestAnimationFrame pour les performances
    const scheduleUpdate = () => {
      if (animationFrame) return;

      animationFrame = requestAnimationFrame(() => {
        updateNavColor();
        animationFrame = null;
      });
    };

    // Event listeners optimisés
    const setupEventListeners = () => {
      // Scroll avec throttling
      let scrollTimeout;
      window.addEventListener('scroll', () => {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(() => {
          scheduleUpdate();
          scrollTimeout = null;
        }, 32); // ~30fps pour éviter trop de calculs
      }, { passive: true });

      // Resize avec debouncing
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          scheduleUpdate();
        }, 150);
      });

      // Événements personnalisés pour SPA
      document.addEventListener('navColorCheck', scheduleUpdate);
    };

    // Initialisation
    initCanvas();
    setupEventListeners();

    // Première détection après un court délai pour s'assurer que tout est rendu
    setTimeout(() => {
      updateNavColor();
    }, 200);

    // Retourner une fonction de nettoyage si nécessaire
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  };

  setupNavDynamicColor();

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

        // Add a slight delay for smoother header transition
        setTimeout(() => {
          document.dispatchEvent(new Event('navColorCheck'));
        }, 50);
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

      showSection(ROUTES[path], useTransition); // Pass useTransition flag
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
    document.addEventListener('navInversionCheck', () => {
      const isCvPage = document.body.classList.contains('cv-dark-mode');
      if (!isCvPage) {
        // Clean up active states when leaving CV page
        activeSections.clear();
        cvSections.forEach(section => {
          section.classList.remove('cv-section-active');
        });
      }
    });

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
  document.addEventListener('navInversionCheck', () => {
    const isCvPage = document.body.classList.contains('cv-dark-mode');
    if (isCvPage) {
      // Small delay to ensure DOM is ready
      setTimeout(setupCVScrollActivation, 100);
    }
  });
});