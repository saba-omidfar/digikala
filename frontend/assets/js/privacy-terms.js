import { scrollHandler } from "./shared.js"

document.addEventListener('scroll', () => {
    if(window.innerWidth > 992) {
        scrollHandler()
    }
})