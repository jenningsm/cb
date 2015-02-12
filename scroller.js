
function imageMover(x){
  imgContainer.style.transform = "translate3d(0, -" + x * (height + imgElement.clientHeight) + "px, 0)";
}

function framePainter(x) { 
  lv.style.opacity = x; 
  rv.style.opacity = x;
  bh.style.opacity = x;
  th.style.opacity = x;
}
function bannerPainter(x){
   banner.style.opacity = x;
   decoration.style.opacity = x;
} 

function createScroller(images){

  var scrollValues = createScrollTracker(images.length);
  var setImage = imageReel(images);
  var curr = -1;
  var bannervis = true;

  var bannerOpacity = -1;

  function scr(){
    var values = scrollValues();
  
    if(curr !== values.itemNum){
      setImage(values.itemNum);
      curr = values.itemNum;
      imageMover(0);
    } else {
      if(values.bannerOpacity !== bannerOpacity){
        if(values.bannerOpacity <= 0 && bannervis){
          banner.style.pointerEvents = 'none';
          bannervis = false;
        } else if (!bannervis && values.bannerOpacity > 0){
          banner.style.pointerEvents = 'auto';
          bannervis = true;
        }
        bannerPainter(values.bannerOpacity);
        bannerOpacity = values.bannerOpacity;
      }
      imageMover(values.imgPosition);
      framePainter(values.frameOpacity);
    }
  }

  return function() { requestAnimationFrame(scr); };
}
