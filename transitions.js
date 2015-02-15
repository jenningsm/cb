
var speedscale = .85;
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
var oldPage = null;
function switchPages(switchTo){
  return function pg(cb){
    var newPage = maps[switchTo]();
 
    var currFooter;
    if(oldPage !== null){
      currFooter = oldPage.stop();
    } else {
      currFooter = -1;
    }

    var fadeIn = function(){
      newPage.start();
      fade(newPage.transition(currFooter), true, cb)(0);
    }
  
    if(oldPage !== null){
      fade(oldPage.transition(newPage.footerType), false, fadeIn)(1);
    } else {
      fadeIn();
    }
    oldPage = newPage;
  }
}


//go to a page, handles history as well
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


