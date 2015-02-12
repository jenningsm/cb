
function loadImage(src){
  var img = new Image();
  oneTimeListener(img, 'load', function() { img = null;});
  img.src = src;
}

function imageReel(images){

  loadImage(imagepath+images[0]);
  loadImage(imagepath+images[1]);

  return function (num){
    if(num >= 0 && num < images.length) {
      imgElement.src = imagepath + images[num];

      //make sure the next and previous images are loaded so they're
      //  ready to go when we scroll to them
       loadImage(imagepath+images[(num+1) % images.length]);
      if(num !== 0){
        loadImage(imagepath+images[num-1]);
      }
    }
  }
}
