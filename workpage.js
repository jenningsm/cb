
function workPage(page){

  var scroller = createScroller(page);

  var imgpr = .5;
  var decpr = .7;
  function transition(x){
    if(x <= imgpr){
      imgElement.style.opacity = x / imgpr;
    } else {
      imgElement.style.opacity = 1;
    }

    if(x > 1 - decpr){
      decoration.style.opacity = (x - (1 - decpr)) / decpr;
    } else {
      decoration.style.opacity = 0;
    }
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

  return { 'start' : start, 'stop' : stop, 'transition' : transition};
}


