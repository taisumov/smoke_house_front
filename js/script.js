const baseUrl = "";
const url = baseUrl + "/api";

const host = axios.create({
  baseURL: url,
  headers: { "ngrok-skip-browser-warning": `qwerty` },
});

async function loadData() {
  // await host.get("/feedback/").then((data) => {
  //   document.title = data.data.name + " - Коптисам";
  //   console.log(data["data"]);
  // });

  let data = await loadHeader();
  console.log(data);

  if (!data) return;

  let headerContainer = document
    .querySelector(".header")
    .querySelector(".headerContainer");

  headerContainer.querySelector(".headerTitle").innerHTML = data["title"];
  headerContainer.querySelector(".headerDescription").innerHTML =
    data["description"];
  headerContainer.querySelector(".logo").src =
    baseUrl + "/media/" + data["image"];

  data = await loadSales();
  let saleContainer = document.querySelector(".salesList");
  saleContainer.innerHTML = "";
  data.map((sale) => {
    let saleBox = document.createElement("div");
    saleBox.className = "sale";
    saleBox.innerHTML = `<img class="sale__fire" src="/img/main/SVG/fire.svg" alt="" />
    <div class="sale__text"></div>`;
    saleBox.querySelector(".sale__text").innerHTML = sale;
    saleContainer.appendChild(saleBox);
  });

  data = await loadAdvantages();
  let advantagesContainer = document.querySelector(".advantages__container");
  advantagesContainer.innerHTML = "";

  data.map((advantage) => {
    let advantageBlock = document.createElement("div");
    advantageBlock.className = "advantageBlock";
    advantageBlock.innerHTML = `
    <div class="advantageBlock__textContainer">
      <div class="advantageBlock__textContainer__title">
      </div>
      <div class="advantageBlock__textContainer__text">
      </div>
    </div>
    <div class="advantageBlock__imageContainer">
      <img
        src="/img/main/SVG/wheel.svg"
        alt=""
        class="advantageBlock__imageContainer__back"
      />
      <img
        src=""
        alt=""
        class="advantageBlock__imageContainer__img"
      />
    </div>`;

    advantageBlock.querySelector(
      ".advantageBlock__textContainer__title"
    ).innerHTML = advantage["title"];

    advantageBlock.querySelector(
      ".advantageBlock__textContainer__text"
    ).innerHTML = advantage["description"];

    advantageBlock.querySelector(".advantageBlock__imageContainer__img").src =
      baseUrl + "/media/" + advantage["main_photo"];
    advantagesContainer.appendChild(advantageBlock);
  });

  data = await loadVideo();
  document.querySelector(".advantages").querySelector(".youtube").src = data;

  data = await loadForm();
  console.log(data);

  let formContainer = document
    .querySelector(".contactWithUs")
    .querySelector(".formBlock");
  formContainer.innerHTML = "";
  data.names.map((field) => {
    if (field) {
      let formInput = document.createElement("input");
      formInput.type = "text";
      formInput.className = "formBlock__input";
      formInput.placeholder = field;
      formContainer.appendChild(formInput);
    }
  });

  document
    .querySelector(".contactWithUs__orderButton")
    .addEventListener("click", () => {
      sendEmail();
    });
}

async function loadHeader() {
  return await host.get("/header/").then((data) => {
    document.title = data.data.name + " - Коптисам";
    return data["data"];
  });
}

async function loadSales() {
  return await host.get("/promo/").then((data) => {
    document.title = data.data.name + " - Коптисам";
    return data["data"];
  });
}

async function loadAdvantages() {
  return await host.get("/advantages/").then((data) => {
    document.title = data.data.name + " - Коптисам";
    return data["data"];
  });
}

async function loadVideo() {
  return await host.get("/video/main/").then((data) => {
    document.title = data.data.name + " - Коптисам";
    return data["data"];
  });
}

async function loadForm() {
  return await host.get("/forms/get/").then((data) => {
    document.title = data.data.name + " - Коптисам";
    return data["data"];
  });
}

const sendEmail = async () => {
  let items = Array.from(document.querySelectorAll(".formBlock__input"));

  let dataSend = items.reduce(function (target, key, index) {
    target[key.placeholder] = key.value;
    return target;
  }, {});

  host
    .post("/mail/", {
      ...dataSend,
      Дата: new Date().toLocaleString(),
    })
    .then((data) => console.log("res", data));
};

loadData();
