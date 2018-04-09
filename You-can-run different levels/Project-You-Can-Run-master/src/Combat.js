

var collidableArena = [];
var spriteFrameCounter = 0;
var numEnemies = 0;

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
	player.img = images[2];
	slime1.img = images[4];
    slime2.img = images[4];
    slime3.img = images[4];
	slime4.img = images[4];
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

        }
		for (var a = 0; a < enemyArray[level].length; a++)
		{
		// extra testing conditions to prevent infinate loops approx. 8px difference for safety
		for(var b = 1; b < enemyArray[level][a].length; b++){
		// this is enemy collision
		if((enemyArray[level][a][b].ArenaY+32 < collidable[c].y+64)&&(!(enemyArray[level][a][b].ArenaY + 46 < collidable[c].y))&&(!(enemyArray[level][a][b].ArenaX + 40 < collidable[c].x))&&(!(enemyArray[level][a][b].ArenaX + 22 > collidable[c].x + 64)))
            {
				enemyArray[level][a][b].ArenaY = collidable[c].y + 32;
			}
			else if((enemyArray[level][a][b].ArenaY+54 > collidable[c].y)&&(!(enemyArray[level][a][b].ArenaY + 40 > collidable[c].y + 64))&&(!(enemyArray[level][a][b].ArenaX + 40 < collidable[c].x))&&(!(enemyArray[level][a][b].ArenaX + 22 > collidable[c].x + 64)))
            {
				enemyArray[level][a][b].ArenaY = collidable[c].y - 54;
			}
			else if((enemyArray[level][a][b].ArenaX+14 < collidable[c].x+64)&&(!(enemyArray[level][a][b].ArenaX + 40 < collidable[c].x))&&(!(enemyArray[level][a][b].ArenaY + 46 < collidable[c].y))&&(!(enemyArray[level][a][b].ArenaY + 40 > collidable[c].y + 64)))
            {
				enemyArray[level][a][b].ArenaX = collidable[c].x + 50;
			}
			else if((enemyArray[level][a][b].ArenaX+48 > collidable[c].x)&&(!(enemyArray[level][a][b].ArenaX + 22 > collidable[c].x + 64))&&(!(enemyArray[level][a][b].ArenaY + 46 < collidable[c].y))&&(!(enemyArray[level][a][b].ArenaY + 40 > collidable[c].y + 64)))
            {
				enemyArray[level][a][b].ArenaX = collidable[c].x - 48;

			}
		}
		}
    }
}

function checkCollisionEnemyC()
{
    for(var a = 0; a < enemyArray[level].length; a++)
    {
		for(var b = 1; b < enemyArray[level][a].length; b++){
        if (enemyArray[level][a][b].inCombat == true)
        {
            if (!(player.y+32 > enemyArray[level][a][b].ArenaY+48 || //player top, enemy bottom
                  player.y+50 < enemyArray[level][a][b].ArenaY    || //player bottom, enemy top
                  player.x+14 > enemyArray[level][a][b].ArenaX+48 || //player left, enemy right
                  player.x+48 < enemyArray[level][a][b].ArenaX   ))  //player right, enemy left
            {

              if((player.y+32 < enemyArray[level][a][b].ArenaY+48)&&(!(player.y + 46 < enemyArray[level][a][b].ArenaY))&&(!(player.x + 40 < enemyArray[level][a][b].ArenaX))&&(!(player.x + 22 > enemyArray[level][a][b].ArenaX + 64)))
                    {
        				player.x = enemyArray[level][a][b].ArenaX + 64;
                player.lifeCounter--;
        			}
        			else if((player.y+54 > enemyArray[level][a][b].ArenaY)&&(!(player.y + 40 > enemyArray[level][a][b].ArenaY + 64))&&(!(player.x + 40 < enemyArray[level][a][b].ArenaX))&&(!(player.x + 22 > enemyArray[level][a][b].ArenaX + 64)))
                    {
                      enemyArray[level][a][b].isAlive = false;
                      enemyArray[level][a][b].inCombat = false;
                      numEnemies -= 1;

                      if(numEnemies == 0){
                        player.x = player.topDownX;
                        player.y = player.topDownY;
                        numEnemies = 0;
                        gameTime+=10;
                        inCombat = false;
                      }
        			}
        			else if((player.x+14 < enemyArray[level][a][b].ArenaX+64)&&(!(player.x + 40 < enemyArray[level][a][b].ArenaX))&&(!(player.y + 46 < enemyArray[level][a][b].ArenaY))&&(!(player.y + 40 > enemyArray[level][a][b].ArenaY + 64)))
                    {
        				player.x = enemyArray[level][a][b].ArenaX + 64;
                player.lifeCounter--;
        			}
        			else if((player.x+48 > enemyArray[level][a][b].ArenaX)&&(!(player.x + 22 > enemyArray[level][a][b].ArenaX + 64))&&(!(player.y + 46 < enemyArray[level][a][b].ArenaY))&&(!(player.y + 40 > enemyArray[level][a][b].ArenaY + 64)))
                    {
        				player.x = enemyArray[level][a][b].ArenaX - 64;
                player.lifeCounter--;
        			}
              if (player.lifeCounter <= 0) {
                  clearInterval(uInt);
                  inCombat = false;
                  clear();
                  surface.drawImage(gameOver, 300, 200, 1320, 800, 0, 0, 640, 640);
                uInt = clearInterval(update);
              }

            }
        }
		}
    }
}


function movePlayerArena()
{
	if ((leftPressed == true)&&(player.x > 0)) {
        player.img = images[3];
        player.x -= player.Speed;
    }

	if ((rightPressed == true)&&(player.x < 576)) {
        player.img = images[2];
        player.x += player.Speed;
    }
	if ((upPressed == true)&&(player.y > 0)&&(player.inAir == false))
        {
            player.inAir = true;
            player.jump = true;
        }
}

function slimeMovement()
{
    spriteFrameCounter++;
	for (var a = 0; a < enemyArray[level].length; a++)
        {
			for(var b = 1; b < enemyArray[level][a].length; b++){
			if (enemyArray[level][a][b].moveType == 0) {
                enemyArray[level][a][b].ArenaX += enemyArray[level][a][b].Speed;
            } else {
                enemyArray[level][a][b].ArenaY += enemyArray[level][a][b].Speed;
            }

            enemyArray[level][a][b].changeTimer += 16.67;

			if(enemyArray[level][a][b].changeTimer >= enemyArray[level][a][b].changeTime){
				enemyArray[level][a][b].changeTimer = 0;
                enemyArray[level][a][b].Speed *= -1;
            }

            if (enemyArray[level][a][b].moveType == 0) {
                //updateSprites(4, 5, 6, 7);
                if (spriteFrameCounter % 5 == 0) {
                    if (enemyArray[level][a][b].Speed > 0) {
                        enemyArray[level][a][b].img = enemyArray[level][a][b].img == images[4] ? images[5] : images[4];
                    } else {
                        enemyArray[level][a][b].img = enemyArray[level][a][b].img == images[6] ? images[7] : images[6];
                    }
                }
            } else {
                //updateSprites(8, 8, 10, 10);
                if (spriteFrameCounter % 5 == 0) {
                    if (enemyArray[level][a][b].Speed > 0) {
                        enemyArray[level][a][b].img = images[10];
                    } else {
                        enemyArray[level][a][b].img = images[8];
                    }
                }
            }

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

	for (var a = 0; a < enemyArray[level].length; a++)
        {
			for(var b = 1; b < enemyArray[level][a].length; b++){
            if(enemyArray[level][a][b].inCombat == true)
                {
                    surface.drawImage(enemyArray[level][a][b].img,
                                    0, 0, 64, 64,
                                    enemyArray[level][a][b].ArenaX, enemyArray[level][a][b].ArenaY, 64, 64);
                }
			}
        }
}

function updateCombat()
{
    checkCollisionC(collidableArena);
	checkCollisionEnemyC();
    movePlayerArena();
	slimeMovement();
    playerJump();
    gravity();
    if(inCombat == false)
        return;
    renderSidescroll();
/*
    for (let index = 0; index < enemyArray[level].length; index++) {

		for(b = 1; b < enemyArray[level][index]; b++){

			enemyArray[level][i][b].img = images[6];
		}
    }

    slime1.img = images[6];
*/}

function loopSprites(startIndex, endIndex) {
    if (curSpriteIndex < endIndex) {
        curSpriteIndex++;
    } else {
        curSpriteIndex = startIndex;
    }
    return curSpriteIndex;
}
