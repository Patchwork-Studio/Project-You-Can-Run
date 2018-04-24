

var map =
[    

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
    ],
    [
        [0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
        [0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
        [0, 0, 0, 1, 0, 0, 1, 1, 0, 1],
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 0, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    ],
    [
        [0, 0, 0, 1, 0, 0, 0, 1, 1, 0],
        [1, 1, 0, 1, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 0, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 1, 1, 0, 1, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 1, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    ]
    
]

var enemyArray = 
[
	[[slime1, slime1, slime4], [slime2, slime2, slime5, slime6], [slime3, slime3]],
	[[slime1, slime1, slime4], [slime2, slime2, slime5, slime6], [slime3, slime3, slime7, slime8]],
	[[slime1, slime1, slime9, slime10, slime11, slime7], [slime2, slime2, slime5, slime6, slime4, slime3, slime8], [slime12, slime12, slime14, slime15, slime16]],
]

var arena =
[//  0  64 128 192 256 320 384 448 512 576
    [1,  0,  0,  0,  0,  0,  0,  0,  0,  1],//0
    [1,  0,  0,  0,  0,  0,  0,  0,  0,  1],//64
    [1,  0,  0,  0,  0,  0,  0,  0,  0,  1],//128
    [1,  0,  0,  1,  1,  1,  1,  0,  0,  1],//192
    [1,  0,  0,  0,  0,  0,  0,  0,  0,  1],//256
    [1,  0,  0,  0,  0,  0,  0,  0,  0,  1],//320
    [1,  1,  1,  0,  0,  0,  0,  1,  1,  1],//384
    [1,  0,  0,  0,  0,  0,  0,  0,  0,  1],//448
    [1,  0,  0,  0,  0,  0,  0,  0,  0,  1],//512
    [1,  1,  1,  1,  1,  1,  1,  1,  1,  1],//576
]
