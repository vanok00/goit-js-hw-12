import{S as f,i as p}from"./assets/vendor-8c59ed88.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const m=document.querySelector(".list"),y=new f(".list  a",{captionsData:"alt"});function g(o){const t=o.map(({webformatURL:s,largeImageURL:i,tags:e,likes:r,views:n,comments:d,downloads:h})=>`<li class = "list-item">
  <a href="${i}">
    <div class = "preview-photo"><img src="${s}" alt="${e}"></div>
     <ul class="img-desc">
    <li>
      <h2>Likes</h2>
      <p>${r}</p>
    </li>
    <li>
      <h2>Views</h2>
      <p>${n}</p>
    </li>
    <li>
      <h2>Comments</h2>
      <p>${d}</p>
    </li>
    <li>
      <h2>Downloads</h2>
      <p>${h}</p>
    </li>
  </ul>
  </a>

</li>`).join("");m.innerHTML=t,y.refresh()}function L(o){const t="https://pixabay.com/api/",s="45176158-e3d3b26982233790558f60971",i=new URLSearchParams({key:s,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${t}?${i.toString()}`,{headers:{Accept:"application/json"}}).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()})}const b={searchForm:document.querySelector(".search-form"),articlesContainer:document.querySelector(".articles"),loadMoreBtn:document.querySelector('[data-action="load-more"]'),spinner:document.querySelector(".spinner")};class w{constructor(t,s){this.buttonEL=t,this.hiddenClass=s}hide(){this.buttonEL.classList.add(this.hiddenClass)}show(){this.buttonEL.classList.remove(this.hiddenClass)}disable(){this.buttonEL.disabled=!0}enable(){this.buttonEL.disabled=!1}}const S=document.querySelector(".list"),c=document.querySelector(".loader"),l=document.querySelector(".js-form");c.style.display="none";l.addEventListener("submit",q);function q(o){o.preventDefault(),S.innerHTML="";const t=o.target.request.value.trim().toLowerCase();t&&(a(c,!0),L(t).then(s=>{if(s.hits.length===0)throw new Error(response.status);a(c,!1),g(s.hits)}).catch(s=>{a(c,!1),E()}).finally(l.reset()))}function E(o){return p.show({message:"Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topRight",closeOnClick:!0})}function a(o,t){t?o.style.display="block":o.style.display="none"}const u=new w(b.loadMoreBtn,"is-hidden");console.log(u);u.show();
//# sourceMappingURL=commonHelpers.js.map
