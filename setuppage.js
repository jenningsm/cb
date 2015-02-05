//the current scrolling function
var scrollEvent = null;

function setupPage(page){

  window.removeEventListener('scroll', scrollEvent);
  window.removeEventListener('resize', scrollEvent);

  var s = createScroller(page);
  var scroller = function(){
     requestAnimationFrame(s);
  }

  var timeout = null;
  scrollEvent = function(){
    scroller();
    clearTimeout(timeout);
    timeout = setTimeout(scroller, 100);
  }

  window.addEventListener('scroll', scrollEvent);
  window.addEventListener('resize', scrollEvent);

  function onImgLoad() { 
    scroller();
    imgElement.removeEventListener('load', onImgLoad)
  };

  imgElement.addEventListener("load", onImgLoad);
}

setupPage(art);
