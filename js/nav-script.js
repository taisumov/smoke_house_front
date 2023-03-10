(function navigationInit() {
  let url = `${window.location.href}`.split("/");
  let currentPage = url[url.indexOf("pages") + 1];
  let parent = document.querySelector(".modal__form");
  const baseUrl = "";
  const urlCurrent = baseUrl + "/api";

  let form = {};

  switch (currentPage) {
    case "catalog":
      document.querySelector("#catalog").classList.toggle("link--active");
      break;

    case "about":
      document.querySelector("#about").classList.toggle("link--active");
      break;

    case "deliver":
      document.querySelector("#delivery").classList.toggle("link--active");
      break;

    case "technology":
      document.querySelector("#technology").classList.toggle("link--active");
      break;

    case "reviews":
      document.querySelector("#reviews").classList.toggle("link--active");
      break;

    default:
      break;
  }

  const host = axios.create({
    baseURL: urlCurrent,
    headers: { "ngrok-skip-browser-warning": "qwerty" },
  });

  document.querySelector(".exit-icon").addEventListener("click", () => {
    document
      .querySelector(".modal-container")
      .classList.toggle("modal-container--hidden");
  });

  document.querySelector(".order").addEventListener("click", () => {
    document
      .querySelector(".modal-container")
      .classList.toggle("modal-container--hidden");
    document.querySelector("#checkbox1").checked = false;
  });

  document.querySelector(".catalog-more").addEventListener("click", () => {
    document
      .querySelector(".catalog-dropdown")
      .classList.toggle("catalog-dropdown--active");
    // }
  });

  document.querySelector(".close-categories").addEventListener("click", () => {
    document
      .querySelector(".catalog-dropdown")
      .classList.toggle("catalog-dropdown--active");
  });

  const createForm = (formInfo) => {
    form = formInfo;
    formInfo["names"].map((item) => {
      if (item) {
        let element = document.createElement("input");
        element.setAttribute("type", "text");
        element.setAttribute("placeholder", item);
        element.className = "modal-input";
        parent.appendChild(element);
      }
    });
  };

  const fetchForm = () => {
    host
      .get("/forms/get")
      .then((data) => {
        createForm(data.data);
      })
      .catch((err) => console.log(err));
  };

  fetchForm();

  const sendEmail = async () => {
    let items = Array.from(document.querySelectorAll(".modal-input"));

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

  document
    .querySelector(".order-container__btn")
    .addEventListener("click", () => {
      sendEmail(form);
      document
        .querySelector(".modal-container")
        .classList.toggle("modal-container--hidden");
    });

  let footer = document.querySelector(".footer");
  host
    .get("/footer")
    .then((data) => {
      let emailContainer = [
        ...footer.querySelectorAll(".footer-item_content"),
      ][1];
      emailContainer.innerHTML = "";
      data.data.emails.map((email) => {
        let emailElement = document.createElement("div");
        emailElement.innerHTML = `<div class="item">${email.value}</div>`;
        emailContainer.appendChild(emailElement);
      });

      let phonesContainer_first = [
        ...footer.querySelectorAll(".footer-item"),
      ][2];
      let phonesContainer_second = [
        ...footer.querySelectorAll(".footer-item"),
      ][3];
      phonesContainer_first.innerHTML = "";
      phonesContainer_second.innerHTML = "";
      data.data.phones.map((phone, index) => {
        let phoneContainer = document.createElement("div");
        phoneContainer.innerHTML = `<p class="footer-item_title">${phone.name}:</p>
        <div class="footer-item_content">
          <div class="item">${phone.value}</div>
        </div>`;
        index % 2 === 0
          ? phonesContainer_first.appendChild(phoneContainer)
          : phonesContainer_second.appendChild(phoneContainer);
      });
    })
    .catch((err) => console.log(err));
})();
