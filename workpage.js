
function workPage(page){

  var scroller = createScroller(page);

  function transition(x){
    imgElement.style.opacity = x;
    decoration.style.opacity = x;
  }

  var timeout = null;
  var scrollEvent = function(){
    scroller(); 
    clearTimeout(timeout);
    timeout = setTimeout(scroller, 100);
  }

  var decorationMove = function(){
    decoration.style.top = ((height - decoration.clientHeight) / 2) + 'px';
  }

  function start(){
    scroller();
    decorationMove();
    
    window.addEventListener('scroll', scrollEvent);
    window.addEventListener('resize', scroller);
    window.addEventListener('resize', decorationMove);
    imgElement.addEventListener('load', scroller);

    return transition;
  }

  function stop(){
    scrollTo(0, 0);
    window.removeEventListener('scroll', scrollEvent);
    window.removeEventListener('resize', scroller);
    window.removeEventListener('resize', decorationMove);
    imgElement.removeEventListener('load', scroller);

    return transition;
  }

  return [start, stop, transition];
}


