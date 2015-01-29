var url = "http://www.charlibeck.com/links/";

var imageElement = document.getElementById("image");
var container = document.getElementById("bwork");

function imageReel(images){

  var currentNum = 0;
  var currentImage = new Image();
  
  currentImage.src = url + images[0];
  imageElement.src = currentImage.src;
  
  var nextImage = new Image();
  nextImage.src = url + images[1];
  
  var prevImage = null;

  return function (num){
    if(num - 1 === currentNum){
      if(nextImage != null){
        prevImage = currentImage;
        currentImage = nextImage;
        imageElement.src = currentImage.src;
        currentNum++;
        if(currentNum != images.length - 1){
          nextImage = new Image();
          nextImage.src = url + images[currentNum+1] ;
        } else {
          nextImage = null;
        }
      }
  
    } else if(num + 1 === currentNum) {
      if(prevImage != null){
        nextImage = currentImage;
        currentImage = prevImage;
        imageElement.src = currentImage.src;
        currentNum--;
        if(currentNum !== 0){
          prevImage = new Image();
          prevImage.src = url + images[currentNum-1];
        } else {
          prevImage = null;
        }
      }
    } else if(num >= 0 && num < images.length) {
      currentImage.src = url + images[num];
      imageElement.src = currentImage.src;
      currentNum = num;
      if(currentNum != images.length - 1){
         nextImage = new Image();
         nextImage.src = url + images[currentNum+1] ;
       } else {
         nextImage = null;
       }
       if(currentNum !== 0){
         prevImage = new Image();
         prevImage.src = url + images[currentNum-1];
       } else {
         prevImage = null;
       }
    }
  }
}
