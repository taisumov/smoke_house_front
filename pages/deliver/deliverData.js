function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

async function loadData() {
  const baseUrl = "";
  const url = baseUrl + "/api";

  const host = axios.create({
    baseURL: url,
    headers: { "ngrok-skip-browser-warning": `qwerty` },
  });

  await host.get("/delivery/").then((data) => {
    document.title = data.data.name + " - Коптисам";
    shuffle(data["data"]);
    console.log(data["data"]);

    let deliversContainer = document.querySelector(
      ".deliverContainer__delivers"
    );

    data["data"].map((item) => {
      let deliverBlock = document.createElement("div");
      deliverBlock.className = "deliverBlock";
      deliverBlock.innerHTML = `<div class="deliverBlock__circle"></div>
      <div class="deliverBlock__title">ДОСТАВКА</div>`;

      deliverBlock.querySelector(".deliverBlock__title").innerHTML =
        item.header;

      if (item.type == "text") {
        let mainBlock = document.createElement("div");
        mainBlock.className = "deliverBlock__mainText";
        mainBlock.innerHTML = item.value;
        deliverBlock.appendChild(mainBlock);
      }

      if (item.type == "image") {
        let mainBlock = document.createElement("img");
        mainBlock.className = "deliverBlock__image";
        mainBlock.src = baseUrl + "/media/" + item.value;
        deliverBlock.appendChild(mainBlock);
      }

      if (item.type == "video") {
        let mainBlock = document.createElement("div");
        mainBlock.className = "iframeContainer";
        mainBlock.innerHTML = `<iframe
        class="youtube"
        src="https://www.youtube.com/embed/qOO7eK4JlqA"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>`;
        mainBlock.querySelector(".youtube").src = item.value;
        deliverBlock.appendChild(mainBlock);
      }

      deliversContainer.appendChild(deliverBlock);
    });
  });
}

loadData();
