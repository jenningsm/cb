
function workPage(page){

  var scroller = createScroller(page);


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
      if((place === 1 && dir === 'down') || (place === 0 && dir === 'up')){
        speed *= .75;
      }
  
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
  function transition(x){
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
  }

  function start(){
    decorationMove();

    scroller(0, 0);    
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', resize);
    window.addEventListener('resize', decorationMove);
    imgElement.addEventListener('load', resize);

    return transition;
  }

  function stop(){
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('resize', resize);
    window.removeEventListener('resize', decorationMove);
    imgElement.removeEventListener('load', resize);

    return transition;
  }

  return { 'start' : start, 'stop' : stop, 'transition' : transition};
}

