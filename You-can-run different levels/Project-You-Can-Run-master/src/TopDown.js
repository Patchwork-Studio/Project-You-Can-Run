

var collidableTopdown = [];
var flipPlayer = false;
var playerFrameCounter = 0;

createMapTD();

function createMapTD()
{
	for (var row = 0; row < ROWS; row++)
	{
		for (var col = 0; col < COLS; col++)
		{
			var tile = {}; 	  // Create empty object.
			tile.x = col * 64;  // Add custom x property.
			tile.y = row * 64;  // Add custom y property.
			setTileTypeTD(tile, row, col);
			map[level][row][col] = tile; // Tile object is stored in 2D array.
		}
	}
    player.img = images[11];
    slime1.img = images[4];
    slime2.img = images[4];
    slime3.img = images[4];
	slime4.img = images[4];
}

function setTileTypeTD(t, r, c)
{
    if(map[level][r][c] == 1)
        {
			t.img = tileSprites[level][11];
            collidableTopdown.push(t); //add tile to collidable array
		}
    else
            t.img = tileSprites[level][getRandomInt(0, 10)];
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
    for(var a = 0; a < enemyArray[level].length; a++)
    {
        if (!(player.y+32 > enemyArray[level][a][0].y+48 || //player top, enemy bottom
              player.y+50 < enemyArray[level][a][0].y    || //player bottom, enemy top
              player.x+14 > enemyArray[level][a][0].x+48 || //player left, enemy right
              player.x+48 < enemyArray[level][a][0].x   ))  //player right, enemy left
        {
            if (enemyArray[level][a][0].isAlive == true)
                {
                    player.topDownX = player.x;
                    player.topDownY = player.y;
			         inCombat = true;
                    transition(backDrop);
			         player.y = 512;
                    player.x = 64;
					for(b = 0; b < enemyArray[level][a].length; b++)
                    {
						enemyArray[level][a][b].inCombat = true;
						numEnemies++;
					}
					numEnemies -= 1;
                }
        }
    }
}

function movePlayerTopdown()
{
    playerFrameCounter++;
	if ((leftPressed == true) && (player.x > 0)) {
        flipPlayer = true;
        player.x -= player.Speed;
    }
		
	if ((rightPressed == true)&&(player.x < 576)) {
        flipPlayer = false;
        player.x += player.Speed;
    }
	if ((upPressed == true)&&(player.y > 0))
            player.y -= player.Speed;
	if ((downPressed == true)&&(player.y < 576))
            player.y += player.Speed;
}

function updatePlayerSprite() {
    if (playerFrameCounter % 5 == 0) {
        if (flipPlayer == false) {
            player.img = player.img == images[11] ? images[12] : images[11];
        } else {
            player.img = player.img == images[13] ? images[14] : images[13];
        }
    }
}

function renderTopdown()
{
	surface.clearRect(0,0,canvas.width,canvas.height);
	for (var row = 0; row < ROWS; row++)
	{
		for (var col = 0; col < COLS; col++)
		{
			surface.drawImage(map[level][row][col].img, 0, 0, 16, 16, map[level][row][col].x, map[level][row][col].y, 64, 64);
		}
    }
    
        surface.drawImage(player.img,
            64*player.Sprite, 0, 72, 72, 	// Source rectangle.
            player.x, player.y, 72, 72);  // Position and size on canvas.
    
    for (var a = 0; a < enemyArray[level].length; a++)
        {
            if(enemyArray[level][a][0].isAlive == true)
                {
                    surface.drawImage(enemyArray[level][a][0].img,
                                      0, 0, 64, 64,
                                      enemyArray[level][a][0].x, enemyArray[level][a][0].y, 72, 72);
                }
        }
}

function updateTopDown()
{
    movePlayerTopdown();
    updatePlayerSprite();
    checkCollisionTD(collidableTopdown);
    checkCollisionEnemyTD();
    if(inCombat == true)
        return;
    renderTopdown();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}