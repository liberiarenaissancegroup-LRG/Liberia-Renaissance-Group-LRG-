// Main client-side behavior: navigation, accessibility, and UI helpers
(function () {
    'use strict';

    const navSelector = '.nav-link';
    const mobileNavSelector = '.mobile-nav-link';
    const pageSelector = '.page-content';

    const navLinks = Array.from(document.querySelectorAll(navSelector));
    const mobileNavLinks = Array.from(document.querySelectorAll(mobileNavSelector));
    const contentSections = Array.from(document.querySelectorAll(pageSelector));
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const messageBox = document.getElementById('message-box');
    const messageText = document.getElementById('message-text');
    const currentYearEl = document.getElementById('current-year');

    function setAriaForSection(section, visible) {
        if (!section) return;
        if (visible) {
            section.classList.remove('hidden');
            section.setAttribute('aria-hidden', 'false');
        } else {
            section.classList.add('hidden');
            section.setAttribute('aria-hidden', 'true');
        }
    }

    function clearActiveLinks() {
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => link.classList.remove('active'));
    }

    // Shows the specified page content and updates navigation state
    function showPage(pageId) {
        if (!pageId) return;

        const id = `page-${pageId}`;
        let found = false;

        contentSections.forEach(section => {
            if (section.id === id) {
                setAriaForSection(section, true);
                found = true;
            } else {
                setAriaForSection(section, false);
            }
        });

        if (found) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Update active links
            clearActiveLinks();
            document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
                if (link.getAttribute('data-page') === pageId) link.classList.add('active');
            });
        }
    }

    // Accessible message box helper
    function showMessage(message) {
        if (!messageBox || !messageText) return;
        messageText.textContent = message;
        messageBox.classList.remove('hidden');
        messageBox.setAttribute('aria-hidden', 'false');

        // Auto-hide after 4s
        setTimeout(() => {
            messageBox.classList.add('hidden');
            messageBox.setAttribute('aria-hidden', 'true');
        }, 4000);
    }

    // Toggle mobile menu with aria updates
    function toggleMobileMenu(force) {
        if (!mobileMenu || !mobileMenuBtn) return;
        const isHidden = mobileMenu.classList.contains('hidden');
        const shouldOpen = typeof force === 'boolean' ? force : isHidden;
        mobileMenu.classList.toggle('hidden', !shouldOpen);
        mobileMenu.setAttribute('aria-hidden', String(!shouldOpen));
        mobileMenuBtn.setAttribute('aria-expanded', String(shouldOpen));
    }

    // Event wiring
    function initEventListeners() {
        // Desktop nav links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                if (page) showPage(page);
            });
        });

        // Mobile nav links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                if (page) showPage(page);
                toggleMobileMenu(false);
            });
        });

        // Any element with data-page should navigate (buttons, links, etc.)
        document.querySelectorAll('[data-page]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const page = el.getAttribute('data-page');
                if (page) showPage(page);
            });
        });

        // Elements with data-close attribute should hide the nearest target (e.g., message box)
        document.querySelectorAll('[data-close]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                // If a selector or id is provided, try to close that, otherwise close parent .message-box
                const target = el.getAttribute('data-close');
                if (target) {
                    const byId = document.getElementById(target);
                    if (byId) {
                        byId.classList.add('hidden');
                        byId.setAttribute('aria-hidden', 'true');
                        return;
                    }
                }
                // Fallback: hide the global messageBox if present
                if (messageBox) {
                    messageBox.classList.add('hidden');
                    messageBox.setAttribute('aria-hidden', 'true');
                }
            });
        });

        // Contact form submission (progressively enhance - handle without inline onsubmit)
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                showMessage('Thank you for your message! An LRG representative will be in touch shortly.');
                contactForm.reset();
            });
        }

        // Mobile menu toggle
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleMobileMenu();
            });
        }

        // Close message box on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (messageBox && !messageBox.classList.contains('hidden')) {
                    messageBox.classList.add('hidden');
                    messageBox.setAttribute('aria-hidden', 'true');
                }
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    toggleMobileMenu(false);
                }
            }
        });
    }

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        // set year in footer
        if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

        // Ensure only home page shows initially
        showPage('home');

        // Setup listeners
        initEventListeners();
    });

    // Expose helpers to global scope for inline calls (e.g., form onsubmit)
    window.showPage = showPage;
    window.showMessage = showMessage;
})();
