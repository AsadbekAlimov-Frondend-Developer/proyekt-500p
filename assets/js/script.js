(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const navbarMenu = document.getElementById('navbarMenu');
        const navbarContact = document.getElementById('navbarContact');

        if (!hamburgerBtn || !navbarMenu || !navbarContact) {
            return;
        }

        // Menu ochish/yopish
        function toggleMenu() {
            hamburgerBtn.classList.toggle('provita-navbar__hamburger--active');
            navbarMenu.classList.toggle('provita-navbar__menu--active');
            navbarContact.classList.toggle('provita-navbar__contact--active');
            document.body.style.overflow = navbarMenu.classList.contains('provita-navbar__menu--active') ? 'hidden' : '';
        }

        function closeMenu() {
            hamburgerBtn.classList.remove('provita-navbar__hamburger--active');
            navbarMenu.classList.remove('provita-navbar__menu--active');
            navbarContact.classList.remove('provita-navbar__contact--active');
            document.body.style.overflow = '';

            // Barcha dropdownlarni yopish
            document.querySelectorAll('.provita-navbar__menu-item--active').forEach(function (item) {
                item.classList.remove('provita-navbar__menu-item--active');
            });
        }

        // Hamburger button
        hamburgerBtn.addEventListener('click', function (e) {
            e.preventDefault();
            toggleMenu();
        });

        // Window resize
        let resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                if (window.innerWidth > 1024) {
                    closeMenu();
                }
            }, 250);
        });

        // Dropdown toggle - Event delegation
        navbarMenu.addEventListener('click', function (e) {
            const dropdownLink = e.target.closest('.provita-navbar__menu-link--dropdown');
            const submenuLink = e.target.closest('.provita-navbar__submenu-link');

            // Dropdown link bosilganda
            if (dropdownLink && window.innerWidth <= 1024) {
                e.preventDefault();
                e.stopPropagation();

                const menuItem = dropdownLink.closest('.provita-navbar__menu-item');

                if (menuItem) {
                    const isActive = menuItem.classList.contains('provita-navbar__menu-item--active');

                    // Boshqa barcha dropdownlarni yopish (ixtiyoriy)
                    // document.querySelectorAll('.provita-navbar__menu-item--active').forEach(function(item) {
                    //     if (item !== menuItem) {
                    //         item.classList.remove('provita-navbar__menu-item--active');
                    //     }
                    // });

                    // Toggle current dropdown
                    menuItem.classList.toggle('provita-navbar__menu-item--active');
                }
            }

            // Submenu link bosilganda
            if (submenuLink && window.innerWidth <= 1024) {
                closeMenu();
            }
        });

        // Dropdown linklar uchun touch event (mobile uchun qo'shimcha)
        const dropdownLinks = document.querySelectorAll('.provita-navbar__menu-link--dropdown');
        dropdownLinks.forEach(function (link) {
            link.addEventListener('touchstart', function (e) {
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    const menuItem = this.closest('.provita-navbar__menu-item');
                    if (menuItem) {
                        menuItem.classList.toggle('provita-navbar__menu-item--active');
                    }
                }
            }, { passive: false });
        });
    });

    //  ======================================================== hero slider
    const slides = document.querySelectorAll('.item2-block2');
    let currentSlide = 0;

    document.querySelectorAll('.next').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            slides[currentSlide].style.display = 'none';
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].style.display = 'flex';
        });
    });

    document.querySelectorAll('.prev').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            slides[currentSlide].style.display = 'none';
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            slides[currentSlide].style.display = 'flex';
        });
    });
})();