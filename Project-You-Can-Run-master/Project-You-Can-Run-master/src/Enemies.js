//movement type: 0 = horizontal, 1 = vertical

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
		moveType: 0,
        isAlive: true,
        inCombat: false
    }

var slime2 =
    {
        img:null,
        x:580,
        y:400,
        ArenaX:180,
        ArenaY:140,
		Speed:4,
		changeTime: 1000,
		changeTimer: 0,
		moveType: 1,
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
		moveType: 0,
        isAlive: true,
        inCombat: false
    }
	
var slime4 =
    {
        img:null,
        x:580,
        y:500,
        ArenaX:384,
        ArenaY:256,
		Speed:4,
		changeTime: 1000,
		changeTimer: 0,
		moveType: 1,
        isAlive: true,
        inCombat: false
    }
	
var slime5 =
    {
        img:null,
        x:580,
        y:500,
        ArenaX:384,
        ArenaY:320,
		Speed:4,
		changeTime: 1000,
		changeTimer: 0,
		moveType: 0,
        isAlive: true,
        inCombat: false
    }
	
var slime6 =
    {
        img:null,
        x:580,
        y:500,
        ArenaX:384,
        ArenaY:448,
		Speed:4,
		changeTime: 1000,
		changeTimer: 0,
		moveType: 0,
        isAlive: true,
        inCombat: false
    }
	
var slime7 =
    {
        img:null,
        x:76,
        y:332,
        ArenaX:180,
        ArenaY:64,
		Speed:4,
		changeTime: 1000,
		changeTimer: 0,
		moveType: 0,
        isAlive: true,
        inCombat: false
    }
	
var slime8 =
    {
        img:null,
        x:76,
        y:332,
        ArenaX:448,
        ArenaY:320,
		Speed:6,
		changeTime: 500,
		changeTimer: 0,
		moveType: 0,
        isAlive: true,
        inCombat: false
    }
	
var slime9 =
    {
        img:null,
        x:76,
        y:332,
        ArenaX:64,
        ArenaY:320,
		Speed:6,
		changeTime: 500,
		changeTimer: 0,
		moveType: 0,
        isAlive: true,
        inCombat: false
    }
	
var slime10 =
    {
        img:null,
        x:580,
        y:500,
        ArenaX:384,
        ArenaY:256,
		Speed:4,
		changeTime: 1000,
		changeTimer: 0,
		moveType: 1,
        isAlive: true,
        inCombat: false
    }
	
var slime11 =
    {
        img:null,
        x:580,
        y:500,
        ArenaX:192,
        ArenaY:256,
		Speed:4,
		changeTime: 1000,
		changeTimer: 0,
		moveType: 1,
        isAlive: true,
        inCombat: false
    }

var arrow =
	{
		x:580,
		y:580,
		Touched: false
	}	
	
var boss =
    {
        img:null,
        x:395,
        y:70,
		x_velocity: 0,
		y_velocity: 0,
        ArenaX:180,
        ArenaY:140,
		Speed:4,
		changeTime: 1000,
		changeTimer: 0,
		moveType: 0,
		jump: false,
		defeated: false,
        isAlive: true,
        inCombat: false
    }