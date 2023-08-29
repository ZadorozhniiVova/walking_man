let burger = document.querySelector('.burger');

if (burger) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('burger-open');
        document.body.classList.toggle('overflow');
    })
}

let menu = document.querySelectorAll('text');

if (menu) {
    menu.forEach(menuItem => {
        menuItem.addEventListener('mouseenter', () => {
            menuItem.previousElementSibling.classList.add('bread__item--hover')
        })
        menuItem.addEventListener('mouseleave', () => {
            menuItem.previousElementSibling.classList.remove('bread__item--hover')
        }
        )
    })
}