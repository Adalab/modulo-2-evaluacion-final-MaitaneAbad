'use strict';
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
      paintListSeries();
    });
}
