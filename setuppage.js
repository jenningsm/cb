
function setupPage(page){

  var scroller = createScroller(page);

  function transition(x){
    imgElement.style.opacity = x;
  }

  var timeout = null;
  var scrollEvent = function(){
    scroller(); 
    clearTimeout(timeout);
    timeout = setTimeout(scroller, 100);
  }

  function start(){
    scroller();
    
    window.addEventListener('scroll', scrollEvent);
    window.addEventListener('resize', scroller);
    imgElement.addEventListener('load', scroller);

    return transition;
  }

  function stop(){
    window.removeEventListener('scroll', scrollEvent);
    window.removeEventListener('resize', scroller);
    imgElement.removeEventListener('load', scroller);

    return transition;
  }

  return [start, stop, transition];
}

var page = setupPage(art);
var stop = page[1];
page[0]();

var outEvent = new Event('outfinished');

/*function switchPages(page){

  var newPage = setupPage(page);

  var fadeOut = stop();
  stop = newPage[1];
  var start = newPage[0];

  var onFadeOut = function(){
    oneTimeListener(imgElement, 'load', function(){ fade(newPage[2], true)(0) });
    start();
  }

  oneTimeListener(document, 'outfinished', onFadeOut);

  fade(fadeOut, false)(1);
}*/



function fade(transition, dir){
  return (function rec(x){
    x += (x+.1) * .05 * (dir ? 1 : -1);
    transition(x);
    if((dir && x < 1) || (!dir && x > 0)){
      requestAnimationFrame(function() { rec(x) });
    } else {
      document.dispatchEvent(outEvent);
    }
  });
}

