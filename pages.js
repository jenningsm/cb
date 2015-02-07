
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

function switchPages(page){
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
}

