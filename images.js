var url = "http://www.charlibeck.com/links/";

var imageElement = document.getElementById("image");
var container = document.getElementById("bwork");

function imageReel(images){

  var loadImage = [];

  loadImage[0] = new Image();
  loadImage[0].src = url + images[0];
  imageElement.src = url + images[0];

  loadImage[1] = new Image();
  loadImage[1].src = url + images[1];

  return function (num){
    if(num >= 0 && num < images.length) {
      imageElement.src = url + images[num];
      if(num != images.length - 1){
         loadImage[0] = new Image();
         loadImage[0].src = url + images[num+1] ;
       }
       if(num !== 0){
         loadImage[1] = new Image();
         loadImage[1].src = url + images[num-1];
       }
    }
  }
}
