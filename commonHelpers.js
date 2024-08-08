import{a as u,S as w,i as d}from"./assets/vendor-D1eTGYtO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();u.defaults.baseURL="https://pixabay.com/api/";async function g({q:r,page:o,per_page:i}){const n="45176158-e3d3b26982233790558f60971",e=new URLSearchParams({key:n,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:i});try{return await u.get("",{params:e}).then(({data:t})=>t).catch(t=>console.log(t))}catch(t){console.error(t)}}function m(r){const o=document.querySelector(".js-gallery");let i=r.map(({webformatURL:e,largeImageURL:t,tags:l,likes:p,views:y,comments:b,downloads:L})=>`<li class = "list-item">
  <a href="${t}">
    <div class = "preview-photo"><img src="${e}" alt="${l}"></div>
     <ul class="img-desc">
    <li>
      <h2>Likes</h2>
      <p>${p}</p>
    </li>
    <li>
      <h2>Views</h2>
      <p>${y}</p>
    </li>
    <li>
      <h2>Comments</h2>
      <p>${b}</p>
    </li>
    <li>
      <h2>Downloads</h2>
      <p>${L}</p>
    </li>
  </ul>
  </a>

</li>`).join("");o.insertAdjacentHTML("beforeend",i),new w(".gallery  a",{captions:!0,captionsDelay:250,captionsData:"alt"}).refresh()}function v(){const r=document.querySelector(".gallery");r.innerHTML=""}function c(r){const o=document.querySelector(".js-loader");o&&(r?o.style.display="inline-block":o.style.display="none")}class E{constructor(o,i){this.buttonEL=o,this.hiddenClass=i}hide(){this.buttonEL.classList.add(this.hiddenClass)}show(){this.buttonEL.classList.remove(this.hiddenClass)}disable(){this.buttonEL.disabled=!0}enable(){this.buttonEL.disabled=!1}}const f=document.querySelector(".btn"),s=new E(f,"is-hidden");s.hide();const a={q:"",page:1,per_page:15,maxPage:0},P=document.querySelector(".js-form");P.addEventListener("submit",C);async function C(r){r.preventDefault(),v();const o=r.currentTarget;if(a.q=o.elements.request.value.toLowerCase().trim(),!a.q){s.hide(),d.error({message:"Please enter the data in the input field",position:"topRight",messageColor:"#ffffff",backgroundColor:"#EF4040"}),c(!1);return}a.page=1,s.show(),s.disable();try{c(!0);const{total:i,hits:n}=await g(a);if(a.maxPage=Math.ceil(i/a.per_page),a.maxPage>1?(s.enable(),f.addEventListener("click",h)):s.hide(),!n.length){s.hide(),d.error({message:"Sorry, there was an error fetching the images. Please try again later!",position:"topRight",messageColor:"#ffffff",backgroundColor:"#EF4040"});return}m(n)}catch{s.hide(),d.error({message:"Sorry, there are no images matching your search",position:"topRight",messageColor:"#ffffff",backgroundColor:"#EF4040"})}finally{c(!1),a.page===a.maxPage?(s.hide(),f.removeEventListener("click",h)):s.enable(),o.reset()}}async function h(){s.disable(),a.page+=1;try{c(!0);const{hits:r}=await g(a);m(r);let i=document.querySelector(".list-item").getBoundingClientRect();window.scrollBy({top:i.height*2,left:i.width,behavior:"smooth"})}catch(r){console.log(r)}finally{c(!1),a.page>=a.maxPage?(s.hide(),d.info({message:"You have reached the end of search results.",position:"topRight",messageColor:"#ffffff",backgroundColor:"#4e75ff"}),s.hide(),f.removeEventListener("click",h)):s.enable()}}
//# sourceMappingURL=commonHelpers.js.map
