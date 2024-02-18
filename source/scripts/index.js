import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

//1
const swiperHero = new Swiper('.hero__swiper', {
  // autoplay: {
  //   delay: 3000,
  // },
  spaceBetween: 30,
  // effect: "fade",
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: false,
  },
});

// Инпут с датами (от и до такого-то числа)

$(() => {
  $('.date-range__input').datepicker({
    dateFormat: 'yy-mm-dd',
  });

  $('#start-date').on('change', function () {
    $('#end-date').datepicker('option', 'minDate', $(this).val());
  });

  $('#end-date').on('change', function () {
    $('#start-date').datepicker('option', 'maxDate', $(this).val());
  });
});

// Запрос карточек
document.addEventListener('DOMContentLoaded', () => {
  const axios = require('axios');

  const config = {
    method: 'GET',
    url: 'https://mocki.io/v1/a5814d24-4e22-49fc-96d1-0e9ae2952afc',
  };

  axios(config)
    .then((response) => {
      console.table(response.data.articles, ['url']);
      const data = response.data.articles;
      const listElement = document.querySelector('.articles__list');
      const selectElement = document.querySelector('.select-author__input');
      let cardsHTML = '';
      const authors = [];

      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        cardsHTML += createCard(item);

        // Собираем уникальные имена авторов
        if (item.author && !authors.includes(item.author)) {
          authors.push(item.author);
        }
      }

      // Добавляем все карточки одним внедрением HTML
      listElement.innerHTML = cardsHTML;

      // Добавляем авторов в выпадающий список
      authors.forEach((author) => {
        const option = document.createElement('option');
        option.value = author;
        option.textContent = author;
        selectElement.appendChild(option);
      });
    })
    .catch((error) => {
      console.log(error);
    });

  function formatDateString(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  function createCard(item) {
    return `
        <article class="articles__item articles-item">
        <a href=${item.url} class="articles-item__link link"  target="_blank">
          <p class="articles-item__date">${formatDateString(
    item.publishedAt
  )}</p>
          <h4 class="articles-item__title">${item.title}</h4>
          <p class="articles-item__description">${item.description}</p>
          <p class="articles-item__author">${item.author}</p>
          </a>
        </article>
      `;
  }
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
