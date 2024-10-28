import { getAndShowAllProductsByCategory, getpriceValueSelectedByUser, allProductLengthMobileHandler } from "./funcs/product-list.js"
import { getAndShowUserBasketModalInOtherPages } from "./funcs/index.js"

window.addEventListener('load', () => {
    getAndShowAllProductsByCategory()
    getpriceValueSelectedByUser()
    getAndShowUserBasketModalInOtherPages()
    allProductLengthMobileHandler()
})

document.querySelector('.cart-shopping__link').addEventListener('mouseenter', () => {
    document.querySelector('.cart-shopping__popup').classList.add('active-modal__cart-shopping')
})

document.querySelector('.cart-shopping__popup').addEventListener('mouseleave', () => {
    document.querySelector('.cart-shopping__popup').classList.remove('active-modal__cart-shopping')
})

