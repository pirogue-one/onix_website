"use strict";

(function () {
    'use strict';

    // LocalStorage management functions
    function setLocalStorage(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.warn('LocalStorage not available:', e);
        }
    }

    function getLocalStorage(key) {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            console.warn('LocalStorage not available:', e);
            return null;
        }
    }

    function showCookieNotification() {
        const notification = document.getElementById('cookieNotification');
        if (notification) {
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
        }
    }

    function hideCookieNotification() {
        const notification = document.getElementById('cookieNotification');
        if (notification) {
            notification.classList.remove('show');
            notification.classList.add('hide');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }

    function acceptCookies() {
        setLocalStorage('cookieConsent', 'accepted');
        hideCookieNotification();

        // Enable analytics and tracking here if needed
        console.log('Cookies accepted - analytics enabled');
    }

    function initCookieNotification() {
        // Check if user has already made a choice
        const cookieConsent = getLocalStorage('cookieConsent');
        if (cookieConsent) {
            return; // Don't show notification if user already made a choice
        }

        // Add event listeners
        const acceptBtn = document.getElementById('cookieAccept');
        const closeBtn = document.getElementById('cookieNotificationClose');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', acceptCookies);
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', acceptCookies);
        }

        // Show notification after 5 seconds
        setTimeout(showCookieNotification, 5000);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCookieNotification);
    } else {
        initCookieNotification();
    }

})();