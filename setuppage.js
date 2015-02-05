//the current scrolling function
var scrollEvent = null;

function setupPage(page){

  window.removeEventListener('scroll', scrollEvent);

  var s = createScroller(page);
  var scroller = function(){
     requestAnimationFrame(s);
  }

  function onImgLoad() { 
    scroller();
    imgElement.removeEventListener('load', onImgLoad)
  };

  imgElement.addEventListener("load", onImgLoad);

  var timeout = null;
  scrollEvent = function(){
    scroller();
    clearTimeout(timeout);
    timeout = setTimeout(noResize, 200);
  }

  window.addEventListener('scroll', scrollEvent);
}

setupPage(art);
