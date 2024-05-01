import { Circle } from "./Circle.js";
import { CircleContext } from "./CircleContext.js";

const canva = document.getElementById("canva");
const ctx = canva.getContext("2d");
const w_width = window.innerWidth;
const w_height = window.innerHeight;
canva.style.background = "#ff8";
canva.width = w_width;
canva.height = w_height - 3;

const circle1 = new Circle(55, 200, 50, "black", 2, "A", 10);
const circle2 = new Circle(300, 400, 200, "black", 2, "B", 0);
const circle3 = new Circle(100, 100, 25, "black", 2, "C", 0);
const ctxCircle = new CircleContext(ctx, circle1);
ctxCircle.addCircle(circle2);
ctxCircle.addCircle(circle3);
ctxCircle.updateCircles()


window.addEventListener("resize", (e) => {
    const w_width = e.target.innerWidth;
    const w_height = e.target.innerHeight;
    canva.width = w_width;
    canva.height = w_height - 3;
})