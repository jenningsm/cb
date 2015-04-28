
/*
  The image decoration (those two horizontal grey bars behind the image) needs to be painted both on scrolling (along with the banner)
    and on transitions. this painter multiplies two painting channels (one for scrolling and one for transitions) to get the output
    opacity for the image decoration
*/

var values = [];
var last = -1;

function decPainter(channel, x){
  x = Math.max(0, Math.min(1, x));
  while(values.length < channel + 1){
    values.push(1);
  }
  values[channel] = x;
  var op = 1;
  for(var i = 0; i < values.length; i++){
    op *= values[i];
  }
  if(op != last){
    decoration.style.opacity = op;
    last = op;
  }
}


function imageMover(x){
  var transform = "translate3d(0, -" + x * (height + imgElement.clientHeight) + "px, 0)";
  imgContainer.style.webkitTransform = transform;
  imgContainer.style.transform = transform;
}

function framePainter(x) { 
  lv.style.opacity = x; 
  rv.style.opacity = x;
  bh.style.opacity = x;
  th.style.opacity = x;
}

var bannerParts = [];
bannerParts.push(document.getElementById("header"));
bannerParts.push(document.getElementById("headerback"));
bannerParts.push(document.getElementById("footer"));
bannerParts.push(document.getElementById("footerback"));

function bannerPainter(x){
   for(var i = 0; i < bannerParts.length; i++){
     bannerParts[i].style.opacity = x;
   }
   decPainter(0, x);
} 
