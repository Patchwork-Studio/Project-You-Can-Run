

var collidableArena = [];

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
	slime1.img = images[2];
    slime2.img = images[2];
    slime3.img = images[2];
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
    }
}

function checkCollisionEnemyC()
{
    for(var a = 0; a < enemyArray.length; a++)
    {
        if (enemyArray[a].inCombat == true)
        {
            if (!(player.y+32 > enemyArray[a].ArenaY+48 || //player top, enemy bottom
                  player.y+50 < enemyArray[a].ArenaY    || //player bottom, enemy top
                  player.x+14 > enemyArray[a].ArenaX+48 || //player left, enemy right
                  player.x+48 < enemyArray[a].ArenaX   ))  //player right, enemy left
            {
                if(!(player.y+32 > enemyArray[a].ArenaY || //player top, enemy bottom
                    player.y+50 < enemyArray[a].ArenaY    || //player bottom, enemy top
                    player.x+14 > enemyArray[a].ArenaX+48 || //player left, enemy right
                    player.x+48 < enemyArray[a].ArenaX))
                {	
                    player.x = player.topDownX;
                    player.y = player.topDownY;
                    enemyArray[a].isAlive = false;
                    enemyArray[a].inCombat = false;
                    inCombat = false;
                }
                else{

                    uInt = clearInterval(update);
                    window.alert("GAMEOVER");
                }
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

function slimeMovement()
{
	for (var a = 0; a < enemyArray.length; a++)
        {
            enemyArray[a].ArenaX += enemyArray[a].Speed;
            enemyArray[a].changeTimer += 16.67;
			if(enemyArray[a].changeTimer >= enemyArray[a].changeTime){
				
				enemyArray[a].changeTimer = 0;
				enemyArray[a].Speed *= -1;
			}
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
					  
	for (var a = 0; a < enemyArray.length; a++)
        {
            if(enemyArray[a].inCombat == true)
                {
                    surface.drawImage(enemyArray[a].img,
                                    134, 166, 732, 560,
                                    enemyArray[a].ArenaX, enemyArray[a].ArenaY, 48, 40);
                }
        }
}

function updateCombat()
{
    checkCollisionC(collidableArena);
	checkCollisionEnemyC();
    renderSidescroll();
    movePlayerArena();
	slimeMovement();
    playerJump();
    gravity();
}