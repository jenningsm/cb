

function createScroller(images){

  var scrollValues = createScrollTracker(images.length);
  var setImage = imageReel(images);
  var curr = -1;
  var bannervis = true;

  var lastBannerOpacity = -1;
  var lastImgPosition = -1;
  var lastFrameOpacity = -1;

  return function(itemNum, x, bannerOpacity, suppressFrame){
    var values = scrollValues(itemNum, x);

    if(itemNum != curr){
      curr = itemNum;
      setImage(curr % images.length);
    }

    if(bannerOpacity === undefined){
      bannerOpacity = lastBannerOpacity;
    }
    if(suppressFrame === undefined){
      suppressFrame = false;
    }
 
    if(bannerOpacity !== lastBannerOpacity){
      if(bannerOpacity <= 0 && bannervis){
        banner.style.display = 'none';
        bannervis = false;
      } else if (!bannervis && bannerOpacity > 0){
        banner.style.display = 'inline';
        bannervis = true;
      }
      bannerPainter(bannerOpacity);
      lastBannerOpacity = bannerOpacity;
    }

    imageMover(values.imgPosition);
    lastImgPosition = values.imgPosition;

    var frameOpacity = (bannerOpacity > 0 ? Math.max(0, 1 - bannerOpacity) : values.frameOpacity);
    if(suppressFrame) { frameOpacity = 0; }

    if(frameOpacity != lastFrameOpacity){
      framePainter(frameOpacity);
      lastFrameOpacity = frameOpacity;
    }
  }
}
