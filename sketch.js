const key = 'pk.eyJ1IjoiYmxsZW5kZXIwMCIsImEiOiJja20xdG40bnowYTM4MnhqdnByc3Btc2ZpIn0.37LNeLIJhScs7Dxl8pQbCg';

const options = {
  lat: 40.9526,
  lng: -4.1325, 
  
  zoom: 10, 
  style: 'mapbox://styles/bllender00/ckm7emfq627in17s38taey2u2',
  pitch: 0,
}

const mappa = new Mappa('MapboxGL', key);
let myMap;
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  
  disney = loadTable('Disney_Inspo.csv', 'csv', 'header');
}

function draw() {
  clear();
  // noFill();
  
  const zoom = myMap.zoom();
  
  textSize(42);
  textFont('Mouse Memoirs');
  text('24 Locations That Inspired Disney', 12, 40);
  fill(255);
  rect(10, 50, 420, 80, 10);
  textSize(22);
  fill(0);
  text('Movie:', 20, 80);
  text('Location:', 20, 110);
  
  for(let i = 0; i < disney.getRowCount(); i++) {
    const lat = Number(disney.getString(i, 'lat'));
    const long = Number(disney.getString(i, 'long'));
    const pos = myMap.latLngToPixel(lat, long);
    
    let movie = disney.getString(i, 'movie');
    let marker = disney.getString(i, 'location');
    let size = disney.getString(i, 'size');
    
    size = map(size, 1, 30, 1, 25) + myMap.zoom();
    
    ellipse(pos.x, pos.y, size, size);
    fill('#feff96');
    noStroke();
    
    if(dist(pos.x, pos.y, mouseX, mouseY) < size) {
      textFont('sans-serif')
      fill('#76c59d');
      ellipse(pos.x, pos.y, size, size);
      fill('#fff');
      fill(0);
      textSize(18);
      text(movie, 65, 80);
      textSize(16);
      text(marker, 83, 110);
    }
    

  }//for disney
  
}//draw

// $(window).bind('resize', function(e)
// {
//   if (window.RT) clearTimeout(window.RT);
//   window.RT = setTimeout(function()
//   {
//     this.location.reload(false); /* false to get page from cache */
//   }, 200);
// });

