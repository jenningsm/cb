
var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

var logo = document.getElementById("logo");

function onResize(){
  height = document.documentElement.clientHeight;
  width = document.documentElement.clientWidth;
}

window.addEventListener('load', onResize);
window.addEventListener('resize', onResize);

var imgElement = document.getElementById("image");
var imgContainer = document.getElementById("bwork");
var banner = document.getElementById("banner");
var decoration = document.getElementById("imagedecoration");
var front = document.getElementById("frontpage");
var footerInstruct = document.getElementById("footerinstructions");
var footerContent = document.getElementById("footercontent");

