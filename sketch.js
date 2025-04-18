
function preload(){
  up = loadSound('assets/move-up.mp3');
  down = loadSound('assets/move-down.mp3');
  left = loadSound('assets/move-left.mp3');
  right = loadSound('assets/move-right.mp3');
  upIsBlocked = loadSound('assets/blocked-up.mp3');
  downIsBlocked = loadSound('assets/blocked-down.mp3');
  leftIsBlocked = loadSound('assets/blocked-left.mp3');
  rightIsBlocked = loadSound('assets/blocked-right.mp3');
  ops=loadSound('assets/bump-ops.mp3');
  ouch=loadSound('assets/bump-ouch.mp3');
  npcIsFound = loadSound('assets/npc-found.mp3');
  statusIsLose = loadSound('assets/stage-lose.mp3');
  pauseSound = loadSound('assets/screen-pause.mp3');
}

// ------ setup ------
function setup() {
  // ---- canvas
  let cnv=createCanvas(canvasSize[0], canvasSize[1], P2D, game);
  canvasAbsPos = cnv.position();

  describe(
    'A invisible map game. Use the arrows on the keyboard to control a player starting the left-bottom corner to get a dumpling at the right-top corner.'
  );

  // ---- setup
  ellipseMode(RADIUS);
  rectMode(RADIUS);

  frameRate(20);
 
  resetCanvas(); 


  stroke(brickEdgeColour);
  fill(brickColour);

  //todo should be able to simplify
  up.playMode('untilDone');
  down.playMode('untilDone'); 
  left.playMode('untilDone'); 
  right.playMode('untilDone');
  upIsBlocked.playMode('untilDone') ;
  downIsBlocked.playMode('untilDone');
  leftIsBlocked.playMode('untilDone');
  rightIsBlocked.playMode('untilDone');
  ops.playMode('untilDone');
  ouch.playMode('untilDone');
  npcIsFound.playMode('untilDone') 
  statusIsLose.playMode('untilDone') ;
  pauseSound.playMode('untilDone') ;

  //---- for debugging
  // console.log(blocks);
  // console.log(path);  
  // console.log(brickMap);

}



// ------ draw ------
function draw() {
  background(bgColour); // if debug, comment out

  // console.log(playerX,playerY);
  setStage();
  // console.log(stage);
  

  for (let i = 0; i < blocks.length; i++) {
    let b = blocks[i];
    b.draw();
  }

  if(stage=='round2'||stage=='win'){
    push();
    // light
    clip(light);
    // draw the map out
    showMap();
    pop(); 
    drawNPC();
  }
  // if (stage == 'round2') {
  // }
  // if (stage == 'round1') {

  // }

  showBoundary()

  // end point
  if(stage!='win'){
    push();
    textSize(rewardSize * 2);
    textAlign(CENTER, CENTER);
    text('🥟', endPoint[0] - 1, endPoint[1] - 1);
    pop();
  }

  if(stage=='round1'||stage=='round2'){
    updatePlayer();
    checkStatus();
  }
  drawPlayer(playerStatus);

// player's view
  // div.position(playerX+canvasAbsPos[0],playerY+canvasAbsPos[1]);
  // playerView.position(playerX,playerY);
  // console.log(div.position());  
  checkStage();
  
};


function light(){
  npcLight();
  playerLight();
  // circle(playerX, playerY, 1000); 
}

// todo use setVolume
// function toggleVol(){
//   if(up.volume()>0){
//     up.volume(0);
//     down.volume(0); 
//     left.volume(0); 
//     right.volume(0);
//     upIsBlocked.volume(0) ;
//     downIsBlocked.volume(0);
//     leftIsBlocked.volume(0);
//     rightIsBlocked.volume(0);
//     ops.volume(0);
//     ouch.volume(0);
//     npcIsFound.volume(0) 
//     statusIsLose.volume(0) ;
//     pauseSound.volume(0) ;
//   }else{
//     up.volume(0.7);
//     down.volume(0.7); 
//     left.volume(0.7); 
//     right.volume(0.7);
//     upIsBlocked.volume(0.7) ;
//     downIsBlocked.volume(0.7);
//     leftIsBlocked.volume(0.7);
//     rightIsBlocked.volume(0.7);
//     ops.volume(0.7);
//     ouch.volume(0.7);
//     npcIsFound.volume(0.7) 
//     statusIsLose.volume(0.7) ;
//     pauseSound.volume(0.7) ;
//   }
 
// }