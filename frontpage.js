
function frontPage(){

  var frontImage = document.getElementById("frontimage");

  function decorationMove(){
    var fimgbounds = frontImage.getBoundingClientRect();
    decoration.style.top = ((fimgbounds.top + fimgbounds.bottom - decoration.clientHeight) / 2) + 'px';
  }

  var tback = document.getElementById("headerback");
  var bback = document.getElementById("footerback");

  var frontpr = .5;
  var decpr = 1;
  function transition(otherPageType){
    return function(x){
      if(x <= frontpr){
        front.style.opacity = x / frontpr;
        tback.style.opacity = 1 - x / frontpr;
        bback.style.opacity = 1 - x / frontpr;
      } else {
        front.style.opacity = 1;
        tback.style.opacity = 0;
        bback.style.opacity = 0;
      }
  
      if(x > 1 - decpr){
        decPainter(1, (x - (1 - decpr)) / decpr);
        footerContent.style.opacity = (x - (1 - decpr)) / decpr;
      } else {
        decPainter(1, 0);
        footerContent.style.opacity = 0;
      }
    }
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

  return {'start' : start, 'stop' : stop, 'transition' : transition, 'pageType' : 0};
}


