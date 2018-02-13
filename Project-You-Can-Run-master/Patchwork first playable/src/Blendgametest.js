var canvas = document.querySelector("canvas"); 
canvas.width = 640; 
canvas.height = 640;

var surface = canvas.getContext("2d");
var uInt; 

var map =   //all variables for map top down
[
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 1, 0, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 1, 0, 1, 1, 0, 0, 0],
    [1, 1, 0, 1, 0, 0, 1, 0, 1, 0],    
    [0, 0, 0, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],   
] 
var collidableTopdown = [];
const ROWS = 10;
const COLS = 10;
var arena = //all variables for map combat
[
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]
var collidableArena = [];

var imgStr = ["path", "wall", "slime", "player"];
var images = []; // array for image objects 0=path, 1=wall, 2=slime, 3=player

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
var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;

var slime =
    {
        img:null,
        x:395,
        y:70,
    }
var slimeC =
    {
        img:null,
        x:395,
        y:70,
    }
var enemyArray = [slime];
var enemyArrayArena = [slimeC];

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

var inCombat = false;

createMap();

function update()
{
    if(inCombat == false)
       topDown();
    else
       sideScroll();
}

function topDown()
{
    checkCollision(collidableTopdown);
    checkCollisionEnemy();
    movePlayerTopdown();
    renderTopdown();
}


function sideScroll()
{
    checkCollision(collidableArena);
	checkCollisionEnemyArena();
    renderSidescroll();
    movePlayerArena();
    playerJump();
    gravity();
}


function createMap()
{
	for(var i = 0; i < imgStr.length; i++)
	{
		images[i] = new Image();
		images[i].src = "../img/"+imgStr[i]+".png";
	}
	for (var row = 0; row < ROWS; row++)
	{
		for (var col = 0; col < COLS; col++)
		{
			var tile = {}; 	  // Create empty object.
			tile.x = col*64;  // Add custom x property.
			tile.y = row*64;  // Add custom y property.
			setTileType(tile, row, col);
			map[row][col] = tile; // Tile object is stored in 2D array.
		}
	}
    for (var row = 0; row < ROWS; row++)
	{
		for (var col = 0; col < COLS; col++)
		{
			var tile = {}; 	  // Create empty object.
			tile.x = col*64;  // Add custom x property.
			tile.y = row*64;  // Add custom y property.
			setTileTypeArena(tile, row, col);
			arena[row][col] = tile; // Tile object is stored in 2D array.
		}
	}
	player.img = images[3];
    slime.img = images[2];
	slimeC.img = images[2];
	uInt = setInterval(update, 33.34); // Start off at 30 frames per second.
}

function setTileType(t, r, c)
{
    if(map[r][c] == 1)
        {
			t.img = images[1];
            collidableTopdown.push(t); //add tile to collidable array
		}
    else
        t.img = images[0];
}

function setTileTypeArena(t, r, c)
{
    if(arena[r][c] == 1)
        {
			t.img = images[1];
            collidableArena.push(t); //add tile to collidable array
		}
    else
        t.img = images[0];
}

function checkCollision(collidable)
{
    for(var c = 0; c < collidable.length; c++)
    {
        if (!(player.y+32 > collidable[c].y+64 || //player top, wall bottom
              player.y+54 < collidable[c].y    || //player bottom, wall top
              player.x+14 > collidable[c].x+64 || //player left, wall right
              player.x+48 < collidable[c].x   ))  //player right, wall left
        {
			if((player.y+32 < collidable[c].y+64)&&((upPressed == true)||(player.jump == true))&&(!(player.y + 46 < collidable[c].y))&&(!(player.x + 40 < collidable[c].x))&&(!(player.x + 22 > collidable[c].x + 64)))
            {
				player.y = collidable[c].y + 32;
			}
			else if((player.y+54 > collidable[c].y)&&(downPressed == true)&&(!(player.y + 40 > collidable[c].y + 64))&&(!(player.x + 40 < collidable[c].x))&&(!(player.x + 22 > collidable[c].x + 64)))
            {
				player.y = collidable[c].y - 54;
			}
			else if((player.x+14 < collidable[c].x+64)&&(leftPressed == true)&&(!(player.x + 40 < collidable[c].x))&&(!(player.y + 46 < collidable[c].y))&&(!(player.y + 40 > collidable[c].y + 64)))
            {
				player.x = collidable[c].x + 50;
			}
			else if((player.x+48 > collidable[c].x)&&(rightPressed == true)&&(!(player.x + 22 > collidable[c].x + 64))&&(!(player.y + 46 < collidable[c].y))&&(!(player.y + 40 > collidable[c].y + 64)))
            {
				player.x = collidable[c].x - 48;
			}
        } // extra testing conditions to prevent infinate loops approx. 8px difference for safety
    }
}

function checkCollisionEnemy()
{
    for(var a = 0; a < enemyArray.length; a++)
    {
        if (!(player.y+32 > enemyArray[a].y+48 || //player top, enemy bottom
              player.y+50 < enemyArray[a].y    || //player bottom, enemy top
              player.x+14 > enemyArray[a].x+48 || //player left, enemy right
              player.x+48 < enemyArray[a].x   ))  //player right, enemy left
        {
            player.topDownX = player.x;
            player.topDownY = player.y;
			inCombat = true;
            player.y = 512;
            player.x = 64;
        }
    }
}

function checkCollisionEnemyArena()
{
    for(var a = 0; a < enemyArrayArena.length; a++)
    {
        if (!(player.y+32 > enemyArrayArena[a].y+48 || //player top, enemy bottom
              player.y+50 < enemyArrayArena[a].y    || //player bottom, enemy top
              player.x+14 > enemyArrayArena[a].x+48 || //player left, enemy right
              player.x+48 < enemyArrayArena[a].x   ))  //player right, enemy left
        {
			if(!(player.y+32 > enemyArrayArena[a].y || //player top, enemy bottom
				player.y+50 < enemyArrayArena[a].y    || //player bottom, enemy top
				player.x+14 > enemyArrayArena[a].x+48 || //player left, enemy right
				player.x+48 < enemyArrayArena[a].x)){
				
				player.x = 0;
				player.y = 585;
				inCombat = false;
				
			}
			else{
				
				uInt = clearInterval(update);
				window.alert("GAMEOVER");
			}
        }
    }
}

function movePlayerTopdown()
{
	if ((leftPressed == true)&&(player.x > 0))
		player.x -= player.Speed;
	if ((rightPressed == true)&&(player.x < 576))
		player.x += player.Speed;
	if ((upPressed == true)&&(player.y > 0))
            player.y -= player.Speed;
	if ((downPressed == true)&&(player.y < 576))
            player.y += player.Speed;
}

function movePlayerArena()
{
	if ((leftPressed == true)&&(player.x > 0))
		player.x -= player.Speed;
	if ((rightPressed == true)&&(player.x < 576))
		player.x += player.Speed;
	if ((upPressed == true)&&(player.y > 0)&&(player.inAir == false))
        {
            player.inAir = true;
            player.jump = true;
        }
}

function playerJump()
{
    if (player.jump == true)
        {
            player.y -= player.Speed*2;
            player.jumptimer += 1
            for(var c = 0; c < collidableArena.length; c++)
                {
                    if ((player.jumptimer > 18)||((player.y+32 < collidableArena[c].y+64)&&(!(player.y + 46 < collidableArena[c].y))&&(!(player.x + 40 < collidableArena[c].x))&&(!(player.x + 22 > collidableArena[c].x + 64))))
                        {
                            player.jump = false;
                            player.jumptimer = 0;
                        }
                }
        }
}

function gravity()
{
    if (player.jump == false)
        {
            player.y += player.Speed*2;
                for(var c = 0; c < collidableArena.length; c++)
                {
                    if((player.y+54 > collidableArena[c].y)&&(!(player.y + 40 > collidableArena[c].y + 64))&&(!(player.x + 40 < collidableArena[c].x))&&(!(player.x + 22 > collidableArena[c].x + 64)))
                    {
				        player.y = collidableArena[c].y - 54;
                        player.inAir = false;
                    }
                }
        }
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

function renderTopdown()
{
	surface.clearRect(0,0,canvas.width,canvas.height);
	for (var row = 0; row < ROWS; row++)
	{
		for (var col = 0; col < COLS; col++)
		{
			surface.drawImage(map[row][col].img, map[row][col].x, map[row][col].y);
		}
	}
	surface.drawImage(player.img,
					  64*player.Sprite, 0, 64, 64, 	// Source rectangle.
					  player.x, player.y, 64, 64);  // Position and size on canvas.
    surface.drawImage(slime.img,
                     134, 166, 732, 560,
                     slime.x, slime.y, 48, 40);
}

function renderSidescroll()
{
    surface.clearRect(0,0,canvas.width,canvas.height);
	for (var row = 0; row < ROWS; row++)
	{
		for (var col = 0; col < COLS; col++)
		{
			surface.drawImage(arena[row][col].img, arena[row][col].x, arena[row][col].y);
		}
	}
	surface.drawImage(player.img,
					  64*player.Sprite, 0, 64, 64, 	// Source rectangle.
					  player.x, player.y, 64, 64);  // Position and size on canvas.
					  
	surface.drawImage(slimeC.img,
                     134, 166, 732, 560,
                     slime.x, slime.y, 48, 40);
}