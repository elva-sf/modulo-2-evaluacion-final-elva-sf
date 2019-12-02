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
            console.log(series);
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
showSeries = function () {

}

//Escuchar
buttonElement.addEventListener("click", searchSeries);