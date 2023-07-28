var projectItem = document.querySelectorAll('.project__item');


projectItem.forEach(function (block) {
    block.addEventListener('mouseover', function () {
        projectItem.forEach(function (item) {
            item.style.opacity = '0.5';
        });
    });

    block.addEventListener('mouseout', function () {
        projectItem.forEach(function (item) {
            item.style.opacity = '1';
        });
    });
});