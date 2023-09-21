
let showTitle1 = false;
let showTitle2 = false;
let showTitle3 = false;
let isAnimating = false;

const wrapLetters = (element) => {
  const textWrapper = element.querySelector(".letters");
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /([^\x00-\x80]|\w)/g,
    "<span class='letter'>$&</span>"
  );
};


const animateTitle = (title, index) => {
  const line = title.querySelector(".line");
  const letters = title.querySelectorAll(".letter");

  title.style.opacity = 1;

  return anime.timeline({ loop: false })
    .add({
      targets: line,
      scaleY: [0, 1],
      opacity: [0.5, 1],
      easing: "easeOutExpo",
      duration: 100,
    })
    .add({
      targets: line,
      translateX: [
        0,
        title.querySelector(".letters").getBoundingClientRect().width + 10,
      ],
      easing: "easeOutExpo",
      duration: 700,
      delay: 100,
    })
    .add({
      targets: letters,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 600,
      offset: "-=775",
      delay: (el, i) => 40 * (i + 1),
    })
    .add({
      targets: title,
      opacity: 0, 
      duration: 1000,
      easing: "easeOutExpo",
      complete: () => {
        isAnimating = false; 
        if (index === 0) showTitle1 = true;
        if (index === 1) showTitle2 = true;
        if (index === 2) showTitle3 = true;
        

        if (index === 0) {
          const title2 = document.querySelector(".title2");
          animateTitle(title2, 1);
        } else if (index === 1) {
          const title3 = document.querySelector(".title3");
          animateTitle(title3, 2);
        } else if (showTitle1 && showTitle2 && showTitle3) {
          const welcome = document.querySelector(".welcome");
          welcome.classList.add("rotate");
          document.body.classList.add("rotate");
          document.body.classList.remove('overflow');
        }
      },
    });
};




document.addEventListener("wheel", () => {
  if (isAnimating) {
    return; 
  }

  if (!showTitle1) {
    const title1 = document.querySelector(".title1");
    isAnimating = true;
    animateTitle(title1, 0);
  } else if (!showTitle2) {
    const title2 = document.querySelector(".title2");
    isAnimating = true;
    animateTitle(title2, 1);
  } else if (!showTitle3) {
    const title3 = document.querySelector(".title3");
    isAnimating = true;
    animateTitle(title3, 2);
  } else if(showTitle1 & showTitle2 & showTitle3) {
    const welcome = document.querySelector(".welcome");
    welcome.classList.add("rotate");
    document.body.classList.add("rotate");
    document.body.classList.remove('overflow');
  }
});


wrapLetters(document.querySelector(".title1"));
wrapLetters(document.querySelector(".title2"));
wrapLetters(document.querySelector(".title3"));


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