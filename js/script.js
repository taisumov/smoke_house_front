const baseUrl = "";
const url = baseUrl + "/api";

const host = axios.create({
  baseURL: url,
  headers: { "ngrok-skip-browser-warning": `qwerty` },
});

async function loadData() {
  // Шапка
  let data = await loadHeader();
  if (data) {
    let headerContainer = document
    .querySelector(".header")
    .querySelector(".headerContainer");

    headerContainer.innerHTML = 
    `
      <div class="headerContainer__logo">
        <img src="" alt="" class="logo" />
      </div>
      <div class="headerContainer__textContainer">
        <div class="headerTitle"></div>
        <div class="headerDescription"></div>
      </div>
    `

    headerContainer.querySelector(".headerTitle").innerHTML = data["title"];
    headerContainer.querySelector(".headerDescription").innerHTML = data["description"];
    headerContainer.querySelector(".logo").src = baseUrl + "/media/" + data["image"];
  }

  // Акции
  data = await loadSales();
  if (data) {
    document.querySelector('.sales').innerHTML = 
    `
      <div class="salesContainer">
        <div class="salesImage">
          <img src="/img/main/SVG/salesText.svg" alt="" />
        </div>
        <div class="salesList"></div>
      </div>
    `
    let saleContainer = document.querySelector(".salesList");
    saleContainer.innerHTML = "";
    data.map((sale) => {
      let saleBox = document.createElement("div");
      saleBox.className = "sale";
      saleBox.innerHTML = 
      `
        <img class="sale__fire" src="/img/main/SVG/fire.svg" alt="" />
        <div class="sale__text"></div>
      `
      saleBox.querySelector(".sale__text").innerHTML = sale;
      saleContainer.appendChild(saleBox);
    });
  }

  // Преимущества
  data = await loadAdvantages();
  if (data) {
    document.querySelector('.advantages').innerHTML = 
    `
      <div class="advantages__title">ПРЕИМУЩЕСТВА</div>
      <div class="advantages__container">
        <div class="advantageBlock">
          <div class="advantageBlock__textContainer">
            <div class="advantageBlock__textContainer__title"></div>
            <div class="advantageBlock__textContainer__text"></div>
          </div>
          <div class="advantageBlock__imageContainer">
            <img src="" alt="" class="advantageBlock__imageContainer__img"/>
          </div>
        </div>
        <div class="advantageBlock">
          <div class="advantageBlock__textContainer">
            <div class="advantageBlock__textContainer__title"></div>
            <div class="advantageBlock__textContainer__text"></div>
          </div>
          <div class="advantageBlock__imageContainer">
            <img src="" alt="" class="advantageBlock__imageContainer__img"/>
          </div>
        </div>
        <div class="advantageBlock">
          <div class="advantageBlock__textContainer">
            <div class="advantageBlock__textContainer__title"></div>
            <div class="advantageBlock__textContainer__text"></div>
          </div>
          <div class="advantageBlock__imageContainer">
            <img src="" alt="" class="advantageBlock__imageContainer__img"/>
          </div>
        </div>
      </div>
    `
    let advantagesContainer = document.querySelector(".advantages__container");
    advantagesContainer.innerHTML = "";

    data.map((advantage) => {
      let advantageBlock = document.createElement("div");
      advantageBlock.className = "advantageBlock";
      advantageBlock.innerHTML = 
      `
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
        </div>
      `
      advantageBlock.querySelector(".advantageBlock__textContainer__title").innerHTML = advantage["title"];
      advantageBlock.querySelector(".advantageBlock__textContainer__text").innerHTML = advantage["description"];
      advantageBlock.querySelector(".advantageBlock__imageContainer__img").src = baseUrl + "/media/" + advantage["main_photo"];
      advantagesContainer.appendChild(advantageBlock);
    });
  }

  // Видео
  data = await loadVideo();
  if (data?.names.length) {
    document.querySelector(".advantages").innerHTML = document.querySelector(".advantages").innerHTML + 
    `
      <iframe
            class="youtube"
            src="${data}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
      ></iframe>
    `
  }

  // Форма
  data = await loadForm();
  if (data) {
    document.querySelector('.contactWithUs').innerHTML = 
    `
      <div class="contactWithUs__title">ОБРАТНЫЙ ЗВОНОК</div>
        <div class="contactWithUs__formContainer">
          <div class="formBlock"></div>
        </div>
      <div class="contactWithUs__orderButton"><span>Заказать</span></div>
    `
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
}

async function loadHeader() {
  return await host.get("/header/").then((data) => {
    return data["data"];
  });
}

async function loadSales() {
  return await host.get("/promo/").then((data) => {
    console.log(data.data.promo)
    return data["data"]["promo"];
  });
}

async function loadAdvantages() {
  return await host.get("/advantages/").then((data) => {
    return data["data"]["advantages"];
  });
}

async function loadVideo() {
  return await host.get("/video/main/").then((data) => {
    return data["data"]["video"];
  });
}

async function loadForm() {
  return await host.get("/forms/get/").then((data) => {
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
