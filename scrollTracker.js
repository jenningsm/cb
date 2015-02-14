
//to simulate newtonian motion, we use the current yoffset of the page as the current time

var speed = .0008;
//the distance over which the image will accelerate (or decelerate) as the page scrolls (as a porportion of the viewport height)
var accelDist = .5 * .5;
//aceleration value
var accel = speed * speed / (2 * accelDist);
//time spent acelerating
var accelTime = Math.sqrt(2 * accelDist / accel);
//distance over which the img travels at constant velocity
var travelDist = .5 - accelDist;
//time over which the the img travels at a constant velocity
var constTime = travelDist / speed;
//total time, from when the img enters the page to when it has exited
var totalTime = 2 * (constTime + accelTime);

function createScrollTracker(numImages){

  var bannerOpacity;
  var frameOpacity;
  var imgPosition;

  return function(itemNum, x){

    x = Math.max(0, Math.min(1, x));

    if(itemNum === 0){ //fade the banner out to images
       imgPosition = imgTracker(Math.max(.5, x));
       if(x < .5){
         bannerOpacity = 1 - 2 * x;
         frameOpacity = 1 - bannerOpacity;
       } else {
         bannerOpacity = 0;
         frameOpacity = frameTracker(x);
       }
    } else if ( itemNum > 0 && itemNum != numImages){//run the images
       imgPosition = imgTracker(x);
       frameOpacity = frameTracker(x);
       bannerOpacity = 0;
    } else {//fade the banner back in, x should never be greater than .5 in this instance, after .5 it should wrap back to top
       bannerOpacity = 2 * x;
       frameOpacity = 0;
       imgPosition = imgTracker(x);
    }

    bannerOpacity = Math.min(1, Math.max(0, bannerOpacity));
    frameOpacity = Math.min(1, Math.max(0, frameOpacity));
    imgPosition = Math.min(1, Math.max(0, imgPosition));

    return {'imgPosition' : imgPosition, 'frameOpacity' : frameOpacity, 'bannerOpacity' : bannerOpacity };
     
  }
}


function imgTracker(through){
  var translate;

  var pos = through * totalTime;

  if(pos < constTime){
    translate = pos * speed;
  }else if (pos < constTime + accelTime){
    translate = .5 - .5 * accel * Math.pow(accelTime + constTime - pos , 2);
  } else if(pos < totalTime - constTime){
    translate = .5 + .5 * accel * Math.pow(pos - (accelTime + constTime) , 2);
  } else {
    translate = 1 - (totalTime - pos) * speed;
  }

  return translate;
}

function frameTracker(through){
  var frameOpacity;

  var pos = through * totalTime;

  if(pos < constTime){
    frameOpacity = 0;
  }else if (pos < constTime + accelTime){
    frameOpacity = (pos - constTime) / accelTime;
  } else if(pos < totalTime - constTime){
    frameOpacity = 1 - ((pos - (constTime + accelTime)) / accelTime);
  } else {
    frameOpacity = 0;
  }
  return frameOpacity;
}

