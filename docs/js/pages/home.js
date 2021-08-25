const swiper = new Swiper('.testimonialis .swiper-container', {
    speed: 400,
    spaceBetween: 100,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
  });

  document.addEventListener("DOMContentLoaded", function () {

    const headerMenuBtn = document.getElementById('header__menu-btn');
    const navigation = document.getElementById('navigation');

    headerMenuBtn.addEventListener("click", function () {
        this.classList.toggle("header__menu-btn--active");
        navigation.classList.toggle("navigation--active");
      });
  });