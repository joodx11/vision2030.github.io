let currentPage = 1;
const totalPages = 13;

function showPage(num) {
  if(num < 1 || num > totalPages) return;
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(`page${num}`).classList.add("active");
  currentPage = num;

  // Initialize Leaflet map only when the map page is shown
  if(num === 13) {
    initMap();
  }
}

function nextPage() {
  if (currentPage < totalPages) {
    showPage(currentPage + 1);
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const content = document.getElementById('mainContent');
  const lockBtn = document.getElementById('lockBtn');
  sidebar.classList.toggle('collapsed');
  content.classList.toggle('expanded');
  lockBtn.textContent = sidebar.classList.contains('collapsed') ? '🔓' : '🔒';
}

let mapInitialized = false;

function initMap() {
  if(mapInitialized) return;
  mapInitialized = true;

  // Coordinates roughly centered on Saudi Arabia
  const ksaCenter = [24.7136, 46.6753];
  const map = L.map('ksa-map').setView(ksaCenter, 5);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 12,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Vision 2030 projects and generation systems
  const projects = [
    {
      name: "NEOM & The Line",
      description: "Futuristic smart city and urban development.",
      coords: [28.0, 35.0]
    },
    {
      name: "Qiddiya",
      description: "Entertainment, arts, and sports hub near Riyadh.",
      coords: [24.741, 46.485]
    },
    {
      name: "Red Sea Project",
      description: "Luxury sustainable tourism on the Red Sea coast.",
      coords: [24.850, 37.000]
    },
    {
      name: "Roshn",
      description: "Modern residential neighborhoods across Saudi Arabia.",
      coords: [24.774, 46.738]
    },
    {
      name: "New Murabba",
      description: "Urban transformation project in Riyadh.",
      coords: [24.7136, 46.6753]
    },
    {
      name: "Shuaibah Power Plant",
      description: "Thermal power plant (3,000 MW).",
      coords: [20.544, 39.069]
    },
    {
      name: "Sakaka Solar Plant",
      description: "Solar power plant (300 MW).",
      coords: [29.970, 40.214]
    }
  ];

  // Add markers to map
  projects.forEach(project => {
    const marker = L.marker(project.coords).addTo(map);
    marker.bindPopup(`
      <b>${project.name}</b><br>
      ${project.description}
    `);
  });
}

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

  if (!isHidden) {
    items.forEach(li => {
      const text = li.textContent.trim();
      if (!alwaysVisible.includes(text)) {
        li.style.display = 'none';
      }
    });
    document.getElementById('hideBtn').textContent = 'Show All';
    isHidden = true;
  } else {
    items.forEach(li => {
      li.style.display = 'list-item';
    });
    document.getElementById('hideBtn').textContent = 'Hide Others';
    isHidden = false;
  }
}

function checkAnswer() {
  const form = document.getElementById('quizForm');
  const feedback = document.getElementById('quizFeedback');
  const selected = form.vision.value;

  if (!selected) {
    feedback.style.color = '#ff6b6b'; 
    feedback.textContent = 'Please select an answer before submitting.';
    return;
  }

  if (selected === 'B') {
    feedback.style.color = '#38d39f';
    feedback.textContent = 'Correct! Saudi Vision 2030 aims to diversify sources of income.';
  } else {
    feedback.style.color = '#ff6b6b'; 
    feedback.textContent = 'Incorrect. Please try again.';
  }
} 