async function loadData() {
  const baseUrl = "";
  const url = baseUrl + "/api";

  const host = axios.create({
    baseURL: url,
    headers: { "ngrok-skip-browser-warning": `qwerty` },
  });

  await host.get("/feedback/").then((data) => {

    let imageDOM = document.querySelector(".reviews__screenshots");
    imageDOM.innerHTML = "";

    data["data"]["photo"].map((img) => {
      let image = document.createElement("div");
      image.className = "screenshotContainer";
      image.innerHTML = `<div class="screenshotContainer__imgContainer">
      <img
        src="/img/reviews/screen.jpg"
        alt=""
        class="screenshotContainer__imgContainer__img"
      />
    </div>`;
      image.querySelector(".screenshotContainer__imgContainer__img").src =
        baseUrl + "/media/" + img;
      imageDOM.appendChild(image);
    });

    let videoDOM = document
      .querySelector(".videoSwiper")
      .querySelector(".swiper-wrapper");
    videoDOM.innerHTML = "";

    data["data"]["video"].map((video) => {
      let vid = document.createElement("div");
      vid.className = "swiper-slide";
      vid.innerHTML = `<iframe
        class="youtube"
        src="https://www.youtube.com/embed/qOO7eK4JlqA"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>`;
      vid.querySelector("iframe").src = video;

      videoDOM.appendChild(vid);
    });

    let textDOM = document.querySelector(".reviews__textReview");

    for (let index = 0; index < data["data"]["text"].length; index += 2) {
      let textBlock = document.createElement("div");
      textBlock.className = "textReview__block";
      textBlock.innerHTML = `<div class="textReview__block__hearts">
<img src="/img/reviews/SVG/heart.svg" alt="" class="heart" />
<img src="/img/reviews/SVG/heart.svg" alt="" class="heart" />
</div>`;

      let txtContainer = document.createElement("div");
      txtContainer.className = "textReview__block__left";
      txtContainer.innerHTML = `<div class="textBlock--left">
        <img
          src="/img/reviews/SVG/star.svg"
          alt=""
          class="textBlock--left__star"
        />
        <div class="text">
        </div>
      </div>`;
      txtContainer.querySelector(".text").innerHTML =
        data["data"]["text"][index];
      textBlock.appendChild(txtContainer);

      if (data["data"]["text"][index + 1]) {
        txtContainer = document.createElement("div");
        txtContainer.className = "textReview__block__right";
        txtContainer.innerHTML = `<div class="textBlock--right">
        <div class="text">
        </div>
      </div>`;
        txtContainer.querySelector(".text").innerHTML =
          data["data"]["text"][index + 1];
        textBlock.appendChild(txtContainer);
      }

      textDOM.appendChild(textBlock);
    }
  });
}

loadData();
