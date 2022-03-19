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

let burger = document.querySelector('.header__menu_burger');
let catalog = document.querySelector('.catalog__sudtitle');
let activeList = document.querySelector('.catalog__list');
let active = document.querySelector('.active');
let close = document.querySelector('.close');
active.style.display = 'none';

catalog.addEventListener('click', function () {
  if (activeList.style.display === 'none') {
    activeList.style.display = 'block';
  } else {
    activeList.style.display = 'none';
  }
});
document.addEventListener('mousedown', function (e) {
  if (e.target.closest('.catalog__list') === null) {
    activeList.style.display = 'none';
  }
});

burger.addEventListener('click', function () {
  if (active.style.display === 'none') {
    active.style.display = 'block';
  } else {
    active.style.display = 'none';
  }
});
close.addEventListener('click', function () {
  if (active.style.display === 'none') {
    active.style.display = 'block';
  } else {
    active.style.display = 'none';
  }
});

document.addEventListener('mousedown', function (e) {
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

  // // Создаем медиа условие, проверяющее viewports на ширину не менее 768 пикселей.
  // const mediaQuery = window.matchMedia("(min-width: 768px)");

  // if (mediaQuery.matches) {
  //   alert("Media Query Matched!");
  // }
}
