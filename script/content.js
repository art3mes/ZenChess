function removeProfileStats() {
    const stats = document.querySelector('.stats-component');
    if (stats && stats.style.display !== 'none') {
        console.log('Hiding stats component');
        stats.style.display = 'none';
    }
}

function removeGameHistoryPlayerElos() {
    const elos = document.querySelectorAll('[data-test-element="user-tagline-rating"]');
    console.log("****elo", elos);
    let hiddenCount = 0;
    elos.forEach(elo => {
        if (elo.style.display !== 'none') {
            elo.style.display = 'none';
            hiddenCount++;
        }
    });
    if (hiddenCount > 0) {
        console.log(`Hidden ${hiddenCount} elo elements`);
    }
}

function removeInGameRatings() {
    const ratings = document.querySelectorAll('.player-game-over-component');
    const ratings1 = document.querySelectorAll('[data-cy="user-tagline-rating"]');
    console.log("ratings", ratings);
    let hiddenCount = 0;
    ratings.forEach(rating => {
        if (rating.style.display !== 'none') {
            rating.style.display = 'none';
            hiddenCount++;
        }
    });
    ratings1.forEach(rating => {
        if (rating.style.display !== 'none') {
            rating.style.display = 'none';
            hiddenCount++;
        }
    });
    if (hiddenCount > 0) {
        console.log(`Hidden ${hiddenCount} rating elements`);
    }
}

function removeHomeStats() {
    const homeStats = document.querySelectorAll('.stat-section-stats-section');
    let hiddenCount = 0;
    homeStats.forEach(stat => {
        if (stat.style.display !== 'none') {
            stat.style.display = 'none';
            hiddenCount++;
        }
    });
    if (hiddenCount > 0) {
        console.log(`Hidden ${hiddenCount} home stats elements`);
    }
}

function removeChatRatings() {
    const chatMessages = document.querySelectorAll('.game-start-message-component');
    chatMessages.forEach(msg => {
        if (msg.getAttribute('data-antigravity-processed')) return;

        // Hide ELO ratings like (1200)
        let content = msg.innerHTML;
        const newContent = content
            .replace(/\(\d+\)/g, '') // Removes (453)
            .replace(/win\s+[+-]?\d+.*lose\s+[+-]?\d+/gi, ''); // Removes win +35 / draw -1 / lose -36

        if (content !== newContent) {
            msg.innerHTML = newContent;
            msg.setAttribute('data-antigravity-processed', 'true');
        }
    });
}

function hideAnxietyElements() {
    removeProfileStats();
    removeGameHistoryPlayerElos();
    removeInGameRatings();
    removeHomeStats();
    removeChatRatings();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideAnxietyElements);
} else {
    hideAnxietyElements();
}

// Watch for dynamically loaded content
const observer = new MutationObserver(() => {
    hideAnxietyElements();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
