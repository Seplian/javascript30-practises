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
            if(ele.getBoundingClientRect().top < window.innerHeight - 0.5 * ele.height && ele.getBoundingClientRect().top > - ele.height) {
                ele.classList.add('active');
            }
            if(ele.getBoundingClientRect().top > window.innerHeight - 0.5 * ele.height || ele.getBoundingClientRect().top < - ele.height) {
                ele.classList.remove('active');
            }
    });
}

window.addEventListener('scroll', debounce(slide));


