var url = "http://www.charlibeck.com/links/";

var images = ["cba1.jpg", "cba2.jpg", "cba3.jpg", "cba4.jpg", "cba5.jpg","cba6.jpg","cba7.jpg","cba8.jpg","cba9.jpg","cba10.jpg","cba11.jpg","cba12.jpg"];

var imageElement = document.getElementById("image");
var container = document.getElementById("bwork");


var currentNum = 0;
var currentImage = new Image();

currentImage.onload = function(){
  var translate = 100 * ((window.innerHeight + imageElement.clientHeight) * .5 / imageElement.clientHeight);
  container.style.transform = "translate(0, -" + translate + "%)";
};

currentImage.src = url + images[0];
imageElement.src = currentImage.src;

var nextImage = new Image();
nextImage.src = url + images[1];

var prevImage = null;


function setImage(num){
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
