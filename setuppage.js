
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

function setupPage(page){

  window.removeEventListener('scroll', scroller);

  scroller = createScroller(page);

  function onImgLoad() { 
    scroller();
    imgElement.removeEventListener('load', onImgLoad)
  };

  imgElement.addEventListener("load", onImgLoad);

  function rafs(){
    requestAnimationFrame(scroller);
  }

  clearInterval(scrolling);
  scrolling = setInterval(rafs, 500);
  
  window.addEventListener('scroll', rafs);

}

setupPage(art);
