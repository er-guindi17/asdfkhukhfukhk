import React, { useRef, useEffect } from 'react';

const AnimatedBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const balls: Ball[] = [];
        const colors = ['#8A2BE2', '#4B0082', '#6A5ACD', '#4169E1', '#483D8B'];

        class Ball {
            x: number;
            y: number;
            velX: number;
            velY: number;
            color: string;
            size: number;

            constructor(x: number, y: number, velX: number, velY: number, color: string, size: number) {
                this.x = x;
                this.y = y;
                this.velX = velX;
                this.velY = velY;
                this.color = color;
                this.size = size;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
                ctx.fill();
            }

            update() {
                if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
                    this.velX = -this.velX;
                }
                if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
                    this.velY = -this.velY;
                }
                this.x += this.velX;
                this.y += this.velY;
            }
        }

        const random = (min: number, max: number) => Math.random() * (max - min) + min;

        const createBalls = () => {
            balls.length = 0; // Clear existing balls
            const ballCount = Math.floor((width * height) / 45000); // Adjust density based on screen size
             for (let i = 0; i < ballCount; i++) {
                const size = random(15, 30);
                const ball = new Ball(
                    random(size, width - size),
                    random(size, height - size),
                    random(-1, 1),
                    random(-1, 1),
                    colors[Math.floor(random(0, colors.length))],
                    size
                );
                balls.push(ball);
            }
        }

        let animationFrameId: number;
        const loop = () => {
            if (!ctx) return;
            ctx.fillStyle = 'rgba(5, 2, 13, 0.25)'; // Dark background with a trail effect
            ctx.fillRect(0, 0, width, height);
            
            for (const ball of balls) {
                ball.draw();
                ball.update();
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            createBalls(); // Recreate balls for the new size
        };
        
        createBalls();
        loop();


        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} id="animated-bg" />;
};

export default AnimatedBackground;