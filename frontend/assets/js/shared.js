import { selectCityModalHandler, getUerLocation } from "./find-city.js"
import {
    showUserNameInNavbar,
    getAndShowAllTopBarMenus,
    getAndShowAllMegaMenus,
    showCategoriesInMobileVersion
} from "./funcs/shared.js"

const menuModal = document.querySelector('#show-modal-menu')
const showSelectCityModalIcon = document.querySelector('.header-navigation__city')
const menu = document.querySelector('.navigation-menu__category')

window.addEventListener('load', () => {
    showUserNameInNavbar()
    getUerLocation()
    getAndShowAllTopBarMenus()
    getAndShowAllMegaMenus()
    showCategoriesInMobileVersion()
})

// Show And Hide Menu
menuModal.addEventListener('mouseenter', () => {
    menu.classList.add('active')
})

menu.addEventListener('mouseleave', () => {
    menu.classList.remove('active')
})

document.querySelector('.header-nav__item-link-wrapp').addEventListener('mouseleave', () => {
    menu.classList.remove('active-modal-menu')
})

// document.querySelectorAll('.mobile-submenu__link').forEach(submenuLink => {
//     submenuLink.addEventListener('click', event => {
//         event.preventDefault()
//         document.querySelector('.mobile-submenu__child').classList.toggle('hidden')
//     })
// })

// document.querySelectorAll('.mobile-submenu__child-link').forEach(submenu => {
//     submenu.addEventListener('click', event => {
//         event.preventDefault()
//         submenu.parentElement.lastElementChild.classList.toggle('hidden')
//         submenu.querySelector('.mobile-submenu__child-text').classList.toggle('red-color')
//         submenu.querySelector('.fa-chevron-up').classList.toggle('red-color')
//         submenu.querySelector('.fa-chevron-down').classList.toggle('hidden')
//         submenu.querySelector('.fa-chevron-up').classList.toggle('hidden')
//     })
// })






// Menus And SubMenus -------------------------------------------------------------------
const menuItemsContainer = document.querySelector('.navigation-menu__category-item')
const allSubMenusContainer = document.querySelectorAll('.submenus-wrapper')

/// Hide All SubMenus
Array.from(allSubMenusContainer).forEach(submenu => {
    submenu.style.display = 'none'
})

menuItemsContainer.addEventListener('mouseover', event => {

    if (event.target.classList.contains('navigation-menu__category-item-link')) {

        const allSubMenusContainer = document.querySelectorAll('.submenus-wrapper')

        const menuID = event.target.dataset.menuid

        for (const submenu of allSubMenusContainer) {
            if (menuID === submenu.dataset.id) {
                submenu.style.display = 'flex'
            } else {
                submenu.style.display = 'none'
            }
        }
    }
})

function scrollHandler() {
    if (document.body.scrollTop >= 200 || document.documentElement.scrollTop >= 200) {

        document.querySelector('.header').style.height = "auto"
        document.querySelector('.header-navigation__wrapp').classList.add('hidden');

    } else {
        document.querySelector('.header').style.height = "173px"
        document.querySelector('.header-navigation__wrapp').classList.remove('hidden');
    }
}






showSelectCityModalIcon.addEventListener('click', selectCityModalHandler)

if (window.innerWidth > 999) {
    document.querySelector('.header-navigation__city').addEventListener('mouseenter', () => {
        document.querySelector('.header-navigation__city-modal').classList.toggle('hidden')
    })
}

export { scrollHandler }