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

// reasons.map((item, index) => {
//   rules = document.createTextNode(
//     `.reason-item:nth-child(${index + 1}):hover {background-color: ${
//       item.color
//     };}`
//   );
//   if (style.styleSheet) style.styleSheet.cssText = rules.nodeValue;
//   else style.appendChild(rules);
//   head.appendChild(style);
// });

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

// const swiperVideo = new Swiper(".swiperVideo", {
//   observer: true,
//   observeParents: true,
//   spaceBetween: 60,
//   speed: 400,
//   slidesPerView: 3,
//   draggable: true,
//   scrollbar: {
//     el: ".swiper-scrollbar",
//     draggable: true,
//   },
//   breakpoints: {
//     0: {
//       centeredSlides: true,
//     },
//     500: {
//       centeredSlides: false,
//     },
//   },
// });

let mediaParent = document.querySelector(".swiper-wrapper");

// mediaImages.map((item) => {
//   let el = document.createElement("div");
//   el.className = "swiper-slide";
//   el.innerHTML = `
//         <div class="news-image">
//             <img src="${item.img}" alt="">
//         </div>
//         <div class="news-title">
//             ${item.title}
//         </div>
//     `;
//   mediaParent.appendChild(el);
// });

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

(function massmedia() {
  let imageMassmediaContainer = document
    .querySelector(".media__container-slider")
    .querySelector(".swiper")
    .querySelector(".swiper-wrapper");
  imageMassmediaContainer.innerHTML = "";

  host.get("/massmedia").then((data) => {
    data.data.photo.map((photoImg) => {
      let imgContainer = document.createElement("div");
      imgContainer.className = "swiper-slide";

      imgContainer.innerHTML = `
      <div class="news-image">
        <img src="${baseUrl + "/media/" + photoImg.src}" alt="massmedia">
      </div>
      <div class="news-title">${photoImg.title}</div>
      `;

      imageMassmediaContainer.appendChild(imgContainer);
    });

    let videoElements = document
      .querySelector(".media__container-video")
      .querySelectorAll(".video-main__video");

    [...videoElements].map((vid, index) => {
      vid.innerHTML = `<iframe class="youtube" src="${data.data.video[index].src}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>`;
    });
  });
})();

(function prod() {
  let prods = document
    .querySelector(".prod")
    .querySelectorAll(".head__media-item");

  host.get("/prodinfo").then((data) => {
    console.log(data.data, "test");

    [...prods].map((prod, index) => {
      prod.innerHTML = `<img
        src="${baseUrl + "/media/" + data.data[index].src}"
        alt=""
      />`;
    });
  });
})();
