const w_h = window.innerHeight - 10;
const w_w = window.innerWidth - 10;
const canva = document.getElementById("canva");
const context = canva.getContext("2d");

console.log(w_h, w_w);

canva.style.background = "#ff8";
canva.width = w_w;
canva.height = w_h;

context.fillStyle = "#98f";
context.fillRect(100, 100, 200, 200);
context.fillRect(400, 100, 200, 200);
context.fillStyle = "#000";
context.fillRect(100, 400, 600, 100);

context.beginPath();
context.strokeStyle = "red";
context.lineWidth = "5";
context.arc(750, 150, 50, 0, 3.1415 * 2, false);
context.stroke();
context.closePath();