function checkCollisionWithBoss()
{
	//this.boss.Health = 11;
	if (!(player.y+32 > boss.ArenaY+48 || //player top, enemy bottom
          player.y+50 < boss.ArenaY    || //player bottom, enemy top
          player.x+14 > boss.ArenaX+48 || //player left, enemy right
          player.x+48 < boss.ArenaX   ))  //player right, enemy left
        {
			if(!(player.y+32 > boss.ArenaY+48 || //player top, enemy bottom
				player.y+50 < boss.ArenaY  || //player bottom, enemy top
				player.x+14 > boss.ArenaX+48 || //player left, enemy right
				player.x+48 < boss.ArenaX))
			{
				player.y -= 110;
				
				boss.Health--;
				console.log(boss.Health);
				if(boss.Health <= 0)	
				{
				inBossCombat = false;
				boss.defeated = true;
				boss.Health = 10; 
				}
				
			}
			else
			{
                    clearInterval(uInt);
                    inCombat = false;
                    clear();
                    surface.drawImage(gameOver, 300, 200, 1320, 800, 0, 0, 640, 640);
			}
		}
}
function BossHealthDisplay()
{
	surface.font = "30px Arial";
	surface.fillStyle = "white";
	surface.fillText("Boss Health: " + boss.Health, canvas.width - 260, canvas.height - (canvas.height/7 - 60));
}
function renderBossFight()
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

    surface.drawImage(boss.img,
                      0, 0, 64, 64,
                      boss.ArenaX, boss.ArenaY, 52, 52);
	updateGUI();
	BossHealthDisplay();
}

function BossJumpTimer()
{
	if(boss.jump == false)
	{
	setTimeout(BossJumpAvailable, 3000);
	}
}

function BossJumpAvailable()
{
	boss.jump = true;
}

function BossJump()
{	
	if(boss.jump == true)
	{
	boss.ArenaY -= 20;
	boss.y_velocity += 1.3; // gravity
	boss.ArenaY += boss.y_velocity;
	boss.ArenaY *= 0.9; // friction (for smooth movement) 
	}

	if(boss.ArenaY >= 134)
	{
		boss.jump = false;
		boss.ArenaY = 140;
		boss.y_velocity = 0;
	}
}

function BossMovement()
{
			if (boss.moveType == 0) {
                boss.ArenaX += boss.Speed;
            } else {
                boss.ArenaY += boss.Speed;
            }

            boss.changeTimer += 16.67;

			if(boss.changeTimer >= boss.changeTime){
				boss.changeTimer = 0;
                boss.Speed *= -1;
            }
}

function updateBossCombat()
{
	renderBossFight();
    checkCollisionC(collidableArena);
	checkCollisionWithBoss();
    movePlayerArena();
	BossMovement();
	BossJumpTimer();
	BossJump();
    playerJump();
    gravity();
	if(inBossCombat == false)
		return;	
}