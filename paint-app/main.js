const canva = document.getElementById("canva");
const context = canva.getContext("2d");
canva.style.background = "white";

// Configuracion Inicial
let start_background_color = "white";
let draw_color = "black";
let draw_width = "1";
let is_drawing = false;
let is_smooth = false;
let lastX, lastY;
let draw = normalDraw;
let lasts_paths = [];
let index = -1;


document.addEventListener("click", (e) => {
    if (e.target.matches(".color-save")) {
        const computedStyle = window.getComputedStyle(e.target);
        draw_color = computedStyle.backgroundColor;
    }

    if (e.target.matches("#isSmooth")) {
        is_smooth = e.target.checked;
    }

    if (e.target.matches(".clear")) {
        clearCanva();
    }

    if (e.target.matches(".undo")) {
        undoLast();
    }
})

document.addEventListener("input", (e) => {
    if (e.target.matches(".color-picker")) {
        draw_color = e.target.value;
    }

    if (e.target.matches(".pen-range")) {
        draw_width = e.target.value;
    }
});


// mobile
canva.addEventListener('touchstart', initLastPos);
canva.addEventListener("touchstart", startDraw);
canva.addEventListener('touchmove', handleMobileMove);
canva.addEventListener("touchend", stopDraw);

// desktop
canva.addEventListener('mousedown', initLastPos);
canva.addEventListener("mousedown", startDraw);
canva.addEventListener('mousemove', handleDesktopMove);
canva.addEventListener("mouseup", stopDraw);
canva.addEventListener("mouseout", stopDraw);


// Comenzar a dibujar en el lienzo
function startDraw(e) {
    const mousePos = getMousePos(canva, e);
    is_drawing = true;
    context.beginPath();
    context.moveTo(mousePos.x, mousePos.y);
    e.preventDefault();
}

function handleSmoothDraw(e) {
    if (is_drawing) {
        drawSmooth(e);
    }
}

function handleNormalDraw(e) {
    if (is_drawing) {
        normalDraw(e);
    }
}

// Función para inicializar la última posición del ratón
function initLastPos(e) {
    const mousePos = getMousePos(canva, e);
    lastX = mousePos.x;
    lastY = mousePos.y;
}

// Función para dibujar líneas suaves
function drawSmooth(e) {
    if (is_drawing) {
        const mousePos = getMousePos(canva, e);
        context.beginPath();
        context.moveTo(lastX, lastY); // Última posición registrada
        context.lineWidth = draw_width;
        context.strokeStyle = draw_color;
        drawSmoothLine(lastX, lastY, mousePos.x, mousePos.y);
        context.stroke();
        lastX = mousePos.x; // Actualizar la última posición del ratón
        lastY = mousePos.y;
    }
}

// Función para dibujar una curva suave entre dos puntos
function drawSmoothLine(x1, y1, x2, y2) {
    const cpX = (x1 + x2) / 2; // Punto de control en X
    const cpY = (y1 + y2) / 2; // Punto de control en Y
    context.quadraticCurveTo(x1, y1, cpX, cpY);
    context.lineTo(x2, y2);
}

// Funcion para lineas de dibujo no suaves
function normalDraw(e) {
    if (is_drawing) {
        const mousePos = getMousePos(canva, e);
        context.lineTo(mousePos.x, mousePos.y);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    }
}

// Parar de dibujar
function stopDraw(e) {
    if (is_drawing) {
        context.stroke();
        context.closePath();
        is_drawing = false;
    }
    e.preventDefault();

    if (e.type != "mouseout") {
        lasts_paths.push(context.getImageData(0, 0, canva.width, canva.height));
        index += 1;
    }

}

// Función para obtener las coordenadas del ratón en relación con el lienzo
function getMousePos(canva, e) {
    const rect = canva.getBoundingClientRect();
    const scaleX = canva.width / rect.width; // Factor de escala en el eje x
    const scaleY = canva.height / rect.height; // Factor de escala en el eje y
    const x = (e.clientX - rect.left) * scaleX; // Coordenada x del ratón en el lienzo
    const y = (e.clientY - rect.top) * scaleY; // Coordenada y del ratón en el lienzo
    return { x, y };
}

// Limpiar el canva completamente
function clearCanva() {
    context.fillStyle = start_background_color;
    context.clearRect(0, 0, canva.width, canva.height);
    lasts_paths = [];
    index = -1;
}

// Deshacer un cambio
function undoLast() {
    if (index <= 0) {
        clearCanva();
    } else {
        index -= 1;
        lasts_paths.pop();
        context.putImageData(lasts_paths[index], 0, 0);
    }
}

function handleMobileMove(e) {
    if (is_smooth) {
        handleSmoothDraw(e.touches[0]);
    } else {
        handleNormalDraw(e.touches[0]);
    }
}

function handleDesktopMove(e) {
    if (is_smooth) {
        handleSmoothDraw(e);
    } else {
        handleNormalDraw(e);
    }
}