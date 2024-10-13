const apiKey = 'f2c382105c76402ea870aa0eb539b34f';
const apiSecret = '9af83fa0005e453e8db9aa96e5fb582c';

// Funzione per cercare le icone
async function searchIcon(term) {
    const response = await fetch(`https://api.thenounproject.com/v2/icon/${term}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${apiKey}:${apiSecret}`
        }
    });

    const data = await response.json();
    return data.icon; // Restituisce l'icona
}

// Carica le icone per i social
async function loadSocialIcons() {
    const icons = ['github', 'linkedin'];

    for (const icon of icons) {
        const iconData = await searchIcon(icon);
        const iconElement = document.createElement('a');
        iconElement.href = icon === 'github' ? 'https://github.com/dddevid' : 'https://www.linkedin.com/in/tuo-linkedin';
        iconElement.target = '_blank';
        iconElement.innerHTML = `<img src="${iconData.image_url}" alt="${icon} icon" style="width: 40px; height: 40px; margin: 0 10px;">`;
        document.getElementById('social-icons').appendChild(iconElement);
    }
}

// Carica le icone per le competenze
async function loadSkillsIcons() {
    const skills = ['web-development', 'python', 'software-development', 'mobile-app', 'git'];
    const skillsList = document.getElementById('skills-list');

    for (const skill of skills) {
        const iconData = await searchIcon(skill);
        const listItem = document.createElement('li');
        listItem.innerHTML = `<img src="${iconData.image_url}" alt="${skill} icon" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 8px;">${skill.replace(/-/g, ' ')}`;
        skillsList.appendChild(listItem);
    }
}

// Carica le icone al caricamento della pagina
window.onload = () => {
    loadSocialIcons();
    loadSkillsIcons();
};
