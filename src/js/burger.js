let burger = document.querySelector('.burger');

if(burger){
    burger.addEventListener('click', () =>{
        burger.classList.toggle('burger-open');
    })
}