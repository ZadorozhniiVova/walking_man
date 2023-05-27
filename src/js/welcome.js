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
},7000);

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
}, 10000);

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