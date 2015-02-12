
/*
  The image decoration (those two horizontal grey bars behind the image) needs to be painted both on scrolling (along with the banner)
    and on transitions. 
*/

var values = [];
var last = -1;

function decPainter(channel, x){
  x = Math.max(0, Math.min(1, x));
  while(values.length < channel + 1){
    values.push(1);
  }
  values[channel] = x;
  var op = 1;
  for(var i = 0; i < values.length; i++){
    op *= values[i];
  }
  if(op != last){
    decoration.style.opacity = op;
    last = op;
  }
}
