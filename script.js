// ─── INITIALIZATION ───
document.addEventListener('DOMContentLoaded', () => {
    initDust();
    initFloatingHearts();
});

// ─── DUST PARTICLES ───
function initDust() {
    const container = document.getElementById('dust-container');
    if (!container) return;

    for (let i = 0; i < 35; i++) {
        const d = document.createElement('div');
        d.className = 'dust';
        const size = 2 + Math.random() * 4;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const dx = (Math.random() - 0.5) * 600;
        const dy = (Math.random() - 0.5) * 400 - 200;
        const dur = 10 + Math.random() * 16;
        const del = Math.random() * 14;

        d.style.cssText = `
            left: ${x}%; 
            top: ${y}%;
            width: ${size}px; 
            height: ${size}px;
            --dx: ${dx}px; 
            --dy: ${dy}px;
            animation-duration: ${dur}s; 
            animation-delay: ${del}s;
        `;
        container.appendChild(d);
    }
}

// ─── FLOATING HEARTS BACKGROUND ───
function initFloatingHearts() {
    const container = document.getElementById('hearts-bg');
    if (!container) return;

    const emojis = ['❤️', '💕', '✨', '🌹', '💖'];
    for (let i = 0; i < 12; i++) {
        const el = document.createElement('div');
        el.className = 'floating-heart';
        el.textContent = emojis[i % emojis.length];
        const size = 16 + Math.random() * 28;
        const left = Math.random() * 100;
        const dur = 15 + Math.random() * 25;
        const del = Math.random() * 20;

        el.style.cssText = `
            left: ${left}%;
            font-size: ${size}px;
            animation-duration: ${dur}s;
            animation-delay: ${del}s;
        `;
        container.appendChild(el);
    }
}

// ─── HEART BURST ON OPEN ───
function burstHearts(e) {
    const container = document.getElementById('heart-burst');
    if (!container) return;

    const emojis = ['❤️', '💕', '💖', '✨', '🌟', '🌹'];
    
    const centerX = e && e.clientX ? e.clientX : window.innerWidth / 2;
    const centerY = e && e.clientY ? e.clientY : window.innerHeight / 2;

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'burst-heart';
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        const x = centerX + (Math.random() - 0.5) * 100;
        const y = centerY + (Math.random() - 0.5) * 100;
        const tx = (Math.random() - 0.5) * 500;
        const ty = (Math.random() - 0.5) * 500 - 150;
        const size = 20 + Math.random() * 30;

        heart.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            font-size: ${size}px;
            --tx: ${tx}px;
            --ty: ${ty}px;
            animation-duration: ${1.2 + Math.random() * 0.8}s;
        `;
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 2200);
    }
}

// ─── OPEN ENVELOPE / LETTER ───
function openEnvelope(e) {
    if (document.body.classList.contains('open')) return;

    document.body.classList.add('open');
    burstHearts(e);

    if (navigator.vibrate) navigator.vibrate(15);

    setTimeout(() => {
        const wrapper = document.getElementById('letterWrapper') || document.getElementById('letter-wrapper');
        if (wrapper) wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 800);
}

const openLetter = openEnvelope;

// ─── CLOSE ENVELOPE / LETTER ───
function closeEnvelope() {
    document.body.classList.remove('open');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
        const wrap = document.getElementById('envelopeWrapper') || document.getElementById('envelope');
        if (wrap) {
            wrap.style.transition = 'none';
            wrap.style.transform = '';
            setTimeout(() => wrap.style.transition = '', 50);
        }
    }, 300);
}

const closeLetter = closeEnvelope;

// ─── KEYBOARD NAVIGATION ───
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('open')) {
        closeEnvelope();
    }
    if ((e.key === 'Enter' || e.key === ' ') && !document.body.classList.contains('open')) {
        openEnvelope();
    }
});

// ─── PARALLAX (Desktop Hover Effect) ───
let isDesktop = window.innerWidth > 768;
window.addEventListener('resize', () => { isDesktop = window.innerWidth > 768; });

document.addEventListener('mousemove', (e) => {
    if (!isDesktop) return;
    const env = document.querySelector('.envelope');
    if (!env || document.body.classList.contains('open')) return;

    const rect = env.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    const max = 8;

    env.style.transform = `perspective(800px) rotateX(${-dy * max}deg) rotateY(${dx * max}deg) scale(1.01)`;
});

document.addEventListener('mouseleave', () => {
    const env = document.querySelector('.envelope');
    if (env) env.style.removeProperty('transform');
});

// ─── BREATHING LETTER EFFECT ───
const letterEl = document.getElementById('letter') || document.querySelector('.letter');
if (letterEl) {
    let phase = 0;
    setInterval(() => {
        if (document.body.classList.contains('open')) {
            phase += 0.02;
            const s = 1 + Math.sin(phase) * 0.0012;
            letterEl.style.transform = `scale(${s})`;
        } else {
            letterEl.style.transform = '';
        }
    }, 50);
}

// ─── SCROLL HINT FADE ───
document.addEventListener('scroll', () => {
    const hint = document.querySelector('.nav-hint');
    if (!hint) return;
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    hint.style.opacity = pct > 0.15 ? '0' : '1';
});

// ─── CONSOLE MESSAGE ───
console.log('%c❤️ Crafted with love ❤️', 'font-size:20px; color:#8b1a2b; font-weight:bold;');
