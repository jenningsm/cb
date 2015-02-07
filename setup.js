
var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

var lvis = false;
var logo = document.getElementById("logo");
function centerLogo(){
  var trans = "translate(" + Math.floor((width - logo.clientWidth)  * .5) +  "px, 0)";
  logo.style.transform = trans;
  if(!lvis){
    logo.style.visibility = "visible";
    lvis = true;
  }
}

window.requestAnimationFrame = window.requestAnimationFrame
 || window.mozRequestAnimationFrame
 || window.webkitRequestAnimationFrame
 || window.msRequestAnimationFrame
 || function(f){setTimeout(f, 1000/60)};

function oneTimeListener(target, type, callback){
  function oneTimeCallback(){
    target.removeEventListener(type, oneTimeCallback);
    callback();
  }
  target.addEventListener(type, oneTimeCallback);
}

function onResize(){
  height = document.documentElement.clientHeight;
  width = document.documentElement.clientWidth;
  centerLogo();
}

window.addEventListener('load', onResize);
window.addEventListener('resize', onResize);

var imgElement = document.getElementById("image");
var imgContainer = document.getElementById("bwork");
var banner = document.getElementById("banner");

