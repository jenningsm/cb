
var speedscale = 1.7;
function fade(transition, dir, cb){
  return (function rec(x){
    x += (dir ? .015 : .04) * (dir ? 1 : -1) * speedscale;
    transition(x);
    if((dir && x < 1) || (!dir && x > 0)){
      requestAnimationFrame(function() { rec(x) });
    } else {
      cb();
    }
  });
}


//maps is defined in setup.js
//function for switching between pages
var stop = null;
function switchPages(switchTo){
  return function pg(cb){
    var newPage = maps[switchTo]();
    var start = newPage.start;
 
    var fadeIn = function(){
      fade(start(), true, cb)(0);
    }
  
    if(stop !== null){
      fade(stop(), false, fadeIn)(1);
    } else {
      fadeIn();
    }
    stop = newPage.stop;
  }
}


//go to a page
var currPage = null;
function toPage(page){
  function pg(cb){
    if(currPage !== page){
      if(currPage === null){
        history.replaceState({'page' : page }, "", page === 'index' ? root + '/' : root + '/' + page);
        first = false;
      } else {
        history.pushState({'page' : page }, "", page === 'index' ? root + '/' : root + '/' + page);
      }
      currPage = page;
      switchPages(page)(cb);
    } else {
      cb();
    }
  }
  stageTransition(pg);
}

//used for switching pages on press of the back button
function backToPage(page){
  stageTransition(switchPages(page));
}


