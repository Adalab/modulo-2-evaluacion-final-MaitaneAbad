'use strict';
// coger input del HTML
const inputSearch = document.querySelector('.js-inputSearch');
// botón del HTML
const inputBtnSearch = document.querySelector('.js-inputBtnSearch');
// Donde pintar mis series en el HTML
const seriesListHTML = document.querySelector('.js-seriesList');
//Traigo la sección donde se mostrara las series
//Array donde guardaré las series buscadas
let data = [];

let favorite = [];

//Función donde recojo la url más lo que busco en el input
function getAPI() {
  let user = inputSearch.value;
  let api = '//api.tvmaze.com/search/shows?q=' + user;
  return api;
}

// función donde recojo lo que me devuelve la API y quiero pintar
function searchSeries() {
  let api = getAPI();
  fetch(api)
    .then((response) => response.json())
    .then((dataApi) => {
      data = dataApi;
      console.log(data);
      textListHTML();
    });
}
function textListHTML() {
  seriesListHTML.innerHTML = '';
  for (const seriesData of data) {
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
function listenLiSeries() {
  const listSeries = document.querySelectorAll('.js-seriesTitle');
  for (const series of listSeries) {
    series.addEventListener('click', handleSeries);
  }
}
function isFavSeries(data) {
  const favoriteSerie = favorite.find((fav) => {
    return fav.id === data.id;
  });
  //si está o no está en favoritos
  if (favoriteSerie === undefined) {
    //false cuando NO está favoritos
    return false;
  } else {
    //true cuando SI está favoritos
    return true;
  }
}
isFavSeries();
function handleSeries(ev) {
  //debugger;
  //obtengo id de la serie
  const clickSerie = ev.currentTarget.id;
  // busco la serie en el array de busqueda de series
  const objectClick = data.find((serie) => {
    return serie.id === clickSerie;
  });
  const favoriteSeries = favorite.findIndex((favorite) => {
    return favorite.id === clickSerie;
  });
  // si la serie no está en fav, me devuelve -1
  if (favoriteSeries === -1) {
    favorite.push(objectClick);
  } else {
    favorite.splice(favoriteSeries, 1);
  }
}

function handleClickSearch(ev) {
  ev.preventDefault();
  getAPI();
  searchSeries();
}

inputBtnSearch.addEventListener('click', handleClickSearch);
