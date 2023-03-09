const baseUrl = "";
const url = baseUrl + "/api";

// const axios = require('axios').default;

const host = axios.create({
  baseURL: url,
  headers: { "ngrok-skip-browser-warning": "qwerty" },
});

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let category = params.category || "all";
console.log(category);

const createItem = (item, parent) => {
  let mainBlock = document.createElement("div");
  mainBlock.setAttribute("class", "item");

  mainBlock.innerHTML = `
        <div class="item">
            <div class="item__img">
                <img
                src="${baseUrl + "/media/" + item.cover.src}"
                alt=""
                />
            </div>
            <div class="item__name">${item.name}</div>
            <div class="item__price">${item.price + " руб."}</div>
            <a href="${
              "/pages/item/?slug=" + item.slug
            }" class="item__link"> Подробнее >> </a>
        </div>
        `;
  parent.appendChild(mainBlock);
};

const renderCategory = (title, items) => {
  // if (items.length) {
  console.log(title);

  let parent = document.querySelector(".container");

  let category = document.createElement("div");
  category.setAttribute("class", "category");

  let categoryTitle = document.createElement("div");
  categoryTitle.setAttribute("class", "category__title");

  let name = document.createElement("div");
  name.setAttribute("class", "name");

  let nameP = document.createElement("p");
  nameP.innerText = title;

  let logo = document.createElement("div");
  logo.setAttribute("class", "logo");

  let logoImg = document.createElement("img");

  switch (title) {
    case "Коптильни":
      logoImg.setAttribute("src", "/img/catalog/koptilni.svg");
      break;
    case "Парогенераторы":
      logoImg.setAttribute("src", "/img/catalog/steam.svg");
      break;
    case "Дымогенераторы":
      logoImg.setAttribute("src", "/img/catalog/smoke.svg");
      break;
    case "Сушильные шкафы":
      logoImg.setAttribute("src", "/img/catalog/dry.svg");
      break;
    case "Доптовары":
      logoImg.setAttribute("src", "/img/catalog/extra.svg");
      break;
    case "Пароконвектоматы":
      logoImg.setAttribute("src", "/img/catalog/steam.svg");
      break;
    default:
      logoImg.setAttribute("src", "/img/catalog/koptilni.svg");
      break;
  }
  logo.appendChild(logoImg);

  name.appendChild(nameP);
  categoryTitle.appendChild(name);
  categoryTitle.appendChild(logo);

  let categoryItems = document.createElement("div");
  categoryItems.setAttribute("class", "category__items");

  items.map((item) => {
    createItem(item, categoryItems);
  });

  category.appendChild(categoryTitle);
  category.appendChild(categoryItems);
  parent.appendChild(category);
  // }
};

const renderCategories = (category, items) => {
  if (category !== "all") renderCategory(category, items);
  else {
    renderCategory(
      "Коптильни",
      items.filter((item) => item.category === "Коптильни")
    );
    renderCategory(
      "Парогенераторы",
      items.filter((item) => item.category === "Парогенераторы")
    );
    renderCategory(
      "Дымогенераторы",
      items.filter((item) => item.category === "Дымогенераторы")
    );
    renderCategory(
      "Сушильные шкафы",
      items.filter((item) => item.category === "Сушильные шкафы")
    );
    renderCategory(
      "Доптовары",
      items.filter((item) => item.category === "Доптовары")
    );
    renderCategory(
      "Пароконвектоматы",
      items.filter((item) => item.category === "Пароконвектоматы")
    );
  }
};

const fetchData = async () => {
  await host.post("item/all/get/category", { category }).then((data) => {
    console.log(data.data);
    renderCategories(category, data.data);
  });
};

fetchData();
