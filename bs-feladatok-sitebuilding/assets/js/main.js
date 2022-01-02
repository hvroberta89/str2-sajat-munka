const navbar=document.querySelector("#navbar"),
    navbarBrand = document.querySelector("#navbar-brand"),
    navbarLinks = document.querySelector(".navbar-nav");

    console.log(navbarLinks.children[1].classList);
// document.addEventListener('scroll', function() {
// if (window.scrollY>0){
//     navbarBrand.classList.remove("own-navbar-brand");
//     navbarBrand.classList.add("own-navbar-brand_scrolling");
// } else {

// }
// });
window.onscroll = function() {scrolling()};

function scrolling() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navbar.classList.remove("navbar-dark");
    navbar.classList.add("navbar-bg_scrolling");
    navbarBrand.classList.remove("own-navbar-brand");
    navbarBrand.classList.add("own-navbar-brand_scrolling");
    for (let i = 0; i < navbarLinks.children.length; i++) {
        navbarLinks.children[i].classList.remove("own-nav-link");
        navbarLinks.children[i].classList.add("own-nav-link_scrolling");
    };
    // navbarLinks.children[1].classList.remove("own-nav-link");
    // navbarLinks.children[1].classList.add("own-nav-link_scrolling");
  } else {
    navbarBrand.classList.add("own-navbar-brand");
    navbarBrand.classList.remove("own-navbar-brand_scrolling");
    for (let i = 0; i < navbarLinks.children.length; i++) {
        navbarLinks.children[i].classList.add("own-nav-link");
        navbarLinks.children[i].classList.remove("own-nav-link_scrolling");
    };
    navbar.classList.add("navbar-dark");
    navbar.classList.remove("navbar-bg_scrolling");
}}