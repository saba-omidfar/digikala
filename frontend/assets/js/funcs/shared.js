import { getMe } from "./auth.js";
import { isLogin, searchInArray } from "./utils.js";

const searchInput = document.querySelector('.search-input')
const topBarSearchBoxWrapper = document.querySelector('.top-bar__searchBox-wrapp')
const topBarSearchBoxIcon = document.querySelector('.top-bar__searchBox-icon')
const searchInputBox = document.querySelector('.search-input__box')
const backToUpBtn = document.querySelector('.back-to-up-btn')


const showUserNameInNavbar = async () => {

    const navbarProfileBox = document.querySelector('#navbar-phone')
    const isUserLogin = isLogin()

    if (isUserLogin) {

        getMe().then(data => {

            navbarProfileBox.innerHTML = ''
            navbarProfileBox.insertAdjacentHTML('beforeend', `
                <div class="hidden overflow-hidden position-absolute pb-2 mini-profile-menu">
                    <a class="d-block text-neutral-700" href="#">
                        <div class="d-flex mx-3 py-3 text-neutral-700" style="border-bottom: 1px solid #f0f0f1">
                            <div class="d-flex justify-content-between align-items-center w-100">
                                <span class="text-subtitle-strong grow">
                                    <span class="ms-2 user-phone">
                                    ${data.name ? `${data.name}` : `${data.phone.toLocaleString('fa-IR')}`}
                                    </span>
                                </span>
                                <div class="flex pr-1">
                                    <i class="fa-solid fa-chevron-left" style="color: #424750; width: 12px; height: 12px"></i>
                                </div>
                            </div>
                        </div>
                    </a>
                    <ul>
                        <li class="px-3 mini-profile__menu-item">
                            <a class="d-flex align-items-center text-neutral-700 w-100" href="#">
                                <div class="pe-1 ps-3" style="width: 48px">
                                    <div>
                                        <div style="width: 24px; height: 24px; line-height: 0;">
                                            <img class="w-100 d-inline-block object-fit-contain"
                                                src="../assets/covers/club-point.svg" width="24" height="24" alt="دیجی‌کلاب">
                                        </div>
                                    </div>
                                </div>
                                <div class="flex-grow-1 d-flex justify-content-between py-2 align-items-center flex-grow" style="border-bottom: 1px solid #f0f0f1">
                                    <span class="text-body2-strong color-700">دیجی‌کلاب</span>
                                    <span class="text-caption color-700">
                                        ۰
                                        <small class="me-1" style="color: #a1a3a8">امتیاز</small>
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li class="px-3 mini-profile__menu-item"
                            data-cro-id="header-digiclub">
                            <a class="d-flex align-items-center text-neutral-700 w-100" href="#">
                                <div class="pe-1 ps-3" style="width: 48px">
                                    <div>
                                        <div style="width: 24px; height: 24px; line-height: 0;">
                                            <i class="fa-solid fa-user-plus digiplus-icon-profile"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex-grow-1 d-flex justify-content-between py-2 align-items-center flex-grow" style="border-bottom: 1px solid #f0f0f1">
                                    <span class="text-body-2" style="color: #c0c2c5;">دیجی‌پلاس</span>
                                    <span class="text-body-2 color-700">
                                        <small class="me-1 color-plus-500">خرید اشتراک</small>
                                        <i class="color-plus-500 fa-solid fa-chevron-left" style="width: 10px; height: 10px"></i>
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li class="px-3 mini-profile__menu-item"
                            data-cro-id="header-digiclub">
                            <a class="d-flex align-items-center text-neutral-700 w-100" href="#">
                                <div class="pe-1 ps-3" style="width: 48px">
                                    <div class="d-flex align-items-center">
                                        <div style="width: 24px; height: 24px; line-height: 0;">
                                            <i class="fa-solid fa-cart-shopping" style="width:20px; height: 20px; color: #424750;"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex-grow-1 d-flex justify-content-between py-2 align-items-center flex-grow" style="border-bottom: 1px solid #f0f0f1">
                                    <span class="text-body2-strong color-700">سفارش‌ها</span>
                                </div>
                            </a>
                        </li>
                        <li class="px-3 mini-profile__menu-item"
                            data-cro-id="header-digiclub">
                            <a class="d-flex align-items-center text-neutral-700 w-100" href="#">
                                <div class="pe-1 ps-3" style="width: 48px">
                                    <div class="d-flex align-items-center">
                                        <div style="width: 24px; height: 24px; line-height: 0;">
                                        <i class="fa-regular fa-heart" style="width: 20px; height: 20px; color: #424750;"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex-grow-1 d-flex justify-content-between py-2 align-items-center flex-grow" style="border-bottom: 1px solid #f0f0f1">
                                    <span class="text-body2-strong color-700">لیست‌ها</span>
                                </div>
                            </a>
                        </li>
                        <li class="px-3 mini-profile__menu-item"
                            data-cro-id="header-digiclub">
                            <a class="d-flex align-items-center text-neutral-700 w-100" href="#">
                                <div class="pe-1 ps-3" style="width: 48px">
                                    <div class="d-flex align-items-center">
                                        <div style="width: 24px; height: 24px; line-height: 0;">
                                            <i class="fa-solid fa-comment" style="width: 20px; height: 20px; color: #424750;"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex-grow-1 d-flex justify-content-between py-2 align-items-center flex-grow" style="border-bottom: 1px solid #f0f0f1">
                                    <span class="text-body2-strong color-700">دیدگاه‌ها</span>
                                </div>
                            </a>
                        </li>
                        <li class="px-3 mini-profile__menu-item" onclick=userLogout(event)>
                            <a class="d-flex align-items-center text-neutral-700 w-100" href="#">
                                <div class="pe-1 ps-3" style="width: 48px">
                                    <div class="d-flex align-items-center">
                                        <div style="width: 24px; height: 24px; line-height: 0;">
                                            <i class="fa-solid fa-arrow-right-to-bracket" style="width: 20px; height: 20px; color: #424750;"></i>  
                                        </div>
                                    </div>
                                </div>
                                <div class="flex-grow-1 d-flex justify-content-between py-2 align-items-center flex-grow">
                                    <span class="text-body2-strong color-700">خروج از حساب کاربری</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="position-relative d-flex align-items-center profile-hover">
                    <div class="d-flex align-items-center justify-content-center ms-1" style="width: 24px;height: 24px;">
                        <i class="fa-regular fa-user color-700"></i>
                    </div>
                    <div class="d-flex align-items-center justify-content-center">
                        <i class="fa-solid fa-caret-down color-700" style="width: 11px;height: 11px;"></i>
                    </div>
                </div>
            `)

            const miniProfileMenu = document.querySelector('.mini-profile-menu')
            navbarProfileBox.addEventListener('click', () => {
                const miniProfileButton = document.querySelector('.mini-profile__button')
                miniProfileMenu.classList.toggle('hidden')
                miniProfileButton.classList.toggle('active')

            })
        })
    } else {
        const cartShoppingBadgeCount = document.querySelector('.cart-shopping__badge-count')

        cartShoppingBadgeCount.classList.add('hidden')
        navbarProfileBox.classList.add('hidden')

        navbarProfileBox.innerHTML = ''
        navbarProfileBox.insertAdjacentHTML('beforebegin', `
            <a href="users/login.html">
                <button class="top-bar__login-btn ms-2">
                    <div class="d-flex align-items-center justify-content-center">
                        <div class="d-flex ms-2 fs-6">
                            <i class="fa-solid fa-arrow-right-to-bracket"></i>
                        </div>
                        <span class="top-bar__login-btn-text d-block d-lg-none">ورود</span>
                        <span class="top-bar__login-btn-text d-none d-lg-block">ورود |
                            ثبت‌نام</span>
                    </div>
                </button>
            </a>
        `)
    }
}

const getAndShowAllTopBarMenus = async () => {

    const headerNavigation = document.querySelector('#header-navigation')

    const res = await fetch(`http://localhost:5000/topbarmenus`)
    const topBarMenus = await res.json()

    headerNavigation.innerHTML = ''
    topBarMenus.forEach(topBarMenu => {
        headerNavigation.insertAdjacentHTML('beforeend', `
            <div class="header-nav__item top-menu-item d-flex align-items-center h-100 px-2 pb-2 position-relative header-nav__item-link-wrapp">
                <a href="${topBarMenu.href}" class="d-flex align-items-center header-nav__item-link">
                    <div class="d-flex align-items-center justify-content-center">
                    <i class="category-icon color-400 fa-solid ${topBarMenu.icon} ms-2" style="width: 15px; height:15px;"></i>
                    </div>
                    ${topBarMenu.title}
                </a>
            </div>
        `)
    })
}

const getAndShowAllMegaMenus = async () => {

    const subMenusContainer = document.querySelector('#submenu-container')
    const navigationMenuCategoryItem = document.querySelector('.navigation-menu__category-item')

    const res = await fetch(`http://localhost:5000/megaMenus`)
    const megaMenus = await res.json()

    megaMenus.forEach(megaMenu => {
        // Insert MegaMenus In SideBarMenu
        navigationMenuCategoryItem.insertAdjacentHTML('beforeend', `
            <a href=${megaMenu.href} class="navigation-menu__category-item-link w-100 d-flex align-items-center" data-menuID="${megaMenu._id}">
                <span class="category-item__title w-100 h-100 d-flex align-items-center flex-row-reverse">
                    <div class="d-flex ms-2">
                        <i class="category-icon fa-solid ${megaMenu.icon}"></i>
                    </div>
                    <p class="category-text">${megaMenu.title}</p>
                </span>
            </a>
        `)
    })

    // Insert SubMenus Title & SubMenus Items
    megaMenus.forEach(megaMenu => {

        subMenusContainer.insertAdjacentHTML('beforeend', `
            <div class="submenus-wrapper" data-id='${megaMenu._id}'>
                <a href="product-list.html?cat=${megaMenu.href}" class="subCategory-title d-flex align-items-center mb-3">
                    همه محصولات ${megaMenu.title}
                    <div class="d-flex me-1">
                        <i class="subCategory-icon fa-solid fa-chevron-left"></i>
                    </div>
                </a>
                <ul class="d-flex flex-column flex-wrap subCategory-container px-lg-2">   
                    ${megaMenu.submenus.length !== 0 ?
                `${megaMenu.submenus.map(submenus => (
                    `<a href="${submenus.href}" class="subCategory-item__title d-flex align-items-center position-relative mt-1">
                                    <span class="subCategory-item__name position-relative">${submenus.title}</span>
                                    <div class="d-flex position-relative">
                                        <i class="color-1000 subCategory-title-icon fa-solid fa-chevron-left"></i>
                                    </div>
                                </a>
                                ${submenus.submenus.map(submenu => (
                        `<a href="${submenu.href}" class="subCategory-item align-items-center position-relative mt-2">
                                        <span class="subCategory-item__text position-relative">${submenu.title}</span>
                                    </a>`
                    )).join('')
                    }`
                )).join('')
                }`
                : ''
            }
                </ul>
            </div>
        `)
    })
}

// const getAndShowAllProducts = async () => {

//     const productListContainer = document.querySelector('.product-list__container')

//     const res = await fetch(`http://localhost:5000/products`)
//     const products = await res.json()

//     products.forEach(product => {
//         productListContainer.insertAdjacentHTML('beforeend', `
//             <div class="product-list__item p-0 col-xxl-3 col-lg-6 col-md-6 col-12">
//                 <div class="h-100">
//                     <a href="#" class="product-list__item-link h-100 d-block position-relative bg-white overflow-hidden flex-grow-1 py-3 px-4 px-lg-2">
//                         <div>
//                             <article class="overflow-hidden d-flex flex-column align-items-stretch justify-content-start h-100">
//                                 <div class="d-flex align-items-center justify-content-start mb-1">
//                                     <div class="ms-1" style="width: 116px; height: 14px;">
//                                         <img class="w-100 object-fit-contain d-inline-block" src="assets/images/incredible.svg" alt="">
//                                     </div>
//                                 </div>
//                                 <div class="d-flex flex-grow-1 flex-column">
//                                     <div class="d-flex align-items-stretch flex-column mb-1">
//                                         <div class="position-relative d-flex align-items-start mx-auto">
//                                             <div style="width: 240px; height: 240px;">
//                                                 <img class="w-100 d-inline-block object-fit-contain" src="assets/covers/${product.images[0].url}" alt="">
//                                             </div>
//                                             <div class="position-absolute add-red-icon-wrapp">
//                                                 <div class="red-border">
//                                                     <div class="d-flex align-items-center justify-content-center">
//                                                         <i class="add-red-icon fa-solid fa-plus"></i>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div class="flex-grow-1 d-flex flex-column align-items-stretch justify-content-start">
//                                         <div class="d-flex align-items-center justify-content-start flex-wrap mb-1">
//                                             <br>
//                                         </div>
//                                         <div>
//                                             <h3 class="text-body2-strong color-700 vertical-product-card__title">${product.name}</h3>
//                                         </div>
//                                         <div class="mb-1 d-flex align-items-center justify-content-between">
//                                             <div class="d-flex align-items-center">
//                                                 <div class="d-flex ms-1">
//                                                     <i class="fa fa-truck supermarket-icon"></i>
//                                                 </div>
//                                                 <p class="text-caption color-600">ارسال سریع سوپرمارکتی</p>
//                                             </div>
//                                             <div class="d-flex align-items-center">
//                                                 <p class="text-body2-strong color-700">۴.۵</p>
//                                                 <div class="d-flex me-2">
//                                                     <i class="fa fa-star rating-icon"></i>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div class="pt-1 d-flex flex-column align-items-stretch justify-content-between">
//                                             <div class="d-flex align-items-center justify-content-between">
//                                                 <div class="px-2 text-white d-flex align-items-center justify-content-center product-price__discount-wrapp">
//                                                     <span class="text-body2-strong">۱۳٪</span>
//                                                 </div>
//                                                 <div class="d-flex align-items-center justify-content-end flex-grow-1">
//                                                     <span class="color-700 color-400 text-h5">۸۳,۳۰۰</span>
//                                                     <div class="d-flex me-1">
//                                                         <span class="text-body-3  color-700">تومان</span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div class="d-flex align-items-center justify-content-between ps-3">
//                                                 <div class="selected-product__prevPrice me-auto color-300 text-caption">
//                                                     ۹۶,۳۰۰</div>
//                                             </div>
//                                             <div class="product-promotion-Timeline__timer d-flex me-auto justify-content-end">
//                                                 19:32:45
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </article>
//                         </div>
//                     </a>
//                 </div>
//             </div>
//         `)
//     })
// }

const getUserBasketCountAndShowModal = async (userBasketCount) => {

    // Get Total Price Of User Basket
    let totalQuantity = userBasketCount[0].Products.reduce((sum, product) => sum + product.quantity, 0)
    if (totalQuantity === 0) {
        showEmptyBasket()
    } else {
        showBasketBoxModalInNavbar(userBasketCount)
    }
}

const showEmptyBasket = () => {

    const cartShoppingModal = document.querySelector('#cart-shopping__modal')
    const userBasketBadgeNumberContainer = document.querySelector('.cart-shopping__badge-count')
    userBasketBadgeNumberContainer.classList.add('hidden')

    const isUserLogin = isLogin()

    cartShoppingModal.innerHTML = ''
    cartShoppingModal.insertAdjacentHTML('beforeend', `
        <div class="d-flex align-items-center hidden py-2 px-3">
            <a href="#"
                class="cart-shopping__see-link d-flex align-items-center me-auto">
                مشاهده‌ی سبد خرید
                <div class="d-flex">
                    <i class="fa fa-chevron-left cart-shopping__icon me-2"></i>
                </div>
            </a>
        </div>
        <div class="overflow-auto cart-shopping__items">
            <div class="py-3 px-lg-0 bg-white">
                <div class="d-flex justify-content-center">
                    <div class="cart-shopping__img-wrap">
                        <img src="assets/covers/shopping cart/empty-cart.svg"
                            alt="">
                    </div>
                </div>
                <p class="text-center mt-3 cart-shopping__content-text">سبد خرید
                    شما
                    خالی است!</p>
            </div>
        </div>
        <div class="border-top-1 d-flex align-items-center py-2 px-3 border-t">
            ${isUserLogin?
            `<a href="./index.html" class="cart-shopping__login-btn position-relative d-flex align-items-center me-auto">
                <div class="d-flex justify-content-center align-items-center position-relative flex-grow-1">
                    ثبت سفارش
                </div>
            </a>`
            :
            `<a href="../users/login.html" class="cart-shopping__login-btn position-relative d-flex align-items-center me-auto">
                <div class="d-flex justify-content-center align-items-center position-relative flex-grow-1">
                    ورود و ثبت سفارش
                </div>
            </a>`
            }
        </div>
    `)
}

const showBasketBoxModalInNavbar = (userBasketCount) => {

    const userBasketBadgeNumber = document.querySelector('.cart-shopping__badge-text')
    const cartShoppingModal = document.querySelector('#cart-shopping__modal')
    const userBasketBadgeNumberContainer = document.querySelector('.cart-shopping__badge-count')

    let totalPrice = 0

    userBasketBadgeNumberContainer.classList.remove('hidden')
    userBasketBadgeNumber.innerHTML = userBasketCount[0].Products.length.toLocaleString('fa-IR')

    userBasketCount[0].Products.forEach(userBasket => {
        totalPrice = (totalPrice + (userBasket.product.price - (userBasket.product.price * userBasket.product.discount / 100)) * userBasket.quantity)
    })

    cartShoppingModal.innerHTML = ''
    cartShoppingModal.insertAdjacentHTML('beforeend', `
        <div class="d-flex align-items-center py-2 px-3">
            <span class="text-caption text-neutral-600">${userBasketCount[0].Products.length.toLocaleString('fa-IR')} کالا</span>
        </div>
        <div class="d-flex flex-column">
            <div class="cart-shopping__popup__items" id="cart-shopping-items__container"></div>
        </div>
        <div class="d-flex align-items-center py-2 px-3 border-top-1-e6">
            <div class="d-flex flex-column ms-auto">
                <p class="text-caption text-neutral-500">مبلغ قابل پرداخت</p>
                <div>
                    <div class="d-flex align-items-center justify-start">
                        <span class="text-h4 ms-1 text-neutral-800">${totalPrice.toLocaleString('fa-IR')}</span>
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex ms-2 align-items-center">
                                <span class="text-body-3 color-700">تومان</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button class="user-basket-btn position-relative d-flex align-items-center me-auto">
                <a href="checkout/cart.html" class="d-flex text-white p-3 text-body-2 align-items-center justify-content-center flex-grow-1">ثبت سفارش</a>
            </button>
        </div>
    `)


    const cartShoppingiItemsContainer = document.querySelector('#cart-shopping-items__container')

    cartShoppingiItemsContainer.innerHTML = ''
    userBasketCount[0].Products.forEach(p => {
        fetch(`http://localhost:5000/seller/${p.product.seller}`)
            .then(res => res.json())
            .then(seller => {
                cartShoppingiItemsContainer.insertAdjacentHTML('beforeend', `
                        <div class="cart-shopping__popup__item mx-3 py-3">
                            <div class="cart-shopping-item__grid">
                                <div class="flex flex-col align-items-center">
                                    <a class="position-relative" href="product.html?name=${p.product.shortName}&page=1">
                                            <div style="width: 114px; height: 114px; line-height: 0;">
                                                <img src="assets/covers/${p.product.images.find(image => image.isMain).url}" alt="">
                                        </div>
                                        <div class="bg-neutral-000 absolute bottom-0 left-0 rounded-small text-center text-neutral-900 text-caption-strong hidden CartItem__imageQuantity">۱</div>
                                    </a>
                                    <div class="d-flex align-items-center text-h5 py-2 mt-2 flex-column">
                                        <div></div>
                                    </div>
                                </div>
                                <div class="overflow-x-hidden">
                                    <div class="">
                                        <h3 class="color-800 text-body2-strong mb-2">${p.product.name}</h3>
                                        <div class="d-flex">
                                            <div class="flex mt-1">
                                                <div class="" style="width: 18px; height: 18px; color: rgb(255, 255, 254); border: 1px solid #9e9fb1; border-radius: 50%;"></div>
                                            </div>
                                            <p class="text-caption text-neutral-600 me-2">بی رنگ</p>
                                        </div>
                                        <div class="d-flex flex-column w-100 position-relative">
                                            <span class="d-flex align-items-center mb-1">
                                                <div class="d-flex ms-2">
                                                    <i class="fa-regular fa-floppy-disk" style="width: 16px; height: 16px; color: #424750;"></i>
                                                </div>
                                                <span class="text-caption text-neutral-600">
                                                    ${seller.digikalaAvailibility ? 'موجود در انبار دیجی‌کالا' : seller.sellerAvailibility ? 'موجود در انبار فروشنده' : 'موجود در انبار فروشنده و دیجی‌کالا'}
                                                </span>
                                            </span>
                                            <ul class="d-flex flex-column">
                                                <li class="d-flex ms-3 items-center">
                                                    <div class="d-flex align-items-center">
                                                        <div class="d-flex position-relative d-flex align-items-center justify-content-center"
                                                            style="width: 24px; height: 24px;">
                                                            <div class="d-flex">
                                                                <i class="info-section__wrapp-icon fa-solid fa-circle fa-2xs" style="color: #a1a3a8;"></i>
                                                            </div>
                                                            <span class="bullet-line position-absolute top-0 d-block"></span>
                                                        </div>
                                                        <div class="d-flex mx-1">
                                                            <i class="fa-solid fa-truck" style="color: #a1a3a8; width: 15px; height: 15px;"></i>
                                                        </div>
                                                    </div>
                                                    <p class="text-caption color-neutral-500 ms-1 ellipsis">
                                                        ${seller.post[0]}
                                                    </p>
                                                </li>
                                                <li class="d-flex ms-3 items-center">
                                                    <div class="d-flex align-items-center">
                                                        <div class="d-flex position-relative d-flex align-items-center justify-content-center"
                                                            style="width: 24px; height: 24px;">
                                                            <div class="d-flex">
                                                                <i class="info-section__wrapp-icon fa-solid fa-circle fa-2xs" style="color: #a1a3a8;"></i>
                                                            </div>
                                                            <span class="bullet-line position-absolute top-0 d-block"></span>
                                                        </div>
                                                        <div class="d-flex mx-1">
                                                            <i class="fa-solid fa-truck" style="color: #19bfd3; width: 15px; height: 15px;"></i>
                                                        </div>
                                                    </div>
                                                    <p class="text-caption color-neutral-500 ms-1 ellipsis">
                                                        ${seller.post[1]}
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <div class="d-flex align-items-center justify-content-between px-2 item-quantity__container">
                                        <div class="d-flex pointer" onclick='addProductToUserBasket(${JSON.stringify(p.product)})'>
                                            <i class="item-quantity__icon fa fa-plus"></i>
                                        </div>
                                        <span class="d-flex flex-column align-items-center justify-content-between">
                                            <span class="position-relative d-flex align-items-center justify-content-center item-quantity__box-count">
                                                ${p ? new Intl.NumberFormat('fa-IR').format(p.quantity) : '۱'}
                                            </span>
                                        </span>
                                        <div class="d-flex align-items-center pointer">
                                            ${p.quantity === 1 ?
                        `<i class="item-quantity__icon fa fa-trash" onclick='deleteProductFromBasket(${JSON.stringify(p.product._id)})'></i>`
                        :
                        `<i class="item-quantity__icon fa fa-minus" onclick='decreaseProductQuantity(${JSON.stringify(p.product._id)})'></i>`}                                            
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div>
                                            <div class="d-flex align-items-center justify-start ms-3">
                                                <span class="text-h4 color-800">
                                                    ${((p.product.price - ((p.product.price * p.product.discount) / 100)) * p.quantity).toLocaleString('fa-IR')}
                                                </span>
                                                <div class="d-flex me-1 align-items-center justify-content-between">
                                                    <div class="d-flex ms-2 align-items-center">
                                                        <span class="text-body-3 color-700">تومان</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex a-center flex-row-reverse">
                                            <span class="text-caption text-neutral-500 ms-2"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                `)
            })
    })
}

const userLogout = event => {

    event.preventDefault()
    localStorage.setItem('userID', false)
    localStorage.setItem('userLocationCity', false)
    location.reload()
    //location.href = './././index.html'
}
window.userLogout = userLogout

const getAllProducts = async () => {

    const res = await fetch(`http://localhost:5000/products`)
    const products = await res.json()

    return products
}

searchInput.addEventListener('input', function () {

    if (searchInputBox.className.includes('hidden')) {

        searchInputBox.classList.remove('hidden')

        searchInputBox.style.animation = 'search-input-box__fade-in .5s ease-in-out forwards';
        searchInputBox.style.zIndex = '2';
        searchInput.style.borderBottom = '1px solid #19bfd3'
        topBarSearchBoxWrapper.style.backgroundColor = '#fff'
        topBarSearchBoxWrapper.style.border = '1px solid #e0e0e2'
        topBarSearchBoxWrapper.style.borderRadius = '8px 8px 0 0'
        topBarSearchBoxWrapper.style.color = "#000"

        searchInputBox.innerHTML = ''
        searchInputBox.insertAdjacentHTML('beforeend', `
            <div class="flex-grow">
                <div class="d-flex flex-column h-100 overflow-y-auto">
                    <div class="bg-white flex-grow d-flex flex-column">
                        <div class="flex-grow d-flex flex-column overflow-y-auto overflow-x-hidden">
                            <div class="pt-3 pb-4 top-0 right-0">
                                <div class="px-5 px-lg-4">
                                    <a class="w-100 d-block position-relative mt-4" target="_blank">
                                        <div>
                                            <div class="search-box__img">
                                                <img src="assets/covers/search-box__img.webp" alt="">
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div class="py-2">
                                    <span class="pointer py-3 break-words d-block px-3 px-lg-4 xs:py-2">
                                        <div class="d-flex align-items-center justify-content-start">
                                            <div class="d-flex flex-shrink-0 ms-3">
                                                <i class="fa fa-fire-flame-curved color-700"
                                                    style="width: 20px; height: 20px; color: #a1a3a8"></i>
                                            </div>
                                            <div class="grow text-right">
                                                <span
                                                    class="flex-grow color-700 text-body2-strong">جستجوهای
                                                    پرطرفدار</span>
                                            </div>
                                        </div>
                                    </span>
                                    <div class="d-flex w-100">
                                        <div class="gap-2 w-100">
                                            <div class="swiper-container">
                                                <div class="swiper11">
                                                    <div class="swiper-wrapper" id="popular__search">
                                                        <div class="swiper-slide">
                                                            <a class="popular-search__item-link py-1 d-inline-block flex-shrink-0"
                                                                href="#">
                                                                <div class="d-flex align-items-center h-100 px-3 xs:pl-1 text-body2-strong">
                                                                    <span>شیر رادیاتور</span>
                                                                    <div class="d-flex pointer me-2">
                                                                        <i class="fa fa-chevron-left" style="width: 14px; height: 14px;"></i>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                        <div class="swiper-slide">
                                                            <a class="popular-search__item-link py-1 d-inline-block flex-shrink-0"
                                                                href="#">
                                                                <div class="d-flex align-items-center h-100 px-3 xs:pl-1 text-body2-strong">
                                                                    <span>شیر رادیاتور</span>
                                                                    <div class="d-flex pointer me-2">
                                                                        <i class="fa fa-chevron-left" style="width: 14px; height: 14px;"></i>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                        <div class="swiper-slide">
                                                            <a class="popular-search__item-link py-1 d-inline-block flex-shrink-0"
                                                                href="#">
                                                                <div class="d-flex align-items-center h-100 px-3 xs:pl-1 text-body2-strong">
                                                                    <span>شیر رادیاتور</span>
                                                                    <div class="d-flex pointer me-2">
                                                                        <i class="fa fa-chevron-left" style="width: 14px; height: 14px;"></i>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                        <div class="swiper-slide">
                                                            <a class="popular-search__item-link py-1 d-inline-block flex-shrink-0"
                                                                href="#">
                                                                <div class="d-flex align-items-center h-100 px-3 xs:pl-1 text-body2-strong">
                                                                    <span>شیر رادیاتور</span>
                                                                    <div class="d-flex pointer me-2">
                                                                        <i class="fa fa-chevron-left" style="width: 14px; height: 14px;"></i>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                        <div class="swiper-slide">
                                                            <a class="popular-search__item-link py-1 d-inline-block flex-shrink-0"
                                                                href="#">
                                                                <div class="d-flex align-items-center h-100 px-3 xs:pl-1 text-body2-strong">
                                                                    <span>شیر رادیاتور</span>
                                                                    <div class="d-flex pointer me-2">
                                                                        <i class="fa fa-chevron-left" style="width: 14px; height: 14px;"></i>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                        <div class="swiper-slide">
                                                            <a class="popular-search__item-link py-1 d-inline-block flex-shrink-0"
                                                                href="#">
                                                                <div class="d-flex align-items-center h-100 px-3 xs:pl-1 text-body2-strong">
                                                                    <span>شیر رادیاتور</span>
                                                                    <div class="d-flex pointer me-2">
                                                                        <i class="fa fa-chevron-left" style="width: 14px; height: 14px;"></i>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                </div>
        
                                                    <!-- If we need navigation buttons -->
                                                    <div class="swiper-button-prev swiper-button-prev11">
                                                        <i class="fa-solid fa-chevron-right position-absolute"></i>
                                                    </div>
                                                    <div class="swiper-button-next swiper-button-next11">
                                                        <i class="fa-solid fa-chevron-left position-absolute"></i>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)

        const swiper11 = new Swiper(".swiper11", {

            spaceBetween: 9,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },

            // breakpoints: {

            //   0: {
            //     navigation: {
            //       nextEl: ".swiper-button-next",
            //       prevEl: ".swiper-button-prev",
            //     },
            //     slidesPerGroup: 1,
            //     slidesPerView: 2,
            //   },

            //   992: {
            //     slidesPerView: 3,
            //     slidesPerGroup: 3,
            //   }
            // }
        })

        swiper11.update()
    }

    // Handle Search In All Products
    getAllProducts().then(responseProducts => {

        const productsSearchInput = document.querySelector('#products-search__input')

        productsSearchInput.addEventListener('input', event => {

            const shownProducts = searchInArray([...responseProducts], 'name', event.target.value)

            if (shownProducts.length) {
                searchInputBox.innerHTML = ''
                searchInputBox.insertAdjacentHTML('beforeend', `
                    <div class="flex-grow">
                        <div class="d-flex flex-column h-100 overflow-y-hidden">
                            <div class="bg-white border-radius-8 flex-grow d-flex flex-column">
                                <div class="flex-grow d-flex flex-column overflow-y-hidden overflow-x-hidden">
                                    <div class="pt-3 pb-4 top-0 right-0">
                                        <div class="d-flex w-100">
                                            <div class="gap-2 w-100">
                                                <div class="swiper-container">
                                                    <div class="swiper13">
                                                        <div class="swiper-wrapper" id="search-product__card-container"></div>

                                                        <!-- If we need navigation buttons -->
                                                        <div class="swiper-button-prev swiper-button-prev13">
                                                            <i class="fa-solid fa-chevron-right position-absolute"></i>
                                                        </div>
                                                        <div class="swiper-button-next swiper-button-next13">
                                                            <i class="fa-solid fa-chevron-left position-absolute"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `)

                const searchProductCardContainer = document.querySelector('#search-product__card-container')

                searchProductCardContainer.innerHTML = ''
                shownProducts.forEach(product => {

                    searchProductCardContainer.insertAdjacentHTML('beforeend', `
                    <div class="swiper-slide">
                        <div>
                            <a class="search-product__card d-flex align-items-center p-2 me-2 lg:mr-3" href="product.html?name=${product.shortName}&page=1">
                                <div class="ms-3 flex-shrink-0" style="width: 60px; height: 60px; line-height: 0;">
                                    <img class="w-100 d-inline-block object-fit-contain" src="assets/covers/${product.images[0].url}" style="width="60"; height="60"">
                                </div>
                                <p class="text-caption color-700 ellipsis-2">${product.name}</p>
                            </a>
                        </div>
                    </div>
                `)
                })

            } else {
                searchInputBox.innerHTML = ''
                searchInputBox.insertAdjacentHTML('beforeend', `
                    <div class="w-100 flex flex-column align-items-center justify-content-between px-3 pt-3 pb-3">
                        <div class="mb-3 not-found__image">
                            <img class="w-100 d-inline-block object-fit-contain" src="assets/covers/not-found.svg" alt="نتیجه‌ای یافت نشد">
                        </div>
                        <div class="d-flex flex-column px-3 py-2 w-100 not-found">
                            <div class="text-body-1 color-700 d-flex align-items-center">
                                <div class="d-flex ms-3">
                                    <i class="fa-solid fa-circle-exclamation variantInfo-error-icon"></i>
                                </div>
                                کالایی با این مشخصات پیدا نکردیم
                            </div>
                            <div class="text-caption color-500 me-3">پیشنهاد می‌کنیم کلمات مورد جستجو را تغییر دهید</div>
                        </div>
                    </div>
                `)
            }
        })

        const swiper13 = new Swiper(".swiper13", {

            spaceBetween: 9,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },

            // breakpoints: {

            //   0: {
            //     navigation: {
            //       nextEl: ".swiper-button-next",
            //       prevEl: ".swiper-button-prev",
            //     },
            //     slidesPerGroup: 1,
            //     slidesPerView: 2,
            //   },

            //   992: {
            //     slidesPerView: 3,
            //     slidesPerGroup: 3,
            //   }
            // }
        })

        swiper13.update()
    })

})

// Handle Scroll To Top Of Page
backToUpBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
})

window.addEventListener('load', function () {

    searchInputBox.innerHTML = ''
    searchInputBox.insertAdjacentHTML('beforeend', `
        <div class="flex-grow">
            <div class="d-flex flex-column h-100 overflow-y-auto">
                <div class="bg-white flex-grow d-flex flex-column">
                    <div class="flex-grow d-flex flex-column overflow-y-auto overflow-x-hidden">
                        <div class="pt-3 pb-4 top-0 right-0">
                            <div class="px-5 px-lg-4">
                                <a class="w-100 d-block position-relative mt-4" target="_blank">
                                    <div>
                                        <div class="search-box__img">
                                            <img src="assets/covers/search-box__img.webp" alt="">
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="py-2">
                                <span class="pointer py-3 break-words d-block px-3 px-lg-4 py-xs-2">
                                    <div class="d-flex align-items-center justify-content-start">
                                        <div class="d-flex flex-shrink-0 ms-3">
                                            <i class="fa fa-fire-flame-curved color-700"
                                                style="width: 20px; height: 20px; color: #a1a3a8"></i>
                                        </div>
                                        <div class="grow text-right">
                                            <span
                                                class="flex-grow color-700 text-body2-strong">جستجوهای
                                                پرطرفدار</span>
                                        </div>
                                    </div>
                                </span>
                                <div class="d-flex w-100">
                                    <div class="gap-2 w-100">
                                        <div class="swiper-container">
                                            <div class="swiper11">
                                                <div class="swiper-wrapper" id="popular__search">
                                                    <div class="swiper-slide">
                                                        <a class="popular-search__item-link py-1 d-inline-block flex-shrink-0"
                                                            href="#">
                                                            <div class="d-flex align-items-center h-100 px-3 xs:pl-1 text-body2-strong">
                                                                <span>شیر رادیاتور</span>
                                                                <div class="d-flex pointer me-2">
                                                                    <i class="fa fa-chevron-left" style="width: 14px; height: 14px;"></i>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div class="swiper-slide">
                                                        <a class="popular-search__item-link py-1 d-inline-block flex-shrink-0"
                                                            href="#">
                                                            <div class="d-flex align-items-center h-100 px-3 xs:pl-1 text-body2-strong">
                                                                <span>شیر رادیاتور</span>
                                                                <div class="d-flex pointer me-2">
                                                                    <i class="fa fa-chevron-left" style="width: 14px; height: 14px;"></i>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div class="swiper-slide">
                                                        <a class="popular-search__item-link py-1 d-inline-block flex-shrink-0"
                                                            href="#">
                                                            <div class="d-flex align-items-center h-100 px-3 xs:pl-1 text-body2-strong">
                                                                <span>شیر رادیاتور</span>
                                                                <div class="d-flex pointer me-2">
                                                                    <i class="fa fa-chevron-left" style="width: 14px; height: 14px;"></i>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div class="swiper-slide">
                                                        <a class="popular-search__item-link py-1 d-inline-block flex-shrink-0"
                                                            href="#">
                                                            <div class="d-flex align-items-center h-100 px-3 xs:pl-1 text-body2-strong">
                                                                <span>شیر رادیاتور</span>
                                                                <div class="d-flex pointer me-2">
                                                                    <i class="fa fa-chevron-left" style="width: 14px; height: 14px;"></i>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div class="swiper-slide">
                                                        <a class="popular-search__item-link py-1 d-inline-block flex-shrink-0"
                                                            href="#">
                                                            <div class="d-flex align-items-center h-100 px-3 xs:pl-1 text-body2-strong">
                                                                <span>شیر رادیاتور</span>
                                                                <div class="d-flex pointer me-2">
                                                                    <i class="fa fa-chevron-left" style="width: 14px; height: 14px;"></i>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div class="swiper-slide">
                                                        <a class="popular-search__item-link py-1 d-inline-block flex-shrink-0"
                                                            href="#">
                                                            <div class="d-flex align-items-center h-100 px-3 xs:pl-1 text-body2-strong">
                                                                <span>شیر رادیاتور</span>
                                                                <div class="d-flex pointer me-2">
                                                                    <i class="fa fa-chevron-left" style="width: 14px; height: 14px;"></i>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                            </div>        
                                                <!-- If we need navigation buttons -->
                                                <div class="swiper-button-prev swiper-button-prev11">
                                                    <i class="fa-solid fa-chevron-right position-absolute"></i>
                                                </div>
                                                <div class="swiper-button-next swiper-button-next11">
                                                    <i class="fa-solid fa-chevron-left position-absolute"></i>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `)

    const swiper11 = new Swiper(".swiper11", {
        spaceBetween: 9,
        navigation: {
            nextEl: ".swiper-button-next11",
            prevEl: ".swiper-button-prev11",
        },
        // breakpoints: {
        //   0: {
        //     navigation: {
        //       nextEl: ".swiper-button-next",
        //       prevEl: ".swiper-button-prev",
        //     },
        //     slidesPerGroup: 1,
        //     slidesPerView: 2,
        //   },
        //   992: {
        //     slidesPerView: 3,
        //     slidesPerGroup: 3,
        //   }
        // }
    })

    swiper11.update()
})


// Handle Seacrh Input
searchInput.addEventListener('focus', function (event) {
    if (event.currentTarget.id === 'products-search__input') {
        searchInputBox.style.animation = ''
        searchInputBox.classList.remove('hidden')
        searchInput.style.borderBottom = "1px solid #19bfd3"
        topBarSearchBoxWrapper.style.backgroundColor = '#fff'
        topBarSearchBoxWrapper.style.boxShadow = "0 0 4px rgba(0, 0, 0, .1), 1px 4px 4px rgba(0, 0, 0, .1)"
        topBarSearchBoxWrapper.style.border = '0'
        topBarSearchBoxWrapper.style.borderRadius = '8px 8px 0 0'
        topBarSearchBoxIcon.style.color = "#9e9fb1"
    }
})

document.addEventListener('click', function (event) {
    // Check if the clicked target is not the search input box or any of its children
    if (!searchInputBox.contains(event.target) && event.target !== searchInput) {
        searchInputBox.style.animation = ''
        searchInputBox.classList.add('hidden')
        searchInput.value = ''
        topBarSearchBoxWrapper.style.backgroundColor = '#f1f2f4'
        topBarSearchBoxWrapper.style.boxShadow = "none"
        topBarSearchBoxWrapper.style.border = '0'
        topBarSearchBoxWrapper.style.borderRadius = '8px'
        searchInputBox.style.borderBottom = "none"
        searchInput.style.borderBottom = '0'
        topBarSearchBoxIcon.style.color = "#9e9fb1"
    }
})



export {
    showUserNameInNavbar,
    getAndShowAllTopBarMenus,
    getAndShowAllMegaMenus,
    getUserBasketCountAndShowModal,
    showEmptyBasket,
}