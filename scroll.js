
//the path to the images
var imagepath = "./links/";

//images belonging to each page
var art = ["cba1.jpg", "cba2.jpg", "cba3.jpg", "cba4.jpg", "cba5.jpg","cba6.jpg","cba7.jpg","cba8.jpg","cba9.jpg","cba10.jpg","cba11.jpg","cba12.jpg"];

/*
   due to some wierd issues with scrolling, the scrolling function
   needs to be called every half second using setInterval. When, the
   scroll function changes, that call to setInterval for the old
   scroll function needs to be ended. the scrolling variable is used
   to do that
*/
var scrolling = null;

//the current scrolling function
var scroller = null;
//painter for the frame
var framePainter = frame([0,0], [0, 0], [0,0]);


function setupScroll(images){

  var speed = .0005;
  var accelDist = .5 * .5;
  var accel = speed * speed / (2 * accelDist);
  var accelTime = Math.sqrt(2 * accelDist / accel);
  var travelDist = .5 - accelDist;
  var travelTime = travelDist / speed;
  var pauseTime = 500;
  var totalTime = pauseTime + 2 * (travelTime + accelTime);
  var bannerFadeOut = 1000;
  var offset = (totalTime - pauseTime) * .5 - bannerFadeOut;

  var setImage = imageReel(images);
  document.body.style.height = (height + images.length * totalTime - totalTime * .5 - offset) + "px";

  var lastitem = -1;
  var lastpos = -1;
  var bannervis = true;
  
  window.removeEventListener('scroll', scroller);

  scroller = function(){
    var scroll = window.pageYOffset + offset;

    var pos = scroll % (totalTime);
    var item = Math.max(Math.floor(scroll / totalTime), 0);
    if(item === 0){
      var bopacity = 1 - (scroll - offset) / bannerFadeOut;
      banner.style.opacity = bopacity;
      if(bannervis && bopacity <= 0){
        banner.style.pointerEvents = "none";
        bannervis = false;
      } else if (!bannervis && bopacity > 0){
        banner.style.pointerEvents = "auto";
        bannervis = true;
      }
      if(pos < totalTime * .5){
        framePainter((scroll - offset) / bannerFadeOut);
      }
      pos = Math.max(totalTime * .5, pos);
    }
  
    if(item != lastitem){
      setImage(item);
      var cheight = imgElement.clientHeight;
      var cwidth = imgElement.clientWidth;
      var dir = (cwidth / cheight > 1);

      var vertOffset = (cheight + (height - cheight) * (dir ? .4 : .6)) * .5;
      var horzOffset = (cwidth + (width - cwidth) * (dir ? .5 : .3)) * .5;

      framePainter = frame([horzOffset, vertOffset], [.25, .25], [.5, .5]);

    }
    lastitem = item;
  
    var translate;
  
    if(pos < travelTime){
      translate = pos * speed;
    }else if (pos < travelTime + accelTime){
      translate = .5 - .5 * accel * Math.pow(accelTime + travelTime - pos , 2);
      framePainter((pos - travelTime) / accelTime);
    } else if(pos < travelTime + accelTime + pauseTime){
      translate = .5;
    } else if(pos < totalTime - travelTime){
      translate = .5 + .5 * accel * Math.pow(pos - (accelTime + travelTime + pauseTime) , 2);
      framePainter(1 - (pos - (travelTime + accelTime + pauseTime)) / accelTime);
    } else {
      translate = 1 - (totalTime - pos) * speed;
    }
    translate = translate * (height +  imgElement.clientHeight);
    if(pos != lastpos){
      /*
        Only really need a regular 2d translate here, but the images were sort of flickering in chrome as you scrolled, and this fixed it
        one post I read said using translate3d forces hardware acceleration, but it was my understanding that all transforms
        are hardware accelerated anyways. another I read said that using translate3d puts the element in its own layer so that it
        doesn't get repainted on scrolling.

        the regular 2d transform works fine in firefox
      */
      imgContainer.style.transform = "translate3d(0, -" + translate + "px, 0)";
      lastpos = pos;
    }
  }

  function rafs(){
    requestAnimationFrame(scroller);
  }

  clearInterval(scrolling);
  scrolling = setInterval(rafs, 500);
  
  window.addEventListener('scroll', rafs);
}

setupScroll(art); 
