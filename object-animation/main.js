import { Circle } from "./Circle.js";

const canva = document.getElementById("canva");
const ctx = canva.getContext("2d");
const w_width = window.innerWidth;
const w_height = window.innerHeight;
canva.style.background = "#ff8";
canva.width = w_width;
canva.height = w_height - 3;

const renderCircle = (circle) => {
    circle.draw(ctx);
}

const updateCircle = () => {
    requestAnimationFrame(updateCircle);
    circle.update(ctx);
}

const circle = new Circle(100, 100, 50, "black", 2, 1, 5);
renderCircle(circle);
updateCircle();

