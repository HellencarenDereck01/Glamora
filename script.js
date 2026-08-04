// ================================
// GLAMORA - script.js
// ================================


// Sticky Header Shadow
const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.boxShadow = "0 10px 25px rgba(0,0,0,.12)";

    } else {

        header.style.boxShadow = "0 2px 15px rgba(0,0,0,.08)";

    }

});


// ================================
// Newsletter
// ================================

const newsletterForm = document.querySelector(".newsletter form");

if(newsletterForm){

newsletterForm.addEventListener("submit",(e)=>{

e.preventDefault();

const email = newsletterForm.querySelector("input").value;

if(email===""){

alert("Please enter your email.");

return;

}

alert("🎉 Thank you for subscribing to Glamora!");

newsletterForm.reset();

});

}


// ================================
// Search
// ================================

const searchInput = document.querySelector(".search input");

const searchBtn = document.querySelector(".search button");

if(searchBtn){

searchBtn.addEventListener("click",()=>{

if(searchInput.value.trim()==""){

alert("Enter something to search.");

}else{

alert("Searching for: "+searchInput.value);

}

});

}


// ================================
// Add To Cart
// ================================

const cartButtons=document.querySelectorAll(".product button");

let cartCount=0;

cartButtons.forEach(button=>{

button.addEventListener("click",()=>{

cartCount++;

button.innerHTML="✓ Added";

button.style.background="#4CAF50";

setTimeout(()=>{

button.innerHTML="Add to Cart";

button.style.background="#111";

},1500);

});

});


// ================================
// Product Hover Animation
// ================================

const products=document.querySelectorAll(".product");

products.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-12px) scale(1.02)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0)";

});

});


// ================================
// Category Animation
// ================================

const categories=document.querySelectorAll(".category");

categories.forEach(category=>{

category.addEventListener("mouseenter",()=>{

category.style.transform="translateY(-12px)";

});

category.addEventListener("mouseleave",()=>{

category.style.transform="translateY(0px)";

});

});


// ================================
// Smooth Scroll
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});


// ================================
// Fade In On Scroll
// ================================

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

});

const hiddenElements=document.querySelectorAll(

".product,.category,.review,.skin-card"

);

hiddenElements.forEach(el=>{

el.style.opacity="0";

el.style.transform="translateY(50px)";

el.style.transition=".8s";

observer.observe(el);

});


// ================================
// Auto Change Hero Background
// ================================

const hero=document.querySelector(".hero");

const backgrounds=[

"images/hero1.jpg",

"images/hero2.jpg",

"images/hero3.jpg"

];

let current=0;

setInterval(()=>{

current++;

if(current>=backgrounds.length){

current=0;

}

hero.style.backgroundImage=`url(${backgrounds[current]})`;

hero.style.backgroundSize="cover";

hero.style.backgroundPosition="center";

},5000);


// ================================
// Scroll To Top Button
// ================================

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

document.body.appendChild(topBtn);

topBtn.style.position="fixed";
topBtn.style.bottom="30px";
topBtn.style.right="30px";
topBtn.style.width="50px";
topBtn.style.height="50px";
topBtn.style.borderRadius="50%";
topBtn.style.border="none";
topBtn.style.background="#111";
topBtn.style.color="white";
topBtn.style.fontSize="22px";
topBtn.style.cursor="pointer";
topBtn.style.display="none";
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


// ================================
// Current Year
// ================================

const footer=document.querySelector(".footer-bottom p");

if(footer){

footer.innerHTML=`© ${new Date().getFullYear()} Glamora. All Rights Reserved.`;

}


// ================================
// Console Message
// ================================

console.log("%cWelcome to Glamora 🌸","color:#C6A76D;font-size:18px;font-weight:bold;");
