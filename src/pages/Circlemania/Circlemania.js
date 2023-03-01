import { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Circlemania = () => {
  
  const [winTime, setWinTime] = useState(0)

  const gameOver = (time) => {
    console.log("Game won in ", time)
    setWinTime(time)
  }

  const draw = (canvas, context) => {
    
    runGame(canvas, context, gameOver)
  }

  const resetGame = () => {
    console.log("reset")    
  }

  return(
    <div id="content">
      <div className="circlemania">
        <h1 id="content-title">Circlemania</h1>
        <div className="game">
          <Canvas draw={draw} width={800} height={550}/>
          <GameStatus winTime={winTime} />
        </div>
        {/* <Reset handleReset={resetGame} /> */}
      </div>      
    </div>    
  )
}

const Reset = ({ handleReset }) => {
  return (
    <button onClick={handleReset}>
      reset
    </button>
  )
}

const GameStatus = ({ winTime }) => {

  let message

  if(winTime <= 0) {
    message = <p>Click all the circles blue</p>
  } else {
    message = <h1>You won in {winTime} seconds</h1>
  }

  return(
    <>
      {message}
  
    </>
  )
}

const Canvas = ({ draw, width, height, onReset }) => {

  const canvasRef = useRef()
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    draw(canvas, context)
  }, [])  

  return (
    <canvas id="game-canvas" ref={canvasRef} width={width} height={height}></canvas>
  )
}

Canvas.propTypes = {
  draw: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

const runGame = (canvas, context, gameOver) => {

  //GAME STATE AND VARIABLES
  let gameIsOver = false;

  const circleCount = 5;
  const maxCircleRadius = 60;
  const minCircleRadius = 50;
  const redColors = [
    "#FFD700", // original golden color
    "#FFC107", // darker shade of golden
    "#FFDF00", // brighter shade of golden
    "#DAA520", // goldenrod color
    "#B8860B", // dark goldenrod color
  ]

  const blueColors = [
    "#99DCFE", // original blue color
    "#77C3F3", // lighter shade of blue
    "#5CB5E8", // another lighter shade of blue
    "#2C6792", // dark blue color
    "#0C2D48", // deeper shade of dark blue
  ] 

  let circles = [];


  canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
  })
  
  class Circle {
  
    isSelected = false
  
    constructor(x, y, dx, dy, radius, color) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.color = color;
    }
  
    draw() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      context.fillStyle = this.color;
      context.fill();
      context.closePath();
    }
  
    update() {
      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.dx = -this.dx;
        this.collide()
      }
  
      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
        this.dy = -this.dy;
        this.collide()
      }
  
      this.x += this.dx;
      this.y += this.dy;
  
      for (let i = 0; i < circles.length; i++) {
        if (this === circles[i]) continue;
  
        if (this.distance(this.x, this.y, circles[i].x, circles[i].y) - (this.radius + circles[i].radius) < 0) {
          resolveCollision(this, circles[i]);
        }
      }
  
      this.draw();
    }
  
    select() {
      this.isSelected = true;
      const colorIndex = Math.floor(Math.random() * (blueColors.length - 1)); 
      this.color = blueColors[colorIndex];
    }
  
    collide() {
      this.isSelected = false;
      const colorIndex = Math.floor(Math.random() * (redColors.length - 1)); 
      this.color = redColors[colorIndex];
    }
  
    distance(x1, y1, x2, y2) {
      return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }
  }
  
  function resolveCollision(circle1, circle2) {
    const xVelocityDiff = circle1.dx - circle2.dx;
    const yVelocityDiff = circle1.dy - circle2.dy;
    const xDist = circle2.x - circle1.x;
    const yDist = circle2.y - circle1.y;
  
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
      const angle = -Math.atan2(circle2.y - circle1.y, circle2.x - circle1.x);
  
      const m1 = circle1.radius;
      const m2 = circle2.radius;
  
      const u1 = rotate(circle1.dx, circle1.dy, angle);
      const u2 = rotate(circle2.dx, circle2.dy, angle);
  
      const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
      const v2 = { x: u2.x * (m2 - m1) / (m1 + m2) + u1.x * 2 * m1 / (m1 + m2), y: u2.y };
  
      const vf1 = rotate(v1.x, v1.y, -angle);
      const vf2 = rotate(v2.x, v2.y, -angle);
  
      circle1.dx = vf1.x;
      circle1.dy = vf1.y;
      circle2.dx = vf2.x;
      circle2.dy = vf2.y;
  
      circle1.collide()
      circle2.collide()
    }
  }
  
  function getRandomRadius() {
    return Math.floor(Math.random() * (maxCircleRadius - minCircleRadius + 1)) + minCircleRadius;
  }
  
  function getRandomX(radius) {
    return Math.random() * (canvas.width - radius * 2) + radius;
  }
  
  function getRandomY(radius) {
    return Math.random() * (canvas.height - radius * 2) + radius;
  }
  
  function getRandomVelocity() {
    return (Math.random() - 0.5) * 7;
  }
  
  function rotate(dx, dy, angle) {
    return {
      x: dx * Math.cos(angle) - dy * Math.sin(angle),
      y: dx * Math.sin(angle) + dy * Math.cos(angle)
    };
  }
  
  function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    // console.log("x: " + x + " y: " + y)
  
    handleMouseClick(x, y);
  }
  
  function handleMouseClick(x, y) {
    
    if(gameIsOver) return;
    let blues = 0;
  
    for (const circle of circles) {
      if (circle.isSelected) {
        //Already blue
        blues++;
        continue;
      }
  
      const xMin = circle.x - circle.radius;
      const xMax = circle.x + circle.radius;
  
      if (!(x > xMin && x < xMax)) {
        continue;
      }
  
      const yMin = circle.y - circle.radius;
      const yMax = circle.y + circle.radius;
  
      if (!(y > yMin && y < yMax)) {
        continue;
      }
      
      circle.select();
      blues++;
    }
  
    if (blues >= circles.length) {    
      gameWin();
    }
  }
  
  let startTime;

  function init() {  
    circles = [];
    console.log("Initializing");
    for (let i = 0; i < circleCount; i++) {
      const radius = getRandomRadius();
      const x = getRandomX(radius);
      const y = getRandomY(radius);
      const dx = getRandomVelocity();
      const dy = getRandomVelocity();
      const color = redColors[Math.floor(Math.random() * redColors.length)];
  
      circles.push(new Circle(x, y, dx, dy, radius, color));
      gameIsOver = false;
    }
    startTime = new Date();
  }
  
  function animate() {
    if (gameIsOver) {
      return
    }
  
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    for (let i = 0; i < circles.length; i++) {
      circles[i].update();
    }
    requestAnimationFrame(animate);
  }
  
  
  function gameWin() {
    requestAnimationFrame(() => {
      gameIsOver = true
      const time = (new Date() - startTime) / 1000;
      gameOver(time);
    });
  }
  
  function startGame() {
    init();
    animate();
  }
  
  startGame();
}


export default Circlemania