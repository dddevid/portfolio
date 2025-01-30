const projects = [
    { name: "Roblox Freezing Fix", link: "https://github.com/dddevid/Roblox-Freezing-Fix" },
    { name: "Minecraft Server Info", link: "https://github.com/dddevid/Minecraft-Server-Info" },
    { name: "Online Music Player", link: "https://github.com/dddevid/OnlineMusicPlayer" },
    { name: "Tiktok Coin Converter", link: "https://github.com/dddevid/tiktokcoinconverter" },
    { name: "PassChecker", link: "https://github.com/dddevid/PassChecker" },
    { name: "DevSpeedTest", link: "https://github.com/dddevid/DevSpeedTest" },
    { name: "YTDLPY", link: "https://github.com/dddevid/YTDLPY" }
];

const projectSection = document.getElementById('projects');

projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    card.innerHTML = `
        <h2 class="neon">${project.name}</h2>
        <a href="${project.link}" target="_blank" class="btn btn-secondary">View on GitHub</a>
    `;
    
    projectSection.appendChild(card);
});

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Example animation using Anime.js
anime({
    targets: '.project-card',
    opacity: [0, 1],
    translateY: [-50, 0],
    duration: 1000,
    easing: 'easeInOutExpo',
});
