'use strict';

function handleFilter() {
  paintListSeries();
}

//Funcion que pinta las series buscadas cuando se cambia el input
function paintListSeries() {
  seriesListHTML.innerHTML = '';
  for (const seriesData of show) {
    const title = seriesData.show.name;
    const imgIsNull = seriesData.show.image;
    const id = seriesData.show.id;
    let htmlSeries = '';
    let img = '';
    const imgIsNullURL =
      'https://via.placeholder.com/210x295/ffffff/666666/?text=TV%27';

    const favoriteSeries = favorite.findIndex((favorite) => {
      return favorite.show.id === id;
    });

    if (imgIsNull === null) {
      img = imgIsNullURL;
    } else {
      img = seriesData.show.image.medium;
    }

    if (favoriteSeries !== -1) {
      htmlSeries = `<li class="elementListSeries js-seriesTitle" id=${id}>
              <div class="seriesDiv js-seriesDivClick seriesDivClick ">
                <h2 class="titleSeries">${title}</h2>
                <img class="img js-seriesImg" src=${img} alt${title}>
              </div>
            </li>`;
    } else {
      htmlSeries = `<li class="elementListSeries js-seriesTitle" id=${id}>
            <div class="seriesDiv js-seriesDivClick ">
              <h2 class="titleSeries">${title}</h2>
              <img class="img js-seriesImg" src=${img} alt${title}>
            </div>
          </li>`;
    }

    seriesListHTML.innerHTML += htmlSeries;
  }
  listenLiSeries();
  inputSearch.value = '';
}

//Funcion coge todos los li de la lista y los escucha cuando hagamos click sobre la foto
function listenLiSeries() {
  const listSeries = document.querySelectorAll('.js-seriesTitle');
  for (const series of listSeries) {
    series.addEventListener('click', handleSeries);
  }
}
// funcion para buscar el id series encontradas y poder meterlas en un array cuando las queramos poner en favoritas
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
  paintListSeries();
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
      const favShowSeries = `<li class="elementListSeriesFav" id=${id}>
          <div class="seriesDivFav js-seriesDivClick">
            <h2 class="titleSeriesFav">${title}</h2>
            <img class="imgFav  js-seriesImg" src=${imgIsNullURL} alt${title}>
            <form class=""js-formFavReset">
            <input type="button" id=${id} class="buttonResetFav js-miniButtonReset" value='X'>
            </form>
          </div>
        </li>`;
      favoriteList.innerHTML += favShowSeries;
    } else {
      const img = seriesData.show.image.medium;
      const favShowSeries = `<li class="elementListSeriesFav" id=${id}>
           <div class="seriesDivFav js-seriesDivClick">
             <h2 class="titleSeriesFav">${title}</h2>
             <img class="imgFav js-seriesImg" src=${img} alt${title}>
             <form class="js-formfavReset">
             <input type="button" id=${id} class="buttonResetFav js-miniButtonReset" value='X'>
             </form>
           </div>
         </li>`;
      favoriteList.innerHTML += favShowSeries;
    }
  }
  listenMiniClose();
}

// funcion general de busqueda de series
function handleClickSearch(ev) {
  ev.preventDefault();
  searchSeries();
}

inputSearch.addEventListener('keyUp', handleFilter);
inputBtnSearch.addEventListener('click', handleClickSearch);
