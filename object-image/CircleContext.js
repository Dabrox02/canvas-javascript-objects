export class CircleContext {

    constructor(context, circle) {
        this.context = context;
        this.circle = circle;
        this.circles = [];
    }

    addCircle(circle) {
        this.circles.push(circle);
    }

    getDistance(circle1, circle2) {
        return Math.sqrt(Math.pow(circle2.x_pos - circle1.x_pos, 2) + Math.pow(circle2.y_pos - circle1.y_pos, 2));
    }

    collision() {
        this.circles.forEach(object => {
            if (this.getDistance(this.circle, object) < (this.circle.radius + object.radius)) {
                object.color = "red";
            }
            if (this.getDistance(this.circle, object) >= (this.circle.radius + object.radius)) {
                object.color = "black";
            }
        });
    }

    updateCircles() {
        this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.circle.update(this.context);
        this.circles.forEach(object => {
            object.update(this.context);
        });
        this.collision();
        requestAnimationFrame(() => this.updateCircles());
    }
}