
function frontPage(){

  function transition(x){
    front.style.opacity = x;
    decoration.style.opacity = x;
  }


  function start(){

    scrollTo(0,0);
    document.body.style.height = height;
    var frontImage = document.getElementById("frontimage").getBoundingClientRect();
    decoration.style.top = ((frontImage.top + frontImage.bottom - decoration.clientHeight) / 2) + 'px';
 
    return transition;
  }

  function stop(){
    return transition;
  }

  return [start, stop, transition];
}


