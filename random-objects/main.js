import { Circle } from "./Circle.js";
import { CircleContext } from "./CircleContext.js";

const canva = document.getElementById("canva");
const ctx = canva.getContext("2d");
const w_width = window.innerWidth;
const w_height = window.innerHeight;
canva.style.background = "#ff8";
canva.width = w_width;
canva.height = w_height - 3;

const circle1 = new Circle(55, 200, 50, "black", 2, "A", 2);
const ctxCircle = new CircleContext(ctx, circle1);

const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}


window.addEventListener("resize", (e) => {
    const w_width = e.target.innerWidth;
    const w_height = e.target.innerHeight;
    canva.width = w_width;
    canva.height = w_height - 3;
})

for (let i = 0; i < 10; i++) {
    const radius = 50;
    const x = randomNumber(radius, w_width - radius);
    const y = randomNumber(radius, w_height - radius);
    const circle = new Circle(x, y, radius, "black", 2, i + 1, 2);
    ctxCircle.addCircle(circle);
}

ctxCircle.updateCircles()