class MusicPlayer {
    constructor() {
        this.player = document.getElementById('musicPlayer');
        this.playBtn = document.getElementById('playBtn');
        this.progressFill = document.getElementById('progressFill');
        this.progressHandle = document.getElementById('progressHandle');
        this.progressBar = document.querySelector('.progress-bar');
        this.timeDisplay = document.querySelector('.time-display');
        this.likeBtn = document.querySelector('.like-btn');
        this.audio = document.getElementById('audioPlayer');
        this.envelope = document.getElementById('envelope');
        this.letterModal = document.getElementById('letterModal');
        this.closeLetterBtn = document.querySelector('.close-letter');
        this.letterContainer = document.getElementById('letterContainer');
        this.isLetterOpen = false;
        
        // Close letter when clicking the close button
        if (this.closeLetterBtn) {
            this.closeLetterBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeLetter();
            });
        }
        
        // Close letter when clicking outside the modal
        if (this.letterModal) {
            this.letterModal.addEventListener('click', (e) => {
                if (e.target === this.letterModal) {
                    this.closeLetter();
                }
            });
        }
        
        // Close letter with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isLetterOpen) {
                this.closeLetter();
            }
        });
        
        this.isPlaying = false;
        this.isMinimized = false;
        this.currentTime = 0;
        this.duration = 0;
        
        this.init();
    }
    
    init() {
        // Player controls
        this.playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePlay();
        });
        this.progressBar.addEventListener('click', (e) => {
            e.stopPropagation();
            this.seekTo(e);
        });
        this.likeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleLike();
        });
        if (this.audio) {
            this.audio.addEventListener('loadedmetadata', () => {
                this.duration = this.audio.duration || 0;
                this.updateProgress();
            });
            this.audio.addEventListener('timeupdate', () => {
                this.currentTime = this.audio.currentTime || 0;
                this.updateProgress();
            });
            this.audio.addEventListener('ended', () => {
                this.pause();
                this.audio.currentTime = 0;
            });
        }
        
        // Add click handlers for other control buttons
        const controlButtons = [
            '.shuffle-btn',
            '.prev-btn',
            '.next-btn',
            '.repeat-btn'
        ];
        
        controlButtons.forEach(selector => {
            const btn = document.querySelector(selector);
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const action = selector.replace('.', '').replace('-btn', '');
                    this[action]();
                });
            }
        });
        
        // Click outside to minimize
        document.addEventListener('click', (e) => {
            // If player is expanded and click is outside the player, minimize it
            if (!this.isMinimized && !this.player.contains(e.target)) {
                this.minimizePlayer();
            }
        });
        
        // Click on mini player to expand
        this.player.addEventListener('click', (e) => {
            // Only expand if player is minimized and click is on the mini player
            if (this.isMinimized && e.target.closest('.music-player.minimized')) {
                this.expandPlayer();
                e.stopPropagation();
            }
        });
        
        // Initialize progress
        this.updateProgress();
    }
    
    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    play() {
        this.isPlaying = true;
        this.playBtn.innerHTML = '⏸';
        if (this.audio) {
            this.audio.play().catch(() => {});
        }
        
        // Minimize player after a short delay
        setTimeout(() => {
            this.minimizePlayer();
        }, 1000);
    }
    
    pause() {
        this.isPlaying = false;
        this.playBtn.innerHTML = '▶';
        if (this.audio) {
            this.audio.pause();
        }
    }
    
    minimizePlayer() {
        if (!this.isMinimized) {
            this.isMinimized = true;
            this.player.classList.add('minimized');
        }
    }
    
    showLetter() {
        const letterModal = document.getElementById('letterModal');
        const closeBtn = document.querySelector('.close-letter');
        
        // Show the modal
        letterModal.style.display = 'flex';
        
        // Add click handler for close button
        closeBtn.onclick = () => {
            letterModal.style.display = 'none';
        };
        
        // Close when clicking outside the modal
        window.onclick = (event) => {
            if (event.target === letterModal) {
                letterModal.style.display = 'none';
            }
        };
    }
    
    hideLetter() {
        const letterModal = document.getElementById('letterModal');
        if (letterModal) {
            letterModal.style.display = 'none';
        }
        const letterContainer = document.getElementById('letterContainer');
        if (letterContainer) {
            letterContainer.style.opacity = '0';
            setTimeout(() => {
                letterContainer.style.display = 'none';
            }, 300);
        }
    }
    
    openLetter() {
        if (!this.isLetterOpen) {
            this.isLetterOpen = true;
            const letterModal = document.getElementById('letterModal');
            const letterContainer = document.getElementById('letterContainer');
            
            // Make sure elements exist
            if (!letterModal || !letterContainer) return;
            
            // Show the container and modal
            letterContainer.style.display = 'block';
            letterContainer.style.opacity = '1';
            
            // Add open class to envelope
            this.envelope.classList.add('open');
            
            // Show the modal after a short delay for the envelope animation
            setTimeout(() => {
                letterModal.style.display = 'flex';
                setTimeout(() => {
                    letterModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }, 50);
            }, 300);
        }
    }
    
    closeLetter() {
        if (this.isLetterOpen) {
            const letterModal = document.getElementById('letterModal');
            const letterContainer = document.getElementById('letterContainer');
            
            if (letterModal) {
                letterModal.classList.remove('active');
                setTimeout(() => {
                    letterModal.style.display = 'none';
                }, 300);
            }
            
            this.envelope.classList.remove('open');
            
            setTimeout(() => {
                if (letterContainer) {
                    letterContainer.style.opacity = '0';
                    setTimeout(() => {
                        letterContainer.style.display = 'none';
                    }, 300);
                }
                this.isLetterOpen = false;
                document.body.style.overflow = ''; // Re-enable scrolling
            }, 200);
        }
    }
    
    expandPlayer() {
        if (this.isMinimized) {
            this.isMinimized = false;
            this.player.classList.remove('minimized');
            this.hideLetter();
        }
    }
    
    updateProgress() {
        const duration = this.duration || (this.audio ? this.audio.duration : 0) || 0;
        const current = this.audio ? this.audio.currentTime : this.currentTime;
        const progress = duration ? (current / duration) * 100 : 0;
        this.progressFill.style.width = `${progress}%`;
        this.progressHandle.style.left = `${progress}%`;
        
        // Update time display
        const minutes = Math.floor((current || 0) / 60);
        const seconds = Math.floor((current || 0) % 60);
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    seekTo(event) {
        const rect = this.progressBar.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const progress = (clickX / rect.width) * 100;
        const duration = this.duration || (this.audio ? this.audio.duration : 0) || 0;
        const newTime = (progress / 100) * duration;
        if (this.audio) {
            this.audio.currentTime = newTime;
        }
        this.currentTime = newTime;
        this.updateProgress();
    }
    
    toggleLike() {
        this.likeBtn.classList.toggle('liked');
        if (!this.isMinimized) {
            this.minimizePlayer();
        } else {
            this.expandPlayer();
        }
    }
    
    shuffle() {
        // Add shuffle functionality
        console.log('Shuffle clicked');
    }
    
    previous() {
        // Add previous track functionality
        console.log('Previous clicked');
    }
    
    next() {
        // Add next track functionality
        console.log('Next clicked');
    }
    
    repeat() {
        // Add repeat functionality
        console.log('Repeat clicked');
    }
}

// Initialize the music player when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const mp = new MusicPlayer();
    generateStrawberries();

    const tabs = document.querySelectorAll('.tab-card');
    tabs.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            const modalId = card.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex';
                requestAnimationFrame(() => {
                    modal.classList.add('active');
                });
            }
        });
    });

    function wireClose(modalId, closeSelector) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        const btn = modal.querySelector(closeSelector);
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                modal.classList.remove('active');
                setTimeout(() => { modal.style.display = 'none'; }, 200);
            });
        }
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => { modal.style.display = 'none'; }, 200);
            }
        });
    }

    wireClose('letterModal', '.close-letter');
    wireClose('galleryModal', '.close-gallery');
    wireClose('poemModal', '.close-poem');
});

// Generate random strawberry stickers at grid intersections
function generateStrawberries() {
    const container = document.getElementById('strawberriesContainer');
    const gridSize = 38; // 1cm = 38px
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate how many grid intersections we have
    const cols = Math.ceil(viewportWidth / gridSize);
    const rows = Math.ceil(viewportHeight / gridSize);
    
    // Create a 2D array to track placed strawberries
    const placedStrawberries = Array(rows).fill().map(() => Array(cols).fill(false));
    const strawberryPositions = [];
    
    // Generate strawberries with proper spacing
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Skip if this position is already occupied
            if (placedStrawberries[row][col]) continue;
            
            // Check if there's enough distance from other strawberries (minimum 2 grid spaces)
            let canPlace = true;
            for (let pos of strawberryPositions) {
                const distance = Math.sqrt(Math.pow(row - pos.row, 2) + Math.pow(col - pos.col, 2));
                if (distance < 2) {
                    canPlace = false;
                    break;
                }
            }
            
            if (canPlace && Math.random() < 0.12) {
                const strawberry = document.createElement('div');
                strawberry.className = 'strawberry';
                
                // Position at grid intersection
                const x = col * gridSize;
                const y = row * gridSize;
                
                strawberry.style.left = x + 'px';
                strawberry.style.top = y + 'px';
                
                // No need to add seeds - they're part of the image
                
                // Add random rotation for variety
                const rotation = (Math.random() - 0.5) * 30; // -15 to +15 degrees
                strawberry.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
                
                container.appendChild(strawberry);
                
                // Mark this position and surrounding area as occupied
                placedStrawberries[row][col] = true;
                strawberryPositions.push({row: row, col: col});
                
                // Mark adjacent positions as unavailable to prevent clustering
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        const newRow = row + dr;
                        const newCol = col + dc;
                        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                            placedStrawberries[newRow][newCol] = true;
                        }
                    }
                }
            }
        }
    }
}

 
