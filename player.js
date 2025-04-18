// the player
function updatePlayer(params) {

    // Update x and y if an arrow key is pressed.
    if (keyIsDown(LEFT_ARROW) === true) {
        // if player hits any pixel, or boundary, consider they are blocked
        isBlocked_toL = brickMap.some(
            (b) => playerX - speed < b[0][1] && playerX - speed > b[0][0] && playerY >= b[1][0] && playerY <= b[1][1]
        ) || ((playerX - speed < startPoint[0]) && (playerY < startPoint[1] - pixelRd)) || ((playerX - speed < endPoint[0] - pixelSize) && (playerY < pixelSize))
        playerX = isBlocked_toL ? playerX : playerX - speed;
        // if(isBlocked_toL){           
        //     leftIsBlocked.play();
        // }else{
        //     left.play();
        // }
    }

    if (keyIsDown(RIGHT_ARROW) === true) {
        isBlocked_toR = brickMap.some(
            (b) => playerX + speed > b[0][0] && playerX + speed < b[0][1] && playerY > b[1][0] && playerY < b[1][1]
        ) || ((playerX + speed > endPoint[0]) && (playerY > endPoint[1] + pixelSize)) || ((playerX + speed > startPoint[0]) && (playerY
            > canvasSize[1] - pixelSize));
        playerX = isBlocked_toR ? playerX : playerX + speed;
        // if(isBlocked_toR){           
        //     rightIsBlocked.play();
        // }else{
        //     right.play();
        // }
    }

    if (keyIsDown(UP_ARROW) === true) {
        isBlocked_toU = brickMap.some(
            (b) => playerX > b[0][0] && playerX < b[0][1] && playerY - speed < b[1][1] && playerY - speed > b[1][0]
        ) || ((playerY - speed < endPoint[1]) && (playerX < endPoint[0] - pixelSize)) || ((playerX < pixelSize) && (playerY - speed < startPoint[1]))
        playerY = isBlocked_toU ? playerY : playerY - speed;
        // if(isBlocked_toU){           
        //     upIsBlocked.play();
        // }else{
        //     up.play();
        // }
    }

    if (keyIsDown(DOWN_ARROW) === true) {
        isBlocked_toD = brickMap.some(
            (b) => playerX > b[0][0] && playerX < b[0][1] && playerY + speed > b[1][0] && playerY + speed < b[1][1]
        ) || ((playerY + speed > startPoint[1]) && (playerX > startPoint[0])) || ((playerX > canvasSize[0] - pixelSize) && (playerY + speed > endPoint[1] + pixelSize))
        playerY = isBlocked_toD ? playerY : playerY + speed;
        // if(isBlocked_toD){           
        //     downIsBlocked.play();
        // }else{
        //     down.play();
        // }
    }

    // debug
    // console.log( isBlocked_toR, isBlocked_toL,isBlocked_toU,isBlocked_toD);
    // console.log(playerX, playerY)
}


// draw the player
function drawPlayer(status) {
    push()
    textSize(playerSize * 2 * 0.9); // 0.9 to fix visual error
    textAlign(CENTER, CENTER);
    setStatus(status);
    text(player, playerX, playerY - 1); // 1 to correct visual error
    pop();
}

function checkStatus(params) {
    let playerStatusNumber

    if (isBlocked_toD || isBlocked_toL || isBlocked_toR || isBlocked_toU) {
        // let hurt;
        if (keyIsPressed) {
            playerHealth--;
            // ouch.play();
            // hurt = 1;
        } else {
            // hurt = 0;
        }
        // if (playerHealth < 0) {
        //     playerStatus = 'lost'
        // }
    } else {
        // player = 'neutral'
    }
    playerStatusNumber = floor(map(playerHealth, playerInitialHealth, 0, 5, 0))
    switch (playerStatusNumber) {
        case 5:
            playerStatus = 'happy'
            break;
        case 4:
            playerStatus = 'neutral'
            break;
        case 3:
            playerStatus = 'hurt1'
            break;
        case 2:
            playerStatus = 'hurt2'
            break;
        case 1:
            playerStatus = 'hurt3'
            break;
        case 0:
            playerStatus = 'lost'
            break;
        default:
            playerStatus = 'like'
            break;
    }
}

function setStatus(status) {
    switch (status) {
        case 'neutral':
            player = '😐'
            break;
        case 'hurt1':
            player = '😥'
            break;
        case 'hurt2':
            player = '😖'
            break;
        case 'hurt3':
            player = '😡'
            break;
        case 'lost':
            player = '😭'
            break;
        case 'surprised':
            player = '😯'
            break;
        case 'happy':
            player = '🙂'
            break;
        case 'like':
            player = '🥰'
            break;
        case 'win':
            player = '😄'
            break;
        default:
            player = '🫥'
            break;
    }
}

// draw player's view
function initialPlayerView() {
    playerView = createDiv(' ');
    playerView.id('player_view')
    playerView.size(0, 0);
    playerView.position(endPoint[0],endPoint[1]);
}

function resizePlayerView() {
    playerView.size(1000, 1000);
}

function playerLight() {
    push();
    if (playerStatus == 'win') {
        fill(255, 255, 255);
        circle(playerX, playerY, 1000);
    // }
    // let d=dist(0,0,canvasSize[0],canvasSize[1]);
    
    // let animSpeed=d/2/frameRate;
    // if(playerStatus=='win'){
    //     let i=1;
    //     if (i<d){
    //         circle(playerX, playerY, i); 
    //         console.log(i);
            
    //     }
    // }
}
    pop();
}