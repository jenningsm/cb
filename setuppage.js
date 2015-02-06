
function setupPage(page){

  var scroller = createScroller(page);
  scroller();

  var timeout = null;
  var scrollEvent = function(){
    scroller();
    clearTimeout(timeout);
    timeout = setTimeout(scroller, 100);
  }

  window.addEventListener('scroll', scrollEvent);
  window.addEventListener('resize', scroller);
  imgElement.addEventListener('load', scroller);

  return function(){
    window.removeEventListener('scroll', scrollEvent);
    window.removeEventListener('resize', scroller);
    imgElement.removeEventListener('load', scroller);
  }
}

var stop = setupPage(art);

function switchPages(page){
  stop();
  stop = setupPage(page);
}
