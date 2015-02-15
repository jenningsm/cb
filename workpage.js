
function workPage(page){

  var scroller = createScroller(page);
  var footerType = 1;

  var currPos = 0;
  var place = 0;

  function slide(dir){
    return function(cb){
      place += (dir === 'down' ? 1 : -1);
      place = (place + page.length + 1) % (page.length + 1);
  
      var next = 0;
      next += Math.min(1, place) * .5;
      next += Math.max(0, place - 1);
  
      var mult = (dir === 'up' ? -1 : 1);
      var speed = .012;
  
      function s(){
        currPos += mult * speed;
        currPos = currPos % (page.length + .5);
  
        if(currPos * mult >= next * mult && (Math.abs(currPos - next) <= speed)){
          currPos = next;
          scroller(Math.floor(currPos), currPos % 1);
          cb();
        } else {
          if(currPos < 0){
            currPos += page.length + .5;
          }
          scroller(Math.floor(currPos), currPos % 1);
          requestAnimationFrame(s);
        }
      }

      if(place === 2 && footerType === 1){
        footerType = 0;
        footerContent.style.opacity = 1;
        footerInstruct.style.opacity = 0;
      }  

      requestAnimationFrame(s);
    }
  }

  var onKeyDown = function(e){
    if(e.keyCode === 38 || e.keyCode === 40){
      stageTransition(slide(e.keyCode === 38 ? 'up' : 'down'));
    }
  }

  function resize(){
     scroller(Math.floor(currPos), currPos % 1);
  }

  var decorationMove = function(){
    decoration.style.top = ((height - decoration.clientHeight) / 2) + 'px';
  }

  var imgpr = .5;
  var decpr = 1;
  function transition(otherFooterType){
    return function(x){
      if(x <= imgpr){
        imgElement.style.opacity = x / imgpr;
      } else {
        imgElement.style.opacity = 1;
      }
  
      if(x > 1 - decpr){
        decPainter(1, (x - (1 - decpr)) / decpr);
      } else {
        decPainter(1, 0);
      }
  
      if(otherFooterType != footerType){
        if(footerType === 1){
          footerInstruct.style.opacity = x;
        } else {
          footerContent.style.opacity = x;
        }
      }
    } 
  }


  function start(cb){
    decorationMove();

    oneTimeListener(imgElement, 'load', cb);

    scroller(0, 0);    
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', resize);
    window.addEventListener('resize', decorationMove);
    imgElement.addEventListener('load', resize);

    return footerType;
  }

  function stop(){
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('resize', resize);
    window.removeEventListener('resize', decorationMove);
    imgElement.removeEventListener('load', resize);

    return footerType;
  }

  return { 'start' : start, 'stop' : stop, 'transition' : transition, 'footerType' : footerType};
}

