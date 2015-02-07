
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
