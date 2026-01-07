/* --- META PIXEL CODE --- */
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '290779669070030');
fbq('track', 'PageView');

lucide.createIcons();

// Navbar Scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) { navbar.classList.add('scrolled'); } 
    else { navbar.classList.remove('scrolled'); }
});

// Mobile Menu
const mobileBtn = document.getElementById('mobile-toggle-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMenu() { mobileMenu.classList.add('open'); }
function closeMenu() { mobileMenu.classList.remove('open'); }

mobileBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);
mobileLinks.forEach(link => { link.addEventListener('click', closeMenu); });

// ROI Calculator
window.calculateROI = function() {
    const price = parseFloat(document.getElementById('input-price').value);
    const rent = parseFloat(document.getElementById('input-rent').value);
    const reno = parseFloat(document.getElementById('input-reno').value);
    
    if (document.getElementById('label-price')) document.getElementById('label-price').innerText = '$' + price.toLocaleString();
    if (document.getElementById('label-rent')) document.getElementById('label-rent').innerText = '$' + rent.toLocaleString();
    if (document.getElementById('label-reno')) document.getElementById('label-reno').innerText = '$' + reno.toLocaleString();
    
    const annualRent = rent * 12;
    const expenses = annualRent * 0.4;
    const noi = annualRent - expenses;
    const totalInv = price + reno;
    let roi = 0;
    if(totalInv > 0) { roi = (noi / totalInv) * 100; }
    if (document.getElementById('result-roi')) document.getElementById('result-roi').innerText = roi.toFixed(1) + '%';
}
window.calculateROI(); // Initial calc

// Modals
const contactModal = document.getElementById('contact-modal');
const legalModal = document.getElementById('legal-modal');

document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (contactModal) contactModal.classList.add('open');
    });
});

if (document.getElementById('close-modal-btn')) {
    document.getElementById('close-modal-btn').addEventListener('click', () => {
        if (contactModal) contactModal.classList.remove('open');
    });
}

window.openLegalModal = function() {
    if (legalModal) legalModal.classList.add('open');
}

const cityExpertiseModal = document.getElementById('city-expertise-modal');

window.openCityExpertise = function(city) {
    const cityPane = document.getElementById(`pane-${city}`);
    const modalContent = document.getElementById('city-modal-content');
    const modalInput = document.getElementById('city-modal-input');
    
    if (cityPane && modalContent) {
        // Clone the content to the modal
        modalContent.innerHTML = cityPane.innerHTML;
        
        // Ensure the cloned content has the active class for animations
        const clonedPane = modalContent.firstElementChild;
        // In this case, the innerHTML of cityPane is actually what's inside the pane div
        // So we might need to wrap it or just handle classes
        modalContent.classList.add('location-pane', 'active');
        
        // Auto-fill the city in the form
        if (modalInput) {
            modalInput.value = city.charAt(0).toUpperCase() + city.slice(1);
        }
        
        // Open modal
        if (cityExpertiseModal) cityExpertiseModal.classList.add('open');
        
        // Refresh icons in modal
        lucide.createIcons();
    }
}

if (document.getElementById('close-city-modal-btn')) {
    document.getElementById('close-city-modal-btn').addEventListener('click', () => {
        if (cityExpertiseModal) cityExpertiseModal.classList.remove('open');
    });
}

if (document.getElementById('close-legal-btn')) {
    document.getElementById('close-legal-btn').addEventListener('click', () => {
        if (legalModal) legalModal.classList.remove('open');
    });
}

window.addEventListener('click', (e) => {
    if (e.target === contactModal) contactModal.classList.remove('open');
    if (e.target === legalModal) legalModal.classList.remove('open');
    if (e.target === cityExpertiseModal) cityExpertiseModal.classList.remove('open');
});

window.selectProp = function(btn) {
    document.querySelectorAll('.prop-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

window.switchLocation = function(city, btn) {
    // Update tabs
    document.querySelectorAll('.loc-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update panes
    document.querySelectorAll('.location-pane').forEach(p => p.classList.remove('active'));
    const targetPane = document.getElementById(`pane-${city}`);
    if (targetPane) targetPane.classList.add('active');
    
    // Update Peace of Mind image dynamically
    const peaceImg = document.getElementById('peace-of-mind-img');
    if (peaceImg) {
        // Map city to image path
        const cityImages = {
            'detroit': '/Images/Detroit.webp',
            'cleveland': '/Images/Cleveland.webp',
            'toledo': '/Images/Toledo.webp'
        };
        
        // Add a fade effect
        peaceImg.style.opacity = '0';
        setTimeout(() => {
            peaceImg.src = cityImages[city] || '/Images/House Nisus.avif';
            peaceImg.style.opacity = '1';
        }, 300);
    }
}

// --- COMPARISON TABS LOGIC ---
let currentTab = 'placement';

function renderComparison(tab) {
    const t = translations[currentLang];
    const container = document.getElementById('comparison-container');
    if (!container) return;
    
    // Determine if we are on the investment page
    const isInvestPage = window.location.pathname.includes('/investments');
    const prefix = isInvestPage ? 'inv_comp' : 'comp';
    
    const tradTitle = t.comp_trad_title;
    const nisusTitle = t.comp_nisus_title;
    
    const tradQuote = t[`${prefix}_${tab}_trad_quote`];
    const tradResult = t[`${prefix}_${tab}_trad_res`];
    const nisusQuote = t[`${prefix}_${tab}_nisus_quote`];
    const nisusResult = t[`${prefix}_${tab}_nisus_res`];

    container.innerHTML = `
        <div class="comp-card traditional">
            <div class="comp-header">
                <i data-lucide="x-circle" style="color:#f87171"></i>
                <h3>${tradTitle}</h3>
            </div>
            <div class="quote-box">"${tradQuote}"</div>
            <div class="result-box">${tradResult}</div>
        </div>
        <div class="comp-card nisus">
            <div class="comp-header">
                <i data-lucide="check-circle-2" style="color:var(--lime)"></i>
                <h3>${nisusTitle}</h3>
            </div>
            <div class="quote-box">"${nisusQuote}"</div>
            <div class="result-box">${nisusResult}</div>
        </div>
    `;
    lucide.createIcons();
}

window.switchTab = function(tab, btn) {
    currentTab = tab;
    if (btn) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
    renderComparison(tab);
};

// --- LANGUAGE LOGIC ---
let currentLang = 'en';

window.setLanguage = function(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLang', lang);
    
    // Update all language toggle buttons
    const btns = document.querySelectorAll('.lang-toggle');
    btns.forEach(btn => {
        if (currentLang === 'en') {
            btn.innerHTML = `<svg class="flag-icon"><use href="#flag-us"></use></svg><span>EN</span>`;
        } else {
            btn.innerHTML = `<svg class="flag-icon"><use href="#flag-mx"></use></svg><span>ES</span>`;
        }
    });
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key && key.includes(';')) {
            // Support multiple attributes/keys: [attr]key;[attr2]key2 or [attr]key;key2
            const parts = key.split(';');
            parts.forEach(part => {
                applyTranslation(el, part.trim());
            });
        } else {
            applyTranslation(el, key);
        }
    });

    // Update comparison table with new language
    renderComparison(currentTab);
}

function applyTranslation(el, key) {
    if (!key) return;
    
    if (key.startsWith('[')) {
        const bracketEnd = key.indexOf(']');
        const attr = key.substring(1, bracketEnd);
        const actualKey = key.substring(bracketEnd + 1);
        if (translations[currentLang] && translations[currentLang][actualKey]) {
            el.setAttribute(attr, translations[currentLang][actualKey]);
        }
    } else {
        if (translations[currentLang] && translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    }
}

window.toggleLanguage = function() {
    const newLang = currentLang === 'en' ? 'es' : 'en';
    setLanguage(newLang);
}

document.addEventListener('DOMContentLoaded', () => {
    // Detect language from URL
    const path = window.location.pathname;
    const isSpanishPath = path === '/es' || path.startsWith('/es/');
    const hasSpanishQuery = window.location.search.includes('lang=es');
    
    if (isSpanishPath || hasSpanishQuery) {
        setLanguage('es');
    } else {
        const savedLang = localStorage.getItem('preferredLang');
        if (savedLang) setLanguage(savedLang);
    }

    const isInvestPage = path.includes('/investments');
    currentTab = isInvestPage ? 'sourcing' : 'placement';
    renderComparison(currentTab);
});
