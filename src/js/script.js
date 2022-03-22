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

const burger = document.querySelector('.header__menu_burger');
const dropDownMenu = document.querySelector('.active');
const close = document.querySelector('.close');
dropDownMenu.style.display = 'none';

burger.addEventListener('click', () =>
  dropDownMenu.style.display === 'none'
    ? (dropDownMenu.style.display = 'block')
    : (dropDownMenu.style.display = 'none')
);
close.addEventListener('click', () =>
  dropDownMenu.style.display === 'none'
    ? (dropDownMenu.style.display = 'block')
    : (dropDownMenu.style.display = 'none')
);

document.addEventListener('mousedown', (e) =>
  e.target.closest('.active') === null
    ? (dropDownMenu.style.display = 'none')
    : ''
);

const divClassPage = document.getElementsByClassName('page')[0];

if (divClassPage.classList.contains('catalog-js')) {
  const catalog = document.querySelector('.catalog__sudtitle');
  const catalogList = document.querySelector('.catalog__list');
  catalog.addEventListener('click', () => {
    if (catalog.clientWidth <= 700 && catalog.clientWidth >= 300) {
      if (catalogList.classList.contains('visibility') === false) {
        catalogList.classList.add('visibility');
      } else {
        catalogList.classList.remove('visibility');
      }
    }
  });
}

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

/// добавленеи карточек товара

let cardsData = [
  {
    isAvailable: true,
    imgUrl: 'img/jackets.png',
    text: 'Белая куртка',
    price: 2900,
    currency: 'грн',
    size: 'XXS XS S M L',
    color: {
      white: '#fff',
      blue: '#6F83A4',
      yellow: '#F1DDAA',
    },
    isSpecial: false,
  },

  {
    isAvailable: true,
    imgUrl: 'img/coat.png',
    text: 'Синее пальто',
    price: 3150,
    currency: 'грн',
    size: 'XS M L',
    color: {
      white: '#fff',
      blue: '#6F83A4',
      yellow: '#F1DDAA',
    },
    isSpecial: false,
  },

  {
    isAvailable: true,
    imgUrl: 'img/FurCoats.png',
    text: 'Бежевая шуба',
    price: 4200,
    currency: 'грн',
    size: 'XS M L',
    color: {
      white: '#fff',
      blue: '#6F83A4',
      yellow: '#F1DDAA',
    },
    isSpecial: false,
  },

  {
    isAvailable: true,
    imgUrl: 'img/parks.png',
    text: 'Синяя парка',
    price: 2900,
    currency: 'грн',
    size: 'XXS XS S M L',
    color: {
      white: '#fff',
      blue: '#6F83A4',
      yellow: '#F1DDAA',
    },
    isSpecial: false,
  },

  {
    isAvailable: true,
    imgUrl: 'img/jackets.png',
    text: 'Белая куртка',
    price: 2900,
    currency: 'грн',
    size: 'XXS XS S M L',
    color: {
      white: '#fff',
      blue: '#6F83A4',
      yellow: '#F1DDAA',
    },
    isSpecial: false,
  },

  {
    isAvailable: true,
    imgUrl: 'img/coat.png',
    text: 'Синее пальто',
    price: 3150,
    currency: 'грн',
    size: 'XS M L',
    color: {
      white: '#fff',
      blue: '#6F83A4',
      yellow: '#F1DDAA',
    },
    isSpecial: false,
  },

  {
    isAvailable: true,
    imgUrl: 'img/jackets.png',
    text: 'Белая куртка',
    price: 2900,
    currency: 'грн',
    size: 'XXS XS S M L',
    color: {
      white: '#fff',
      blue: '#6F83A4',
      yellow: '#F1DDAA',
    },
    isSpecial: false,
  },

  {
    isAvailable: true,
    imgUrl: 'img/coat.png',
    text: 'Синее пальто',
    price: 3150,
    currency: 'грн',
    size: 'XS M L',
    color: {
      white: '#fff',
      blue: '#6F83A4',
      yellow: '#F1DDAA',
    },
    isSpecial: false,
  },

  {
    isAvailable: true,
    imgUrl: 'img/FurCoats.png',
    text: 'Бежевая шуба',
    price: 4200,
    currency: 'грн',
    size: 'XS M L',
    color: {
      white: '#fff',
      blue: '#6F83A4',
      yellow: '#F1DDAA',
    },
    isSpecial: false,
  },

  {
    isAvailable: true,
    imgUrl: 'img/parks.png',
    text: 'Синяя парка',
    price: 2900,
    currency: 'грн',
    size: 'XXS XS S M L',
    color: {
      white: '#fff',
      blue: '#6F83A4',
      yellow: '#F1DDAA',
    },
    isSpecial: false,
  },

  {
    isAvailable: true,
    imgUrl: 'img/jackets.png',
    text: 'Белая куртка',
    price: 2900,
    currency: 'грн',
    size: 'XXS XS S M L',
    color: {
      white: '#fff',
      blue: '#6F83A4',
      yellow: '#F1DDAA',
    },
    isSpecial: false,
  },

  {
    isAvailable: true,
    imgUrl: 'img/coat.png',
    text: 'Синее пальто',
    price: 3150,
    currency: 'грн',
    size: 'XS M L',
    color: {
      white: '#fff',
      blue: '#6F83A4',
      yellow: '#F1DDAA',
    },
    isSpecial: false,
  },
];

let makeElement = (tagName, className, text) => {
  let element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

let catalogBlockTwo = document.getElementsByClassName('catalog__block_two');

let createCard = (product) => {
  let listItem = makeElement('div', 'product-card');

  let productCardLike = makeElement('div', 'product-card__like', '');
  listItem.appendChild(productCardLike);

  let productCardLikeMask = makeElement('div', 'product-card__like_mask', '');
  productCardLike.appendChild(productCardLikeMask);

  let productPicture = makeElement('img', 'product-card__img');
  productPicture.src = product.imgUrl;
  productPicture.alt = product.text;
  listItem.appendChild(productPicture);

  let productCardBox = makeElement('div', 'product-card__box', '');
  listItem.appendChild(productCardBox);

  let productTitle = makeElement('h2', 'product-card__subtitle', product.text);
  productCardBox.appendChild(productTitle);

  let productPrice = makeElement(
    'p',
    'product-card__price',
    product.price + ' ' + product.currency
  );
  productCardBox.appendChild(productPrice);

  let productSize = makeElement('ul', 'product-card__list', product.size);
  productCardBox.appendChild(productSize);

  let productColor = makeElement('div', 'product-card__option', '');
  productCardBox.appendChild(productColor);

  for (let key in product.color) {
    // если есть выбор цвета делаем цикл
    let spanProductColor = makeElement('span', 'product-card__circul', '');
    spanProductColor.style.backgroundColor = product.color[key];
    if (product.color[key] === '#fff') {
      spanProductColor.style.border = '0.3px solid #000';
    } else {
      spanProductColor.style.border = `0.3px solid ${product.color[key]}`; // делаем бордер цветом фона
    }
    productColor.appendChild(spanProductColor);
  }

  let availabilityClass = 'product--available';
  if (!product.isAvailable) {
    availabilityClass = 'product--unavailable';
  }
  listItem.classList.add(availabilityClass);

  catalogBlockTwo[0].appendChild(listItem);
};

for (var i = 0; i < cardsData.length; i++) {
  var cardItem = createCard(cardsData[i]);
}
