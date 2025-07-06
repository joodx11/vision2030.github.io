let currentPage = 1;
const totalPages = 13;
let isAnimating = false;

// Progress tracking
function updateProgress() {
  const progress = (currentPage / totalPages) * 100;
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    progressBar.style.width = progress + '%';
  }
}

// Enhanced page navigation with animations
function showPage(num) {
  // Pause all videos when navigating pages
  document.querySelectorAll('video').forEach(v => v.pause());

  if(num < 1 || num > totalPages || isAnimating) return;

  // Pause intro video if leaving page 1
  if (currentPage === 1 && num !== 1) {
    const introVideo = document.querySelector('#page1 video');
    if (introVideo) introVideo.pause();
  }

  isAnimating = true;
  const currentPageElement = document.querySelector('.page.active');
  const targetPageElement = document.getElementById(`page${num}`);
  
  if (currentPageElement && targetPageElement) {
    // Fade out current page
    currentPageElement.style.opacity = '0';
    currentPageElement.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      currentPageElement.classList.remove("active");
      targetPageElement.classList.add("active");
      
      // Fade in target page
      targetPageElement.style.opacity = '0';
      targetPageElement.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        targetPageElement.style.opacity = '1';
        targetPageElement.style.transform = 'translateY(0)';
        isAnimating = false;
      }, 50);
    }, 300);
  } else {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(`page${num}`).classList.add("active");
    isAnimating = false;
  }
  
  currentPage = num;
  updateProgress();
  updateActiveMenuItem(num);

  // Initialize Leaflet map only when the map page is shown
  if(num === 13) {
    setTimeout(() => initMap(), 500);
  }
}

function nextPage() {
  if (currentPage < totalPages && !isAnimating) {
    showPage(currentPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function prevPage() {
  if (currentPage > 1 && !isAnimating) {
    showPage(currentPage - 1);
  }
}

// Update active menu item
function updateActiveMenuItem(pageNum) {
  const menuItems = document.querySelectorAll('#menuList li a');
  menuItems.forEach((item, index) => {
    if (index + 1 === pageNum) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Enhanced sidebar toggle with smooth animations
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const content = document.getElementById('mainContent');
  const lockBtn = document.getElementById('lockBtn');
  
  sidebar.classList.toggle('collapsed');
  content.classList.toggle('expanded');
  
  if (sidebar.classList.contains('collapsed')) {
    lockBtn.textContent = '🔓';
    lockBtn.title = 'Expand Menu';
  } else {
    lockBtn.textContent = '🔒';
    lockBtn.title = 'Collapse Menu';
  }
}

// Enhanced map initialization
let mapInitialized = false;

function initMap() {
  if(mapInitialized) return;
  mapInitialized = true;

  // Show loading indicator
  const mapContainer = document.getElementById('ksa-map');
  mapContainer.innerHTML = '<div class="loading" style="margin: 50% auto;"></div>';

  // Coordinates roughly centered on Saudi Arabia
  const ksaCenter = [24.7136, 46.6753];
  const map = L.map('ksa-map').setView(ksaCenter, 5);

  // Add OpenStreetMap tiles with custom styling
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 12,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Enhanced Vision 2030 projects and generation systems
  const projects = [
    {
      name: "NEOM & The Line",
      description: "Futuristic smart city and urban development with AI-powered infrastructure.",
      coords: [28.0, 35.0],
      icon: '🏗️'
    },
    {
      name: "Qiddiya",
      description: "Entertainment, arts, and sports hub near Riyadh - the Kingdom's capital of entertainment.",
      coords: [24.741, 46.485],
      icon: '🎢'
    },
    {
      name: "Red Sea Project",
      description: "Luxury sustainable tourism destination on the pristine Red Sea coast.",
      coords: [24.850, 37.000],
      icon: '🏖️'
    },
    {
      name: "Roshn",
      description: "Modern residential neighborhoods across Saudi Arabia with smart city features.",
      coords: [24.774, 46.738],
      icon: '🏘️'
    },
    {
      name: "New Murabba",
      description: "Urban transformation project in Riyadh creating a modern downtown district.",
      coords: [24.7136, 46.6753],
      icon: '🏙️'
    },
    {
      name: "Shuaibah Power Plant",
      description: "Thermal power plant with 3,000 MW capacity providing reliable energy.",
      coords: [20.544, 39.069],
      icon: '⚡'
    },
    {
      name: "Sakaka Solar Plant",
      description: "Solar power plant with 300 MW capacity harnessing renewable energy.",
      coords: [29.970, 40.214],
      icon: '☀️'
    },
    {
      name: "Dumat Al Jandal Wind Farm",
      description: "Wind energy project contributing to renewable energy goals.",
      coords: [29.970, 40.214],
      icon: '💨'
    }
  ];

  // Create custom icons
  const customIcon = L.divIcon({
    className: 'custom-marker',
    html: '📍',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });

  // Add enhanced markers to map
  projects.forEach(project => {
    const marker = L.marker(project.coords, { icon: customIcon }).addTo(map);
    
    const popupContent = `
      <div style="text-align: center; min-width: 200px;">
        <div style="font-size: 24px; margin-bottom: 8px;">${project.icon}</div>
        <h3 style="color: #38d39f; margin: 0 0 8px 0;">${project.name}</h3>
        <p style="color: #666; margin: 0; font-size: 14px;">${project.description}</p>
      </div>
    `;
    
    marker.bindPopup(popupContent, {
      maxWidth: 250,
      className: 'custom-popup'
    });
  });
}

// Enhanced menu toggle with animation
const alwaysVisible = [
  "Introduction",
  "Vision 2030 Goals",
  "Quiz",
  "Generation Systems Map"
];

let isHidden = false;

function toggleMenuItems() {
  const menuList = document.getElementById('menuList');
  const items = menuList.querySelectorAll('li');
  const hideBtn = document.getElementById('hideBtn');

  if (!isHidden) {
    items.forEach((li, index) => {
      const text = li.textContent.trim();
      if (!alwaysVisible.includes(text)) {
        li.style.transition = `all 0.3s ease ${index * 0.05}s`;
        li.style.opacity = '0';
        li.style.transform = 'translateX(-20px)';
        setTimeout(() => {
          li.style.display = 'none';
        }, 300 + (index * 50));
      }
    });
    hideBtn.textContent = 'Show All';
    hideBtn.title = 'Show All Menu Items';
    isHidden = true;
  } else {
    items.forEach((li, index) => {
      li.style.display = 'list-item';
      li.style.transition = `all 0.3s ease ${index * 0.05}s`;
      setTimeout(() => {
        li.style.opacity = '1';
        li.style.transform = 'translateX(0)';
      }, 50);
    });
    hideBtn.textContent = 'Hide Others';
    hideBtn.title = 'Hide Non-Essential Menu Items';
    isHidden = false;
  }
}

// Enhanced quiz with better feedback
function checkAnswer() {
  const form = document.getElementById('quizForm');
  const feedback = document.getElementById('quizFeedback');
  const selected = form.vision.value;

  if (!selected) {
    feedback.style.color = '#ff6b6b'; 
    feedback.textContent = 'Please select an answer before submitting.';
    feedback.style.animation = 'shake 0.5s ease-in-out';
    return;
  }

  // Remove shake animation
  feedback.style.animation = '';

  if (selected === 'B') {
    feedback.style.color = '#38d39f';
    feedback.textContent = 'Correct! Saudi Vision 2030 aims to diversify sources of income and reduce dependence on oil revenues.';
    feedback.style.animation = 'pulse 0.5s ease-in-out';
    // Add confetti effect
    createConfetti();
    document.getElementById('quizContinueBtn').style.display = 'inline-block';
  } else {
    feedback.style.color = '#ff6b6b'; 
    feedback.textContent = '❌ Incorrect. Please try again.';
    feedback.style.animation = 'shake 0.5s ease-in-out';
    document.getElementById('quizContinueBtn').style.display = 'inline-block';
  }
}

// Confetti effect for correct answers
function createConfetti() {
  const colors = ['#38d39f', '#2bbd8a', '#1fa876', '#a0f1d1'];
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    nextPage();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    prevPage();
  } else if (e.key === 'Escape') {
    toggleSidebar();
  }
});

// Smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
  // Add progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  document.body.appendChild(progressBar);
  
  // Add floating action button for mobile
  if (window.innerWidth <= 768) {
    const fab = document.createElement('div');
    fab.className = 'fab';
    fab.innerHTML = '<i>☰</i>';
    fab.onclick = toggleSidebar;
    fab.title = 'Toggle Menu';
    document.body.appendChild(fab);
  }
  
  // Initialize first page
  updateProgress();
  updateActiveMenuItem(1);
  
  // Add smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  @keyframes fall {
    to {
      transform: translateY(100vh) rotate(360deg);
    }
  }
  
  .custom-marker {
    background: none;
    border: none;
    font-size: 24px;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
  }
  
  .custom-popup .leaflet-popup-content-wrapper {
    background: linear-gradient(135deg, rgba(44, 62, 64, 0.95) 0%, rgba(52, 73, 94, 0.95) 100%);
    border: 1px solid rgba(56, 211, 159, 0.2);
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  }
  
  .custom-popup .leaflet-popup-tip {
    background: rgba(44, 62, 64, 0.95);
  }
  
  #menuList li a.active {
    color: #38d39f;
    background: rgba(56, 211, 159, 0.1);
    border-radius: 6px;
    text-shadow: 0 0 8px rgba(56, 211, 159, 0.5);
  }
`;
document.head.appendChild(style); 