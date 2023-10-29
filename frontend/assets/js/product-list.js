import { getAndShowAllProductsByCategory, getpriceValueSelectedByUser } from "./funcs/product-list.js"

window.addEventListener('load', () => {
    getAndShowAllProductsByCategory()
    getpriceValueSelectedByUser()
})