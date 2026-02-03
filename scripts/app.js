// Team members data
const teamMembers = [
    { name: "Iquaibom David", role: "20221352932", emoji: "👑" },
  ];
  
 // DOM elements
const elements = {
  heroVideo: document.getElementById('heroVideo'),
  playBtn: document.getElementById('playBtn'),
  teamBtn: document.getElementById('teamBtn'),
  teamModal: document.getElementById('teamModal'),
  closeBtn: document.querySelector('.close-btn'),
  modalBody: document.querySelector('.modal-body'),
  bgAudio: document.getElementById('bgAudio')
};

let videoPlaying = true;
let audioEnabled = false;

// Initialize
function init() {
  setupEventListeners();
  renderTeamMembers();
  
  // Pause video after 8 seconds (adjust as needed)
  setTimeout(() => {
    elements.heroVideo.pause();
    videoPlaying = false;
    elements.playBtn.innerHTML = '<i class="fas fa-redo"></i> Replay Intro';
  }, 8000);
}

// Event listeners
function setupEventListeners() {
  elements.playBtn.addEventListener('click', toggleVideo);
  elements.teamBtn.addEventListener('click', openTeamModal);
  elements.closeBtn.addEventListener('click', closeTeamModal);
  
  // Close modal when clicking outside
  elements.teamModal.addEventListener('click', (e) => {
    if (e.target === elements.teamModal) closeTeamModal();
  });
  
  // Close modal with ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elements.teamModal.classList.contains('active')) {
      closeTeamModal();
    }
  });
}

// Toggle video play/pause
function toggleVideo() {
  if (videoPlaying) {
    elements.heroVideo.pause();
    elements.playBtn.innerHTML = '<i class="fas fa-play"></i> Play Intro';
  } else {
    elements.heroVideo.play();
    enableAudio();
    elements.playBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
  }
  videoPlaying = !videoPlaying;
}

// Enable audio
function enableAudio() {
  if (!audioEnabled) {
    elements.bgAudio.muted = false;
    elements.bgAudio.play()
      .then(() => {
        audioEnabled = true;
      })
      .catch(err => {
        console.log("Audio playback error:", err);
      });
  }
}

// Team modal functions
function openTeamModal() {
  elements.teamModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeTeamModal() {
  elements.teamModal.classList.remove('active');
  document.body.style.overflow = '';
}

// Render team members
function renderTeamMembers() {
  let html = '';
  teamMembers.forEach(member => {
    html += `
      <div class="team-member">
        <div class="member-avatar">${member.emoji}</div>
        <div class="member-info">
          <h4>${member.name}</h4>
          <p>${member.role}</p>
        </div>
      </div>
    `;
  });
  elements.modalBody.innerHTML = html;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
  