var tdScript = document.getElementById("topDown");
var mainScript = document.getElementById("main");

var arena = //all variables for map combat
[
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, , 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]



var collidableArena = [];


var enemyArrayC = [slime];
createMapC();


function createMapC()
{
	
    for (var row = 0; row < ROWS; row++)
	{
		for (var col = 0; col < COLS; col++)
		{
			var tile = {}; 	  // Create empty object.
			tile.x = col*64;  // Add custom x property.
			tile.y = row*64;  // Add custom y property.
			setTileTypeC(tile, row, col);
			arena[row][col] = tile; // Tile object is stored in 2D array.
		}
	}
	player.img = images[3];
	slime.img = images[2];
}

function setTileTypeC(t, r, c)
{
    if(arena[r][c] == 1)
        {
			t.img = images[1];
            collidableArena.push(t); //add tile to collidable array
		}
    else
        t.img = images[0];
}

function checkCollisionC(collidable)
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
		 if (!(slime.arenaY+32 > collidable[c].y+64 || //player top, wall bottom
              slime.arenaY+54 < collidable[c].y    || //player bottom, wall top
              slime.arenaX+14 > collidable[c].x+64 || //player left, wall right
              slime.arenaX+48 < collidable[c].x   ))  //player right, wall left

        {
			if((slime.arenaY+32 < collidable[c].y+64)&&(!(slime.arenaY + 46 < collidable[c].y))&&(!(slime.arenaX+ + 40 < collidable[c].x))&&(!(slime.arenaX+ + 22 > collidable[c].x + 64)))
            {
				slime.arenaY = collidable[c].y + 32;
			}
			else if((slime.arenaY+54 > collidable[c].y)&&(!(slime.arenaY + 40 > collidable[c].y + 64))&&(!(slime.arenaX + 40 < collidable[c].x))&&(!(slime.arenaX+ 22 > collidable[c].x + 64)))
            {
				slime.arenaY = collidable[c].y - 54;
			}
			else if((slime.arenaX+14 < collidable[c].x+64)&&(!(slime.arenaX+ 40 < collidable[c].x))&&(!(slime.arenaY + 46 < collidable[c].y))&&(!(slime.arenaY + 40 > collidable[c].y + 64)))
            {
				slime.arenaX = collidable[c].x + 50;
					slime.Speed = -slime.Speed;
			}
			else if((slime.arenaX+48 > collidable[c].x)&&(!(slime.arenaX+ 22 > collidable[c].x + 64))&&(!(slime.arenaY + 46 < collidable[c].y))&&(!(slime.arenaY + 40 > collidable[c].y + 64)))
            {
				slime.arenaX = collidable[c].x - 48;
					slime.Speed = -slime.Speed;
			}
        } // extra testing conditions to prevent infinate loops approx. 8px difference for safety
	
    }
}



function checkCollisionEnemyC()
{
    for(var a = 0; a < enemyArrayC.length; a++)
    {
        if (!(player.y+32 > enemyArrayC[a].arenaY+48 || //player top, enemy bottom
              player.y+50 < enemyArrayC[a].arenaY    || //player bottom, enemy top
              player.x+14 > enemyArrayC[a].arenaX+48 || //player left, enemy right
              player.x+48 < enemyArrayC[a].arenaX   ))  //player right, enemy left
        {
			if(!(player.y+32 > enemyArrayC[a].arenaY || //player top, enemy bottom
				player.y+50 < enemyArrayC[a].arenaY   || //player bottom, enemy top
				player.x+14 > enemyArrayC[a].arenaX+48 || //player left, enemy right
				player.x+48 < enemyArrayC[a].arenaX)){
				
				player.x = 395;
				player.y = 64;
				inCombat = false;
				slime.defeated = true; 
				
			}
			else{
				
				uInt = clearInterval(update);
				window.alert("GAMEOVER");
			}
        }
    }
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
            player.y += player.Speed*2
			console.log(player.y);
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

function slimeMovement()
{
	slime.arenaX = slime.arenaX + slime.Speed;
}

function renderSidescroll()
{
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
	
	surface.drawImage(slime.img,
                     134, 166, 732, 560,
                     slime.arenaX, slime.arenaY, 48, 40);
					 
}

function updateCombat()
{
	renderSidescroll();
    checkCollisionC(collidableArena);
	checkCollisionEnemyC();
    movePlayerArena();
	slimeMovement();
    playerJump();
    gravity();
}