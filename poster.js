function drawPoster(params) {
    push();
    fill(bgColour)
    rect(canvasSize[0]/2,canvasSize[1]/2,canvasSize[0],canvasSize[1]);
    fill(255)
    circle(playerX,playerY,200,200)
    drawPlayer('like');
    textSize(64);
    textAlign(CENTER);
    fill(250,100,100);
    text('Yeah!', canvasSize[0]/2, canvasSize[1]/2 );
    let btn = createButton('restart');
    btn.position(canvasSize[0]/2,canvasSize[1]/2 );
    btn.addClass('button')
    btn.mousePressed(
        ()=>{window.reload()}
    )
    let btn1 = createButton('restart');
    btn1.position(canvasSize[0]/2+200,canvasSize[1]/2 );
    btn1.addClass('button')
    pop();
}