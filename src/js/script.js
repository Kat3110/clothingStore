let toggleMenu = document.querySelectorAll('.footer__menu h2');

for (let i = 0; i < toggleMenu.length; i++) {
  toggleMenu[i].addEventListener('click', function () {
    let isUl = toggleMenu[i].nextElementSibling;

    if (isUl.classList.contains('visible')) {
      isUl.classList.remove('visible');
    } else {
      isUl.classList.add('visible');
    }
  });
}
// function f(a) {
//   a.value = "Вы подписались";
// }

// function fun1() {
//   var rng = document.getElementById('r1'); //rng - это ползунок
//   var i1 = document.getElementById('i1'); // i1 - input
//   i1.value = rng.value;
// }

const burger = document.querySelector('.header__menu_burger');
const catalog = document.querySelector('.catalog__sudtitle');
const catalogList = document.querySelector('.catalog__list');
const active = document.querySelector('.active');
const close = document.querySelector('.close');
// const catalogFilter = document.querySelector('.catalog__filter');
// const catalogListOption = document.querySelector('.catalog__list-option');
active.style.display = 'none';

// catalogFilter.addEventListener('click', () => {
//   if (catalogFilter.clientWidth <= 700 && catalogFilter.clientWidth >= 300) {
//     if (catalogListOption.classList.contains('visibility') === false) {
//       catalogListOption.classList.add('visibility');
//     } else {
//       catalogListOption.classList.remove('visibility');
//     }
//   }
// });

catalog.addEventListener('click', () => {
  if (catalog.clientWidth <= 700 && catalog.clientWidth >= 300) {
    if (catalogList.classList.contains('visibility') === false) {
      catalogList.classList.add('visibility');
    } else {
      catalogList.classList.remove('visibility');
    }
  }
});

burger.addEventListener('click', () => {
  if (active.style.display === 'none') {
    active.style.display = 'block';
  } else {
    active.style.display = 'none';
  }
});
close.addEventListener('click', () => {
  if (active.style.display === 'none') {
    active.style.display = 'block';
  } else {
    active.style.display = 'none';
  }
});

document.addEventListener('mousedown', (e) => {
  if (e.target.closest('.active') === null) {
    active.style.display = 'none';
  }
});

const divClassPage = document.getElementsByClassName('page')[0];

if (!divClassPage.classList.contains('menu__two')) {
  let position = 0;
  let slidesToShow = 4;
  let screenWidth = window.screen.width;

  if (screenWidth > 820) {
    slidesToShow = 4;
  } else if (screenWidth < 820) {
    slidesToShow = 2;
  }

  const slidesToScroll = 1;
  const container = document.querySelector('.slider-container');
  const track = document.querySelector('.slider-track');
  const btnPrev = document.querySelector('.btn-prev');
  const btnNext = document.querySelector('.btn-next');
  const items = document.querySelectorAll('.slider-item');
  const itemsCount = items.length;
  let itemWidth = container.clientWidth / slidesToShow;
  const movePosition = slidesToScroll * itemWidth;

  console.log(itemWidth);
  items.forEach((item) => {
    item.style.maxWidth = `${itemWidth}px`;
    item.style.minWidth = `${itemWidth}px`;
  });

  btnNext.addEventListener('click', () => {
    const itemsLeft =
      itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
    position -=
      itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
    setPosition();
    checkBtns();
  });

  btnPrev.addEventListener('click', () => {
    const itemsLeft = Math.abs(position) / itemWidth;
    position +=
      itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
    setPosition();
    checkBtns();
  });

  const setPosition = () => {
    track.style.transform = `translateX(${position}px)`;
  };

  const checkBtns = () => {
    if (position === 0) {
      btnPrev.style.display = 'none';
    } else if (position === -(itemsCount - slidesToShow) * itemWidth) {
      btnNext.style.display = 'none';
    } else {
      btnNext.style.display = 'block';
      btnPrev.style.display = 'block';
    }
  };

  checkBtns();
}
