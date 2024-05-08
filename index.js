const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width  = window.innerWidth * 0.8;
canvas,height = window.innerHeight;


const worm = [
    makeDot("green"),
    makeDot("blue"),
    makeDot("orange")
]

let mouseHistory = [{clientX:100,clientY:100}, {clientX:100,clientY:100}, {clientX:100,clientY:100}]
let lastMouseEvent = {}
let updateHistory = setInterval(() => {
  mouseHistory.push(lastMouseEvent)
  mouseHistory.shift()

}, 60)

function makeDot(color) {
    return {
        x: 100,
        y: 100,
        radius: 25,
        color: color,
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fillStyle = this.color;
          ctx.fill();
        },
      }
}

function clear() {
  ctx.fillStyle = "rgb(255 255 255 / 30%)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBoxes() {
  const pink = "#ea62a6"
  const orange = "#d14f2b"
  for (let index = 0; index < canvas.width; index+=400) {
    for (let jndex = 0; jndex < canvas.height; jndex+=200) {
      ctx.fillStyle = pink
      ctx.fillRect(index, jndex, 200, 100)
      ctx.fillRect(index+200, jndex+100, 200, 100)

      ctx.fillStyle = orange
      ctx.fillRect(index+200, jndex, 200, 100)
      ctx.fillRect(index, jndex+100, 200, 100) 
    }    
  }
}

function drawLines() {
  const purple = "#912bd1"
  const orange = "#d14f2b"

  ctx.fillStyle = purple;
  ctx.fillRect(0,0,canvas.width, canvas.height);

  ctx.fillStyle = orange;
  for (let index = 0; index < canvas.width; index+=200) {
    ctx.fillRect(index + 20, 0, 50, canvas.height)
  }

  for (let index = 0; index < canvas.height; index+=200) {
    ctx.fillRect(0, index + 20, canvas.width, 50)
  }
}

function drawBg() {
  if(document.getElementById("boxes").checked) {
    drawBoxes()
  }
  if (document.getElementById("lines").checked) {
    drawLines();    
  }
}


canvas.addEventListener("mousemove", (e) => {
  lastMouseEvent = e
  
  drawBg();
  console.log(mouseHistory)
  worm.forEach((dot, i) => {
      // offset = dot.radius * i;
      dot.x = mouseHistory[i].clientX ;
      dot.y = mouseHistory[i].clientY ;
      dot.draw();
  });
});


drawBg()
worm.forEach(dot => {
    dot.draw();
});
