let showTitle1 = 0;
let showTitle2 = 0;
let showTitle3 = 0;

// Wrap every letter in a span
var textWrapper = document.querySelector(".title1 .letters");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /([^\x00-\x80]|\w)/g,
  "<span class='letter'>$&</span>"
);
var textWrapper2 = document.querySelector(".title2 .letters");
textWrapper2.innerHTML = textWrapper2.textContent.replace(
  /([^\x00-\x80]|\w)/g,
  "<span class='letter'>$&</span>"
);

var textWrapper3 = document.querySelector(".title3 .letters");
textWrapper3.innerHTML = textWrapper3.textContent.replace(
  /([^\x00-\x80]|\w)/g,
  "<span class='letter'>$&</span>"
);

//MINMAX
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}


if (showTitle1 === 0) {
  document.addEventListener("wheel", function () {
    if (showTitle1 === 0) {
      anime
        .timeline({
          loop: false
        })
        .add({
          targets: ".title1 .line",
          scaleY: [0, 1],
          opacity: [0.5, 1],
          easing: "easeOutExpo",
          duration: 700,
        })
        .add({
          targets: ".title1 .line",
          translateX: [
            0,
            document.querySelector(".title1 .letters").getBoundingClientRect()
            .width + 10,
          ],
          easing: "easeOutExpo",
          duration: 700,
          delay: 100,
        })
        .add({
          targets: ".title1 .letter",
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: 600,
          offset: "-=775",
          delay: (el, i) => 34 * (i + 1),
        })
        .add({
          targets: ".title1",
          // opacity: 0,
          duration: 1000,
          easing: "easeOutExpo",
          delay: 1000,
        })
        .add({
          targets: ".line",
          opacity: 0,
          duration: 200,
          easing: "easeOutExpo",
          delay: 200,
        })
        .add({
          targets: ".title1 .letter",
          opacity: [1, 0],
          duration: 1000,
          easing: "easeOutExpo",
          delay: 1000,
        });
      document.removeEventListener('wheel', null);
      showTitle1++
    }

  });
}

setTimeout(function () {
  if (showTitle1 === 1 && showTitle2 === 0) {
    document.addEventListener("wheel", function () {
      if (showTitle1 === 1 && showTitle2 === 0) {
        anime
          .timeline({
            loop: false
          })
          .add({
            targets: ".title2 .line",
            scaleY: [0, 1],
            opacity: [0.5, 1],
            easing: "easeOutExpo",
            duration: 700,
          })
          .add({
            targets: ".title2 .line",
            translateX: [
              0,
              document.querySelector(".title2 .letters").getBoundingClientRect()
              .width + 10,
            ],
            easing: "easeOutExpo",
            duration: 700,
            delay: 100,
          })
          .add({
            targets: ".title2 .letter",
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 600,
            offset: "-=775",
            delay: (el, i) => 34 * (i + 1),
          })
          .add({
            targets: ".title2",
            // opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000,
          })
          .add({
            targets: ".line",
            opacity: 0,
            duration: 200,
            easing: "easeOutExpo",
            delay: 200,
          })
          .add({
            targets: ".title2 .letter",
            opacity: [1, 0],
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000,
          });
        showTitle2++
      }
    });
  }
},4500);

setTimeout(function () {
  if (showTitle2 === 1 && showTitle3 === 0) {
    document.addEventListener("wheel", function () {
      if (showTitle2 === 1 && showTitle3 === 0) {
        anime
          .timeline({
            loop: false
          })
          .add({
            targets: ".title3 .line",
            scaleY: [0, 1],
            opacity: [0.5, 1],
            easing: "easeOutExpo",
            duration: 700,
          })
          .add({
            targets: ".title3 .line",
            translateX: [
              0,
              document.querySelector(".title3 .letters").getBoundingClientRect()
              .width + 10,
            ],
            easing: "easeOutExpo",
            duration: 700,
            delay: 100,
          })
          .add({
            targets: ".title3 .letter",
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 600,
            offset: "-=775",
            delay: (el, i) => 34 * (i + 1),
          })
          .add({
            targets: ".title3",
            // opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000,
          })
          .add({
            targets: ".line",
            opacity: 0,
            duration: 200,
            easing: "easeOutExpo",
            delay: 200,
          })
          .add({
            targets: ".title3 .letter",
            opacity: [1, 0],
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000,
          });
        showTitle3++
        
      }
    });
  }
}, 9000);




// setInterval(function () {
//   if (showTitle1 === true && showTitle2 === true &&showTitle3 === false) {
//     anime
//       .timeline({ loop: false })
//       .add({
//         targets: ".title3 .line",
//         scaleY: [0, 1],
//         opacity: [0.5, 1],
//         easing: "easeOutExpo",
//         duration: 700,
//       })
//       .add({
//         targets: ".title3 .line",
//         translateX: [
//           0,
//           document.querySelector(".title3 .letters").getBoundingClientRect()
//             .width + 10,
//         ],
//         easing: "easeOutExpo",
//         duration: 700,
//         delay: 100,
//       })
//       .add({
//         targets: ".title3 .letter",
//         opacity: [0, 1],
//         easing: "easeOutExpo",
//         duration: 600,
//         offset: "-=775",
//         delay: (el, i) => 34 * (i + 1),
//       })
//       .add({
//         targets: ".title3",
//         // opacity: 0,
//         duration: 1000,
//         easing: "easeOutExpo",
//         delay: 1000,
//       })
//       .add({
//         targets: ".line",
//         opacity: 0,
//         duration: 200,
//         easing: "easeOutExpo",
//         delay: 200,
//       }).add({
//         targets: ".title3 .letter",
//         opacity: [1, 0],
//         duration: 1000,
//         easing: "easeOutExpo",
//         delay: 1000,
//       });
//     showTitle3 = true;
//   }

// },6000)

setInterval(function () {

  if (showTitle1 === 1 && showTitle2 === 1 && showTitle3 === 1) {
    document.addEventListener("wheel", function () {
      if (showTitle1 === 1 && showTitle2 === 1 && showTitle3 === 1) {
        document.querySelector(".welcome").classList.add("rotate");
      }
    })
  }
}, 13000)

setInterval(function () {
  document.body.classList.add("rotate");
        document.body.classList.remove('overflow');
},15000)




particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 120,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});