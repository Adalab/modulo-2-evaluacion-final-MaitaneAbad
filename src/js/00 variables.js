'use strict';
// coger input del HTML
const inputSearch = document.querySelector('.js-inputSearch');
// botón del HTML
const inputBtnSearch = document.querySelector('.js-inputBtnSearch');
// botón reset HTML
const inputBtnReset = document.querySelector('.js-inputBtnReset');
// Donde pintar mis series en el HTML
const seriesListHTML = document.querySelector('.js-seriesList');
// Traigo la sección donde se mostrara las series fav
const favoriteList = document.querySelector('.js-seriesFavourite');
// traigo el form para quitarle la accion automatica predeterminada
const form = document.querySelector('.js-form');

// Array donde guardaré las series buscadas
let show = [];
let favorite = [];
