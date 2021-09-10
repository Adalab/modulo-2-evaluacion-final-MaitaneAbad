"use strict";const inputSearch=document.querySelector(".js-inputSearch"),inputBtnSearch=document.querySelector(".js-inputBtnSearch"),inputBtnReset=document.querySelector(".js-inputBtnReset"),seriesListHTML=document.querySelector(".js-seriesList"),favoriteList=document.querySelector(".js-seriesFavourite");let show=[],favorite=[];function getAPI(){return"//api.tvmaze.com/search/shows?q="+inputSearch.value}function searchSeries(){let e=getAPI();fetch(e).then(e=>e.json()).then(e=>{show=e,console.log(show),textListHTML()})}function textListHTML(){seriesListHTML.innerHTML="";for(const e of show){const t=e.show.name,s=e.show.image,i=e.show.id,n="https://via.placeholder.com/210x295/ffffff/666666/?text=TV%27";if(null===s){const e=`<li class="cover js-seriesTitle" id=${i}><section class="seriesSection"><h2 class="titleSeries">${t}</h2><img class="img js-seriesImg" src=${n} alt${t}></section></li>`;seriesListHTML.innerHTML+=e}else{const s=`<li class="cover js-seriesTitle" id=${i}><section class="seriesSection"><h2 class="titleSeries">${t}</h2><img class="img js-seriesImg" src=${e.show.image.medium} alt${t}></section></li>`;seriesListHTML.innerHTML+=s}}listenLiSeries()}function listenLiSeries(){const e=document.querySelectorAll(".js-seriesTitle");for(const t of e)t.addEventListener("click",handleSeries)}function paintFavouriteSeries(){favoriteList.innerHTML="";for(const e of favorite){const t=e.show.name,s=e.show.image,i=e.show.id,n="https://via.placeholder.com/210x295/ffffff/666666/?text=TV%27";if(null===s){const e=`<li class="cover " id=${i}><section class="seriesSectionFav"><h2 class="titleSeriesFav">${t}</h2><img class="img js-seriesImg" src=${n} alt${t}><input type="button" class="btnImgList js-ButtonResetFav" value='X'></section></li>`;favoriteList.innerHTML+=e}else{const s=`<li class="cover " id=${i}><section class="seriesSectionFav"><h2 class="titleSeriesFav">${t}</h2><img class="img js-seriesImg" src=${e.show.image.medium} alt${t}><input type="button" class="btnImgList " value='X'></section></li>`;favoriteList.innerHTML+=s}}console.log(favorite)}function handleSeries(e){const t=parseInt(e.currentTarget.id),s=show.find(e=>e.show.id===t),i=favorite.findIndex(e=>e.show.id===t);-1===i?favorite.push(s):favorite.splice(i,1),paintFavouriteSeries(),setLocalStorage()}function handleClickSearch(e){e.preventDefault,getAPI(),searchSeries()}function handleClickReset(e){e.preventDefault(),favorite=[],paintFavouriteSeries()}function setLocalStorage(){const e=JSON.stringify(favorite);localStorage.setItem("favorite",e)}function getLocalStorage(){let e=localStorage.getItem("favorite");if(null===e)handleClickSearch();else{const t=JSON.parse(e);favorite=t,paintFavouriteSeries()}}getLocalStorage(),inputBtnSearch.addEventListener("click",handleClickSearch),inputBtnReset.addEventListener("click",handleClickReset);