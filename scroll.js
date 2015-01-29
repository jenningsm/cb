
function setupScroll(){
  var im = document.getElementById("image");
  var banner = document.getElementById("banner");  

  var speed = .0004;
  
  var accelDist = .5 * .5;
  var accel = speed * speed / (2 * accelDist);
  var accelTime = Math.sqrt(2 * accelDist / accel);
  
  var travelDist = .5 - accelDist;
  var travelTime = travelDist / speed;
  
  var pauseTime = 750;
  var totalTime = pauseTime + 2 * (travelTime + accelTime);

  var bannerFadeOut = 1000;
  var offset = totalTime * .5 - pauseTime - bannerFadeOut;

  document.body.style.height = (window.innerHeight + images.length * totalTime - totalTime * .5 - offset) + "px";

  var last = 0;
  
  function scroll(){
    var scroll = window.pageYOffset + offset;
    var pos = scroll % (totalTime);
    var item = Math.max(Math.floor(scroll / totalTime), 0);
    if(item === 0){
      banner.style.opacity = 1 - window.pageYOffset / bannerFadeOut;
      pos = Math.max(totalTime * .5, pos);
    }
    var con = document.getElementById("bwork");
  
    if(item != last){
      changeImage(item > last);
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
  
  window.addEventListener('scroll', function(){requestAnimationFrame(scroll)});
}

setupScroll(); 
