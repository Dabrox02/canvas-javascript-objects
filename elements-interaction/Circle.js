export class Circle {
    constructor(x_pos, y_pos, radius, color, lineWidth, text, speed) {
        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.radius = radius;
        this.color = color;
        this.lineWidth = lineWidth;
        this.text = text;
        this.speed = speed;
        this.dx = 1 * this.speed; // Cambio en x por frame basado en la velocidad
        this.dy = 1 * this.speed;
    }

    draw(context) {
        //  inicia un nuevo trazado de ruta.
        context.beginPath();
        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseLine = "middle";
        context.font = "14px Arial"
        context.fillText(this.text, this.x_pos, this.y_pos);

        // position x, position y, circle radius, start angle, end angle,  anticlockwise?
        context.arc(this.x_pos, this.y_pos, this.radius, 0, Math.PI * 2, false);
        context.lineWidth = this.lineWidth;
        // Traza el contorno de la ruta definida en el contexto de dibujo especificado
        context.stroke();


        // cierra la ruta actual creando automáticamente una línea desde el último punto de la ruta hasta el primer punto
        context.closePath();
    }


    update(context) {
        const w_width = context.canvas.width;
        const w_height = context.canvas.height;

        this.draw(context);

        if ((this.x_pos + this.radius) > w_width) {
            this.dx = -this.dx;
            this.counter++;
        }

        if ((this.y_pos + this.radius) > w_height) {
            this.dy = -this.dy;
            this.counter++;
        }

        if ((this.x_pos - this.radius) < 0) {
            this.dx = -this.dx;
            this.counter++;
        }

        if ((this.y_pos - this.radius) < 0) {
            this.dy = -this.dy;
            this.counter++;
        }

        this.x_pos += this.dx;
        this.y_pos += this.dy;
    }
}