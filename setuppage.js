//the current scrolling function
var scrollEvent = null;
//current resize
var rsz = null;

function setupPage(page){

  window.removeEventListener('scroll', scrollEvent);
  window.removeEventListener('resize', rsz);

  var s = createScroller(page);
  var scroller = function(yresize){
     requestAnimationFrame(function(){ s(yresize);});
  }

  function onImgLoad() { 
    scroller();
    imgElement.removeEventListener('load', onImgLoad)
  };

  imgElement.addEventListener("load", onImgLoad);

  function noResize(){
    scroller(false);
  }
  rsz = function(){
    scroller(true);
  }

  var timeout = null;
  scrollEvent = function(){
    noResize();
    clearTimeout(timeout);
    timeout = setTimeout(noResize, 200);
  }

  window.addEventListener('scroll', scrollEvent);
  window.addEventListener('resize', rsz);
}

setupPage(art);
