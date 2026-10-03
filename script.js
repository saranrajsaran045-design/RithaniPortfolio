/**
 * RITHANI S R - PORTFOLIO INTERACTIVITY & SCRIPTS
 */

// Project Detailed Data Store for Modals
const projectData = {
  'rice-leaf': {
    title: 'Rice Leaf Disease Detection System',
    period: '2026 • Agricultural AI & Computer Vision',
    tags: ['Python', 'ResNet50', 'EfficientNet', 'Grad-CAM Heatmaps', 'PyTorch', 'FastAPI'],
    overview: 'An end-to-end Explainable AI (XAI) deep learning pipeline created to identify and classify lethal diseases in rice crops, supporting precision agriculture and minimizing crop loss.',
    highlights: [
      'Engineered a hybrid convolutional neural network combining ResNet50 for deep feature extraction and EfficientNet for parameter-efficient edge classification.',
      'Incorporated Grad-CAM (Gradient-weighted Class Activation Mapping) visual heatmaps to pinpoint exact leaf lesion zones, ensuring transparent and verifiable diagnosis for agronomists.',
      'Developed an automated rule-based recommendation engine that suggests dosage-specific chemical and biological treatments based on infection severity.',
      'Packaged with a RESTful inference API for rapid field-image diagnostics.'
    ]
  },
  'anti-drowning': {
    title: 'Anti-Drowning System — IoT + Real-Time Dashboard',
    period: '2025 • IoT, Telemetry & Embedded Systems',
    tags: ['IoT Wearables', 'MySQL', 'JavaScript (ES6)', 'HTML5/CSS3', 'WebSockets', 'Hardware Sensors'],
    overview: 'A critical life-safety system combining wearable aquatic depth & pulse biometric sensors with a high-throughput monitoring dashboard to prevent drowning incidents in swimming facilities and natural water bodies.',
    highlights: [
      'Constructed a low-power wearable device streaming submerged depth, heart rate, and motion telemetry in real-time.',
      'Engineered a MySQL-backed relational data layer optimized for sub-150ms latency query processing and alert logging.',
      'Designed an intuitive, high-visibility emergency dashboard with audible alarms and automated distress notifications for lifeguards.',
      'Tested under real-world water immersion conditions with 99.2% alert trigger reliability.'
    ]
  },
  'neurotrack': {
    title: 'NeuroTrack+ — Multilingual Psychiatric Chatbot',
    period: '2024 • Conversational AI & Mental Health',
    tags: ['React.js', 'NLP & LLM Prompt Engineering', 'Multilingual (5+ Languages)', 'Tailored Chat UI', 'Node.js'],
    overview: 'An empathetic, context-aware psychiatric first-response chatbot designed to provide accessible, multi-lingual mental health screening, de-escalation, and coping techniques.',
    highlights: [
      'Engineered natural language understanding across 5+ regional and international languages (including English, Tamil, and Hindi) to eliminate language barriers in mental health care.',
      'Implemented psychological triage protocols, guided breathing exercises, and cognitive grounding routines with conversational memory.',
      'Built a modern, compassionate React interface with real-time sentiment analysis and privacy-first local session encryption.',
      'Integrated emergency hotline routing when severe distress triggers are detected.'
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initSkillsFilter();
  initScrollSpy();
  initBackToTop();
});

/* --- THEME TOGGLE (Dark / Light) --- */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('rithani-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('rithani-theme', newTheme);
    });
  }
}

/* --- NAVIGATION & MOBILE MENU --- */
function initNavigation() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileBtn.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileBtn.classList.remove('open');
      });
    });
  }
}

/* --- SKILLS FILTER --- */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- SCROLL SPY FOR ACTIVE NAV LINKS --- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* --- BACK TO TOP BUTTON --- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --- PROJECT MODAL FUNCTIONS --- */
function openProjectModal(projectId) {
  const modal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const data = projectData[projectId];

  if (!data || !modal || !modalContent) return;

  modalContent.innerHTML = `
    <h3 class="modal-project-title">${data.title}</h3>
    <div class="modal-meta-row">
      <span><i class="fa-solid fa-calendar-check"></i> ${data.period}</span>
    </div>

    <div class="modal-body">
      <h4 class="modal-section-title">Overview</h4>
      <p>${data.overview}</p>

      <h4 class="modal-section-title">Key Technical Achievements</h4>
      <ul>
        ${data.highlights.map(item => `<li>${item}</li>`).join('')}
      </ul>

      <h4 class="modal-section-title">Technologies Used</h4>
      <div class="project-tags" style="margin-top: 10px;">
        ${data.tags.map(t => `<span class="tag" style="background: var(--accent-orange-subtle); color: var(--accent-orange);">${t}</span>`).join('')}
      </div>

      <div style="margin-top: 28px; display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="#contact" onclick="closeProjectModal()" class="btn btn-primary">
          <span>Inquire About This Project</span>
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal(event) {
  if (event && event.target !== event.currentTarget && !event.target.classList.contains('modal-close')) {
    return;
  }
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});

/* --- CONTACT FORM SUBMISSION --- */
function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const name = document.getElementById('userName').value.trim();
  const email = document.getElementById('userEmail').value.trim();
  const message = document.getElementById('userMessage').value.trim();
  const toast = document.getElementById('formSuccessToast');

  // Trigger mailto client
  const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
  const body = encodeURIComponent(`Hi Rithani,\n\n${message}\n\nFrom: ${name} (${email})`);
  
  // Show toast
  if (toast) {
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 5000);
  }

  // Open email client
  window.location.href = `mailto:srrithani95@gmail.com?subject=${subject}&body=${body}`;

  form.reset();
}
