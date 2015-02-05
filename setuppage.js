//the current scrolling function
var scrollEvent = null;

function setupPage(page){

  window.removeEventListener('scroll', scrollEvent);

  var s = createScroller(page);
  var scroller = function(yresize){
     requestAnimationFrame(function(){ s(yresize);});
  }

  function onImgLoad() { 
    scroller();
    imgElement.removeEventListener('load', onImgLoad)
  };

  imgElement.addEventListener("load", onImgLoad);

  var timeout = null;
  scrollEvent = function(){
    noResize();
    clearTimeout(timeout);
    timeout = setTimeout(noResize, 200);
  }

  window.addEventListener('scroll', scrollEvent);
}

setupPage(art);
