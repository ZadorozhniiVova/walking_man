
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

menuItems.forEach((menuItem) => {
  menuItem.addEventListener('click', function(e) {
    removeShowClass()
    e.target.parentElement.classList.add('active');
  })
})


