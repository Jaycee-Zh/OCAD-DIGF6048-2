// ------ put a npc
// random a index in the path[]
// put an npc
// set npc location
function setNPC() {
    let npcGap = int(path.length / npcNumber);
    for (let i = 1; i * npcGap < path.length - 6; i++) {
        npcIndexes.push(i * npcGap);
    }
    // console.log(npcGap,npcIndexes);

    for (let i = 0; i < npcIndexes.length; i++) {
        let npc = [random(npcIcons), path[npcIndexes[i]][0], path[npcIndexes[i]][1]];
        npcs.push(npc);
    }
}

function drawNPC() {
    push();
    for (let i = 0; i < npcs.length; i++) {
        let d = dist(playerX,playerY, npcs[i][1],npcs[i][2])
        if (d<=npcViewRd){
            textSize(playerSize * 2 * 0.9); // 0.9 to fix visual error
            textAlign(CENTER, CENTER);
            text(npcs[i][0], npcs[i][1], npcs[i][2] - 1); // 1 to correct visual error
            playerHealth++;
            // playerStatus='happy'; // todo should move to other place
        }
    }
    pop();
}

// ------ interaction
// if the player is close
// show the npc
// wait for 1s (player is surprised, then back to before; npc look right-top corner), and draw(grow) a mask toward the end point
// 
// function findNPC(){
//     for (let i = 0; i < npcs.length; i++) {
//         let d = dist(playerX,playerY, npcs[i][1],npcs[i][2])
//         if (d<=npcViewRd){
//             playerStatus='happy';
//         }
//     }
// }

// ------ shine 
function shine(x, y) {
    push();
    fill(255, 255, 255);
    // circle(x + npcViewRd / 4, y - npcViewRd / 4, npcViewRd); // todo: add animation
    circle(x, y, npcViewRd); // todo: add animation
    pop();
}

// ------ the light mask
function npcLight() {
    for (let i = 0; i < npcs.length; i++) {
        let d = dist(playerX,playerY, npcs[i][1],npcs[i][2])
        if (d<=npcViewRd){
            shine(npcs[i][1], npcs[i][2]);
            // npcIsFound.play();
        }
    }
}
