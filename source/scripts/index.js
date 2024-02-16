import Swiper from "swiper/bundle";
import "swiper/css/bundle";

//1
const swiperHero = new Swiper(".hero__swiper", {
  // autoplay: {
  //   delay: 5000,
  // },

  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
});

// Инпут с датами (от и до такого-то числа)
$(() => {
  $(".date-range__input").datepicker({
    dateFormat: "yy-mm-dd",
  });

  $("#start-date").on("change", function () {
    $("#end-date").datepicker("option", "minDate", $(this).val());
  });

  $("#end-date").on("change", function () {
    $("#start-date").datepicker("option", "maxDate", $(this).val());
  });
});

// -- Меню навигации на мобилке.
// const menu = document.querySelector(".main-nav__list");
// const buttonMenu = document.querySelector(".main-nav__button-menu");
// const logo = document.querySelector(".main-nav__logo-link");
// const map = document.querySelector(".location__map");

// buttonMenu.onclick = function () {
//   menu.classList.toggle("main-nav__list--close");
//   buttonMenu.classList.toggle("main-nav__button-menu--cross");
//   logo.classList.toggle("main-nav__logo-link--close");
// };


