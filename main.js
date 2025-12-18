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
    document.getElementById('label-price').innerText = '$' + price.toLocaleString();
    document.getElementById('label-rent').innerText = '$' + rent.toLocaleString();
    document.getElementById('label-reno').innerText = '$' + reno.toLocaleString();
    const annualRent = rent * 12;
    const expenses = annualRent * 0.4;
    const noi = annualRent - expenses;
    const totalInv = price + reno;
    let roi = 0;
    if(totalInv > 0) { roi = (noi / totalInv) * 100; }
    document.getElementById('result-roi').innerText = roi.toFixed(1) + '%';
}
window.calculateROI(); // Initial calc

// Modals
const contactModal = document.getElementById('contact-modal');
const legalModal = document.getElementById('legal-modal');

// Ensure buttons work by waiting for DOM or just running script at end
document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        contactModal.classList.add('open');
    });
});

document.getElementById('close-modal-btn').addEventListener('click', () => {
    contactModal.classList.remove('open');
});

// Make globally available for onclick
window.openLegalModal = function() {
    legalModal.classList.add('open');
}

document.getElementById('close-legal-btn').addEventListener('click', () => {
    legalModal.classList.remove('open');
});

window.addEventListener('click', (e) => {
    if (e.target === contactModal) contactModal.classList.remove('open');
    if (e.target === legalModal) legalModal.classList.remove('open');
});

window.selectProp = function(btn) {
    document.querySelectorAll('.prop-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// --- COMPARISON TABS LOGIC ---
const comparisonData = {
    placement: {
        tradTitle: "Traditional Manager",
        tradQuote: "We put a sign in the yard and list on MLS.",
        tradResult: "High Vacancy Risk",
        nisusTitle: "Nisus Strategy",
        nisusQuote: "Professional photography, 3D tours, and syndication to 40+ portals including Zillow, Trulia, and HotPads.",
        nisusResult: "Avg. 14 Days to Lease"
    },
    maintenance: {
        tradTitle: "Traditional Manager",
        tradQuote: "We add a 10-20% surcharge on all contractor invoices.",
        tradResult: "Inflated Costs",
        nisusTitle: "Nisus Strategy",
        nisusQuote: "Zero markups on maintenance. We pass our volume discounts directly to you.",
        nisusResult: "Lower OpEx"
    },
    financials: {
        tradTitle: "Traditional Manager",
        tradQuote: "You'll get a PDF statement sometime next month.",
        tradResult: "Delayed Visibility",
        nisusTitle: "Nisus Strategy",
        nisusQuote: "Real-time owner portal access. See rent paid, expenses log, and deposits instantly.",
        nisusResult: "100% Transparency"
    },
    legal: {
        tradTitle: "Traditional Manager",
        tradQuote: "Evictions are your problem and your legal expense.",
        tradResult: "High Liability",
        nisusTitle: "Nisus Strategy",
        nisusQuote: "We offer Eviction Protection. If we place them, we cover the legal costs to remove them.",
        nisusResult: "Risk Mitigation"
    }
};

function renderComparison(tab) {
    const data = comparisonData[tab];
    const container = document.getElementById('comparison-container');
    
    container.innerHTML = `
        <div class="comp-card traditional">
            <div class="comp-header">
                <i data-lucide="x-circle" style="color:#f87171"></i>
                <h3>${data.tradTitle}</h3>
            </div>
            <div class="quote-box">"${data.tradQuote}"</div>
            <div class="result-box">${data.tradResult}</div>
        </div>
        <div class="comp-card nisus">
            <div class="comp-header">
                <i data-lucide="check-circle-2" style="color:var(--lime)"></i>
                <h3>${data.nisusTitle}</h3>
            </div>
            <div class="quote-box">"${data.nisusQuote}"</div>
            <div class="result-box">${data.nisusResult}</div>
        </div>
    `;
    // Re-initialize icons for the new content
    lucide.createIcons();
}

// Define global switchTab to fix ReferenceError
window.switchTab = function(tab, btn) {
    // UI Update
    if (btn) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
    
    // Render
    renderComparison(tab);
};

// --- LANGUAGE LOGIC ---
const translations = {
    en: {
        // Updated Nav Keys
        nav_comp: "Comparison",
        nav_process: "Process",
        nav_services: "Services",
        nav_growth: "Growth",
        nav_contact: "Contact",
        
        hero_badge: "For Local & Out-of-State Investors",
        hero_title: "Stress-Free Property Management in <span class='text-highlight'>Detroit, Cleveland & Toledo</span>",
        hero_desc: "We handle the tenants, the maintenance, and the legalities so you can focus on scaling your portfolio from anywhere in the world.",
        hero_cta_primary: "Get Free Valuation",
        hero_cta_secondary: "ROI Calculator",
        status_rent_due: "Rent Due",
        status_collected: "Collected",
        status_vacant: "Vacant",
        status_rented: "Rented",
        status_reported: "Reported",
        status_fixed: "Fixed",
        badge_comparison: "Comparison",
        title_reality: "The Reality Check",
        desc_reality: "Select a service area to see the difference.",
        
        // New Keys
        bullet_expenses: "Detailed Expense Categorization",
        bullet_reports: "On-Demand Tax Reports",
        btn_access_portal: "Get Portal Access",

        // Peace of Mind Bullets
        bullet_peace_1: "Detailed Reports",
        bullet_peace_2: "Regular Safety Inspections",

        tab_placement: "Tenant Placement",
        tab_maintenance: "Maintenance",
        tab_financials: "Financials",
        tab_legal: "Legal",
        badge_process: "Process",
        title_how: "How We Work",
        desc_how: "From onboarding to passive income in 4 steps.",
        step1_title: "1. Evaluation",
        step1_desc: "We analyze your property's rental potential and compliance needs.",
        step2_title: "2. Onboarding",
        step2_desc: "We handle LLCs, bank accounts, and seamless property takeover.",
        step3_title: "3. Placement",
        step3_desc: "Marketing, rigorous screening, and swift tenant placement.",
        step4_title: "4. Management",
        step4_desc: "Monthly reports, 24/7 maintenance, and direct deposits.",
        btn_journey: "Start Your Journey",
        badge_peace: "PEACE OF MIND",
        title_eyes: "Your Eyes and Ears",
        title_ground: "On The Ground",
        desc_eyes: "You shouldn't have to guess the condition of your investment. We perform rigorous move-in and move-out inspections, complete with photos, to ensure your property is respected and maintained.",
        badge_screening: "SCREENING",
        title_quality: "Quality Residents,",
        title_income: "Reliable Income",
        desc_quality: "We don't just fill units; we find the right people. Our rigorous screening process checks credit, income, criminal background, and past rental history to ensure you get paid on time, every time.",
        btn_criteria: "See Our Criteria",
        badge_guaranteed: "RENTA GARANTIZADA",
        title_sec8: "Section 8 Specialists",
        desc_sec8: "Navigating government housing programs can be complex, but the rewards are consistent, guaranteed income. We handle the initial inspections, paperwork, and ongoing compliance.",
        sec8_guarantee: "Government Guaranteed",
        sec8_deposit: "Consistent monthly payments via Direct Deposit",
        badge_portal: "PORTAL",
        title_financial: "Total Financial",
        title_transparency: "Transparency",
        desc_financial: "Know exactly where your money is at all times. Our owner portal gives you real-time updates on rent collection, expenses, and deposits.",
        badge_services: "SERVICES",
        title_comprehensive: "Comprehensive Services",
        badge_growth: "GROWTH",
        title_ready: "Ready to Grow Your",
        title_portfolio: "Portfolio?",
        desc_growth: "Beyond management, we are active investors and brokers. Gain access to exclusive off-market deals and expert guidance to scale your holdings.",
        btn_view_inv: "View Investment Opportunities",
        btn_talk_broker: "Call Us", // Changed from "Talk to a Broker"
        footer_desc: "Your partner for building generational wealth through intelligent real estate investment and management.",
        footer_services: "Services",
        footer_cities: "Cities",
        footer_legal: "Legal",
        modal_title: "Get Started with Nisus",
        modal_desc: "Fill out the form below and we'll get back to you within 24 hours.",
        form_name: "Full Name",
        form_phone: "Phone",
        form_email: "Email",
        form_market: "Target Market",
        form_prop_type: "Primary Property Type",
        form_submit: "Submit Application",
        legal_title: "Legal Information",
        legal_privacy: "Privacy Policy",
        legal_terms: "Terms of Service",
        legal_cookies: "Cookie Policy"
    },
    es: {
        // Updated Nav Keys
        nav_comp: "Comparación",
        nav_process: "Proceso",
        nav_services: "Servicios",
        nav_growth: "Crecimiento",
        nav_contact: "Contacto",

        hero_badge: "Para Inversores Locales y Extranjeros",
        hero_title: "Administración de Propiedades Sin Estrés en <span class='text-highlight'>Detroit, Cleveland y Toledo</span>",
        hero_desc: "Manejamos los inquilinos, el mantenimiento y los aspectos legales para que puedas escalar tu portafolio desde cualquier lugar del mundo.",
        hero_cta_primary: "Valoración Gratuita",
        hero_cta_secondary: "Calculadora ROI",
        status_rent_due: "Renta Debida",
        status_collected: "Cobrada",
        status_vacant: "Vacante",
        status_rented: "Rentada",
        status_reported: "Reportado",
        status_fixed: "Reparado",
        badge_comparison: "Comparación",
        title_reality: "La Realidad",
        desc_reality: "Selecciona un área de servicio para ver la diferencia.",

        // New Keys
        bullet_expenses: "Categorización Detallada de Gastos",
        bullet_reports: "Informes Fiscales a la Carta",
        btn_access_portal: "Obtener Acceso al Portal",

        // Peace of Mind Bullets
        bullet_peace_1: "Informes Detallados",
        bullet_peace_2: "Inspecciones de Seguridad Regulares",

        tab_placement: "Colocación",
        tab_maintenance: "Mantenimiento",
        tab_financials: "Finanzas",
        tab_legal: "Legal",
        badge_process: "Proceso",
        title_how: "Cómo Trabajamos",
        desc_how: "Desde la incorporación hasta el ingreso pasivo en 4 pasos.",
        step1_title: "1. Evaluación",
        step1_desc: "Analizamos el potencial de alquiler y cumplimiento de tu propiedad.",
        step2_title: "2. Incorporación",
        step2_desc: "Manejamos LLCs, cuentas bancarias y la toma de posesión.",
        step3_title: "3. Colocación",
        step3_desc: "Marketing, selección rigurosa y colocación rápida de inquilinos.",
        step4_title: "4. Gestión",
        step4_desc: "Informes mensuales, mantenimiento 24/7 y depósitos directos.",
        btn_journey: "Comienza Tu Viaje",
        badge_peace: "TRANQUILIDAD",
        title_eyes: "Tus Ojos y Oídos",
        title_ground: "En El Terreno",
        desc_eyes: "No deberías adivinar la condición de tu inversión. Realizamos inspecciones rigurosas de entrada y salida, con fotos, para asegurar que tu propiedad sea respetada.",
        badge_screening: "SELECCIÓN",
        title_quality: "Residentes de Calidad,",
        title_income: "Ingreso Confiable",
        desc_quality: "No solo llenamos unidades; encontramos a las personas adecuadas. Nuestro proceso riguroso verifica crédito, ingresos y antecedentes penales.",
        btn_criteria: "Ver Criterios",
        badge_guaranteed: "RENTA GARANTIZADA",
        title_sec8: "Especialistas en Sección 8",
        desc_sec8: "Navegar programas de vivienda del gobierno es complejo, pero las recompensas son ingresos garantizados. Manejamos las inspecciones y el cumplimiento.",
        sec8_guarantee: "Garantizado por Gobierno",
        sec8_deposit: "Pagos mensuales constantes vía Depósito Directo",
        badge_portal: "PORTAL",
        title_financial: "Transparencia Financiera",
        title_transparency: "Total",
        desc_financial: "Sabe exactamente dónde está tu dinero. Nuestro portal de propietarios te da actualizaciones en tiempo real sobre cobro de rentas y gastos.",
        badge_services: "SERVICIOS",
        title_comprehensive: "Servicios Integrales",
        badge_growth: "CRECIMIENTO",
        title_ready: "Listo para Crecer Tu",
        title_portfolio: "Portafolio?",
        desc_growth: "Más allá de la gestión, somos inversores activos. Accede a ofertas exclusivas fuera del mercado y guía experta para escalar.",
        btn_view_inv: "Ver Oportunidades",
        btn_talk_broker: "Llámenos", // Changed from "Hablar con un Agente"
        footer_desc: "Tu socio para construir riqueza generacional a través de inversión y gestión inteligente de bienes raíces.",
        footer_services: "Servicios",
        footer_cities: "Ciudades",
        footer_legal: "Legal",
        modal_title: "Empieza con Nisus",
        modal_desc: "Llena el formulario y te contactaremos en 24 horas.",
        form_name: "Nombre Completo",
        form_phone: "Teléfono",
        form_email: "Correo",
        form_market: "Mercado Objetivo",
        form_prop_type: "Tipo de Propiedad",
        form_submit: "Enviar Aplicación",
        legal_title: "Información Legal",
        legal_privacy: "Política de Privacidad",
        legal_terms: "Términos de Servicio",
        legal_cookies: "Política de Cookies"
    }
};

let currentLang = 'en';

window.toggleLanguage = function() {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    const btn = document.getElementById('lang-btn');
    
    // Update Button Content
    if (currentLang === 'en') {
        btn.innerHTML = `<svg class="flag-icon"><use href="#flag-us"></use></svg><span>EN</span>`;
    } else {
        btn.innerHTML = `<svg class="flag-icon"><use href="#flag-mx"></use></svg><span>ES</span>`;
    }
    
    // Translate Content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });
}

// Initialize default tab content
document.addEventListener('DOMContentLoaded', () => {
    renderComparison('placement');
});