"use strict";

let buttonElement = document.querySelector(".js-button");
let inputElement = document.querySelector(".js-input");
let searchContainer = document.querySelector(".js-searchContainer");
let favContainer = document.querySelector(".js-favContainer");
let resetBtn = document.querySelector(".js-reset");
let series = [];
let searchSeries;
let showSeries;
let showFavorites;
let addFavorites;
let favoritesSeries = [];
let addToLs;
let getToLs;
let reset;
let closeFav;
let listenClose;

//LOCAL STORAGE:
addToLs = function() {
  localStorage.setItem("favorite", JSON.stringify(favoritesSeries));
};

getToLs = function() {
  favoritesSeries = JSON.parse(localStorage.getItem("favorite")) || [];
};
getToLs();

// SEARCH:
searchSeries = function(ev) {
  getToLs();

  ev.preventDefault();
  fetch(`http://api.tvmaze.com/search/shows?q=${inputElement.value}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(serverData) {
      series = serverData;

      if (series.length > 0) {
        showSeries(series);
      } else {
        console.log("No hemos encontrado datos");
      }
    })
    .catch(function(error) {
      console.log("Error al traer los datos del servidor", error);
    });
};

// PINTAR SERIES:
showSeries = function(series) {
  let ulEl, liEl, imgEl, h3El, textNode;
  searchContainer.innerHTML = "";

  ulEl = document.createElement("ul");
  ulEl.classList.add("js-series");
  for (let serie of series) {
    liEl = document.createElement("li");
    liEl.classList.add("js-li");

    for (let i = 0; i < favoritesSeries.length; i++) {
      if (`${serie.show.id}` === favoritesSeries[i].id) {
        liEl.classList.toggle("js-selected");
      }
    }

    imgEl = document.createElement("img");
    imgEl.classList.add("js-img");
    if (serie.show.image !== null) {
      imgEl.src = serie.show.image.medium;
    } else {
      imgEl.src =
        "https://via.placeholder.com/210x295/ffffff/666666/?text = TV";
    }

    h3El = document.createElement("h3");
    h3El.classList.add("js-title");

    textNode = document.createTextNode(`${serie.show.name}`);
    liEl.id = serie.show.id;
    liEl.setAttribute("serieId", serie.show.id);
    h3El.appendChild(textNode);

    liEl.appendChild(imgEl);
    liEl.appendChild(h3El);
    liEl.addEventListener("click", addFavorites);
    liEl.addEventListener("click", showFavorites);
    ulEl.appendChild(liEl);
  }
  searchContainer.appendChild(ulEl);
};

//PINTAR FAVORITOS:
showFavorites = function() {
  let newUl, newLi, newImg, newH3, newTextNode, closeBtn, closeTextNode;

  favContainer.innerHTML = "";

  newUl = document.createElement("ul");
  newUl.classList.add("js-favorites");
  for (let favorite of favoritesSeries) {
    newLi = document.createElement("li");
    newLi.classList.add("js-NewLi");

    newImg = document.createElement("img");
    newImg.classList.add("js-newImg");
    if (favorite.img !== null) {
      newImg.src = favorite.img;
    } else {
      newImg.src =
        "https://via.placeholder.com/210x295/ffffff/666666/?text = TV";
    }

    newH3 = document.createElement("h3");
    newH3.classList.add("js-NewTitle");

    newTextNode = document.createTextNode(`${favorite.title}`);
    newLi.id = favorite.id;

    closeBtn = document.createElement("button");
    closeBtn.classList.add("js-closeBtn");
    closeBtn.setAttribute("serieId", favorite.id);
    closeTextNode = document.createTextNode("X");
    closeBtn.appendChild(closeTextNode);

    newH3.appendChild(newTextNode);
    newLi.appendChild(newImg);
    newLi.appendChild(newH3);
    newLi.appendChild(closeBtn);
    newUl.appendChild(newLi);
    closeBtn.addEventListener("click", addFavorites);
  }
  favContainer.appendChild(newUl);
};

//AÑADIR A LISTA DE FAVORITOS:
addFavorites = function(ev) {
  let favObject = {},
    foundObj = false,
    idEl;

  idEl = ev.currentTarget.getAttribute("serieId");

  for (let i = 0; i < favoritesSeries.length; i++) {
    if (idEl === favoritesSeries[i].id) {
      favoritesSeries.splice(i, 1);
      foundObj = true;
    }
  }

  if (!foundObj) {
    ev.currentTarget.classList.toggle("js-selected");
    favObject["id"] = ev.currentTarget.getAttribute("serieId");
    favObject["img"] = ev.currentTarget.querySelector(".js-img").src;
    favObject["title"] = ev.currentTarget.querySelector(".js-title").innerHTML;
    favoritesSeries.push(favObject);
  }
  showSeries(series);
  showFavorites();
  addToLs();
};

//RESET:
reset = function() {
  favoritesSeries = [];
  series = [];
  showSeries(series);
  showFavorites();
  addToLs();
};

showFavorites();

// ESCUCHAR BOTONES GENERALES:
buttonElement.addEventListener("click", searchSeries);
resetBtn.addEventListener("click", reset);
