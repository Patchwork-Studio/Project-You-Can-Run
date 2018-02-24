var canvas = document.querySelector("canvas"); 
canvas.width = 640; 
canvas.height = 640;
var ROWS = 10;
var COLS = 10;
var uInt;
var surface = canvas.getContext("2d");

var tdScript = document.createElement("script");
tdScript.src = "TopDown.js";
tdScript.setAttribute("id", "topDown");
document.body.appendChild(tdScript);

var cScript = document.createElement("script");
cScript.src = "Combat.js";
cScript.setAttribute("id", "combat");
document.body.appendChild(cScript);

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

var inCombat = false;
var tKey = 0, cKey = 0;





var imgStr = ["path", "wall", "slime", "player", "wizard"];
var images = []; // array for image objects 0=path, 1=wall, 2=slime, 3=player 4=wizard

for(var i = 0; i < imgStr.length; i++)
	{
		images[i] = new Image();
		images[i].src = "../img/"+imgStr[i]+".png";
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
var slime =
    {
        img:null,
		arenaX:250,
		arenaY:525,
		Speed:4,
        x:395,
        y:70,
		inAir: false,
		jump: false,
		defeated: false,
    };
	
var wizard =
{
	img:null,
	x:576,
	y:380,
	defeated: false,
};

uInt = setInterval(update, 33.34);
function update()
{
    if(inCombat == false){
       
	   topDown();
	}
    else{
       
	   sideScroll();
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