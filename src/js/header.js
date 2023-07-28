
const menuItems = document.querySelectorAll('.header__nav-item');

const sections = document.querySelectorAll('section');


function addShowClass(menuItem) {
  menuItem.classList.add('active');
}

function removeShowClass() {
  menuItems.forEach((menuItem) => {
    menuItem.classList.remove('active');
  });
}


window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset;


  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom+50) {
      removeShowClass(); 
      addShowClass(menuItems[index]); 
    }
  });
});

