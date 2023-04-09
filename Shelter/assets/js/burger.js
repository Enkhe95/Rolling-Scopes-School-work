"use strict"
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("burger").addEventListener("click", function() 
    {
        document.querySelector(".header").classList.toggle("open")
    })
} )





document.getElementById("menu").addEventListener('click', event => {
    event._isClickWithInMenu = true;
});
document.getElementById("burger").addEventListener('click', event => {
    event._isClickWithInMenu = true;
});
document.body.addEventListener('click', event => {
    if (event._isClickWithInMenu) return;
    document.querySelector(".header").classList.remove("open")
});



document.querySelector("nav").addEventListener('click', event => {
    document.querySelector(".header").classList.remove("open")
});

document.querySelector("header__nav_items").addEventListener('click', event => {
    document.querySelector(".header").classList.remove("open")
});
