

function scrollTiming(start, dir, time, composer){

  var x = (dir === 'up' ? 1 : 0);
  var mult = (dir === 'up' ? -1 : 1);

  function rec() {
    composer(x);
    if(dir === 'up' && 
  }

}
