let reasons = [
  {
    title: "Крутость",
    description: "ЯЛЯЛЯЛЯЛЯЛЯ Л ЯЛЯЛЯЛЯЛЯЛЯЛЯЛ ЯЛЯЛЯЛЯЛ ЯЛЯЛЯЛЯ",
    color: "#A03472",
    img: "",
  },
  {
    title: "Крутость",
    description: "ЯЛЯЛЯЛЯЛЯЛЯ Л ЯЛЯЛЯЛЯЛЯЛЯЛЯЛ ЯЛЯЛЯЛЯЛ ЯЛЯЛЯЛЯ",
    color: "#D87093",
    img: "",
  },
  {
    title: "Крутость",
    description: "ЯЛЯЛЯЛЯЛЯЛЯ Л ЯЛЯЛЯЛЯЛЯЛЯЛЯЛ ЯЛЯЛЯЛЯЛ ЯЛЯЛЯЛЯ",
    color: "#A0522D",
    img: "",
  },
  {
    title: "Крутость",
    description: "ЯЛЯЛЯЛЯЛЯЛЯ Л ЯЛЯЛЯЛЯЛЯЛЯЛЯЛ ЯЛЯЛЯЛЯЛ ЯЛЯЛЯЛЯ",
    color: "#007BA7",
    img: "",
  },
  {
    title: "Крутость",
    description: "ЯЛЯЛЯЛЯЛЯЛЯ Л ЯЛЯЛЯЛЯЛЯЛЯЛЯЛ ЯЛЯЛЯЛЯЛ ЯЛЯЛЯЛЯ",
    color: "#BEBD7F",
    img: "",
  },
  {
    title: "Крутость",
    description: "ЯЛЯЛЯЛЯЛЯЛЯ Л ЯЛЯЛЯЛЯЛЯЛЯЛЯЛ ЯЛЯЛЯЛЯЛ ЯЛЯЛЯЛЯ",
    color: "#2F353B",
    img: "",
  },
];

let mediaImages = [
  {
    img: "https://sun9-88.userapi.com/impg/fXzrIxJ7vE02dI-uaI80hpkQPdb-Ilyo3JMFFg/NYD6dJcbaQg.jpg?size=750x750&quality=95&sign=712fd51462bee03a4429a3b5fea844c0&type=album",
    title: "Комсомольская правда 1",
  },
  {
    img: "https://sun9-88.userapi.com/impg/fXzrIxJ7vE02dI-uaI80hpkQPdb-Ilyo3JMFFg/NYD6dJcbaQg.jpg?size=750x750&quality=95&sign=712fd51462bee03a4429a3b5fea844c0&type=album",
    title: "Комсомольская правда 2",
  },
  {
    img: "https://sun9-88.userapi.com/impg/fXzrIxJ7vE02dI-uaI80hpkQPdb-Ilyo3JMFFg/NYD6dJcbaQg.jpg?size=750x750&quality=95&sign=712fd51462bee03a4429a3b5fea844c0&type=album",
    title: "Комсомольская правда 3",
  },
  {
    img: "https://sun9-88.userapi.com/impg/fXzrIxJ7vE02dI-uaI80hpkQPdb-Ilyo3JMFFg/NYD6dJcbaQg.jpg?size=750x750&quality=95&sign=712fd51462bee03a4429a3b5fea844c0&type=album",
    title: "Комсомольская правда 5",
  },
  {
    img: "https://sun9-88.userapi.com/impg/fXzrIxJ7vE02dI-uaI80hpkQPdb-Ilyo3JMFFg/NYD6dJcbaQg.jpg?size=750x750&quality=95&sign=712fd51462bee03a4429a3b5fea844c0&type=album",
    title: "Комсомольская правда 5",
  },
  {
    img: "https://sun9-88.userapi.com/impg/fXzrIxJ7vE02dI-uaI80hpkQPdb-Ilyo3JMFFg/NYD6dJcbaQg.jpg?size=750x750&quality=95&sign=712fd51462bee03a4429a3b5fea844c0&type=album",
    title: "Комсомольская правда 5",
  },
  {
    img: "https://sun9-88.userapi.com/impg/fXzrIxJ7vE02dI-uaI80hpkQPdb-Ilyo3JMFFg/NYD6dJcbaQg.jpg?size=750x750&quality=95&sign=712fd51462bee03a4429a3b5fea844c0&type=album",
    title: "Комсомольская правда 5",
  },
];

const baseUrl = "";
const url = baseUrl + "/api";

const host = axios.create({
  baseURL: url,
  headers: { "ngrok-skip-browser-warning": `qwerty` },
});

let head = document.getElementsByTagName("head")[0],
  style = document.createElement("style");

let parentNode = Array.from(document.querySelectorAll(".reasons__items"));
let elementsReasons = Array.from(document.querySelectorAll(".reason-item"));
let headersReasons = Array.from(
  document.querySelectorAll(".reason-item__header")
);
let textReasons = Array.from(document.querySelectorAll(".reason-item__text"));

reasons.map((item, index) => {
  rules = document.createTextNode(
    `.reason-item:nth-child(${index + 1}):hover {background-color: ${
      item.color
    };}`
  );
  if (style.styleSheet) style.styleSheet.cssText = rules.nodeValue;
  else style.appendChild(rules);
  head.appendChild(style);
});

const swiper = new Swiper(".swiper", {
  observer: true,
  observeParents: true,
  spaceBetween: 60,
  speed: 400,
  slidesPerView: "auto",
  draggable: true,
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
  breakpoints: {
    0: {
      centeredSlides: true,
    },
    500: {
      centeredSlides: false,
    },
  },
});

let mediaParent = document.querySelector(".swiper-wrapper");

mediaImages.map((item) => {
  let el = document.createElement("div");
  el.className = "swiper-slide";
  el.innerHTML = `
        <div class="news-image">
            <img src="${item.img}" alt="">
        </div>
        <div class="news-title">
            ${item.title}
        </div>
    `;
  mediaParent.appendChild(el);
});

(function aboutUs() {
  let title = document.querySelector(".head__text-content");
  let imageContainer = document.querySelector(".head__media");

  host.get("/about").then((data) => {
    title.innerText = data.data.text;

    let images = imageContainer.querySelectorAll(".head__media-item");
    [...images].map((image, index) => {
      image.innerHTML = `<img src=${
        baseUrl + "/media/" + data.data.images[index]
      } alt="О нас">`;
    });
  });
})();

(function reasons() {
  let reasons = document.querySelectorAll(".reason-item");

  host.get("/reasons").then((data) => {
    console.log(data, "test");

    [...reasons].map((reason, index) => {
      reason.querySelector(".reason-item__header").innerText =
        data.data[index].title;

      reason.querySelector(".reason-item__text").innerText =
        data.data[index].description;

      reason.querySelector(".reason-item__icon").innerHTML = `<img src=${
        baseUrl + "/media/" + data.data[index].img
      } alt="Иконка причины">`;

      reason.onmouseover = function () {
        reason.style.background = `#${data.data[index].color}`;
      };
      reason.onmouseleave = function () {
        reason.style.background = `transparent`;
      };
    });
  });
})();
