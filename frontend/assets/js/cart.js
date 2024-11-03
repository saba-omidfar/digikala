import { getUserCartCount } from "./funcs/cart.js"

window.addEventListener('load', () => {
    getUserCartCount()
})

document.getElementById('digiplus-benefit-card-btn').addEventListener('click', () => {
    document.querySelector('.digiplus-modal__bg').classList.remove('hidden')
})

document.getElementById('digiplus-benefit__close-btn').addEventListener('click', () => {
    document.querySelector('.digiplus-modal__bg').classList.add('hidden')
})


document.body.addEventListener('click', event => {
    if (event.target.classList.contains('digiplus-modal__bg')) {
        document.querySelector('.digiplus-modal__bg').classList.add('hidden')
    }
})