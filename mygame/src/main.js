import kaboom from "kaboom"
kaboom()

loadSprite("bean", "sprites/bean.png"),
loadSprite("smiley", "sprites/smileyOne.jpg")



scene("game", () => {

    // define gravity
    setGravity(2000);

    // add a game object to screen
    const player = add([
        // list of components
        sprite("smiley"),
        pos(center()),
        area(),
        body(),
    ]);
    // ceiling
    add([
        rect(width(), 120),
        outline(4),
        pos(0, 0),
        area(),
        color(127, 200, 255),
    ]);

    //floor

    add([
        rect(width(), 200),
        outline(4),
        pos(0, height()),
        anchor("botleft"),
        area(),
        body({ isStatic: true }),
        color(127, 200, 255),
    ]);

    function jump() {
        if (player.isGrounded()) {
            player.jump(800);
        }
    }

    // jump when user press space
    onKeyPress("space", jump);
    onClick(jump);
    function spawnTree() {

        // add tree obj
        add([
            rect(48, rand(32, 128)),
            area(),
            outline(4),
            pos(width(), height()-200),
            anchor("botleft"),
            color(255, 180, 255),
            move(LEFT, 400),
            "tree",
        ]);
            // add tree obj

        // wait a random amount of time to spawn next tree
        wait(rand(1, 2), spawnTree);

    }
    // start spawning trees
    spawnTree();

//     function spawnTreeTop() {

//         // add tree obj
//         add([
//             rect(48, rand(32, 92)),
//             area(),
//             outline(4),
//             pos(width(), height() - 400),
//             anchor("botleft"),
//             color(255, 180, 255),
//             move(LEFT, 400),
//             "tree",
//         ]);
//             // add tree obj

//         // wait a random amount of time to spawn next tree
//         wait(rand(1, 2), spawnTreeTop);

//     }
// // start spawning trees on the top
// spawnTreeTop();

    // lose if player collides with any game obj with tag "tree"
    player.onCollide("tree", () => {
        // go to "lose" scene and pass the score
        go("lose", score);
        burp();
        addKaboom(player.pos);
    });

    // keep track of score
    let score = 0;

    const scoreLabel = add([
        text(score),
        pos(24, 24),
    ]);

    // increment score every frame
    onUpdate(() => {
        score++;
        scoreLabel.text = score;
    });

});

scene("lose", (score) => {

    add([
        sprite("smiley"),
        pos(width() / 2, height() / 2 - 80),
        scale(2),
        anchor("center"),
    ]);

    // display score
    add([
        text(score),
        pos(width() / 2, height() / 2 + 80),
        scale(2),
        anchor("center"),
    ]);

    // go back to game with space is pressed
    onKeyPress("space", () => go("game"));
    onClick(() => go("game"));

});

go("game");
