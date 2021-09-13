'use strict';

// Añadimos info al LocalStorage
function setLocalStorage() {
  const stringFavSeries = JSON.stringify(favorite);
  localStorage.setItem('favorite', stringFavSeries);
}

//Buscamos info en el LocalStorage y si la hay
function getLocalStorage() {
  // obtengo lo que hay en el LocalStorage
  let getLocalSeriesFav = localStorage.getItem('favorite');
  // miramos si son validos los datos
  if (getLocalSeriesFav === null) {
    handleClickSearch();
  } else {
    const arrayFav = JSON.parse(getLocalSeriesFav);
    favorite = arrayFav;
    paintFavouriteSeries();
  }
}
//para que cuando recargue la pagina esté a -1
getLocalStorage();
