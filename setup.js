
//the path to the images
var imagepath = "./links/";

//images belonging to each page
var art = ["cba1.jpg", "cba2.jpg", "cba3.jpg", "cba4.jpg", "cba5.jpg","cba6.jpg","cba7.jpg","cba8.jpg","cba9.jpg","cba10.jpg","cba11.jpg","cba12.jpg"];
var photos = ["cbp8.jpg", "cbp2.jpg", "cbp3.jpg", "cbp4.jpg", "cbp5.jpg","cbp6.jpg","cbp7.jpg","cbp1.jpg","cbp9.jpg","cbp10.jpg"];
var design = ["cbd6.jpg", "cbd2.jpg", "cbd3.jpg", "cbd4.jpg", "cbd5.jpg","cbd1.jpg","cbd7.jpg"];
var illustration = ["cbi1.jpg", "cbi2.jpg", "cbi3.jpg", "cbi4.jpg", "cbi5.jpg","cbi6.jpg","cbi7.jpg","cbi8.jpg","cbi9.jpg","cbi10.jpg","cbi11.jpg"];

loadImage(art[0]);
loadImage(photos[0]);
loadImage(design[0]);
loadImage(illustration[0]);

var page = frontPage();
var stop = page[1];
page[0]();
