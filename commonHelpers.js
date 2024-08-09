import{a as q,S as v,i as c}from"./assets/vendor-D1eTGYtO.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();async function m(s){try{return(await q.get("https://pixabay.com/api/",s)).data}catch(e){throw e}}const P=new v(".gallery a",{captions:!0,captionsDelay:250,captionsData:"alt"});function h(s){const e=document.querySelector(".js-gallery"),r=s.map(({webformatURL:a,largeImageURL:t,tags:o,likes:i,views:L,comments:w,downloads:S})=>`<li class = "list-item">
  <a href="${t}">
    <div class = "preview-photo"><img src="${a}" alt="${o}"></div>
     <ul class="img-desc">
    <li>
      <h2>Likes</h2>
      <p>${i}</p>
    </li>
    <li>
      <h2>Views</h2>
      <p>${L}</p>
    </li>
    <li>
      <h2>Comments</h2>
      <p>${w}</p>
    </li>
    <li>
      <h2>Downloads</h2>
      <p>${S}</p>
    </li>
  </ul>
  </a>

</li>`).join("");e.insertAdjacentHTML("beforeend",r),P.refresh()}function p(s){const e=document.querySelector(".js-loader");e&&(s?e.style.display="inline-block":e.style.display="none")}const f=document.querySelector(".form"),y=document.querySelector(".js-loader"),$=document.querySelector(".js-gallery"),l=document.querySelector(".loadmore-btn"),g="45176158-e3d3b26982233790558f60971";let d=1,n="",u=0,b=0;f.addEventListener("submit",j);l.addEventListener("click",E);async function j(s){if(s.preventDefault(),n=f.elements[0].value.toLowerCase().trim(),d=1,$.innerHTML="",n===""||n.length<2){c.error({message:"Please enter the data in the input field",position:"topRight",messageColor:"#ffffff",backgroundColor:"#EF4040"}),l.style.display="none",p(!1);return}const e={params:{key:g,q:n,image_type:"photo",orientation:"horizontal",page:d,per_page:15,maxPage:0}};try{p(!0);const r=await m(e);y.style.display="none",r.hits.length===0?(c.error({title:"",message:"Sorry, there are no images matching your search!"}),l.style.display="none"):(h(r.hits),l.style.display="block",u=r.totalHits,b=u/15)}catch(r){y.style.display="none",c.error({title:"",message:`Sorry, there was an error fetching the images: ${r.message||r}`})}finally{p(!1),u<15&&(l.style.display="none"),f.reset()}}async function E(){y.style.display="block",d+=1;const s={params:{key:g,q:n,image_type:"photo",orientation:"horizontal",page:d,per_page:15}};try{const e=await m(s);y.style.display="none",h(e.hits);const a=document.querySelector(".gallery li").getBoundingClientRect();window.scrollBy({top:a.height*2,behavior:"smooth"})}catch(e){y.style.display="none",c.error({title:"",message:`Sorry, there was an error fetching the images: ${e.message||e}`})}finally{p(!1),d>=b&&(l.style.display="none",c.info({title:"",message:"We're sorry, but you've reached the end of search results."}))}}
//# sourceMappingURL=commonHelpers.js.map
