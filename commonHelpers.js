import{a as S,S as v,i as y}from"./assets/vendor-D1eTGYtO.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();async function h(s){try{return(await S.get("https://pixabay.com/api/",s)).data}catch(t){throw t}}const P=new v(".gallery a",{captions:!0,captionsDelay:250,captionsData:"alt"});function m(s){const t=document.querySelector(".js-gallery"),o=s.map(({webformatURL:a,largeImageURL:e,tags:r,likes:l,views:b,comments:w,downloads:L})=>`<li class = "list-item">
  <a href="${e}">
    <div class = "preview-photo"><img src="${a}" alt="${r}"></div>
     <ul class="img-desc">
    <li>
      <h2>Likes</h2>
      <p>${l}</p>
    </li>
    <li>
      <h2>Views</h2>
      <p>${b}</p>
    </li>
    <li>
      <h2>Comments</h2>
      <p>${w}</p>
    </li>
    <li>
      <h2>Downloads</h2>
      <p>${L}</p>
    </li>
  </ul>
  </a>

</li>`).join("");t.insertAdjacentHTML("beforeend",o),P.refresh()}const u=document.querySelector(".form"),n=document.querySelector(".js-loader"),q=document.querySelector(".js-gallery"),i=document.querySelector(".loadmore-btn"),f="45176158-e3d3b26982233790558f60971";let d=1,c="",p=0,g=0;u.addEventListener("submit",$);i.addEventListener("click",E);async function $(s){if(s.preventDefault(),c=u.elements[0].value.toLowerCase().trim(),d=1,q.innerHTML="",c===""||c.length<2){y.error({message:"Please enter the data in the input field",position:"topRight",messageColor:"#ffffff",backgroundColor:"#EF4040"}),i.style.display="none";return}n.style.display="none";const t={params:{key:f,q:c,image_type:"photo",orientation:"horizontal",page:d,per_page:15,maxPage:0}};try{const o=await h(t);n.style.display="none",o.hits.length===0?(y.error({title:"",message:"Sorry, there are no images matching your search!"}),i.style.display="none"):(m(o.hits),i.style.display="block",p=o.totalHits,g=p/15)}catch(o){n.style.display="none",y.error({title:"",message:`Sorry, there was an error fetching the images: ${o.message||o}`})}finally{p<15&&(i.style.display="none"),u.reset()}}async function E(){n.style.display="block",d+=1;const s={params:{key:f,q:c,image_type:"photo",orientation:"horizontal",page:d,per_page:15}};try{const t=await h(s);n.style.display="none",m(t.hits);const a=document.querySelector(".gallery li").getBoundingClientRect();window.scrollBy({top:a.height*2,behavior:"smooth"})}catch(t){n.style.display="none",y.error({title:"",message:`Sorry, there was an error fetching the images: ${t.message||t}`})}finally{d>=g&&(i.style.display="none",y.info({title:"",message:"We're sorry, but you've reached the end of search results."}))}}
//# sourceMappingURL=commonHelpers.js.map
