const searchGenerator = function (URL) {
  fetch(URL)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("errore");
      }
    })
    .then((data) => {
      let newdata = data.data;
      console.log(data);
      newdata.forEach((element) => {
        let riga = document.getElementById("riga");
        let col = document.createElement("div");
        col.classList.add(
          "col",
          "d-flex",
          "scompari",
          "justify-content-center"
        );
        col.innerHTML = `<div class="card w-100">
   <img src=${element.album.cover_medium} class="card-img-top" crossorigin="anonymous" alt="${element.title}">
   <div class="card-body d-flex flex-column justify-content-between">
     <h5 class="card-title">${element.title} </h5>
    <audio class="w-100"
        controls
        src=${element.preview}>
            <a href=${element.preview}>
                Download audio
            </a>
    </audio>
</figure>
   </div>
 </div>    `;

        riga.appendChild(col);
      });
    })
    .then(() => {
      const allImgCards = document.querySelectorAll(".card-img-top");
      const allCardsBody = document.querySelectorAll(".card-body");
      allImgCards.forEach((img, i) => {
        let context = draw(img);
        let allColors = getColors(context);
        let mostRecurrent = findMostRecurrentColor(allColors);
        let mostRecurrentHex = pad(mostRecurrent);
        console.log(mostRecurrentHex);
        allCardsBody[i].style.backgroundColor = "#" + mostRecurrentHex;
      });
    })

    .catch((err) => console.log(err));
};

const input = document.getElementById("basic-addon1");
input.addEventListener("click", function () {
  const ricerca1 = document.querySelector(".form-control");
  const ricerca2 = ricerca1.value;
  let scomparsa = document.querySelectorAll(".scompari");
  scomparsa.forEach((e) => {
    e.classList.add("d-none");
  });
  const URL = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${ricerca2}`;
  searchGenerator(URL);
});

console.log(document.querySelectorAll(".card img"));

const allImgCards = document.querySelectorAll(".card img");
allImgCards.forEach((img) => {
  img.addEventListener("click", function () {
    let scomparsa = document.querySelectorAll(".scompari");
    scomparsa.forEach((e) => {
      e.classList.add("d-none");
    });
    searchGenerator(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${img.alt}`
    );
  });
});
