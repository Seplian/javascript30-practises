function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        let context = this, args = arguments;
        let later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

const image = document.querySelectorAll('.slide-in');

function slide() {
    image.forEach(ele => {

        // Viewport to the top of the image < Viewport height - 20% height of the image, i.e. 20% of the image is already in the viewport

        // Viewport to the top of the image > - 80% height of the image, i.e. 80% of the image is still in the viewport

        let alreadyIn = ele.getBoundingClientRect().top < window.innerHeight - 0.2 * ele.height;
        let notYetLeft = ele.getBoundingClientRect().top > - 0.8 * ele.height;

        (alreadyIn && notYetLeft) ? ele.classList.add('active') : ele.classList.remove('active');
    });
}

window.addEventListener('scroll', debounce(slide));


