"use strict";const inputSearch=document.querySelector(".js-inputSearch"),inputBtnSearch=document.querySelector(".js-inputBtnSearch"),seriesListHTML=document.querySelector(".js-seriesList");let data=[];function getAPI(){return"//api.tvmaze.com/search/shows?q="+inputSearch.value}function searchSeries(){let e=getAPI();fetch(e).then(e=>e.json()).then(e=>{data=e,console.log(data),textListHTML()})}function textListHTML(){seriesListHTML.innerHTML="";for(const e of data){const t=e.show.name,s="https://via.placeholder.com/210x295/ffffff/666666/?text=TV%27";if(null===e.show.image){const e=`<li class="title js-seriesTitle"><h2>${t}</h2><img class="img js-seriesImg" src=${s}></li>`;seriesListHTML.innerHTML+=e}else{const s=`<li class="title js-seriesTitle"><h2>${t}</h2><img class="img js-seriesImg" src=${e.show.image.medium}></li>`;seriesListHTML.innerHTML+=s}}}function handleClickSearch(e){e.preventDefault(),getAPI(),searchSeries()}inputBtnSearch.addEventListener("click",handleClickSearch);