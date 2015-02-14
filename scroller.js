

function createScroller(images){

  var scrollValues = createScrollTracker(images.length);
  var setImage = imageReel(images);
  var curr = -1;
  var bannervis = true;

  var bannerOpacity = -1;

  return function(itemNum, x){
    var values = scrollValues(itemNum, x);

    if(itemNum != curr){
      curr = itemNum;
      setImage(curr % images.length);
    }
 
    if(values.bannerOpacity !== bannerOpacity){
      if(values.bannerOpacity <= 0 && bannervis){
        bannerPointerEvents(false);
        bannervis = false;
      } else if (!bannervis && values.bannerOpacity > 0){
        bannerPointerEvents(true);
        bannervis = true;
      }
      bannerPainter(values.bannerOpacity);
      bannerOpacity = values.bannerOpacity;
    }
    imageMover(values.imgPosition);
    framePainter(values.frameOpacity);
  }
}

var curr = 0;

