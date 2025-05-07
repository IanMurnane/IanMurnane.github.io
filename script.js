document.addEventListener("DOMContentLoaded", function() {
    fetch('apps.json')
        .then(response => response.json())
        .then(data => {
            const appsContainer = document.getElementById('apps-container');
            data.apps.forEach(app => {
                const appCard = document.createElement('div');
                appCard.classList.add('app-card');

                appCard.innerHTML = `
                    <img src="${app.screenshot}" alt="${app.title} Screenshot" class="screenshot">
                    <div class="app-info">
                        <div class="logo-title">
                            <img src="${app.logo}" alt="${app.title} Logo" class="logo">
                            <h3>${app.title}</h3>
                        </div>
                        <div class="store-links">
                            <a href="${app.googlePlay}" target="_blank">
                                <i class="fab fa-google-play"></i> Google Play Store
                            </a>
                            ${app.appleStore ? `<a href="${app.appleStore}" target="_blank">
                                <i class="fab fa-app-store-ios"></i> Apple App Store
                            </a>` : ''}
                        </div>
                        <p>${app.description}</p>
                        <a href="${app.privacyPolicy}" class="policy-link" target="_blank">Privacy Policy</a>
                        <a href="${app.tos}" class="policy-link" target="_blank">Terms of Service</a>
                        ${app.discordLink ? `<p>
                            <i class="fab fa-discord"></i> <a href="${app.discordLink}" class="policy-link" target="_blank">Discord Channel</a>
                        </p>` : ''}
                    </div>
                `;

                appsContainer.appendChild(appCard);
            });
        })
        .catch(error => console.error('Error loading app data:', error));
});
