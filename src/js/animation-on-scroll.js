const animItems = document.querySelectorAll( '._anim-items' );

if (animItems.length > 0) {
	window.addEventListener( 'scroll', animOnScroll, { passive: true } );

	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset( animItem ).top;
			const animStart = 3;
			let animItemPoint = window.innerHeight + animItemHeight / animStart;
			if (animItemHeight < window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if (( scrollY > animItemOffset - animItemPoint ) && scrollY < ( animItemOffset + animItemHeight )) {
				animItem.classList.add( '_active' );
			}
		}
	}

	function offset( el ) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return {
			top: rect.top + scrollTop,
			left: rect.left + scrollLeft,
		};
	}

	setTimeout( () => {
		animOnScroll();
	}, 300 );
}

const header = document.querySelector('.header');

document.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 0) {
        header.classList.add('scroll');
    } else {
        header.classList.remove('scroll');
    }
});