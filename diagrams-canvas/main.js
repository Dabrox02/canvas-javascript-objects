const w_h = window.innerHeight - 10;
const w_w = window.innerWidth - 10;

const canva = document.getElementById("canva");
const context = canva.getContext("2d");

canva.width = w_w;
canva.height = w_h;


// Dibujar una grid
const drawGrid = () => {
    const canvasWidth = canva.width;
    const canvasHeight = canva.height;
    const gridSize = 32; // Tamaño de la cuadrícula
    context.beginPath();
    // Dibujar líneas horizontales
    for (let y = 0; y <= canvasHeight; y += gridSize) {
        context.moveTo(0, y);
        context.lineTo(canvasWidth, y);
    }
    // Dibujar líneas verticales
    for (let x = 0; x <= canvasWidth; x += gridSize) {
        context.moveTo(x, 0);
        context.lineTo(x, canvasHeight);
    }

    // Establecer estilo de línea
    context.strokeStyle = 'rgba(63, 63, 63, 0.37)';
    context.stroke();
    context.closePath();
}

// Dibujar un grafico de lineas
const drawLineChart = ({ context, data }) => {
    // Configuracion
    const width = context.canvas.width;
    const height = context.canvas.height;
    const distance_x = width / data.length;
    const distance_y = height / (data.length) + 1;
    console.log(distance_y);

    // Trazar Ruta
    context.beginPath();
    context.moveTo(0, height);

    data.forEach((el, i) => {
        const new_distance = distance_x * (i);
        // const y = height - el;
        const y = height - (el - 100 + distance_y);

        // Dibujar línea hasta el punto
        context.lineTo(new_distance, y);
        context.arc(new_distance, y, 5, 0, Math.PI * 2, false);

        // Dibujar valor del punto
        context.font = "16px Arial"
        context.fillText(el.toString(), new_distance, y - 10); // Desplazar el texto hacia arriba
    });

    context.lineTo(width, height);
    context.fillText("end", width - 50, height - 10);
    context.strokeStyle = 'black';
    context.stroke();
    context.closePath();
}



// Llamar a la función para dibujar la cuadrícula
drawGrid();
// Grafico de lineas
drawLineChart({ context, data: [50, 450, 250, 0, 200] });