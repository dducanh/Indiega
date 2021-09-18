function debounceFn(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

window.addEventListener("load", function () {
  // scroll navbar
  const header = document.querySelector(".header");
  const headerHeight = header.offsetHeight;
  window.addEventListener(
    "scroll",
    debounceFn(function (e) {
      const scrollY = window.pageYOffset;
      if (scrollY >= headerHeight) {
        header && header.classList.add("is-fixed");
      } else {
        header && header.classList.remove("is-fixed");
      }
    }),
    100
  );

  //slide header
  let positionX = 0;
  const pages = document.querySelectorAll(".slider__left--page");
  const slides = document.querySelectorAll(".slider");
  const mainSlide = document.querySelector(".slider-main");
  const headerAbs = document.querySelector(".header");
  function handleChangeSlide(e) {
    e.preventDefault();
    const pageId = e.target.dataset.page;
    slides.forEach((item) => {
      let positionItem = positionX + item.offsetLeft;
      if (item.getAttribute("data-page") === pageId) {
        mainSlide.style = `transform: translateX(${-positionItem}px)`;
        console.log(headerAbs.offsetLeft);
      }
    });
  }

  [...pages].forEach((item) =>
    item.addEventListener("click", handleChangeSlide)
  );

  //animate title onscroll

  const titles = document.querySelectorAll(".comingup__title");
  function handleAnimateScroll(e) {
    [...titles].forEach((item) => {
      const windowScrollTop = window.pageYOffset;

      if (windowScrollTop > item.offsetTop - item.offsetHeight - 350) {
        item.classList.add("active");
      }
    });
  }
  window.addEventListener("scroll", debounceFn(handleAnimateScroll), 100);

  // slide section upcoming

  const comingupList = document.querySelector(".comingup__slider--list");
  const preBtn = document.querySelector(".comingup__slider--previous");
  const nextBtn = document.querySelector(".comingup__slider--next");
  const tabItems = document.querySelectorAll(".comingup__slider--item");
  let deltaScroll = 200;
  const tabScrollWidth = comingupList.scrollWidth - comingupList.clientWidth;

  [...tabItems].forEach((item) =>
    item.addEventListener("click", handleTabClick)
  );

  function handleTabClick(e) {
    [...tabItems].forEach((item) => {
      item.classList.remove("slider-active");
    });
    e.target.classList.add("slider-active");
    let leftSpacing = e.target.offsetLeft;
    comingupList.scrollLeft = leftSpacing - 200;
  }

  nextBtn.addEventListener("click", function (e) {
    comingupList.scrollLeft += deltaScroll;
  });
  preBtn.addEventListener("click", function (e) {
    comingupList.scrollLeft -= deltaScroll;
  });

  //testimonial

  const testPre = document.querySelector(".testimonial--previous");
  const testNext = document.querySelector(".testimonial--next");
  const testList = document.querySelector(".testimonial__list");
  testNext.addEventListener("click", function (e) {
    testList.scrollLeft += deltaScroll;
  });
  testPre.addEventListener("click", function (e) {
    testList.scrollLeft -= deltaScroll;
  });
});
