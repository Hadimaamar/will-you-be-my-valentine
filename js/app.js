/**
 * Valentine's Website - ULTRA YOLO MODE 🚀
 * The "No" button that refuses to be clicked! 💕
 * Now with AUDIO, custom cursor, and SAD MODE! 😢
 */

// ========================================
// Configuration
// ========================================
const CONFIG = {
    noButtonTexts: [
        "No 😢",
        "Are you sure? 🤔",
        "Pretty please? 🥺",
        "Wrong button! ⬅️",
        "Think again! 💭",
        "Don't break my heart! 💔",
        "Give it a try! ✨",
        "You know you want to! 💝"
    ],
    jumpPadding: 20, // Minimum distance from edges
    mobileBreakpoint: 768,
    debounceDelay: 100
};

// ========================================
// DOM Elements
// ========================================
const elements = {
    yesButton: document.getElementById('yesButton'),
    noButton: document.getElementById('noButton'),
    questionSection: document.getElementById('questionSection'),
    successSection: document.getElementById('successSection'),
    mainGif: document.getElementById('mainGif'),
    successGif: document.getElementById('successGif'),
    heartsContainer: document.querySelector('.hearts-container'),
    cursor: document.getElementById('cursor'),
    cursorTrail: document.getElementById('cursorTrail'),
    audioToggle: document.getElementById('audioToggle'),
    sadPopup: document.getElementById('sadPopup'),
    stayButton: document.getElementById('stayButton')
};

// ========================================
// State
// ========================================
let state = {
    textIndex: 0,
    jumpCount: 0,
    isMobile: window.innerWidth <= CONFIG.mobileBreakpoint,
    lastJumpTime: 0,
    chaosMode: false,
    hasSaidYes: false
};

// ========================================
// Audio System 🎵
// ========================================
let audioState = {
    synth: null,
    isMuted: true,
    bgLoop: null
};

function initAudio() {
    // Create synth for sound effects
    audioState.synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "triangle" },
        envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 1 }
    }).toDestination();
    audioState.synth.volume.value = -10;
    
    // Create background music loop
    const melody = [
        { time: "0:0", note: "C4", duration: "8n" },
        { time: "0:1", note: "E4", duration: "8n" },
        { time: "0:2", note: "G4", duration: "8n" },
        { time: "0:3", note: "C5", duration: "4n" },
        { time: "1:0", note: "A4", duration: "8n" },
        { time: "1:1", note: "G4", duration: "8n" },
        { time: "1:2", note: "E4", duration: "4n" },
    ];
    
    audioState.bgLoop = new Tone.Part((time, value) => {
        if (!audioState.isMuted && audioState.synth) {
            audioState.synth.triggerAttackRelease(value.note, value.duration, time);
        }
    }, melody);
    audioState.bgLoop.loop = true;
    audioState.bgLoop.loopEnd = "2m";
}

function toggleAudio() {
    if (audioState.isMuted) {
        // Unmute
        Tone.start();
        audioState.isMuted = false;
        elements.audioToggle.textContent = '🔊';
        elements.audioToggle.classList.remove('muted');
        if (audioState.bgLoop) {
            Tone.Transport.start();
            audioState.bgLoop.start(0);
        }
        playSound('happy');
    } else {
        // Mute
        audioState.isMuted = true;
        elements.audioToggle.textContent = '🔇';
        elements.audioToggle.classList.add('muted');
        if (audioState.bgLoop) {
            audioState.bgLoop.stop();
        }
    }
}

function playSound(type) {
    if (audioState.isMuted || !audioState.synth) return;
    
    switch(type) {
        case 'jump':
            audioState.synth.triggerAttackRelease("C5", "32n");
            break;
        case 'happy':
            audioState.synth.triggerAttackRelease(["C4", "E4", "G4", "C5"], "8n");
            break;
        case 'success':
            // Victory arpeggio
            const now = Tone.now();
            audioState.synth.triggerAttackRelease("C4", "8n", now);
            audioState.synth.triggerAttackRelease("E4", "8n", now + 0.1);
            audioState.synth.triggerAttackRelease("G4", "8n", now + 0.2);
            audioState.synth.triggerAttackRelease("C5", "8n", now + 0.3);
            audioState.synth.triggerAttackRelease(["C4", "E4", "G4", "C5", "E5"], "2n", now + 0.4);
            break;
        case 'sad':
            audioState.synth.triggerAttackRelease(["A3", "C4"], "4n");
            break;
    }
}

// ========================================
// Custom Cursor ✨
// ========================================
function initCustomCursor() {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        // Smooth follow for main cursor
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        // Smoother follow for trail
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        elements.cursor.style.left = cursorX + 'px';
        elements.cursor.style.top = cursorY + 'px';
        elements.cursorTrail.style.left = trailX + 'px';
        elements.cursorTrail.style.top = trailY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            elements.cursor.textContent = '💝';
            elements.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        btn.addEventListener('mouseleave', () => {
            elements.cursor.textContent = '💕';
            elements.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// ========================================
// Sad Mode - Try to leave? 😢
// ========================================
function initSadMode() {
    let mouseLeaveCount = 0;
    
    // When mouse leaves the window
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 0 && !state.hasSaidYes && mouseLeaveCount < 3) {
            mouseLeaveCount++;
            showSadPopup();
        }
    });
    
    // Stay button
    elements.stayButton.addEventListener('click', () => {
        hideSadPopup();
        playSound('happy');
        // Gentle screen shake
        document.body.classList.add('screen-shake');
        setTimeout(() => document.body.classList.remove('screen-shake'), 500);
    });
}

function showSadPopup() {
    elements.sadPopup.classList.add('visible');
    playSound('sad');
    
    // Add crying animation to main gif
    if (elements.mainGif) {
        elements.mainGif.style.filter = 'grayscale(50%) sepia(50%) hue-rotate(-50deg)';
    }
}

function hideSadPopup() {
    elements.sadPopup.classList.remove('visible');
    
    // Remove crying filter
    if (elements.mainGif) {
        elements.mainGif.style.filter = '';
    }
}

// ========================================
// Initialization
// ========================================
function init() {
    // Add hasSaidYes to state
    state.hasSaidYes = false;
    createFloatingHearts();
    setupEventListeners();
    setupNoButtonPosition();
    initCustomCursor();
    initAudio();
    initSadMode();
    
    // Handle resize
    window.addEventListener('resize', handleResize);
}

// ========================================
// Floating Hearts Background
// ========================================
function createFloatingHearts() {
    const heartSymbols = ['💕', '💖', '💗', '💝', '💘', '💓'];
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        // Random positioning and timing
        const left = Math.random() * 100;
        const duration = 15 + Math.random() * 10; // 15-25s
        const delay = Math.random() * 15;
        const size = 15 + Math.random() * 20; // 15-35px
        
        heart.style.left = `${left}%`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.fontSize = `${size}px`;
        
        elements.heartsContainer.appendChild(heart);
    }
}

// ========================================
// No Button - The Star of the Show! 🌟
// ========================================
function setupNoButtonPosition() {
    // Set initial position for desktop (centered in buttons container)
    if (!state.isMobile) {
        const container = document.querySelector('.buttons-container');
        const yesBtn = elements.yesButton;
        
        // Position to the right of Yes button
        const yesRect = yesBtn.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        elements.noButton.style.position = 'absolute';
        elements.noButton.style.left = `${yesRect.right - containerRect.left + 30}px`;
        elements.noButton.style.top = '0';
    }
}

function jumpNoButton(event) {
    event.preventDefault();
    event.stopPropagation();
    
    // Debounce to prevent too many jumps
    const now = Date.now();
    if (now - state.lastJumpTime < CONFIG.debounceDelay) return;
    state.lastJumpTime = now;
    
    // Play jump sound
    playSound('jump');
    
    // Increment jump count and check for chaos mode
    state.jumpCount++;
    if (state.jumpCount > 5 && !state.chaosMode) {
        state.chaosMode = true;
        elements.noButton.style.transition = 'all 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        // Add warning emoji
        elements.noButton.style.boxShadow = '0 4px 12px rgba(156, 39, 176, 0.3), 0 0 20px rgba(255, 0, 0, 0.5)';
    }
    
    // Calculate new position
    const buttonRect = elements.noButton.getBoundingClientRect();
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate available space
    const maxX = viewportWidth - buttonWidth - CONFIG.jumpPadding;
    const maxY = viewportHeight - buttonHeight - CONFIG.jumpPadding;
    
    // Generate random position within bounds
    let newX, newY;
    let attempts = 0;
    const maxAttempts = 10;
    
    do {
        newX = CONFIG.jumpPadding + Math.random() * (maxX - CONFIG.jumpPadding);
        newY = CONFIG.jumpPadding + Math.random() * (maxY - CONFIG.jumpPadding);
        attempts++;
        
        // Ensure minimum distance from current position
        const currentX = buttonRect.left;
        const currentY = buttonRect.top;
        const distance = Math.sqrt(Math.pow(newX - currentX, 2) + Math.pow(newY - currentY, 2));
        
        if (distance > 100 || attempts >= maxAttempts) break;
    } while (attempts < maxAttempts);
    
    // Apply new position
    elements.noButton.style.position = 'fixed';
    elements.noButton.style.left = `${newX}px`;
    elements.noButton.style.top = `${newY}px`;
    
    // Add rotation for extra playfulness
    const rotation = (Math.random() - 0.5) * 20; // -10 to 10 degrees
    elements.noButton.style.setProperty('--rotation', `${rotation}deg`);
    elements.noButton.style.transform = `rotate(${rotation}deg)`;
    
    // Add jump animation class
    elements.noButton.classList.add('jumping');
    setTimeout(() => elements.noButton.classList.remove('jumping'), 300);
    
    // Change button text
    cycleButtonText();
    
    // Create sparkles at old position
    createSparkles(buttonRect.left + buttonWidth / 2, buttonRect.top + buttonHeight / 2);
}

function cycleButtonText() {
    state.textIndex = (state.textIndex + 1) % CONFIG.noButtonTexts.length;
    elements.noButton.textContent = CONFIG.noButtonTexts[state.textIndex];
}

// ========================================
// Sparkle Effect
// ========================================
function createSparkles(x, y) {
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${x + (Math.random() - 0.5) * 50}px`;
        sparkle.style.top = `${y + (Math.random() - 0.5) * 50}px`;
        sparkle.style.animationDelay = `${i * 0.1}s`;
        
        document.body.appendChild(sparkle);
        
        // Remove after animation
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// ========================================
// Yes Button - Success State! 🎉
// ========================================
function handleYesClick(event) {
    state.hasSaidYes = true;
    
    // Play success sound
    playSound('success');
    
    // Create sparkles on button
    const rect = elements.yesButton.getBoundingClientRect();
    createSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    
    // Trigger confetti explosion
    triggerConfetti();
    
    // Hide sad popup if visible
    hideSadPopup();
    
    // Show success section after brief delay
    setTimeout(() => {
        showSuccessSection();
    }, 300);
}

function triggerConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ['#E91E63', '#FF6B9D', '#F8BBD9', '#FFFFFF', '#FFD700', '#9C27B0'];
    
    // Initial burst
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
        disableForReducedMotion: true
    });
    
    // Continuous rain
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval);
            return;
        }
        
        confetti({
            particleCount: 30,
            spread: 60,
            origin: { y: 0 },
            colors: colors,
            gravity: 0.8,
            scalar: 0.8,
            drift: 0,
            disableForReducedMotion: true
        });
    }, 200);
    
    // Heart-shaped confetti burst
    setTimeout(() => {
        confetti({
            particleCount: 50,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#E91E63', '#FF6B9D', '#FF1744'],
            shapes: ['circle'],
            disableForReducedMotion: true
        });
    }, 500);
}

function showSuccessSection() {
    // Hide question section
    elements.questionSection.classList.add('hidden');
    
    // Show success section
    elements.successSection.classList.add('visible');
    
    // Additional celebration confetti
    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#E91E63', '#FF6B9D', '#FFD700', '#FFFFFF'],
            disableForReducedMotion: true
        });
    }, 600);
}

// ========================================
// Event Listeners
// ========================================
function setupEventListeners() {
    // Yes button
    elements.yesButton.addEventListener('click', handleYesClick);
    elements.yesButton.addEventListener('mouseenter', () => playSound('happy'));
    
    // No button - multiple events for maximum evasion
    elements.noButton.addEventListener('mouseenter', jumpNoButton);
    elements.noButton.addEventListener('mouseover', jumpNoButton);
    elements.noButton.addEventListener('touchstart', jumpNoButton, { passive: false });
    elements.noButton.addEventListener('click', (e) => {
        e.preventDefault();
        jumpNoButton(e);
    });
    
    // Prevent right-click on No button
    elements.noButton.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        jumpNoButton(e);
    });
    
    // Audio toggle
    elements.audioToggle.addEventListener('click', toggleAudio);
}

function handleResize() {
    const wasMobile = state.isMobile;
    state.isMobile = window.innerWidth <= CONFIG.mobileBreakpoint;
    
    // Reset position on resize
    if (wasMobile !== state.isMobile) {
        if (!state.isMobile) {
            setupNoButtonPosition();
        } else {
            elements.noButton.style.position = 'relative';
            elements.noButton.style.left = 'auto';
            elements.noButton.style.top = 'auto';
        }
    }
}

// ========================================
// Start the magic! ✨
// ========================================
document.addEventListener('DOMContentLoaded', init);

// ========================================
// YOLO MODE - Extra Features! 🚀
// ========================================

// Secret key combination for "Force Yes Mode" (Ctrl+Shift+Y)
// Just in case you want to test the success state 😉
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'Y') {
        console.log('%c🎉 SECRET FORCE YES ACTIVATED! 🎉', 'font-size: 20px; color: #FFD700; font-weight: bold;');
        handleYesClick(e);
    }
});

// Mouse trail hearts 💕
let lastTrailTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime < 50) return; // Limit trail frequency
    lastTrailTime = now;
    
    if (Math.random() > 0.7) { // 30% chance
        const heart = document.createElement('div');
        heart.textContent = ['💕', '💖', '💗'][Math.floor(Math.random() * 3)];
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.fontSize = '16px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.animation = 'trailFade 1s ease forwards';
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
    }
});

// Add trail animation to CSS dynamically
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        0% { opacity: 1; transform: translateY(0) scale(1); }
        100% { opacity: 0; transform: translateY(-30px) scale(0.5); }
    }
`;
document.head.appendChild(trailStyle);

// Easter egg: Type "LOVE" for surprise
typedKeys = '';
document.addEventListener('keypress', (e) => {
    typedKeys += e.key.toUpperCase();
    typedKeys = typedKeys.slice(-4);
    
    if (typedKeys === 'LOVE') {
        confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.5 },
            colors: ['#E91E63', '#FF6B9D', '#FFD700', '#FF1744', '#FFFFFF'],
            shapes: ['circle', 'square'],
            scalar: 1.5
        });
        console.log('%c💕 LOVE DETECTED! 💕', 'font-size: 30px; color: #E91E63; font-weight: bold;');
    }
});

// Easter egg: Console message
console.log('%c💕 Happy Valentine\'s Day! 💕', 'font-size: 24px; color: #E91E63; font-weight: bold;');
console.log('%cYou\'re loved and appreciated! 💝', 'font-size: 14px; color: #FF6B9D;');
console.log('%c🎮 Secret Codes:', 'font-size: 16px; color: #9C27B0; font-weight: bold;');
console.log('%c   • Ctrl+Shift+Y = Force Yes Mode', 'font-size: 12px; color: #666;');
console.log('%c   • Type LOVE = Surprise confetti', 'font-size: 12px; color: #666;');
