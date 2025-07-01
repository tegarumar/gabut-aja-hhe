// Smooth scrolling for better user experience
document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = "smooth";

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(
    ".birthday-card, .wish-card, .wishes-title"
  );
  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // Add hover effects to cards
  const cards = document.querySelectorAll(".wish-card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add sparkle effect on mouse move
  document.addEventListener("mousemove", (e) => {
    if (Math.random() > 0.95) {
      createSparkle(e.clientX, e.clientY);
    }
  });

  // Create random sparkles
  setInterval(createRandomSparkle, 2000);
});

// Celebration function
function celebrate() {
  const modal = document.getElementById("celebrationModal");
  modal.style.display = "flex";

  // Add celebration sound effect (optional)
  // You can add an audio element here if needed

  // Create extra confetti
  createConfetti();

  // Auto close after 5 seconds
  setTimeout(() => {
    closeCelebration();
  }, 5000);
}

function closeCelebration() {
  const modal = document.getElementById("celebrationModal");
  modal.style.display = "none";
}

// Create sparkle effect
function createSparkle(x, y) {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle-effect";
  sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 6px;
        height: 6px;
        background: #FFD700;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: sparkleEffect 1s ease-out forwards;
    `;

  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 1000);
}

// Create random sparkles
function createRandomSparkle() {
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  createSparkle(x, y);
}

// Create confetti effect
function createConfetti() {
  const colors = [
    "#FF69B4",
    "#00CED1",
    "#98FB98",
    "#FFB6C1",
    "#DDA0DD",
    "#FFD700",
  ];

  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: -10px;
                width: 8px;
                height: 8px;
                background: ${
                  colors[Math.floor(Math.random() * colors.length)]
                };
                border-radius: 50%;
                pointer-events: none;
                z-index: 1001;
                animation: confettiFall 3s linear forwards;
            `;

      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }, i * 100);
  }
}

// Add sparkle animation CSS
const sparkleStyle = document.createElement("style");
sparkleStyle.textContent = `
    @keyframes sparkleEffect {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation-play-state: running !important;
    }
`;
document.head.appendChild(sparkleStyle);

// Close modal when clicking outside
document.addEventListener("click", (e) => {
  const modal = document.getElementById("celebrationModal");
  if (e.target === modal) {
    closeCelebration();
  }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCelebration();
  }
});

// Add touch support for mobile
document.addEventListener("touchstart", (e) => {
  if (Math.random() > 0.8) {
    const touch = e.touches[0];
    createSparkle(touch.clientX, touch.clientY);
  }
});

// Performance optimization: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.documentElement.style.setProperty("--animation-duration", "0.5s");
}

// Music Player Functionality
class MusicPlayer {
  constructor() {
    this.audio = document.getElementById("audioPlayer");
    this.playPauseBtn = document.getElementById("playPauseBtn");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.progressBar = document.getElementById("progressBar");
    this.progressFill = document.getElementById("progressFill");
    this.progressHandle = document.getElementById("progressHandle");
    this.currentTimeEl = document.getElementById("currentTime");
    this.totalTimeEl = document.getElementById("totalTime");
    this.volumeBtn = document.getElementById("volumeBtn");
    this.volumeSlider = document.getElementById("volumeSlider");
    this.volumeFill = document.getElementById("volumeFill");
    this.volumeHandle = document.getElementById("volumeHandle");
    this.songTitle = document.getElementById("songTitle");
    this.songArtist = document.getElementById("songArtist");
    this.vinylRecord = document.getElementById("vinylRecord");
    this.playerToggle = document.getElementById("playerToggle");
    this.playerContent = document.getElementById("playerContent");
    this.playlist = document.querySelectorAll(".playlist-item");

    this.currentSongIndex = 0;
    this.isPlaying = false;
    this.volume = 0.7;

    this.init();
  }

  init() {
    // Set initial volume
    this.audio.volume = this.volume;
    this.updateVolumeDisplay();

    // Event listeners
    this.playPauseBtn.addEventListener("click", () => this.togglePlay());
    this.prevBtn.addEventListener("click", () => this.previousSong());
    this.nextBtn.addEventListener("click", () => this.nextSong());
    this.playerToggle.addEventListener("click", () => this.togglePlayer());

    // Progress bar events
    this.progressBar.addEventListener("click", (e) => this.setProgress(e));
    this.progressHandle.addEventListener("mousedown", (e) =>
      this.startProgressDrag(e)
    );

    // Volume events
    this.volumeSlider.addEventListener("click", (e) => this.setVolume(e));
    this.volumeHandle.addEventListener("mousedown", (e) =>
      this.startVolumeDrag(e)
    );
    this.volumeBtn.addEventListener("click", () => this.toggleMute());

    // Audio events
    this.audio.addEventListener("timeupdate", () => this.updateProgress());
    this.audio.addEventListener("loadedmetadata", () => this.updateDuration());
    this.audio.addEventListener("ended", () => this.nextSong());

    // Playlist events
    this.playlist.forEach((item, index) => {
      item.addEventListener("click", () => this.selectSong(index));
    });

    // Load first song
    this.loadSong(0);
  }

  togglePlayer() {
    this.playerContent.classList.toggle("active");
    const icon = this.playerToggle.querySelector(".toggle-icon");
    if (this.playerContent.classList.contains("active")) {
      icon.textContent = "🎵";
    } else {
      icon.textContent = "🎶";
    }
  }

  loadSong(index) {
    const song = this.playlist[index];
    const src = song.dataset.src;
    const title = song.dataset.title;
    const artist = song.dataset.artist;

    this.audio.src = src;
    this.songTitle.textContent = title;
    this.songArtist.textContent = artist;

    // Update playlist active state
    this.playlist.forEach((item) => item.classList.remove("active"));
    song.classList.add("active");

    this.currentSongIndex = index;
  }

  selectSong(index) {
    this.loadSong(index);
    if (this.isPlaying) {
      this.audio.play();
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.audio
      .play()
      .then(() => {
        this.isPlaying = true;
        this.updatePlayButton();
        this.vinylRecord.classList.add("playing");
        this.createMusicNotes();
      })
      .catch((error) => {
        console.log("Playback failed:", error);
        // Show user-friendly message
        // this.showMessage("Klik untuk memutar musik! 🎵")
      });
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.updatePlayButton();
    this.vinylRecord.classList.remove("playing");
  }

  updatePlayButton() {
    const playIcon = this.playPauseBtn.querySelector(".play-icon");
    const pauseIcon = this.playPauseBtn.querySelector(".pause-icon");

    if (this.isPlaying) {
      playIcon.style.display = "none";
      pauseIcon.style.display = "block";
    } else {
      playIcon.style.display = "block";
      pauseIcon.style.display = "none";
    }
  }

  previousSong() {
    this.currentSongIndex =
      this.currentSongIndex > 0
        ? this.currentSongIndex - 1
        : this.playlist.length - 1;
    this.loadSong(this.currentSongIndex);
    if (this.isPlaying) {
      this.audio.play();
    }
  }

  nextSong() {
    this.currentSongIndex =
      this.currentSongIndex < this.playlist.length - 1
        ? this.currentSongIndex + 1
        : 0;
    this.loadSong(this.currentSongIndex);
    if (this.isPlaying) {
      this.audio.play();
    }
  }

  updateProgress() {
    if (this.audio.duration) {
      const progress = (this.audio.currentTime / this.audio.duration) * 100;
      this.progressFill.style.width = progress + "%";
      this.progressHandle.style.left = progress + "%";

      this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
    }
  }

  updateDuration() {
    if (this.audio.duration) {
      this.totalTimeEl.textContent = this.formatTime(this.audio.duration);
    }
  }

  setProgress(e) {
    const rect = this.progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    this.audio.currentTime = percent * this.audio.duration;
  }

  setVolume(e) {
    const rect = this.volumeSlider.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    this.volume = Math.max(0, Math.min(1, percent));
    this.audio.volume = this.volume;
    this.updateVolumeDisplay();
  }

  updateVolumeDisplay() {
    const percent = this.volume * 100;
    this.volumeFill.style.width = percent + "%";
    this.volumeHandle.style.left = percent + "%";
  }

  toggleMute() {
    if (this.audio.volume > 0) {
      this.audio.volume = 0;
      this.volumeFill.style.width = "0%";
      this.volumeHandle.style.left = "0%";
    } else {
      this.audio.volume = this.volume;
      this.updateVolumeDisplay();
    }
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  createMusicNotes() {
    const notes = ["♪", "♫", "♬", "♩"];
    const colors = ["#FFD700", "#FFA500", "#FF8C00", "#FFB6C1"];

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const note = document.createElement("div");
        note.textContent = notes[Math.floor(Math.random() * notes.length)];
        note.style.cssText = `
          position: fixed;
          left: ${Math.random() * 100}%;
          top: 20%;
          font-size: 2rem;
          color: ${colors[Math.floor(Math.random() * colors.length)]};
          pointer-events: none;
          z-index: 1000;
          animation: musicNoteFloat 3s ease-out forwards;
        `;

        document.body.appendChild(note);

        setTimeout(() => note.remove(), 3000);
      }, i * 500);
    }
  }

  showMessage(message) {
    const messageEl = document.createElement("div");
    messageEl.textContent = message;
    messageEl.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--warm-gradient);
      color: white;
      padding: 1rem 2rem;
      border-radius: 25px;
      font-size: 1.1rem;
      font-weight: 600;
      z-index: 1001;
      box-shadow: 0 10px 20px var(--soft-shadow);
      animation: messagePopup 3s ease-out forwards;
    `;

    document.body.appendChild(messageEl);
    setTimeout(() => messageEl.remove(), 3000);
  }

  // Drag functionality for progress and volume
  startProgressDrag(e) {
    e.preventDefault();
    const mouseMoveHandler = (e) => this.setProgress(e);
    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  }

  startVolumeDrag(e) {
    e.preventDefault();
    const mouseMoveHandler = (e) => this.setVolume(e);
    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  }
}

// Add music note animation CSS
const musicStyle = document.createElement("style");
musicStyle.textContent = `
  @keyframes musicNoteFloat {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) rotate(360deg);
      opacity: 0;
    }
  }
  
  @keyframes messagePopup {
    0% {
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 0;
    }
    20% {
      transform: translate(-50%, -50%) scale(1.1);
      opacity: 1;
    }
    80% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(0.8);
      opacity: 0;
    }
  }
`;
document.head.appendChild(musicStyle);

// Initialize music player when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = "smooth";

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(
    ".birthday-card, .wish-card, .wishes-title"
  );
  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // Add hover effects to cards
  const cards = document.querySelectorAll(".wish-card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add sparkle effect on mouse move
  document.addEventListener("mousemove", (e) => {
    if (Math.random() > 0.95) {
      createSparkle(e.clientX, e.clientY);
    }
  });

  // Create random sparkles
  setInterval(createRandomSparkle, 2000);

  // Initialize music player
  const musicPlayer = new MusicPlayer();

  // Add keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && e.target.tagName !== "INPUT") {
      e.preventDefault();
      musicPlayer.togglePlay();
    }
    if (e.code === "ArrowLeft") {
      musicPlayer.previousSong();
    }
    if (e.code === "ArrowRight") {
      musicPlayer.nextSong();
    }
  });
});
