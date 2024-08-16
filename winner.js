const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');
const bubbles = [];
let animationFrameId;

class WINNERSCREEN {
    static resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    static randomNeonColor() {
        const colors = ['#1c9cbd', '#8abe56', '#f7ce46', '#4256a1', '#3c57a6', '#da3832', '#ec248f', '#bd6700', '#a29e5e', '#ebf2dd', '#ffffff', '#cd760c', '#efeed4', '#e3e1bf', '#69ccff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    static createBubble() {
        const bubble = {
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 100,
            radius: Math.random() * 5 + 2,
            speed: Math.random() * 1 + 0.5,
            oscillationAmplitude: Math.random() * 20 + 10,
            oscillationSpeed: Math.random() * 0.02 + 0.01,
            offset: Math.random() * Math.PI * 2,
            color: this.randomNeonColor()  
        };
        bubbles.push(bubble);
    }

    static drawBubble(bubble) {
        ctx.beginPath();
        const oscillation = Math.sin(bubble.y * bubble.oscillationSpeed + bubble.offset) * bubble.oscillationAmplitude;
        ctx.arc(bubble.x + oscillation, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.fill();
        ctx.closePath();
    }

    static updateBubbles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < bubbles.length; i++) {
            const bubble = bubbles[i];
            bubble.y -= bubble.speed;

            if (bubble.y + bubble.radius < 0) {
                bubbles.splice(i, 1);
                i--;
            } else {
                this.drawBubble(bubble);  
            }
        }

        for (let i = 0; i < 5; i++) {
            this.createBubble();  
        }

        animationFrameId = requestAnimationFrame(this.updateBubbles.bind(this));  
    }

    static startAndStopBubbles() {
        this.updateBubbles();  
        setTimeout(() => {
            window.location.reload();
        }, 10000);
    }
}
window.addEventListener('resize', WINNERSCREEN.resizeCanvas.bind(WINNERSCREEN));  
WINNERSCREEN.resizeCanvas();

