#!/bin/bash
#remove the # from before the following two lines:
#sudo apt-get install python-pip
#sudo pip install jsmin
python -m jsmin init.js utils.js imagereel.js frame.js painters.js scrollTracker.js scroller.js workpage.js frontpage.js staging.js transitions.js setup.js > my.min.js
