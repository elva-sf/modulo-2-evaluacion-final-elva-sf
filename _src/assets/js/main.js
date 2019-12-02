'use strict';

let buttonElement = document.querySelector(".js-button");
let inputElement = document.querySelector(".js-input");
let searchContainer = document.querySelector(".js-searchContainer");
let favContainer = document.querySelector(".js-favContainer");
let series;
let searchSeries;
let showSeries;

// Search
searchSeries = function (ev) {
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

//Pintar Series
showSeries = function (series) {
    /* console.log(series); */
    let ulEl, liEl, imgEl, h3El, textNode;

    for (let serie of series) {
        ulEl = document.createElement("ul");
        ulEl.classList.add("js-series");
        /* console.log(serie.show.image); */

        liEl = document.createElement("li");
        liEl.classList.add("js-li")

        imgEl = document.createElement("img");
        imgEl.classList.add("js-img");
        if (serie.show.image !== null) {
            imgEl.src = serie.show.image.medium;
        } else {
            imgEl.src = ("https://via.placeholder.com/210x295/ffffff/666666/?text = TV");
        }
        /* console.log(imgEl); */


        h3El = document.createElement("h3");
        h3El.classList.add("js-h3");

        textNode = document.createTextNode(`${serie.show.name}`);
        /* console.log(textNode); */

        h3El.appendChild(textNode);
        liEl.appendChild(imgEl);
        liEl.appendChild(h3El);
        ulEl.appendChild(liEl);
        /* console.log(ulEl); */
        searchContainer.appendChild(ulEl);
    }
}

//Escuchar
buttonElement.addEventListener("click", searchSeries);