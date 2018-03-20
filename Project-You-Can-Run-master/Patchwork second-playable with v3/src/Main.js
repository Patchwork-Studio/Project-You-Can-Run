var canvas = document.querySelector("canvas"); 
canvas.width = 640; 
canvas.height = 640;
var ROWS = 10;
var COLS = 10;
var uInt;
var context = canvas.getContext("2d");
var surface = canvas.getContext("2d");

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

bgImage.src = "../img/dungeon_background.png";
titleImage.src = "../img/gametitle.png";
playImage.src = "../img/playbutton.png";
logoImage.src = "../img/patchwork.png";

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

var play = false;
var inCombat = false;
var tKey = 0, cKey = 0;

var level = 0;

var imgStr = ["path", "wall",  "player", "player_flipped","slime", "slime2", "slime_flipped", "slime2_flipped"];
var images = []; // array for image objects 0=path, 1=wall, 2=slime, 3=player

var tileSpriteStr = ["top_down_tile1","top_down_tile2","top_down_tile3","top_down_tile4","top_down_tile5",
"top_down_tile6","top_down_tile7","top_down_tile8","top_down_tile9","top_down_tile10","top_down_tile11",
"top_down_block_tile1", "top_down_block_tile2"];

var tileSprites = [];

for(var i = 0; i < imgStr.length; i++)
	{
		images[i] = new Image();
		images[i].src = "../img/"+imgStr[i]+".png";
    }
    
for(var i = 0; i < tileSpriteStr.length; i++)
	{
		tileSprites[i] = new Image();
		tileSprites[i].src = "../img/Tiles/"+tileSpriteStr[i]+".png";
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

var slime1 =
    {
        img:null,
        x:395,
        y:70,
        ArenaX:180,
        ArenaY:140,
		Speed:4,
		changeTime: 1000,
		changeTimer: 0,
        isAlive: true,
        inCombat: false
    }

var slime2 =
    {
        img:null,
        x:580,
        y:580,
        ArenaX:180,
        ArenaY:140,
		Speed:4,
		changeTime: 1000,
		changeTimer: 0,
        isAlive: true,
        inCombat: false
    }

var slime3 =
    {
        img:null,
        x:76,
        y:332,
        ArenaX:180,
        ArenaY:140,
		Speed:4,
		changeTime: 1000,
		changeTimer: 0,
        isAlive: true,
        inCombat: false
    }

uInt = setInterval(update, 33.34);

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
    if (slime1.isAlive == false && slime2.isAlive == false && slime3.isAlive == false)
        {
            level = level + 1;
            collidableTopdown = [];
            createMapTD();
            player.x = 0;
            player.y = 576;
            for ( a = 0; a < enemyArray.length; a++)
                {
                    enemyArray[a].isAlive = true;
                }
        }  
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

