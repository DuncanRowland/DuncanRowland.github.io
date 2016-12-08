//(C) Duncan Rowland 8/Dec/2016 drowland@lincoln.ac.uk

var canvas;

function setup() {
  canvas = createCanvas(512, 512);
  stroke(0);
  noFill();
  frameRate(1); //1 FPS
}

function drawTriangles(v1, v2, v3, depth) {
  if(depth==0) {
    var V=(v2.y-v1.y)>>1; //In/Out Velocity for bezier
    bezier(v1.x, v1.y, v1.x, v1.y+V, v2.x, v2.y-V, v2.x, v2.y);
    bezier(v3.x, v3.y, v3.x, v3.y+V, v2.x, v2.y-V, v2.x, v2.y);
  } else {
    var v4 = { x:(v1.x+v2.x)>>1, y:(v1.y+v2.y)>>1 }; //halfway between v1 and v2
    var v5 = { x:(v2.x+v3.x)>>1, y:(v2.y+v3.y)>>1 }; //halfway between v2 and v3
    var v6 = { x:(v1.x+v3.x)>>1, y:(v1.y+v3.y)>>1 }; //halfway between v1 and v3
    drawTriangles(v1, v4,  v6, depth-1);
    drawTriangles(v4, v6,  v5, depth-1);
    drawTriangles(v6, v5,  v3, depth-1);
    drawTriangles(v4, v2,  v5, depth-1);
  }
}

function draw() {
   clear();
   drawTriangles( {x:0,y:512}, {x:256,y:0}, {x:512,y:512}, frameCount%6 )
}
