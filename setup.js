document.getElementById("logo").style.left = 50 - 100 * (window.innerHeight * .7 * .2) / (2 * window.innerWidth) + "%";

window.requestAnimationFrame = window.requestAnimationFrame
 || window.mozRequestAnimationFrame
 || window.webkitRequestAnimationFrame
 || window.msRequestAnimationFrame
 || function(f){setTimeout(f, 1000/60)};
