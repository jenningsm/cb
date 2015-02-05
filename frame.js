
/*
   helper function for creating transform strings

   transform: the type of transform to compose (e.g. translate, scale)
   dim: the dimension along which the transform is happening (true == horizontal, false == vertical)
   x: the value for the dimension being transformed
   stat: static, the value for the element not being transformed
   unit: the unit used, (e.g. %, px, blank)
*/
function composeTransform(transform, dim, x, stat, unit) {
  var still = stat + unit;
  var trans = String(x) + unit;
  return transform + "(" + (dim !== 0 ? still + "," + trans : trans + "," + still) + ")";
}

/* 
    frame: takes frame dimension info, and transforms the frame elements to match

    each argument is a 2 member array representing x and y dimensions:

    box: the distance, in pixels, from the end of the box to the center, along each dimension
    solid: the distance, as a porportion of the distance from the end of the box to the edge of the screen, the solid line
           will go before the gradient starts, along each dimension.
    fade: refers to the length of the gradient line in the same way solid refers to the length of the solid line past the box

*/

var lv = document.getElementById("leftvert");
var rv = document.getElementById("rightvert");
var th = document.getElementById("tophorz");
var bh = document.getElementById("bottomhorz");

function resizeFrame(box, solid, fade){
  var verts = [lv, rv];  
  var hrz = [th, bh];  
  frm = [hrz, verts];

  for(var i = 0; i < 2; i++){
    var dim = (i !== 0 ? height : document.body.clientWidth) / 2;
    
    for(var j = 0; j < 2; j++){

      frm[i][j].style.transform = composeTransform("translate", (i+1)%2, (j * 2 - 1) * box[(i+1)%2], 0, "px");

      var grads = [frm[i][j].getElementsByClassName("first")[0],frm[i][j].getElementsByClassName("last")[0]];
      var mid = frm[i][j].getElementsByClassName("mid")[0];

      var midsize = (box[i] + (dim - box[i]) * solid[i]) / dim;
      mid.style.transform = composeTransform("scale", i, midsize, 1, "");

      var gradscale = fade[i] * (dim - box[i]) / dim;
      for(var k = 0; k < 2; k++){
        //in the following assignment, "gradscale * .47" really should be "gradscale * .5", but there's a bug
        //creating a tiny gap between the grad and solid line
        //the multiplication by .47 instead of .5 is a hack to fix it, i don't know what's really causing the problem
        var translate = ((midsize + (gradscale * .47) - .5) * dim) * (k * 2 - 1);
        var transform = composeTransform("translate", i, translate, 0, "px");
        transform += " ";
        transform += composeTransform("scale", i, gradscale, 1, "");
        grads[k].style.transform = transform;
      }      
    }
  }
}


function frameImage(){
  var cheight = imgElement.clientHeight;
  var cwidth = imgElement.clientWidth;
  var dir = (cwidth / cheight > 1);

  var vertOffset = (cheight + (height - cheight) * (dir ? .4 : .6)) * .5;
  var horzOffset = (cwidth + (width - cwidth) * (dir ? .5 : .3)) * .5;

  resizeFrame([horzOffset, vertOffset], [.25, .25], [.5, .5]);
}

imgElement.addEventListener('load', frameImage);
window.addEventListener('resize', frameImage);
