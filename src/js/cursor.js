// Because of a WebKit-Issue which renders (even SVG) cursors blurry on Retina-Displays I decided to go for a solution which renders the cursor within a custom <div>.

var rotatingCursor = (function() {

    /* Local Variables */
    const INTERVAL_POSITION = 5;
    const INTERVAL_ROTATION = 100;
    let lastCursorPos = {x: -999, y: -999};
    let currentCursorPos = {x: -999, y: -999};
    let lastCursorAngle = 0, cursorAngle = 0;
    let cursorEl, cursorImageEl;
  
    function setCurrentCursorProps() {
    
      cursorEl.style.transform = `translate(${currentCursorPos.x}px, ${currentCursorPos.y}px)`;
  
      
      while (Math.abs(lastCursorAngle - cursorAngle) > 180) {
        if (cursorAngle > lastCursorAngle) {
          cursorAngle -= 360;
        } else if (cursorAngle < lastCursorAngle) {
          cursorAngle += 360;
        }
      }
   
      cursorImageEl.style.transform = `rotate(${cursorAngle - 90}deg)`;
    }
  
    function updateCursor() {
      window.addEventListener('mousemove', event => {
        currentCursorPos = {x: event.clientX, y: event.clientY};
      });
  
      // Interval for updating cursor-position
      setInterval(setCurrentCursorProps, INTERVAL_POSITION);
  
      
      setInterval(() => {
        const delt = {
          x: lastCursorPos.x - currentCursorPos.x,
          y: lastCursorPos.y - currentCursorPos.y
        }
        if (Math.abs(delt.x) < 3 && Math.abs(delt.y) < 3) return;
        cursorAngle = (Math.atan2(delt.y, delt.x) * 180 / Math.PI);
  
        setCurrentCursorProps();
  
        lastCursorPos = currentCursorPos;
        lastCursorAngle = cursorAngle;
      }, INTERVAL_ROTATION);
    }
  
  
    /* Public Functions */
  
    return {
  
      'initialize' : () => {
        cursorEl = document.querySelector('#cursor');
        cursorImageEl = document.querySelector('#cursor > img');
        updateCursor();
      }
  
    };
  
  })();
  
  
  document.addEventListener('DOMContentLoaded', rotatingCursor.initialize);
  