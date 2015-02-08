
function frontPage(){

  function transition(x){
    front.style.opacity = x;
    decoration.style.opacity = x;
  }

  var frontImage = document.getElementById("frontimage").getBoundingClientRect();

  function start(){

    document.body.style.height = 0;
    decoration.style.top = ((frontImage.top + frontImage.bottom - decoration.clientHeight) / 2) + 'px';
 
    return transition;
  }

  function stop(){
    return transition;
  }

  return [start, stop, transition];
}


