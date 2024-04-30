import { Circle } from "./Circle.js";

const canva = document.getElementById("canva");
const ctx = canva.getContext("2d");
const w_width = window.innerWidth;
const w_height = window.innerHeight;
canva.style.background = "#ff8";
canva.width = w_width;
canva.height = w_height - 3;

const renderCircles = (circle) => {
    circle.draw(ctx);
}

for (let i = 0; i < 10; i++) {
    let random_x = Math.random() * window.innerWidth;
    let random_y = Math.random() * window.innerHeight;
    const circle = new Circle(random_x, random_y, 50, "black", 2, i + 1);
    renderCircles(circle);
}

