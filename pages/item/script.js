const baseUrl = "";
const url = baseUrl + "/api";

// const axios = require('axios').default;

const host = axios.create({
  baseURL: url,
  headers: { "ngrok-skip-browser-warning": `qwerty` },
});

document.querySelector(".order-item").addEventListener("click", (e) => {
  console.log(1234);
  document
    .querySelector(".modal-container")
    .classList.toggle("modal-container--hidden");
});

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let slug = params.slug;
console.log(slug);

function getId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

const swiper = new Swiper(".swiper", {
  observer: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // loop: true,
});

const setName = (name) => {
  let node = document.querySelector(".item__name");
  let nameNode = document.createElement("p");
  nameNode.innerHTML = name;
  node.appendChild(nameNode);
};

const setParams = (params) => {
  let parent = document.querySelector(".properties");

  let container = document.createElement("div");
  container.setAttribute("class", "properties__content");

  Array.from(params).map((param) => {
    let prop = document.createElement("div");
    prop.setAttribute("class", "prop");

    let header = document.createElement("div");
    header.setAttribute("class", "prop__header");
    header.innerHTML = param.name;
    prop.appendChild(header);

    let propContainer = document.createElement("div");
    propContainer.setAttribute("class", "prop__container");

    if (param.first_opt) {
      let first_opt = document.createElement("div");
      first_opt.setAttribute("class", "prop-item");
      first_opt.innerHTML = param.first_opt;
      propContainer.appendChild(first_opt);
    }

    if (param.second_opt) {
      let second_opt = document.createElement("div");
      second_opt.setAttribute("class", "prop-item");
      second_opt.innerHTML = param.second_opt;
      propContainer.appendChild(second_opt);
    }

    if (param.third_opt) {
      let third_opt = document.createElement("div");
      third_opt.setAttribute("class", "prop-item");
      third_opt.innerHTML = param.third_opt;
      propContainer.appendChild(third_opt);
    }
    prop.appendChild(propContainer);
    container.appendChild(prop);
  });
  parent.appendChild(container);
};

const setFeatures = (features) => {
  let node = document.querySelector(".feature-container");

  Array.from(features).map((feature) => {
    let parent = document.createElement("div");
    parent.setAttribute("class", "feature");

    let left = document.createElement("div");
    left.setAttribute("class", "left");

    let header = document.createElement("div");
    header.setAttribute("class", "left__header");
    header.innerHTML = feature.header;

    let mainText = document.createElement("div");
    mainText.setAttribute("class", "left__content");
    mainText.innerHTML = feature.main_text;

    left.appendChild(header);
    left.appendChild(mainText);
    parent.appendChild(left);

    if (feature.circle_text) {
      let circle = document.createElement("div");
      circle.setAttribute("class", "feature__circle");
      circle.innerHTML = feature.circle_text;
      parent.appendChild(circle);
    }

    node.appendChild(parent);
  });
};

const setMaterial = (content) => {
  let parent = document.querySelector(".material__content");
  parent.innerHTML = content;
};

const setVideo = (src) => {
  let frame = document.querySelector(".youtube");
  frame.setAttribute("src", "//www.youtube.com/embed/" + getId(src));
};

const updatePhotos = async (links) => {
  let parent = document.querySelector(".swiper-wrapper");

  Array.from(links).map((link) => {
    let newImage = document.createElement("div");
    newImage.setAttribute("class", "swiper-slide");

    let img = document.createElement("img");
    img.setAttribute("src", baseUrl + "/media/" + link.src);

    newImage.appendChild(img);
    parent.appendChild(newImage);
  });
};

const setPrice = (price) => {
  document.querySelector('.order__price').innerHTML = price
}

const fetchData = async () => {
  await host.get("/item/get/" + slug).then((data) => {
    if (data.data === null) document.location.href="/";
    document.title = data.data.name + " - Коптисам";
    console.log(data.data);
    setName(data.data.name);
    updatePhotos(data.data.images);
    setParams(data.data.params);
    setFeatures(data.data.features);
    setMaterial(data.data.material);
    setVideo(data.data.video);
    setPrice(data.data.price);
  });
};

fetchData();
