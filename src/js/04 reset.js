'use strict';
// funcion Manejadora del reset
function handleClickReset(ev) {
  ev.preventDefault();
  favorite = [];
  paintFavouriteSeries();
  setLocalStorage();
}

function handleMiniClickReset(ev) {
  console.log(ev.currentTarget);
  const clickSerieFav = parseInt(ev.currentTarget.id);
  const favoriteSeries = favorite.findIndex((fav) => {
    return fav.show.id === clickSerieFav;
  });
  // Quitar de array de favoritos el cliclado

  if (favoriteSeries !== -1) {
    favorite.splice(favoriteSeries, 1);
  }
  console.log(favoriteSeries);
  paintFavouriteSeries();
  setLocalStorage();
}
function listenMiniClose() {
  const listMiniReset = document.querySelectorAll('.js-miniButtonReset');
  for (let miniReset of listMiniReset) {
    miniReset.addEventListener('click', handleMiniClickReset);
  }
}

inputBtnReset.addEventListener('click', handleClickReset);
