import kaboom from "kaboom"

const k = kaboom()

k.setGravity(2400)
k.loadSprite("bean", "sprites/bean.png")

const bean = add([
    sprite("bean"),
    pos(50, 30),
    area(),
    body(),
])

onKeyPress("space", () => {
    if (bean.isGrounded()) {
        bean.jump();
    }
});

add([
    rect(width(), 70),
    pos(0, height() - 100),
    outline(4),
    area(),
    body({ isStatic: true }),
    color(127, 200, 255),
])

loop(1, () => {
add([
    rect(40, 50),
    area(),
    pos(width(), height() - 100),
    anchor("botleft"),
    color(255, 180, 255),
    body({ isStatic: true }),
    move(LEFT, 1000),
    "happy",
]);
});

bean.onCollide("happy", () => {
    addKaboom(bean.pos);
    shake();
});
