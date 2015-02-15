
function workPage(page){

  var scroller = createScroller(page);
  var footerType = 1;

  var lastDir = null;
  var bannerUp = true;

  var currPos = .5;
  var place = 0;

  function slide(dir){
    return function(cb){
  
      var mult = (dir === 'up' ? -1 : 1);
      var speed = .012;
      var x = 0;
      var moveBannerIn = ((place === page.length - 1 && dir === 'down') || (place === 1 && dir === 'up'));

      function s(){
        x += speed;
        currPos += speed * mult;
        if(currPos > 1){
          currPos = currPos % 1;
          place++;
          place = place % page.length;
        } else if (currPos < 0){
          currPos = (currPos + 1) % 1;
          place--;
          place = (place + page.length) % page.length;
        }

        if(x >= 1 && x - speed < 1){
          currPos = .5;
          scroller(place, currPos, (moveBannerIn ? 1 : 0));
          lastDir = dir;
          bannerUp = moveBannerIn;
          cb();
        } else {
          scroller(place, currPos, (moveBannerIn ? Math.max(0, 2 * (x - .5)) : 0), (moveBannerIn && x > .5));
          requestAnimationFrame(s);
        }
      }

      function b(way){
        return (function rec(){
          x += speed * .75;
          if(x > .5){
            scroller(place, currPos, way ? 1 : 0);
            lastDir = dir;
            bannerUp = way;
            cb();
          } else {
            scroller(place, currPos, way ? x * 2 : 1 - x * 2);
            requestAnimationFrame(rec);
          }
        });
      }
      

      if(place === page.length - 1 && dir === 'down' && footerType === 1){
        footerType = 0;
        footerContent.style.opacity = 1;
        footerInstruct.style.opacity = 0;
      }  

      var movement;
      if(dir !== lastDir && !bannerUp){
        movement = b(true);
      } else if(bannerUp){
        movement = b(false);
      } else {
        movement = s;
      }
      requestAnimationFrame(movement);
    }
  }

  var onSlide = function(e){
    stageTransition(slide(e.detail))
  }

  function resize(){
     scroller(place, currPos);
  }

  var decorationMove = function(){
    decoration.style.top = ((height - decoration.clientHeight) / 2) + 'px';
  }

  var imgpr = .5;
  var decpr = 1;
  function transition(otherFooterType){
    return function(x){
      if(x <= imgpr){
        imgElement.style.opacity = x / imgpr;
      } else {
        imgElement.style.opacity = 1;
      }
  
      if(x > 1 - decpr){
        decPainter(1, (x - (1 - decpr)) / decpr);
      } else {
        decPainter(1, 0);
      }
  
      if(otherFooterType != footerType){
        if(footerType === 1){
          footerInstruct.style.opacity = x;
        } else {
          footerContent.style.opacity = x;
        }
      }
    } 
  }


  function start(){
    scroller(0, .5, 1);
    decorationMove();

    window.addEventListener('slide', onSlide);
    window.addEventListener('resize', resize);
    window.addEventListener('resize', decorationMove);
    imgElement.addEventListener('load', resize);

    return footerType;
  }

  function stop(){
    window.removeEventListener('slide', onSlide);
    window.removeEventListener('resize', resize);
    window.removeEventListener('resize', decorationMove);
    imgElement.removeEventListener('load', resize);

    return footerType;
  }

  return { 'start' : start, 'stop' : stop, 'transition' : transition, 'footerType' : footerType};
}

