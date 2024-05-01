import { Circle } from "./Circle.js";
import { CircleContext } from "./CircleContext.js";

const canva = document.getElementById("canva");
const ctx = canva.getContext("2d");
const w_width = window.innerWidth;
const w_height = window.innerHeight;
canva.style.background = "#ff8";
canva.width = w_width;
canva.height = w_height - 3;

const circle1 = new Circle(55, 200, 100, 100, "random-image.png", 5);
const ctxCircle = new CircleContext(ctx, circle1);

window.addEventListener("resize", (e) => {
    const w_width = e.target.innerWidth;
    const w_height = e.target.innerHeight;
    canva.width = w_width;
    canva.height = w_height - 3;
})

ctxCircle.updateCircles();