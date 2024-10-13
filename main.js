// English and Italian translations
const translations = {
    en: {
        about: 'About Me',
        projects: 'Projects',
        skills: 'Skills',
        contact: 'Contact',
        title: 'Devid\'s Portfolio',
        welcome: 'Welcome to my portfolio showcasing my work and skills!',
        'about-text': 'Hello! I\'m Devid, a developer passionate about solving problems and building solutions in Python, Node.js, and beyond...'
    },
    it: {
        about: 'Chi Sono',
        projects: 'Progetti',
        skills: 'Competenze',
        contact: 'Contatti',
        title: 'Il Portfolio di Devid',
        welcome: 'Benvenuto nel mio portfolio che mostra il mio lavoro e le mie competenze!',
        'about-text': 'Ciao! Sono Devid, uno sviluppatore appassionato nel risolvere problemi e costruire soluzioni in Python, Node.js, e oltre...'
    }
};

// Language toggle functionality
document.getElementById('toggle-lang').addEventListener('click', () => {
    const currentLang = document.documentElement.lang === 'en' ? 'it' : 'en';
    document.documentElement.lang = currentLang;
    applyTranslations(currentLang);
});

function applyTranslations(lang) {
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        el.textContent = translations[lang][key];
    });
}

// Apply default language
applyTranslations('en');
