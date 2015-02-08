
function frontPage(){

  var frontImage = document.getElementById("frontimage");

  function decorationMove(){
    var fimgbounds = frontImage.getBoundingClientRect();
    decoration.style.top = ((fimgbounds.top + fimgbounds.bottom - decoration.clientHeight) / 2) + 'px';
  }

  function transition(x){
    front.style.opacity = x;
    decoration.style.opacity = x;
  }

  function start(){
  
    scrollTo(0,0);
    document.body.style.height = 0;

    decorationMove();

    window.addEventListener('resize', decorationMove);
 
    return transition;
  }

  function stop(){
    window.removeEventListener('resize', decorationMove);

    return transition;
  }

  return [start, stop, transition];
}

