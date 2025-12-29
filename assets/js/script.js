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

    document.querySelectorAll('.hero .next').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            slides[currentSlide].style.display = 'none';
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].style.display = 'flex';
        });
    });

    document.querySelectorAll('.hero .prev').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            slides[currentSlide].style.display = 'none';
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            slides[currentSlide].style.display = 'flex';
        });
    });
    // ====================================================
    const resultsSwiper = new Swiper('.results .itemsToSlider', {
        slidesPerView: 2,
        spaceBetween: 14,
        loop: true,
        navigation: {
            nextEl: '.results-next',
            prevEl: '.results-prev',
        },
        breakpoints: {
            320: {      // mobile
                slidesPerView: 1
            },
            480: {      // mobile
                slidesPerView: 2
            },
            700: {      // tablet
                spaceBetween: 14,
            },
            1024: {     // desktop
                spaceBetween: 17,
            }
        },
        on: {
            init: function () {
                document.querySelector('.results .main-count-number').textContent =
                    this.slides.length.toString().padStart(2, '0');
            },
            slideChange: function () {
                document.querySelector('.results .main-number').textContent =
                    (this.realIndex + 1).toString().padStart(2, '0');
            }
        }
    });
    // News Swiper - Tuzatilgan versiya
    const newsSwiper = new Swiper('.news .block', {
        slidesPerView: 3,
        spaceBetween: 14,
        loop:true,
        navigation: {
            nextEl: '.news .swiper-button-next-custom',
            prevEl: '.news .swiper-button-prev-custom',
        },
        breakpoints: {
            319: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            769: {
                slidesPerView: 2,
                spaceBetween: 14
            },
            1025: {
                slidesPerView: 3,
                spaceBetween: 14
            }
        },
       on: {
    init: function () {
        const total = String(this.slides.length).padStart(2, '0');

        document.querySelectorAll('.news .end-number').forEach(el => {
            el.textContent = total;
        });

        document.querySelectorAll('.news .main-number').forEach(el => {
            el.textContent = '01';
        });
    },

    slideChange: function () {
        const current = String(this.realIndex + 1).padStart(2, '0');

        document.querySelectorAll('.news .main-number').forEach(el => {
            el.textContent = current;
        });
    }
}

    });
})();