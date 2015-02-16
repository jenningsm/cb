
function loadImage(src){
  var img = new Image();
  oneTimeListener(img, 'load', function() { img = null;});
  img.src = src;
}

function imageReel(images){

  for(var i = 0; i < images.length; i++){
    loadImage(imagepath + images[i]);
  }

  return function (num){
    if(num >= 0 && num < images.length) {
      imgElement.src = imagepath + images[num];
    }
  }
}
