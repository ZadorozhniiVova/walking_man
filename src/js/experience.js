var experienceItem = document.querySelectorAll('.experience__item');


experienceItem.forEach(function (block) {
    block.addEventListener('mouseover', function () {
        experienceItem.forEach(function (item) {
            item.style.opacity = '0.5';
        });
    });

    block.addEventListener('mouseout', function () {
        experienceItem.forEach(function (item) {
            item.style.opacity = '1';
        });
    });
});