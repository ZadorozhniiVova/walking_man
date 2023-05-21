window.onload = function () {
    setTimeout(() => {
        // document.body.classList.add('loaded');
    }, 100);
}   

// Because only Chrome supports offset-path, feGaussianBlur for now

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

if(!isChrome) {
    document.getElementsByClassName('infinityChrome')[0].style.display = "none";
    document.getElementsByClassName('infinity')[0].style.display = "block";
}