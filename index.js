/* ==========================================================================
   Vivek's Portfolio - Interactive Logic Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initStatusChipsAnimation();
  initStatsObserver();
  initConsoleTypewriter();
  initParallaxHero();
  initEcosystemMindmap();
});

/**
 * Adds background blurring and scaling effects to the Navbar when scrolling.
 */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check once on init
}

/**
 * Triggers staggered animation in classes for the floating status chips.
 */
function initStatusChipsAnimation() {
  const chips = document.querySelectorAll('.status-chip');
  
  // Trigger after a slight delay to ensure smooth page load
  setTimeout(() => {
    chips.forEach((chip) => {
      chip.classList.add('animate-in');
    });
  }, 300);
}

/**
 * Intersection Observer to trigger RPG Stat fill bar animations on scroll.
 */
function initStatsObserver() {
  const statsPanel = document.querySelector('.about-stats-panel');
  const statFills = document.querySelectorAll('.stat-fill');

  if (!statsPanel || statFills.length === 0) return;

  // Reset widths on init to trigger transition when observed
  statFills.forEach(fill => {
    // Store original targets in datasets
    const targetWidth = fill.style.width;
    fill.dataset.width = targetWidth;
    fill.style.width = '0%';
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate each fill bar to its original width
        statFills.forEach(fill => {
          fill.style.width = fill.dataset.width;
        });
        // Stop observing once animated
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  observer.observe(statsPanel);
}

/**
 * Creates an elegant interactive typewriter terminal log inside the pixel laptop mockup.
 */
function initConsoleTypewriter() {
  const consoleBody = document.querySelector('.console-body');
  if (!consoleBody) return;

  // Simulated commands to write to console body
  const lines = [
    { type: 'command', text: 'node v_core.js --skills' },
    { type: 'success', text: '✓ Engineering intelligence initialized.' },
    { type: 'command', text: 'git commit -m "build awesome SaaS"' },
    { type: 'info', text: '● [master] Commit successfully pushed.' }
  ];

  let currentLineIndex = 0;

  const appendTerminalLine = () => {
    if (currentLineIndex >= lines.length) {
      // Loop or finish
      setTimeout(() => {
        // Clean console and restart loop
        consoleBody.innerHTML = `
          <div class="console-line"><span class="prompt">$</span> npm init v-portfolio</div>
          <div class="console-line success">✓ Initialization complete</div>
          <div class="console-line"><span class="prompt">$</span> v --status</div>
          <div class="console-line info">● Ready to write code & build ventures.</div>
        `;
        currentLineIndex = 0;
        setTimeout(appendTerminalLine, 4000);
      }, 8000);
      return;
    }

    const lineData = lines[currentLineIndex];
    const lineElement = document.createElement('div');
    lineElement.className = `console-line ${lineData.type}`;

    if (lineData.type === 'command') {
      lineElement.innerHTML = `<span class="prompt">$</span> <span class="typing-text"></span>`;
      consoleBody.appendChild(lineElement);
      
      const typingSpan = lineElement.querySelector('.typing-text');
      let charIndex = 0;
      
      const typeChar = () => {
        if (charIndex < lineData.text.length) {
          typingSpan.textContent += lineData.text.charAt(charIndex);
          charIndex++;
          setTimeout(typeChar, 50);
        } else {
          currentLineIndex++;
          setTimeout(appendTerminalLine, 1200);
        }
      };
      
      typeChar();
    } else {
      lineElement.textContent = lineData.text;
      consoleBody.appendChild(lineElement);
      currentLineIndex++;
      setTimeout(appendTerminalLine, 1500);
    }
    
    // Auto-scroll terminal
    consoleBody.scrollTop = consoleBody.scrollHeight;
  };

  // Start typewriter loops 4 seconds after initial screen load
  setTimeout(appendTerminalLine, 4000);
}

/**
 * Modern CSS-fallback scroll-driven parallax effect for the Hero section.
 */
function initParallaxHero() {
  const hero = document.getElementById('home');
  const heroContent = document.querySelector('.hero-content');
  const heroRight = document.querySelector('.hero-right');

  if (!hero || !heroContent || !heroRight) return;

  const handleScrollParallax = () => {
    const scrollY = window.scrollY;
    
    // As long as the hero is in/near view
    if (scrollY <= window.innerHeight) {
      // Background scroll parallax rate
      hero.style.backgroundPositionY = `${scrollY * 0.45}px`;
      
      // Elements fade out and slide down slightly
      heroContent.style.transform = `translateY(${scrollY * 0.25}px)`;
      heroContent.style.opacity = `${1 - scrollY / (window.innerHeight * 0.85)}`;
      
      heroRight.style.transform = `translateY(${scrollY * 0.35}px)`;
      heroRight.style.opacity = `${1 - scrollY / (window.innerHeight * 0.85)}`;
    }
  };

  window.addEventListener('scroll', handleScrollParallax);
}

/**
 * Orchestrates the interactive Builder Ecosystem Mindmap nodes and sidebar tabs.
 */
function initEcosystemMindmap() {
  const outerNodes = document.querySelectorAll('.outer-node');
  const connectorLines = document.querySelectorAll('.connector-line');
  const agentPitchText = document.getElementById('dynamic-agent-pitch');
  const dynamicLogLine = document.getElementById('dynamic-log-line');

  // Expertise details to swap on hover
  const departmentData = {
    engineering: {
      pitch: "Engineering department online. Specialize in designing highly scalable microservices, backend RESTful architectures, relational schema compilation, and clean semantic frontends using React and modern CSS environments.",
      log: "[15:43:10] Switched context: ENGINEERING. Active sub-agents running: Node.js Compiler, API Router."
    },
    ai: {
      pitch: "Artificial Intelligence department initialized. Actively building custom integrations with Gemini API and other LLMs for procedural content generation, intelligent agent flows, and semantic structured data engines.",
      log: "[15:43:18] Switched context: AI. Active sub-agents running: LLM Parser, Prompt Compiler."
    },
    quant: {
      pitch: "Quant Research department ready. Developing statistical models, algorithmic trading simulations, and rigorous backtesting pipelines to extract alpha from noisy data.",
      log: "[15:43:25] Switched context: QUANT_RESEARCH. Active sub-agents running: Alpha Simulator, Stat Model."
    },
    media: {
      pitch: "Digital Media department initialized. Producing high-quality video content, animations, and visual storytelling that bridge complex technical concepts with engaging narratives.",
      log: "[15:43:32] Switched context: DIGITAL_MEDIA. Active sub-agents running: Video Renderer, Storyboard AI."
    },
    systems: {
      pitch: "System Design department loaded. Managing scalable architectures, automated Git pipelines, and optimized orchestrators to handle massive data throughput efficiently.",
      log: "[15:43:40] Switched context: SYSTEM_DESIGN. Active sub-agents running: Load Balancer, Architecture Node."
    },
    data: {
      pitch: "Data Analytics department online. Processing large-scale datasets, orchestrating ETL pipelines, and extracting actionable insights through advanced data visualization.",
      log: "[15:43:48] Switched context: DATA_ANALYTICS. Active sub-agents running: Data Parser, Visualizer Node."
    }
  };

  // Node Hover Handlers
  outerNodes.forEach(node => {
    const dept = node.dataset.dept;

    node.addEventListener('mouseenter', () => {
      // 1. Remove active state from other nodes
      outerNodes.forEach(n => n.classList.remove('active'));
      connectorLines.forEach(l => l.classList.remove('active'));

      // 2. Add active to current node & line
      node.classList.add('active');
      const activeLine = document.getElementById(`line-${dept}`);
      if (activeLine) activeLine.classList.add('active');

      // 3. Update dynamic pitch
      if (departmentData[dept]) {
        agentPitchText.textContent = departmentData[dept].pitch;
        
        // Update log terminal line
        if (dynamicLogLine) {
          dynamicLogLine.textContent = departmentData[dept].log;
          dynamicLogLine.className = "log-row success";
        }
      }
    });
  });

  // Console Tab Switching Logic
  const tabButtons = document.querySelectorAll('.console-tab-btn');
  const tabContents = document.querySelectorAll('.console-tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;

      // Reset active tab button
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Swap visible content panel
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `tab-${targetTab}`) {
          content.classList.add('active');
        }
      });
    });
  });

  // Select engineering node by default on load
  const defaultNode = document.querySelector('[data-dept="engineering"]');
  if (defaultNode) {
    defaultNode.dispatchEvent(new Event('mouseenter'));
  }
}
