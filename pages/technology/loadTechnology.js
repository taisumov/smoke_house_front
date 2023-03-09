async function loadData() {
  const baseUrl = "";
  const url = baseUrl + "/api";

  const host = axios.create({
    baseURL: url,
    headers: { "ngrok-skip-browser-warning": `qwerty` },
  });

  await host.get("/tech/").then((data) => {
    console.log(data["data"]["techs"]);

    let container = document.querySelector(".advantages__container");
    container.innerHTML = "";
    data["data"]["techs"].map((tech) => {
      let techElement = document.createElement("div");
      techElement.className = "advantageBlock";
      techElement.innerHTML = `<div class="advantageBlock__textContainer">
      <div class="advantageBlock__textContainer__title">
        <span></span>
        <img
          src="/img/technology/SVG/wheel.svg"
          alt=""
          class="advantageBlock__textContainer__title__img"
        />
      </div>
      <div class="advantageBlock__textContainer__text">
        
      </div>
    </div>
    <div class="advantageBlock__imageContainer">
      <img
        src=""
        alt=""
        class="advantageBlock__imageContainer__img"
      />
    </div>`;
      let title = techElement
        .querySelector(".advantageBlock__textContainer__title")
        .querySelector("span");
      let description = techElement.querySelector(
        ".advantageBlock__textContainer__text"
      );
      let image = techElement.querySelector(
        ".advantageBlock__imageContainer__img"
      );

      title.innerHTML = tech.title;
      description.innerHTML = tech.description;
      image.src = baseUrl + "/media/" + tech.src;
      console.log(image.src);

      container.appendChild(techElement);
    });
  });
}

loadData();
