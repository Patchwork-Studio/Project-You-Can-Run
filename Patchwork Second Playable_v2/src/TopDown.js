

var collidableTopdown = [];

createMapTD();

function createMapTD()
{
	for (var row = 0; row < ROWS; row++)
	{
		for (var col = 0; col < COLS; col++)
		{
			var tile = {}; 	  // Create empty object.
			tile.x = col*64;  // Add custom x property.
			tile.y = row*64;  // Add custom y property.
			setTileTypeTD(tile, row, col);
			map[level][row][col] = tile; // Tile object is stored in 2D array.
		}
	}
    player.img = images[3];
    slime1.img = images[2];
    slime2.img = images[2];
    slime3.img = images[2];
}

function setTileTypeTD(t, r, c)
{
    if(map[level][r][c] == 1)
        {
			t.img = images[1];
            collidableTopdown.push(t); //add tile to collidable array
		}
    else
        t.img = images[0];
}

function checkCollisionTD(collidable)
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

function checkCollisionEnemyTD()
{
    for(var a = 0; a < enemyArray.length; a++)
    {
        if (!(player.y+32 > enemyArray[a].y+48 || //player top, enemy bottom
              player.y+50 < enemyArray[a].y    || //player bottom, enemy top
              player.x+14 > enemyArray[a].x+48 || //player left, enemy right
              player.x+48 < enemyArray[a].x   ))  //player right, enemy left
        {
            if (enemyArray[a].isAlive == true)
                {
                    player.topDownX = player.x;
                    player.topDownY = player.y;
			         inCombat = true;
			         player.y = 512;
                    player.x = 64;
                    enemyArray[a].inCombat = true;
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

function renderTopdown()
{
	surface.clearRect(0,0,canvas.width,canvas.height);
	for (var row = 0; row < ROWS; row++)
	{
		for (var col = 0; col < COLS; col++)
		{
			surface.drawImage(map[level][row][col].img, map[level][row][col].x, map[level][row][col].y);
		}
	}
	surface.drawImage(player.img,
					  64*player.Sprite, 0, 64, 64, 	// Source rectangle.
					  player.x, player.y, 64, 64);  // Position and size on canvas.
    for (var a = 0; a < enemyArray.length; a++)
        {
            if(enemyArray[a].isAlive == true)
                {
                    surface.drawImage(enemyArray[a].img,
                                      134, 166, 732, 560,
                                      enemyArray[a].x, enemyArray[a].y, 48, 40);
                }
        }
}

function updateTopDown()
{
	movePlayerTopdown();
    checkCollisionTD(collidableTopdown);
    checkCollisionEnemyTD();
    renderTopdown();
}