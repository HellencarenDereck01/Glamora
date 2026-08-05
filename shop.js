// =======================================
// GLAMORA SHOP PAGE JAVASCRIPT
// =======================================

// -----------------------------
// Add To Cart Animation
// -----------------------------

const cartButtons = document.querySelectorAll(".card-buttons button");

cartButtons.forEach(button => {

button.addEventListener("click", () => {

const original = button.innerHTML;

button.innerHTML = "✓ Added";

button.style.background = "#2ecc71";

setTimeout(() => {

button.innerHTML = original;

button.style.background = "#111";

},1500);

});

});

// -----------------------------
// Wishlist
// -----------------------------

const hearts = document.querySelectorAll(".card-buttons i");

hearts.forEach(heart=>{

heart.addEventListener("click",()=>{

heart.classList.toggle("fas");

heart.classList.toggle("far");

heart.style.color="#e63946";

});

});

// -----------------------------
// Search Products
// -----------------------------

const searchInput=document.querySelector(".search-bar input");

const cards=document.querySelectorAll(".product-card");

searchInput.addEventListener("keyup",()=>{

const value=searchInput.value.toLowerCase();

cards.forEach(card=>{

const title=card.querySelector("h3").innerText.toLowerCase();

if(title.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

// -----------------------------
// Category Filter
// -----------------------------

const filters=document.querySelectorAll(".filter-box input[type='checkbox']");

filters.forEach(filter=>{

filter.addEventListener("change",()=>{

const active=[];

filters.forEach(item=>{

if(item.checked){

active.push(item.parentElement.innerText.toLowerCase());

}

});

cards.forEach(card=>{

const title=card.querySelector("h3").innerText.toLowerCase();

if(active.length===0){

card.style.display="block";

}else{

let show=false;

active.forEach(cat=>{

if(title.includes(cat)){

show=true;

}

});

card.style.display=show?"block":"none";

}

});

});

});

// -----------------------------
// Sort Products
// -----------------------------

const sort=document.querySelector(".shop-top select");

sort.addEventListener("change",()=>{

alert("Sorting feature will connect to backend later.");

});

// -----------------------------
// Scroll To Top Button
// -----------------------------

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

document.body.appendChild(topBtn);

topBtn.style.position="fixed";
topBtn.style.right="30px";
topBtn.style.bottom="30px";
topBtn.style.width="50px";
topBtn.style.height="50px";
topBtn.style.borderRadius="50%";
topBtn.style.border="none";
topBtn.style.background="#111";
topBtn.style.color="white";
topBtn.style.fontSize="22px";
topBtn.style.display="none";
topBtn.style.cursor="pointer";
topBtn.style.zIndex="999";

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

// -----------------------------
// Fade Products On Scroll
// -----------------------------

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

});

cards.forEach(card=>{

card.style.opacity="0";

card.style.transform="translateY(40px)";

card.style.transition=".8s";

observer.observe(card);

});

// -----------------------------
// Newsletter
// -----------------------------

const form=document.querySelector(".newsletter form");

if(form){

form.addEventListener("submit",(e)=>{

e.preventDefault();

alert("🎉 Welcome to Glamora!");

form.reset();

});

}

// -----------------------------
// Header Shadow
// -----------------------------

const header=document.querySelector("header");

window.addEventListener("scroll",()=>{

if(window.scrollY>30){

header.style.boxShadow="0 8px 25px rgba(0,0,0,.12)";

}else{

header.style.boxShadow="0 4px 12px rgba(0,0,0,.08)";

}

});

console.log("✨ Glamora Shop Loaded Successfully");
