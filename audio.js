// ===========================
// Astra Forge Audio Manager
// ===========================

class AudioManager {
    constructor() {
        this.sounds = {
            background: null,
            click: null,
            hover: null
        };

        this.isMuted = localStorage.getItem('audioMuted') === 'true';
        this.backgroundVolume = 0.1; // 30% volume for background music
        this.effectsVolume = 0.5; // 50% volume for sound effects
        this.fadeInDuration = 3000; // 3 seconds fade-in

        this.init();
    }

    init() {
        // Initialize background music
        this.sounds.background = new Audio('audio/baground-music.mp3');
        this.sounds.background.loop = true;
        this.sounds.background.volume = 0; // Start at 0 for fade-in

        // Initialize sound effects
        this.sounds.click = new Audio('audio/click-music.mp3');
        this.sounds.click.volume = this.effectsVolume;

        this.sounds.hover = new Audio('audio/button-hover-music.mp3');
        this.sounds.hover.volume = this.effectsVolume;

        // Create mute toggle button
        this.createMuteButton();

        // Start background music (browsers require user interaction)
        this.setupAutoPlay();

        // Add event listeners to interactive elements
        this.attachSoundEffects();
    }

    createMuteButton() {
        const muteBtn = document.createElement('button');
        muteBtn.id = 'audio-toggle';
        muteBtn.className = 'audio-toggle-btn';
        muteBtn.setAttribute('aria-label', 'Toggle Audio');

        // SVG Speaker Icon (Unmuted)
        const speakerOnIcon = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
        `;

        // SVG Speaker Icon (Muted)
        const speakerOffIcon = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
        `;

        muteBtn.innerHTML = this.isMuted ? speakerOffIcon : speakerOnIcon;

        // Professional box styling - no glow
        muteBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 8px;
            background: rgba(20, 20, 20, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #ffffff;
            cursor: pointer;
            z-index: 9999;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
        `;

        muteBtn.addEventListener('mouseenter', () => {
            muteBtn.style.background = 'rgba(30, 30, 30, 0.98)';
            muteBtn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            muteBtn.style.transform = 'translateY(-2px)';
        });

        muteBtn.addEventListener('mouseleave', () => {
            muteBtn.style.background = 'rgba(20, 20, 20, 0.95)';
            muteBtn.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            muteBtn.style.transform = 'translateY(0)';
        });

        muteBtn.addEventListener('click', () => {
            this.toggleMute();
            muteBtn.innerHTML = this.isMuted ? speakerOffIcon : speakerOnIcon;
        });

        document.body.appendChild(muteBtn);
    }

    setupAutoPlay() {
        // Try to play background music immediately
        if (!this.isMuted) {
            this.playBackground();
        }

        // Fallback: play on first user interaction
        const playOnInteraction = () => {
            if (!this.isMuted && this.sounds.background.paused) {
                this.playBackground();
            }
            // Remove listener after first interaction
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('keydown', playOnInteraction);
        };

        document.addEventListener('click', playOnInteraction);
        document.addEventListener('keydown', playOnInteraction);
    }

    fadeInBackground() {
        // Fade in from 0 to target volume over fadeInDuration
        const startTime = Date.now();
        const targetVolume = this.backgroundVolume;

        const fadeInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / this.fadeInDuration, 1);

            // Ease-in-out curve for smoother fade
            const easedProgress = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            this.sounds.background.volume = targetVolume * easedProgress;

            if (progress >= 1) {
                clearInterval(fadeInterval);
            }
        }, 50); // Update every 50ms for smooth transition
    }

    playBackground() {
        if (!this.isMuted) {
            this.sounds.background.volume = 0; // Reset to 0 before playing
            this.sounds.background.play()
                .then(() => {
                    this.fadeInBackground(); // Start fade-in after play succeeds
                })
                .catch(err => {
                    console.log('Background music autoplay prevented:', err);
                });
        }
    }

    playClick() {
        if (!this.isMuted) {
            // Reset and play for rapid clicks
            this.sounds.click.currentTime = 0;
            this.sounds.click.play().catch(err => console.log('Click sound error:', err));
        }
    }

    playHover() {
        if (!this.isMuted) {
            // Reset and play
            this.sounds.hover.currentTime = 0;
            this.sounds.hover.play().catch(err => console.log('Hover sound error:', err));
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem('audioMuted', this.isMuted);

        if (this.isMuted) {
            this.sounds.background.pause();
        } else {
            this.playBackground();
        }
    }

    attachSoundEffects() {
        // Add click sounds to all buttons and links
        const clickables = document.querySelectorAll('a, button, .btn, .filter-btn, .project-card, .identity-card, .cap-card');

        clickables.forEach(element => {
            element.addEventListener('click', () => {
                this.playClick();
            });
        });

        // Add hover sounds to buttons and CTA elements
        const hoverables = document.querySelectorAll('.btn, button, .filter-btn, .cta');

        hoverables.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.playHover();
            });
        });

        // Special handling for nav links (subtle hover only)
        const navLinks = document.querySelectorAll('nav a:not(.cta)');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.playHover();
            });
        });
    }
}

// Initialize Audio Manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.audioManager = new AudioManager();
    });
} else {
    window.audioManager = new AudioManager();
}
