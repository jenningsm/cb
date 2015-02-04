
/*
   due to some wierd issues with scrolling, the scrolling function
   needs to be called every half second using setInterval. When, the
   scroll function changes, that call to setInterval for the old
   scroll function needs to be ended. the scrolling variable is used
   to do that
*/
var scrolling = null;

//the current scrolling function
var scroller = null;
//current resize
var rsz = null;

function setupPage(page){

  window.removeEventListener('scroll', scroller);
  window.removeEventListener('resize', rsz);

  var s = createScroller(page);
  scroller = function(yresize){
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

  clearInterval(scrolling);
  scrolling = setInterval(noResize, 500);
  
  window.addEventListener('scroll', scroller);
  window.addEventListener('resize', rsz);
}

setupPage(art);
