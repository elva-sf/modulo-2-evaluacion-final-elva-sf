'use strict';

let buttonElement = document.querySelector(".js-button");
let inputElement = document.querySelector(".js-input");
let searchContainer = document.querySelector(".js-searchContainer");
let favContainer = document.querySelector(".js-favContainer");
let series = [];
let searchSeries;
let showSeries;
let showFavorites;
let addFavorites;
let favoritesSeries = [];
let addToLs;
let getToLs;


addToLs = function () {
    localStorage.setItem("favorite", JSON.stringify(favoritesSeries));
}
getToLs = function () {

    favoritesSeries = JSON.parse(localStorage.getItem("favorite")) || [];
}
getToLs();

// SEARCH:
searchSeries = function (ev) {

    getToLs();


    ev.preventDefault();
    fetch(`http://api.tvmaze.com/search/shows?q=${inputElement.value}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (serverData) {
            series = serverData;
            /* console.log(series); */
            if (series.length > 0) {
                showSeries(series);
            } else {
                console.log("No hemos encontrado datos");
            }

        })
        .catch(function (error) {
            console.log("Error al traer los datos del servidor", error)
        })
};



// PINTAR SERIES:
showSeries = function (series) {
    let ulEl, liEl, imgEl, h3El, textNode;
    searchContainer.innerHTML = "";

    ulEl = document.createElement("div");
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
            imgEl.src = ("https://via.placeholder.com/210x295/ffffff/666666/?text = TV");
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
}
showFavorites = function () {
    let newUl, newLi, newImg, newH3, newTextNode;
    favContainer.innerHTML = "";

    newUl = document.createElement("div");
    newUl.classList.add("js-favorites");
    for (let favorite of favoritesSeries) {
        /* console.log("holii", favoritesSeries) */

        newLi = document.createElement("li");
        newLi.classList.add("js-NewLi");



        newImg = document.createElement("img");
        newImg.classList.add("js-newImg");
        if (favorite.img !== null) {
            newImg.src = favorite.img;
        } else {
            newImg.src = ("https://via.placeholder.com/210x295/ffffff/666666/?text = TV");
        }

        newH3 = document.createElement("h3");
        newH3.classList.add("js-NewTitle");

        newTextNode = document.createTextNode(`${favorite.title}`);
        newLi.id = favorite.id;
        newLi.setAttribute("serieId", favorite.id);
        newH3.appendChild(newTextNode);

        newLi.appendChild(newImg);
        newLi.appendChild(newH3);
        newUl.appendChild(newLi);
    }
    favContainer.appendChild(newUl);
}

addFavorites = function (ev) {
    let favObject = {}, foundObj = false, idEl;

    idEl = ev.currentTarget.getAttribute("serieId");
    console.log(idEl);

    for (let i = 0; i < favoritesSeries.length; i++) {

        if (idEl === favoritesSeries[i].id) {
            ev.currentTarget.classList.toggle('js-selected');
            favoritesSeries.splice(i, 1);
            foundObj = true;
        }
    }
    if (!foundObj) {
        ev.currentTarget.classList.toggle('js-selected');
        favObject["id"] = ev.currentTarget.getAttribute("serieId");
        favObject["img"] = ev.currentTarget.querySelector(".js-img").src;
        favObject["title"] = ev.currentTarget.querySelector(".js-title").innerHTML;
        favoritesSeries.push(favObject);
    }
    addToLs();
};

// ESCUCHAR BOTÓN:
buttonElement.addEventListener("click", searchSeries);
