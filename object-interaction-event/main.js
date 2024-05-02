import { Circle } from "./Circle.js";

const canva = document.getElementById("canva");
const ctx = canva.getContext("2d");
const w_width = window.innerWidth;
const w_height = window.innerHeight / 2;
canva.style.background = "#ff8";
canva.width = w_width;
canva.height = w_height - 3;

const circle1 = new Circle(200, 200, 100, "black", 2, "", 0);

window.addEventListener("resize", (e) => {
    const w_width = e.target.innerWidth;
    const w_height = e.target.innerHeight;
    canva.width = w_width;
    canva.height = w_height - 3;
})

canva.addEventListener("click", (e) => {

    const rect = canva.getBoundingClientRect();
    const x = e.clientX - rect.left; // click del mouse con respecto a la parte izquierda del canva
    const y = e.clientY - rect.top; // click del mouse con respecto a la parte superior del canva
    let isClicked = circle1.isClicked({ x, y });
    if (isClicked) {
        circle1.color = "blue";
        circle1.text = "clicked";
        circle1.draw(ctx);
    } else {
        circle1.text = "no clicked";
        circle1.color = "red";
        circle1.draw(ctx);
    }
})

circle1.draw(ctx);