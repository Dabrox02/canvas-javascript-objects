export class Circle {
    constructor(x_pos, y_pos, radius, color, lineWidth, text, speed) {
        // Aleatorizamos la direccion del vector
        const signo = Math.random() < 0.5 ? -1 : 1;
        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.radius = radius;
        this.color = color;
        this.lineWidth = lineWidth;
        this.text = text;
        this.speed = speed;
        // Direccion del vector
        this.dx = signo * this.speed; // Cambio en x por frame basado en la velocidad
        this.dy = signo * this.speed;
    }

    draw(context) {
        //  inicia un nuevo trazado de ruta.
        context.beginPath();
        context.strokeStyle = this.color;
        context.fillStyle = this.color; // Establece el color de relleno de la circunferencia

        // position x, position y, circle radius, start angle, end angle,  anticlockwise?
        context.arc(this.x_pos, this.y_pos, this.radius, 0, Math.PI * 2, false);
        context.lineWidth = this.lineWidth;
        // Traza el contorno de la ruta definida en el contexto de dibujo especificado
        context.stroke();
        // Rellena la ruta definida en el contexto de dibujo especificado
        context.fill();

        // Establece Propiedades del texto
        context.textAlign = "center";
        context.textBaseLine = "middle";
        context.font = "16px Arial";
        context.fillStyle = "white";
        // Dibuja el texto en el centro de la circunferencia
        context.fillText(this.text, this.x_pos, this.y_pos);

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

    isClicked({ x, y }) {
        const distance = Math.sqrt(Math.pow((x - this.x_pos), 2) + Math.pow((y - this.y_pos), 2));
        return distance <= this.radius;
    }

}