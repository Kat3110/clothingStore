//JS-функция определения поддержки WebP
function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

let toggleMenu = document.querySelectorAll(".footer__menu h2");

for (let i = 0; i < toggleMenu.length; i++) {
  toggleMenu[i].addEventListener("click", function () {
    let isUl = toggleMenu[i].nextElementSibling;

    if (isUl.classList.contains("visible")) {
      isUl.classList.remove("visible");
    } else {
      isUl.classList.add("visible");
    }
  });
}
function f(a) {
  a.value = "Вы подписались";
}

let burger = document.querySelectorAll(".header__menu_burger");
let active = document.querySelector(".active");
let close = document.querySelector(".close");
active.style.display = "none";

burger[0].addEventListener("click", function () {
  if (active.style.display === "none") {
    active.style.display = "block";
  } else {
    active.style.display = "none";
  }
});
close.addEventListener("click", function () {
  if (active.style.display === "none") {
    active.style.display = "block";
  } else {
    active.style.display = "none";
  }
});

document.addEventListener("mousedown", function (e) {
  if (e.target.closest(".active") === null) {
    active.style.display = "none";
  }
});
