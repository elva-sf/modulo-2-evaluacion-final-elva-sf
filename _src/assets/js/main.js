'use strict';

let buttonElement = document.querySelector(".js-button");
let inputElement = document.querySelector(".js-input");
let searchContainer = document.querySelector(".js-searchContainer");
let favContainer = document.querySelector(".js-favContainer");
let series = [];
let searchSeries;
let showSeries;
let addFavorite;
let favoritesSeries = [];


// SEARCH:
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



// PINTAR SERIES:
showSeries = function (series) {
    searchContainer.innerHTML = "";
    /* console.log(series); */
    let ulEl, liEl, imgEl, h3El, textNode;

    for (let serie of series) {
        ulEl = document.createElement("ul");
        ulEl.classList.add("js-series");
        /* console.log(serie.show.image); */

        liEl = document.createElement("li");
        liEl.classList.add("js-li");

        imgEl = document.createElement("img");
        imgEl.classList.add("js-img");
        if (serie.show.image !== null) {
            imgEl.src = serie.show.image.medium;
        } else {
            imgEl.src = ("https://via.placeholder.com/210x295/ffffff/666666/?text = TV");
        }
        /* console.log(imgEl); */

        h3El = document.createElement("h3");
        h3El.classList.add("js-title");

        textNode = document.createTextNode(`${serie.show.name}`);
        /* console.log(textNode); */

        h3El.appendChild(textNode);
        liEl.appendChild(imgEl);
        liEl.appendChild(h3El);
        liEl.id = serie.show.id;
        ulEl.appendChild(liEl);
        /* console.log(ulEl); */
        searchContainer.appendChild(ulEl);

        // AÑADIR A FAVORITOS:
        // 1º Listen series(orejillas)
        liEl.addEventListener("click", addFavorite);
    }
}
// AÑADIR A FAVORITOS:
// 2º Añadir series
addFavorite = function (ev) {
    let idEl, favoriteIndex, isFavorite, newUl, newLi, newImg, newH3, newText;

    favoritesSeries.push(parseInt(ev.currentTarget.id));
    /*   console.log(ev.currentTarget.id, favoritesSeries) */
    for (let serie of series) {
        newUl = document.createElement("ul");
        newUl.classList.add("js-series");
        newLi = document.createElement("li");
        newLi.classList.add("js-li")
        newImg = document.createElement("img");
        newImg.classList.add("js-img");
        if (serie.show.image !== null) {
            newImg.src = serie.show.image.medium;
        } else {
            newImg.src = ("https://via.placeholder.com/210x295/ffffff/666666/?text = TV");
        }
        newH3 = document.createElement("h3");
        newH3.classList.add("js-title");
        newText = document.createTextNode(`${serie.show.name}`);
        idEl = serie.show.id;

        favoriteIndex = favoritesSeries.indexOf(idEl);
        isFavorite = favoriteIndex !== -1;
        /*  console.log("Fav:", favoritesSeries, "Id actual:", idEl, "¿Está:?", isFavorite); */

        if (isFavorite === true) {
            newLi.classList.add("js-selected");

        }



        console.log(favoritesSeries, idEl)
    }

    /*  showSeries();
     searchSeries(); */


    let favObject = {}, foundObject = false;

    for (let serie of series) {
        let idEl = serie.show.id;
    }
}
/*  for (let i = 0; i < favoritesSeries.length; i++) {
     //Si la encuentras...
     if (idNum === favoritesSeries[i].id) {
         ev.currentTarget.classList.toggle('js-selected');

         favoritesSeries.splice(i, 1);

         foundObject = true;
     }
 }

 //Si la ha encontrado antes: no la agrega y no entra dentro de esta condición.
 if (!foundObject) {

     ev.currentTarget.classList.toggle('js-selected');


   

     favoritesSeries.push(favObject);
     console.log("holita", favObject);
 }

}
*/

// ESCUCHAR BOTÓN:
buttonElement.addEventListener("click", searchSeries);