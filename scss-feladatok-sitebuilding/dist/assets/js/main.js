// *** Hamburger menun ***//

const btnMenu= document.querySelector("#btnMenu"),
    btnSpansMenu= document.querySelector("#spansMenu"),
    btnTextMenu= document.querySelector("#textMenu"),
    btnLinksMenu=document.querySelector("#linksMenu"),
    fadeElements=document.querySelectorAll(".has-fade");

btnMenu.addEventListener("click", function(){
    btnSpansMenu.classList.toggle("open");
    btnTextMenu.classList.toggle("open");
    fadeElements.forEach(function(element){
        element.classList.toggle("fade-in");
        element.classList.toggle("fade-out");
    });
});

// *** Scrolling page *** //
const navbar=document.querySelector(".navbar"),
    navbarBrand = document.querySelector(".header__brand"),
    navbarLinks = document.querySelector(".header__links");

function scrolling() {
  if (document.body.scrollTop < 0 || document.documentElement.scrollTop < 50) {
    navbar.classList.add("base-colors");
    navbar.classList.remove("scrolling");
    navbarBrand.classList.add("base-colors");
    navbarBrand.classList.remove("scrolling");
    navbarLinks.classList.add("base-colors");
    navbarLinks.classList.remove("scrolling");    
  } else {
    navbar.classList.remove("base-colors");
    navbar.classList.add("scrolling");
    navbarBrand.classList.remove("base-colors");
    navbarBrand.classList.add("scrolling");
    navbarLinks.classList.remove("base-colors");
    navbarLinks.classList.add("scrolling");    
  }}

window.onscroll = function() {scrolling()};
