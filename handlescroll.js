
function imageMover(x){
  imgContainer.style.transform = "translate3d(0, -" + translate * 100 + "%, 0)";
}
function framePainter(x) { 
  lv.style.opacity = x; 
  rv.style.opacity = x;
  bh.style.opacity = x;
  th.style.opacity = x;
}
function bannerPainter(x){
   banner.style.opacity = x;
} 

function createScroller(images){

  setHeight(images.length);
  var setImage = imageReel(images);
  var curr = 0;

  return function(){
    var values = scrollValues();
  
    if(curr !== values.itemNum){
      setImage(values.itemNum);
      curr = values.itemNum;
    }
  
    framePainter(values.frameOpacity);
    bannerPainter(values.bannerOpacity);
    imageMover(values.imgPosition);
  }
}
