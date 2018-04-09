var canvas = document.querySelector("canvas");
canvas.width = 640;
canvas.height = 640;
var ROWS = 10;
var COLS = 10;
var gameTime = 180;
var uInt;
var context = canvas.getContext("2d");
var surface = canvas.getContext("2d");

var eScript = document.createElement("script");
eScript.src = "Enemies.js";
eScript.setAttribute("id", "enemies");
document.body.appendChild(eScript);

var levelScript = document.createElement("script");
levelScript.src = "Levels.js";
levelScript.setAttribute("id", "levels");
document.body.appendChild(levelScript);

var tdScript = document.createElement("script");
tdScript.src = "TopDown.js";
tdScript.setAttribute("id", "topDown");
document.body.appendChild(tdScript);

var cScript = document.createElement("script");
cScript.src = "Combat.js";
cScript.setAttribute("id", "combat");
document.body.appendChild(cScript);

var bgImage = new Image();
var titleImage = new Image();
var playImage = new Image();
var logoImage = new Image();
var backDrop = new Image();
var gameOver = new Image();

bgImage.src = "../img/dungeon_background.png";
titleImage.src = "../img/gametitle.png";
playImage.src = "../img/playbutton.png";
logoImage.src = "../img/patchwork.png";
backDrop.src = "../img/backdrop.png";
gameOver.src = "../img/game over.png";

var mouse = {x:0, y:0}; // Keeping track of the mouse position in the canvas.
var mouseDown = false;  // Like a keypressed flag, I am recording if the mouse has been pressed.

canvas.addEventListener("mousemove", updateMouse);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);


var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.addEventListener("keydown", nextLevel)

var play = false;
var inCombat = false;
var levelComplete = false;
var tKey = 0, cKey = 0;

var level = 0;

var imgStr = [  "path", "wall",
                "player", "player_flipped",
                "slime", "slime2", "slime_flipped", "slime2_flipped",
                "soldier_jump1", "soldier_jump2", "soldier_jump3",
                "playerTopDown1", "playerTopDown2", "playerTopDown1_flipped", "playerTopDown2_flipped"
             ];
var images = []; // array for image objects 0=path, 1=wall, 2=slime, 3=player

var tileSpriteStr = 
[                                              ["top_down_tile1","top_down_tile2","top_down_tile3","top_down_tile4","top_down_tile5",
"top_down_tile6","top_down_tile7","top_down_tile8","top_down_tile9","top_down_tile10",
"top_down_tile11","top_down_block_tile1", "top_down_block_tile2"],
 
["Dirt-Tile1","Dirt-Tile2","Dirt-Tile3","Dirt-Tile4","Dirt-Tile5","Dirt-Tile6",
 "Desert-Tile1","Desert-Tile2","Desert-Tile3","Desert-Tile4","Desert-Tile5","top_down_block_tile1", "top_down_block_tile2"],
 
["Grass-Tile1","Grass-Tile2","Grass-Tile3","Grass-Tile4","Grass-Tile5","Dirt-Tile1",
"Dirt-Tile2","Dirt-Tile3","Grass-Tile8","Grass-Tile7","Grass-Tile6","top_down_block_tile1", "top_down_block_tile2"],
];

var tileSprites = 
    [
        [],
        [],
        [],
    ];

for(var i = 0; i < imgStr.length; i++)
	{
		images[i] = new Image();
		images[i].src = "../img/"+imgStr[i]+".png";
    }
for(var a = 0; a < tileSpriteStr.length; a++)
{
    for(var i = 0; i < tileSpriteStr[a].length; i++)
	{
		tileSprites[a][i] = new Image();
		tileSprites[a][i].src = "../img/Tiles/"+tileSpriteStr[a][i]+".png";
	}
}

var player =    // all variables for player
    {
        img:null,
        x:0,
        y:576,
        Speed:6,
        Sprite:0,
        topDownX:0,
        topDownY:0,
        inAir: false,
        jump: false,
        jumptimer:0,
    };

var debug = false;

function nextLevel(event)
{
    if(event.keyCode == 27)
        {
            debug = true;
        }
}

    var gameTimer = setInterval(function(){
          gameTime--;
          //console.log(gameTime);
          document.getElementById('timer').innerHTML = gameTime;
          if(gameTime <= 0){
            player.x = 0;
            player.y = 576;
            window.alert("Timed out, game over.");
            clearInterval(gameTimer);
          }
        }
         , 1000);

setUpdate();

function setUpdate()
{
    uInt = setInterval(update, 33.34);
}

function clear()
{
    context.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas completely (just to be sure)
}

function draw()
{
	context.drawImage(bgImage, 0, 0, 640, 640);
	context.drawImage(titleImage, 200, 200, 286, 31);
	context.drawImage(playImage, 265, 300, 140, 80);
	context.drawImage(logoImage, 400, 600);
}


function updateMouse(event)
{
	// This check below resets the mouseDown if the mouse pointer goes outside of the canvas.
	if (!((mouse.x >= 0 && mouse.x <= canvas.width) && (mouse.y >= 0 && mouse.y <= canvas.height)))
		mouseDown = false;
}


function onMouseDown(event)
{
	if ((mouse.x >= 0 && mouse.x <= canvas.width) && (mouse.y >= 0 && mouse.y <= canvas.height))
	{
		mouseDown = true;
		play = true;
		// If I pass the checks, I'll also call moveWall to be able to click a wall into a new place.
	}
}

function onMouseUp(event)
{
	if ((mouse.x >= 0 && mouse.x <= canvas.width) && (mouse.y >= 0 && mouse.y <= canvas.height))
		mouseDown = false;
}

function update()
{
	clear();
	draw();
    if(inCombat == false && play == true)
    {
	   topDown();
	}
    else if (inCombat == true)
    {
	   sideScroll();
	}
	
	checkLevelPass();
    if (levelComplete || debug == true)
        {
            debug = false;
            level = level + 1;
            collidableTopdown = [];
            if (level >=3)
            {
				level = 0;
				window.alert("Congratulations, you win!");
            }
            else
            {
                transition(backDrop);
                createMapTD();
                player.x = 0;
                player.y = 576;
                resetEnemies();
            }
        }
}

function transition(display)
{
    clearInterval(uInt);
    clear();
    surface.drawImage(display, 0, 0, 640, 640);
    //surface.drawImage(info); (pass as second paramater)
    setTimeout(setUpdate, 1700);
}

function checkLevelPass(){
	
	for(var d = 0; d < enemyArray[level].length; d++){
		
		if(enemyArray[level][d][0].isAlive){
			
			levelComplete = false;
			return;
		}
	}
	levelComplete = true;
    //code for next level screen
}

function resetEnemies(){
	
	slime1.isAlive = true;
	slime2.isAlive = true;
	slime3.isAlive = true;
}

function topDown()
{
	updateTopDown();
}

function sideScroll()
{
	updateCombat();
}

function onKeyDown(event)
{
	switch (event.keyCode)
	{
		case 65: // A
            {
                leftPressed = true;
            }
			break;
		case 68: // D
            {
                rightPressed = true;
            }
			break;
		case 87: // W
            {
                upPressed = true;
            }
			break;
		case 83: // S
            {
                downPressed = true;
            }
			break;
		case 37: // A
            {
                leftPressed = true;
            }
			break;
		case 39: // D
            {
                rightPressed = true;
            }
			break;
		case 38: // W
            {
                upPressed = true;
            }
			break;
		case 40: // S
            {
                downPressed = true;
            }
			break;
	}
}

function onKeyUp(event)
{
	switch (event.keyCode)
	{
		case 65: // A
            {
                leftPressed = false;
            }
			break;
		case 68: // D
            {
                rightPressed = false;
            }
			break;
		case 87: // W
            {
                upPressed = false;
            }
			break;
		case 83: // S
            {
                downPressed = false;
            }
			break;
		case 37: // A
            {
                leftPressed = false;
            }
			break;
		case 39: // D
            {
                rightPressed = false;
            }
			break;
		case 38: // W
            {
                upPressed = false;
            }
			break;
		case 40: // S
            {
                downPressed = false;
            }
			break;
	}
}
