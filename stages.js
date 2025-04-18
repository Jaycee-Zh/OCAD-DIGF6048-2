function checkStage(params) {
    // losing
    if (playerHealth <= 0) {
        stage = 'startOver'
    }
    // startOver
    if (stage == 'round1') {
        if (playerX > winningArea[0][0] && playerX < winningArea[0][1] && playerY > winningArea[1][0] && playerY < winningArea[1][1]) {            
            stage = 'startOver';            
        }
        // if(playerStatus == 'lost'){}
    }

    // win
    if (stage == 'round2') {
        if (playerX > winningArea[0][0] && playerX < winningArea[0][1] && playerY > winningArea[1][0] && playerY < winningArea[1][1]) {
            // noLoop();
            stage = 'win'; //bug !!
            playerStatus='win';
        }
    }

}


function setStage(params) {
    switch (stage) {
        case 'start':
            break;
        case 'round1':
            break;
        case 'startOver':
            pauseGame();
            break;
        case 'round2':
            // loop();
            // playerHealth = playerInitialHealth;
            break;
        case 'win':
            finishGame()
            break;
        default:
            break;
    }
    // console.log(stage);
}

// ------ toggle stage
function startGame() {
    main.classList.replace('before', 'playing');
    // initialScreen.classList.add('hide');
    // gameCon.classList.remove('hide');
    stage = 'round1';
}
function skipGame() {
    // poster.classList.remove('hide');
    // initialScreen.classList.add('hide');
    // gameCon.classList.add('hide');
    playerStatus='win';
    stage='win';
    let mainStage = main.classList;
    main.classList.replace(mainStage, 'after');
    // stage = 'win';
}
function finishGame() {
    // resizePlayerView();
    main.classList.replace('playing','after');
    // if (frameCount - current > 3 * frameRate) {
    // }
    // if (frameCount - current > 5 * frameRate) {
    // }
}
function pauseGame() {
    noLoop();
    main.classList.replace('playing', 'pause');
    // statusIsLose.play();
    // pauseSound.play();
}
function newRoundGame() {
    // noLoop();
    playerHealth = playerInitialHealth;
    stage = 'round2';
    resetCanvas();
    main.classList.replace('pause', 'playing');
    loop();
}
function restartGame() {
    main.classList.replace('after', 'before');
    stage = 'start';
    resetCanvas();
}



function resetCanvas(){
    playerX = startPoint[0], playerY = startPoint[1];
    path = [];
    blocks = [];
    brickMap = [];
    npcIndexes = [];
    npcs = [];
    if(stage=='round2'){
        playerHealth = playerInitialHealth/4*3;
    }else{
        playerHealth = playerInitialHealth;
    }
    //---- set the map
    findPath();
    setMap();
    drawPlayer(playerStatus);

    // ---- set the stage
    setStage();
  
    setNPC(); 
    
  
    // ---- 
    // initialPlayerView();
  }