
var outEvent = new Event('outfinished');

function fade(transition, dir){
  return (function rec(x){
    x += (dir ? .015 : .04) * (dir ? 1 : -1);
    transition(x);
    if((dir && x < 1) || (!dir && x > 0)){
      requestAnimationFrame(function() { rec(x) });
    } else {
      document.dispatchEvent(outEvent);
    }
  });
}


var stop = null;
var currPage = null;

//maps is defined in setup.js

function switchPages(switchTo){
 if(switchTo !== currPage){
    currPage = switchTo;
    var newPage = maps[switchTo]();
    var start = newPage.start;

    var onFadeOut = function(){
      start();
      fade(newPage.transition, true)(0);
    }
    oneTimeListener(document, 'outfinished', onFadeOut);

    if(stop !== null){
      var fadeOut = stop();
      fade(fadeOut, false)(1);
    } else {
      document.dispatchEvent(outEvent);
    }
    stop = newPage.stop;
  }
}

var first = true;

function toPage(page){
  if(first){
    history.replaceState({'page' : page }, "", page === 'index' ? root : root + '/' + page);
    first = false;
  } else {
    history.pushState({'page' : page }, "", page === 'index' ? root : root + '/' + page);
  }
  switchPages(page);
}
