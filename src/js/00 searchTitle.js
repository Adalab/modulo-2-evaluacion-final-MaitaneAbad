'use strict';
// coger input del HTML
const inputSearch = document.querySelector('.js-inputSearch');
// botón del HTML
const inputBtnSearch = document.querySelector('.js-inputBtnSearch');
//botón reset HTML
const inputBtnReset = document.querySelector('.js-inputBtnReset');
// Donde pintar mis series en el HTML
const seriesListHTML = document.querySelector('.js-seriesList');
//Traigo la sección donde se mostrara las series fav
const favoriteList = document.querySelector('.js-seriesFavourite');
// Boton Reset mini de la lista de fav
//Array donde guardaré las series buscadas
let show = [];
let favorite = [];

//Función donde recojo la url más lo que busco en el input
function getAPI() {
  let user = inputSearch.value;
  let api = '//api.tvmaze.com/search/shows?q=' + user;
  return api;
}

// función donde recojo lo que me devuelve la API y quiero pintar las series encontradas
function searchSeries() {
  let api = getAPI();
  fetch(api)
    .then((response) => response.json())
    .then((dataApi) => {
      show = dataApi;
      console.log(show);
      textListHTML();
    });
}
function textListHTML() {
  seriesListHTML.innerHTML = '';
  for (const seriesData of show) {
    const title = seriesData.show.name;
    const imgIsNull = seriesData.show.image;
    const id = seriesData.show.id;
    const imgIsNullURL =
      'https://via.placeholder.com/210x295/ffffff/666666/?text=TV%27';
    if (imgIsNull === null) {
      const htmlSeries = `<li class="cover js-seriesTitle" id=${id}><section class="seriesSection"><h2 class="titleSeries">${title}</h2><img class="img js-seriesImg" src=${imgIsNullURL} alt${title}></section></li>`;
      seriesListHTML.innerHTML += htmlSeries;
    } else {
      const img = seriesData.show.image.medium;
      const htmlSeries = `<li class="cover js-seriesTitle" id=${id}><section class="seriesSection"><h2 class="titleSeries">${title}</h2><img class="img js-seriesImg" src=${img} alt${title}></section></li>`;
      seriesListHTML.innerHTML += htmlSeries;
    }
  }
  listenLiSeries();
}

//Funcion coge todos los li de la lista y los escucha cuando hagamos click sobre la foto
function listenLiSeries() {
  const listSeries = document.querySelectorAll('.js-seriesTitle');
  for (const series of listSeries) {
    series.addEventListener('click', handleSeries);
  }
}
// funcion que pinta las series favoritas en la columna de series favoritas
function paintFavouriteSeries() {
  favoriteList.innerHTML = '';
  for (const seriesData of favorite) {
    const title = seriesData.show.name;
    const imgIsNull = seriesData.show.image;
    const id = seriesData.show.id;
    const imgIsNullURL =
      'https://via.placeholder.com/210x295/ffffff/666666/?text=TV%27';
    if (imgIsNull === null) {
      const favShowSeries = `<li class="cover " id=${id}><section class="seriesSectionFav"><h2 class="titleSeriesFav">${title}</h2><img class="imgFav js-seriesImg" src=${imgIsNullURL} alt${title}><input type="button" class="btnImgList js-ButtonResetFav" value='X'></section></li>`;
      favoriteList.innerHTML += favShowSeries;
    } else {
      const img = seriesData.show.image.medium;
      const favShowSeries = `<li class="cover " id=${id}><section class="seriesSectionFav"><h2 class="titleSeriesFav">${title}</h2><img class="imgFav js-seriesImg" src=${img} alt${title}><input type="button" class="btnImgList " value='X'></section></li>`;
      favoriteList.innerHTML += favShowSeries;
    }
  }
  console.log(favorite);
}

// funcion para buscar el id series encontradas y poder meterlas en un array cuando las queramos pponer en favoritas
function handleSeries(ev) {
  //obtengo id de la serie
  const clickSerie = parseInt(ev.currentTarget.id);
  // busco la serie en el array de busqueda de series
  const objectClick = show.find((serie) => {
    return serie.show.id === clickSerie;
  });
  const favoriteSeries = favorite.findIndex((favorite) => {
    return favorite.show.id === clickSerie;
  });
  // si la serie no está en fav, me devuelve -1
  if (favoriteSeries === -1) {
    favorite.push(objectClick);
  } else {
    favorite.splice(favoriteSeries, 1);
  }
  paintFavouriteSeries();
  setLocalStorage();
}
// funcion general de busqueda de series
function handleClickSearch(ev) {
  ev.preventDefault;
  getAPI();
  searchSeries();
}
// La tecla enter
// funcion Manejadora del reset reset
function handleClickReset(ev) {
  ev.preventDefault();
  favorite = [];
  paintFavouriteSeries();
}
// Funcion Manejadora Reset Mini
/*function handleResetButtonFavList(ev) {
  const clickSerie = parseInt(ev.currentTarget.id);
  // busco la serie en el array de busqueda de series
  const objectClick = show.find((serie) => {
    return serie.show.id === clickSerie;
  });
  const favoriteSeries = favorite.findIndex((favorite) => {
    return favorite.show.id === clickSerie;
  });
  // si la serie no está en fav, me devuelve -1
  if (favoriteSeries === -1) {
    favorite.push(objectClick);
  } else {
    favorite.splice(favoriteSeries, 1);
  }
}*/
// LocalStorage
function setLocalStorage() {
  const stringFavSeries = JSON.stringify(favorite);
  localStorage.setItem('favorite', stringFavSeries);
}
function getLocalStorage() {
  let getLocalSeriesFav = localStorage.getItem('favorite');
  if (getLocalSeriesFav === null) {
    handleClickSearch();
  } else {
    const arrayFav = JSON.parse(getLocalSeriesFav);
    favorite = arrayFav;
    paintFavouriteSeries();
  }
}
//para que cuando recargue la pagina esté a 0
getLocalStorage();

inputBtnSearch.addEventListener('click', handleClickSearch);
inputBtnReset.addEventListener('click', handleClickReset);
//buttonResetListFav.addEventListener('click', handleResetButtonFavList);
