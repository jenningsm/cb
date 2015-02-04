
/*
   due to some wierd issues with scrolling, the scrolling function
   needs to be called every half second using setInterval. When, the
   scroll function changes, that call to setInterval for the old
   scroll function needs to be ended. the scrolling variable is used
   to do that
*/
var scrolling = null;

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
