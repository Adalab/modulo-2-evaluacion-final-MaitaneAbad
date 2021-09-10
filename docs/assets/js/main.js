"use strict";const inputSearch=document.querySelector(".js-inputSearch"),inputBtnSearch=document.querySelector(".js-inputBtnSearch"),inputBtnReset=document.querySelector(".js-inputBtnReset"),seriesListHTML=document.querySelector(".js-seriesList"),favoriteList=document.querySelector(".js-seriesFavourite");let show=[],favorite=[];function getAPI(){return"//api.tvmaze.com/search/shows?q="+inputSearch.value}function searchSeries(){let e=getAPI();fetch(e).then(e=>e.json()).then(e=>{show=e,console.log(show),textListHTML()})}function textListHTML(){seriesListHTML.innerHTML="";for(const e of show){const s=e.show.name,t=e.show.image,i=e.show.id,n="https://via.placeholder.com/210x295/ffffff/666666/?text=TV%27";if(null===t){const e=`<li class="elementListSeries js-seriesTitle" id=${i}>\n          <div class="seriesDiv">\n            <h2 class="titleSeries">${s}</h2>\n            <img class="img  js-seriesImg" src=${n} alt${s}>\n          </div>\n        </li>`;seriesListHTML.innerHTML+=e}else{const t=`<li class="elementListSeries js-seriesTitle" id=${i}>\n          <div class="seriesDiv js-seriesDivClick">\n            <h2 class="titleSeries">${s}</h2>\n            <img class="img js-seriesImg" src=${e.show.image.medium} alt${s}>\n          </div>\n        </li>`;seriesListHTML.innerHTML+=t}inputSearch.reset()}}function listenLiSeries(){const e=document.querySelectorAll(".js-seriesTitle");for(const s of e)s.addEventListener("click",handleSeries)}function paintFavouriteSeries(){favoriteList.innerHTML="";for(const e of favorite){const s=e.show.name,t=e.show.image,i=e.show.id,n="https://via.placeholder.com/210x295/ffffff/666666/?text=TV%27";if(null===t){const e=`<li class="elementListSeriesFav" id=${i}>\n        <div class="seriesDivFav js-seriesDivClick">\n          <h2 class="titleSeriesFav">${s}</h2>\n          <img class="imgFav  js-seriesImg" src=${n} alt${s}>\n          <form class=""js-formFavReset">\n          <input type="button" class="buttonResetFav js-ButtonResetFav" value='X'></form>\n        </div>\n      </li>`;favoriteList.innerHTML+=e}else{const t=`<li class="elementListSeriesFav" id=${i}>\n         <div class="seriesDivFav js-seriesDivClick">\n           <h2 class="titleSeriesFav">${s}</h2>\n           <img class="imgFav js-seriesImg" src=${e.show.image.medium} alt${s}>\n           <form class="js-formfavReset">\n           <input type="button" class="buttonResetFav" value='X'>\n           </form>\n         </div>\n       </li>`;favoriteList.innerHTML+=t}}console.log(favorite)}function handleSeries(e){const s=parseInt(e.currentTarget.id),t=show.find(e=>e.show.id===s),i=favorite.findIndex(e=>e.show.id===s);-1===i?favorite.push(t):favorite.splice(i,1),paintFavouriteSeries(),setLocalStorage()}function handleClickSearch(e){e.preventDefault,getAPI(),searchSeries()}function handleClickReset(){favorite=[],paintFavouriteSeries()}function setLocalStorage(){const e=JSON.stringify(favorite);localStorage.setItem("favorite",e)}function getLocalStorage(){let e=localStorage.getItem("favorite");if(null===e)handleClickSearch();else{const s=JSON.parse(e);favorite=s,paintFavouriteSeries()}}getLocalStorage(),inputBtnSearch.addEventListener("click",handleClickSearch),inputBtnReset.addEventListener("click",handleClickReset);