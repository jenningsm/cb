
function loadImage(src){
  var img = new Image();
  img.addEventListener('load', function() { img = null;});
  img.src = src;
}

function imageReel(images){

  imgElement.src = imagepath + images[0];
  loadImage(imagepath+images[1]);

  return function (num){
    if(num >= 0 && num < images.length) {
      imgElement.src = imagepath + images[num];

      //make sure the next and previous images are loaded so they're
      //  ready to go when we scroll to them
      if(num != images.length - 1){
         loadImage(imagepath+images[num+1]);
      }
      if(num !== 0){
        loadImage(imagepath+images[num-1]);
      }
    }
  }
}
