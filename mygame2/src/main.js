import kaboom from "kaboom"


const k = kaboom()




//loading sprites
k.loadSprite("bean", "sprites/bean.png")
k.loadSprite("block", "sprites/block.jpg")
k.loadSprite("spike", "sprites/spike.jpg")


const SPEED = 400;
k.setGravity(1300);


const LEVELS = [
    [
        "@ >>>>>>>>>>>",
    ],
]


// Define a scene called "game". The callback will be run when we go() to the scene
// Scenes can accept argument from go()
scene("game", ({ levelIdx, score }) => {


    // Use the level passed, or first level
    const level = addLevel(LEVELS[levelIdx || 0], {

        tileWidth: 64,
        tileHeight: 64,
        pos: vec2(100, 200),
        tiles: {
            "@": () => [
                sprite("bean"),
                area(),
                body(),
                anchor("bot"),
                "bean",
            ],

            "^": () => [
                sprite("spike"),
                area(),
                anchor("bot"),
                scale(.2),

            ],
            ">": () => [
                sprite("block"),
                area(),
                anchor("bot"),
                scale(0.2),
                pos(width(), height()-200),
                body({ isStatic: true }),
                anchor("bot"),
            ],
        },
    })


    // Get the object from tag
    const bean = level.get("bean")[0]




    // movement
onKeyPress("space", () => {
    if (bean.isGrounded()) {
        bean.jump()
    }
})


onKeyDown("left", () => {
    bean.move(-SPEED, 0)
})


onKeyDown("right", () => {
    bean.move(SPEED, 0)
})




    bean.onCollide("danger", () => {
        bean.pos = level.tile2Pos(0, 0)
        // Go to "lose" scene when we hit a "danger"
        go("lose")
    })


    // Fall death
    bean.onUpdate(() => {
        if (bean.pos.y >= 480) {
            go("lose")
        }
    })


    // Score counter text
    const scoreLabel = add([
        text(score),
        pos(12),
    ])


})


scene("lose", () => {


    add([
        text("You Lose"),
        pos(12),
    ])


    // Press any key to go back
    onKeyPress(start)


})


scene("win", ({ score }) => {


    add([
        text(`You grabbed ${score} coins!!!`, {
            width: width(),
        }),
        pos(12),
    ])


    onKeyPress(start)


})


function start() {
    go("game", {
        levelIdx: 0,
        score: 0,
    })
}


start()





