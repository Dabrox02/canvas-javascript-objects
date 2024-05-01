export class Circle {
    constructor(x_pos, y_pos, width, height, imageSrc, speed) {
        // Aleatorizamos la direccion del vector
        const signo1 = Math.random() < 0.5 ? -1 : 1;
        const signo2 = Math.random() < 0.5 ? -1 : 1;

        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = imageSrc;
        this.speed = speed;
        // Direccion del vector
        this.dx = signo1 * this.speed; // Cambio en x por frame basado en la velocidad
        this.dy = signo2 * this.speed;
    }

    move() {
        // Actualizar las coordenadas x e y basadas en la velocidad
        this.x_pos += this.dx;
        this.y_pos += this.dy;
    }

    draw(context) {
        // Dibujar la imagen en las coordenadas especificadas
        context.drawImage(this.image, this.x_pos, this.y_pos, this.width, this.height);
    }

    update(context) {
        const w_width = context.canvas.width;
        const w_height = context.canvas.height;

        this.move(); // Llamar al método move para actualizar la posición del círculo

        // Dibujar la imagen en su nueva posición
        this.draw(context);

        // Controlar las colisiones con los bordes del lienzo y cambiar la dirección si es necesario
        if ((this.x_pos + this.width) > w_width || (this.x_pos) < 0) {
            this.dx = -this.dx;
        }

        if ((this.y_pos + this.height) > w_height || (this.y_pos) < 0) {
            this.dy = -this.dy;
        }
    }
}
