const cursor = document.querySelector("#cursor");
const cursorBorder = document.querySelector("#cursor-border");
const cursorPos = { x: 0, y: 0 };
const cursorBorderPos = { x: 0, y: 0 };

document.addEventListener("mousemove", (e) => {
  cursorPos.x = e.clientX;
  cursorPos.y = e.clientY;

  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

requestAnimationFrame(function loop() {
  const easting = 3;
  cursorBorderPos.x += (cursorPos.x - cursorBorderPos.x) / easting;
  cursorBorderPos.y += (cursorPos.y - cursorBorderPos.y) / easting;

  cursorBorder.style.transform = `translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`;
  requestAnimationFrame(loop);
});

document.addEventListener("mousedown", (e) => { 
  cursor.style.background = 'red';
  cursorBorder.style.boxShadow = '0 0 0 1px red';
});
document.addEventListener("mouseup", (e) => { 
  cursor.style.background = 'white';
  cursorBorder.style.boxShadow = '0 0 0 1px white';
});

document.addEventListener("mousemove", (e) => { 
  if(!document.getElementById('cursor__info').classList.contains('playing')){
    setTimeout(() =>
      document.getElementById('cursor__info').classList.add('not-playing'),1000
    )
  }
});