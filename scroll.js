
//the path to the images
var imagepath = "./links/";

//images belonging to each page
var art = ["cba1.jpg", "cba2.jpg", "cba3.jpg", "cba4.jpg", "cba5.jpg","cba6.jpg","cba7.jpg","cba8.jpg","cba9.jpg","cba10.jpg","cba11.jpg","cba12.jpg"];
var photos = ["cbp1.jpg", "cbp2.jpg", "cbp3.jpg", "cbp4.jpg", "cbp5.jpg","cbp6.jpg","cbp7.jpg","cbp8.jpg","cbp9.jpg","cbp10.jpg"];


//to simulate newtonian motion, we use the current yoffset of the page as the current time

var speed = .0005;
//the distance over which the image will accelerate (or decelerate) as the page scrolls (as a porportion of the viewport height)
var accelDist = .5 * .5;
//aceleration value
var accel = speed * speed / (2 * accelDist);
//time spent acelerating
var accelTime = Math.sqrt(2 * accelDist / accel);
//distance over which the img travels at constant velocity
var travelDist = .5 - accelDist;
//time over which the the img travels at a constant velocity
var travelTime = travelDist / speed;
//time spent with the image in the center, not moving at all
var pauseTime = 700;
//total time, from when the img enters the page to when it has exited
var totalTime = pauseTime + 2 * (travelTime + accelTime);
//the amount of time over which the banner at the top of the page fades out, only in the very beginning
var bannerFadeOut = 1300;
//offset for starting purposes
var offset = (totalTime - pauseTime) * .5 - (bannerFadeOut+250);


function setHeight(numImages){
  document.body.style.height = (height + numImages * totalTime - totalTime * .5 - offset) + "px";
}

function scrollValues(){

  var scroll = window.pageYOffset + offset;
  var pos = scroll % (totalTime);
  var itemNum = Math.max(Math.floor(scroll / totalTime), 0);

  var bannerOpacity = 0;
  if(itemNum === 0){
    bannerOpacity = 1 - (scroll - offset) / bannerFadeOut;
    pos = Math.max(totalTime * .5, pos);
  }

  var translate;
  var frameOpacity;

  if(pos < travelTime){
    translate = pos * speed;
    frameOpacity = 0;
  }else if (pos < travelTime + accelTime){
    translate = .5 - .5 * accel * Math.pow(accelTime + travelTime - pos , 2);
    frameOpacity = (pos - travelTime) / accelTime;
  } else if(pos < travelTime + accelTime + pauseTime){
    translate = .5;
    frameOpacity = 1;
  } else if(pos < totalTime - travelTime){
    translate = .5 + .5 * accel * Math.pow(pos - (accelTime + travelTime + pauseTime) , 2);
    frameOpacity = (1 - (pos - (travelTime + accelTime + pauseTime)) / accelTime);
  } else {
    translate = 1 - (totalTime - pos) * speed;
    frameOpacity = 0;
  }

  if(itemNum === 0 && pos <= totalTime * .5){
    frameOpacity = 1 - bannerOpacity;
  }

  return {'frameOpacity' : frameOpacity, 'bannerOpacity' : bannerOpacity, 'imgPosition' : translate, 'itemNum' : itemNum};

}

