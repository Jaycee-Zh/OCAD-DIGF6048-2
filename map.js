
// ------ set the map
function setMap(params) {   
    // ---- draw the maze
    for (let i = 0; i * blockSize < canvasSize[0] + pixelSize; i++) {
      for (let j = 0; j * blockSize < canvasSize[1] - pixelSize; j++) {
        let onTheWay = path.some(
          (p)=> p[0] >= i * blockSize && p[0] <= (i+1) * blockSize && p[1] >= j * blockSize && p[1]<=(j+1)*blockSize
        );
        if(!onTheWay){
          let a = new block(blockSize * i+pixelSize, blockSize * j-pixelSize, floor(6 * random()));
          a.set();
        }
      }
    }
}

function showBoundary(params) {
     // ---- draw the boundary
     push();
     stroke(brickEdgeColour);
     fill(brickColour);
     // top
     for (let i = 0;  i * pixelSize < endPoint[0] - pixelRd * 4; i++){
         drawBrick(pixelSize * i+pixelRd, pixelRd) 
     }
     // bottom
     for (let i = 0;  i * pixelSize < canvasSize[0]; i++){
         drawBrick(pixelSize * i+startPoint[0]+pixelSize, canvasSize[1]-pixelRd) 
     }
     // left
     for (let j = 0;  j * pixelSize < startPoint[1] - pixelSize; j++){
         drawBrick(pixelRd,pixelSize * j+pixelRd) 
     }
      // right
      for (let j = 0;  j * pixelSize < canvasSize[1]; j++){
         drawBrick(canvasSize[0]-pixelRd, pixelSize * j+endPoint[1]+pixelRd*4) 
     }
     pop();
}

// ------ create a path for the player 
//todo: add some left/down path - later
function findPath() {
    push();
    fill(0, 255, 0);
    noStroke();
    let i = startPoint[0], j = startPoint[1]; // start from the start point
    while (i < endPoint[0] || j>endPoint[1]) { // if doesn't reach the right and top edges
      let stepsX = random(1, 5); // random numbers for step
      for (let s = 0; s < stepsX; s++) {
        // square(i, j, 4); // draw it out for debugging
        i = (i >= endPoint[0]) ? endPoint[0]:i+playerSize*2; // draw a few steps
        // i = (i <= startPoint[0])?startPoint[0]:i+playerSize*2;
        path.push([i,j]);  
      }
      let stepsY = random(1, 5);
      for (let s = 0; s < stepsY; s++) {
        // square(i, j, 4); // for debugging
        j = (j < endPoint[1])? endPoint[1]:j-playerSize*2;
        // j = (j >= startPoint[1])? startPoint[1]:j-playerSize*2;
        path.push([i,j]);
      }
    }
    pop();
  }
  
  
  // ------ blocks
  function block(x, y, shapeIndex, visibility = true) { //
    this.x = x + pixelRd;
    this.y = y + pixelRd;
    this.visibility = visibility;
    let shape = blockShapes[shapeIndex];
    let brickPos = shape.map(
      ([m, n]) => [
        this.x + m * pixelSize,
        this.y + n * pixelSize
      ]
    )
    this.map = brickPos.map(([m, n]) => [[m - distance, m + distance], [n - distance, y + n + distance]]);
  
    blocks.push(this);
    blockMap.push([[this.x, this.x + blockScale * pixelSize], [this.y, this.y + blockScale * pixelSize]]); // not sure useful
  
    this.set = function () {
      for (let i = 0; i < brickPos.length; i++) {
        setBrick(brickPos[i][0], brickPos[i][1]);
      }
    };

    this.show = function(){
        push();
        stroke(brickEdgeColour);
        fill(brickColour);
        for (let i = 0; i < brickPos.length; i++) {
          drawBrick(brickPos[i][0], brickPos[i][1]);
        }
        pop();
    }
  
    this.draw = function () {
      if (playerX >= x-playerSize && playerX <= x + blockSize+playerSize && playerY >= y-playerSize && playerY <= y + blockSize+playerSize){
        push();
        stroke(brickEdgeColour);
        fill(brickColour);
        for (let i = 0; i < brickPos.length; i++) {
          drawBrick(brickPos[i][0], brickPos[i][1]);
        }
        pop();
      }
    }
  }

  // draw the whole map
  function showMap(){
    push();
    fill(255,255,255);
    rect(canvasSize[0]/2, canvasSize[1]/2,canvasSize[0]/2, canvasSize[1]/2);
    pop();
    for (let i = 0; i < blocks.length; i++) {
        let b = blocks[i];
        b.show();
      }
  }
  
  // draw a single brick
  // single out these function in case need to add more in the future
  function drawBrick(x, y) {
    square(x, y, pixelRd);
  }
  
  // set up  a single brick
  function setBrick(x, y) {
    // drawBrick(x, y); //for debugging
    brickMap.push([[x-distance,x+distance],[y-distance,y+distance]]);
  }