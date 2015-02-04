var logo = document.getElementById("logo");
logo.style.left = 50 - 100 * (window.innerHeight * .7 * .2) / (2 * window.innerWidth) + "%";
logo.style.visibility = "visible";

window.requestAnimationFrame = window.requestAnimationFrame
 || window.mozRequestAnimationFrame
 || window.webkitRequestAnimationFrame
 || window.msRequestAnimationFrame
 || function(f){setTimeout(f, 1000/60)};

var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

var imgElement = document.getElementById("image");
var imgContainer = document.getElementById("bwork");
var banner = document.getElementById("banner");  
