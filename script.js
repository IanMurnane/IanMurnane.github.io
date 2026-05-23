document.addEventListener("DOMContentLoaded", function() {
    const textFitObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const h3 = entry.target;
            h3.style.fontSize = '1.15rem';
            let fontSize = parseFloat(window.getComputedStyle(h3).fontSize);
            while (h3.scrollHeight > h3.clientHeight && fontSize > 10) {
                fontSize -= 0.5;
                h3.style.fontSize = fontSize + 'px';
            }
        }
    });

    fetch('apps.json')
        .then(response => response.json())
        .then(data => {
            const appsContainer = document.getElementById('apps-container');

            data.apps.forEach(app => {
                const appCard = document.createElement('div');
                appCard.classList.add('app-card');

                const logoPath = `pics/logos/${app.filename}.png`;
                const screenshotPath = `pics/screenshots/${app.filename}.jpeg`;
                const privacyPolicyPath = `policies/privacy/${app.filename}.html`;
                const tosPath = `policies/tos/${app.filename}.html`;

                // Set up the disabled vs active states for the icons
                const playLink = app.googlePlay ? `<a href="${app.googlePlay}" target="_blank" class="icon-link play-active" title="Google Play Store"><i class="fab fa-google-play"></i></a>` : `<a href="#" class="icon-link disabled" title="Not available on Android"><i class="fab fa-google-play"></i></a>`;

                const iosLink = app.appleStore ? `<a href="${app.appleStore}" target="_blank" class="icon-link ios-active" title="Apple App Store"><i class="fab fa-apple"></i></a>` : `<a href="#" class="icon-link disabled" title="Not available on iOS"><i class="fab fa-apple"></i></a>`;

                const discordLink = app.discordLink ? `<a href="${app.discordLink}" target="_blank" class="icon-link discord-active" title="Discord Community"><i class="fab fa-discord"></i></a>` : '';

                appCard.innerHTML = `
                    <img src="${screenshotPath}" alt="${app.title} Screenshot" class="screenshot">
                    <div class="app-info">
                        <div class="logo-title">
                            <img src="${logoPath}" alt="${app.title} Logo" class="logo">
                            <h3 class="dynamic-title">${app.title}</h3>
                        </div>
                        
                        <p class="description">${app.description}</p>
                        
                        <div class="icon-dock">
                            <div class="dock-left">
                                ${playLink}
                                ${iosLink}
                            </div>
                            <div class="dock-right">
                                <a href="${privacyPolicyPath}" target="_blank" class="icon-link doc-link" title="Privacy Policy"><i class="fas fa-shield-alt"></i></a>
                                <a href="${tosPath}" target="_blank" class="icon-link doc-link" title="Terms of Service"><i class="fas fa-file-alt"></i></a>
                                ${discordLink}
                            </div>
                        </div>
                    </div>
                `;

                appsContainer.appendChild(appCard);
                const titleElement = appCard.querySelector('.dynamic-title');
                textFitObserver.observe(titleElement);
            });
        })
        .catch(error => console.error('Error loading app data:', error));
});
