const body = document.querySelector('.background');
const canvasSize = body.offsetWidth * body.offsetHeight;
const starsFraction = canvasSize / 20000;

function random(min, max) {
  return min + Math.random() * (max + 1 - min);
}

for(let i = 0; i < starsFraction; i++) {
  let xPos = random(0, 100);
  let yPos = random(0, 100);
  let alpha = random(0.5, 1);
  let size = random(1, 1);
  let colour = '#f5c7f7';
  
  const star = document.createElement('div');
  star.style.position = 'relative';
  star.style.left = xPos + '%';
  star.style.top = yPos + '%';
  star.style.opacity = alpha;
  star.style.width = size + 'px';
  star.style.height = size + 'px';
  star.style.backgroundColor = colour;
  body.appendChild(star);
}