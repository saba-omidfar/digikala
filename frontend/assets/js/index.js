import { 
    getAndShowAllHeaderSliders,
    getAndShowAllServices, 
    getAndShowAllIncredibleOffers, 
    getAndShowAllAdBanners, 
    getAndShowAllCategories, 
    getAndShowAllPopularBrands,
    getAndShowUserBasketModalInOtherPages
} from "./funcs/index.js"


window.addEventListener('load', () => {
    getAndShowAllHeaderSliders()
    getAndShowAllServices()
    getAndShowAllIncredibleOffers()
    getAndShowAllAdBanners()
    getAndShowAllCategories()
    getAndShowAllPopularBrands()
    getAndShowUserBasketModalInOtherPages()
})


document.querySelector('.cart-shopping__link').addEventListener('mouseenter', () => {
    document.querySelector('.cart-shopping__popup').classList.add('active-modal__cart-shopping')
})

document.querySelector('.cart-shopping__popup').addEventListener('mouseleave', () => {
    document.querySelector('.cart-shopping__popup').classList.remove('active-modal__cart-shopping')
})

document.querySelector('.support-btn').addEventListener('click', event => {
    event.preventDefault()
    document.querySelector('.support-modal').classList.toggle('hidden')
})

document.querySelectorAll('.chat-content').forEach(chatContent => {
    chatContent.addEventListener('click', () => {
        chatContent.lastElementChild.classList.toggle('d-none');
        chatContent.querySelector('.fa-chevron-down').classList.toggle('hidden')
        chatContent.querySelector('.fa-chevron-up').classList.toggle('hidden')
    })
})

document.querySelector('.support-modal__close-icon').addEventListener('click', () => {
    document.querySelector('.support-modal').classList.add('hidden')
})
