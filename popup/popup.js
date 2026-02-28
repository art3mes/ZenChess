document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        homepageToggle: document.getElementById('homepageToggle'),
        inGameToggle: document.getElementById('inGameToggle'),
        chatToggle: document.getElementById('chatToggle'),
        profileToggle: document.getElementById('profileToggle'),
    };

    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.getElementById('status-text');

    // Load current settings from storage
    chrome.storage.sync.get({
        homepageToggle: true,
        inGameToggle: true,
        chatToggle: true,
        profileToggle: true
    }, (result) => {
        elements.homepageToggle.checked = result.homepageToggle;
        elements.inGameToggle.checked = result.inGameToggle;
        elements.chatToggle.checked = result.chatToggle;
        elements.profileToggle.checked = result.profileToggle;
        updateStatus();
    });

    // Save changes when user toggles
    for (const [key, element] of Object.entries(elements)) {
        element.addEventListener('change', (e) => {
            chrome.storage.sync.set({ [key]: e.target.checked });
            updateStatus();
        });
    }

    function updateStatus() {
        const anyActive = Object.values(elements).some(el => el.checked);
        if (anyActive) {
            statusIndicator.style.backgroundColor = '#81b64c';
            statusIndicator.style.boxShadow = '0 0 4px #81b64c';
            statusText.textContent = 'Active & Defending';
            statusText.style.color = '#c9ccc9';
        } else {
            statusIndicator.style.backgroundColor = '#999999';
            statusIndicator.style.boxShadow = 'none';
            statusText.textContent = 'Extension Inactive';
            statusText.style.color = '#999999';
        }
    }
});
