
var art = ["cba1.jpg", "cba2.jpg", "cba3.jpg", "cba4.jpg", "cba5.jpg","cba6.jpg","cba7.jpg","cba8.jpg","cba9.jpg","cba10.jpg","cba11.jpg","cba12.jpg"];

var scrolling = null;
var scroller = null;

function setupScroll(images){
  var im = document.getElementById("image");
  var con = document.getElementById("bwork");
  var banner = document.getElementById("banner");  

  var speed = .0005;
  var accelDist = .5 * .5;
  var accel = speed * speed / (2 * accelDist);
  var accelTime = Math.sqrt(2 * accelDist / accel);
  var travelDist = .5 - accelDist;
  var travelTime = travelDist / speed;
  var pauseTime = 750;
  var totalTime = pauseTime + 2 * (travelTime + accelTime);
  var bannerFadeOut = 1000;
  var offset = (totalTime - pauseTime) * .5 - bannerFadeOut;

  var setImage = imageReel(images);
  document.body.style.height = (window.innerHeight + images.length * totalTime - totalTime * .5 - offset) + "px";

  var last = 0;
  
  window.removeEventListener('scroll', scroller);

  scroller = function(){
    var scroll = window.pageYOffset + offset;

    var pos = scroll % (totalTime);
    var item = Math.max(Math.floor(scroll / totalTime), 0);
    if(item === 0){
      banner.style.opacity = 1 - window.pageYOffset / bannerFadeOut;
      pos = Math.max(totalTime * .5, pos);
    }
  
    if(item != last){
      setImage(item);
    }
    last = item;
  
    var translate;
  
    if(pos < travelTime){
      translate = pos * speed;
    }else if (pos < travelTime + accelTime){
      translate = .5 - .5 * accel * Math.pow(accelTime + travelTime - pos , 2);
    } else if(pos < travelTime + accelTime + pauseTime){
      translate = .5;
    } else {
      translate = .5 + .5 * accel * Math.pow(pos - (accelTime + travelTime + pauseTime) , 2);
    }
    translate = 100 * translate * (1 + window.innerHeight / im.clientHeight);
    con.style.transform = "translate(0, -" + translate + "%)";
  
  }

  function rafs(){
    requestAnimationFrame(scroller);
  }

  clearInterval(scrolling);
  scrolling = setInterval(rafs, 500);
  
  window.addEventListener('scroll', rafs);
}

setupScroll(art); 
