import { getUserID, showSwal, isLogin } from "./utils.js"

const getUserCartCount = async () => {

    recentlyViewed()

    let userID = getUserID()
    const isUserLogin = isLogin()

    if (isUserLogin) {
        // Get Total Price Of User Basket
        fetch(`http://localhost:5000/basket/${userID}`)
            .then(res => res.json())
            .then(userBasket => {
                let totalQuantity = userBasket[0].Products.reduce((sum, product) => sum + product.quantity, 0)
                if (totalQuantity === 0) {
                    showEmptyCart()
                } else {
                    getAndShowUserBasketinCartPage()
                }
            })
    }
}

const getAndShowUserBasketinCartPage = async () => {

    const userBasketBadgeNumber = document.querySelector('.cart-shopping__badge-text')
    const cartShoppingBasketBadge = document.querySelector('#cart-shopping__basket-badge')
    const userBasketProductContainer = document.querySelector('#user-basket__products-container')
    const emptyCartContainer = document.querySelector('#empty-cart-container')
    const fullCartContainer = document.querySelector('#full-cart-container')
    const cartPriceContainer = document.querySelector('#cart-price-container')
    const userBasketBadgeNumberContainer = document.querySelector('.cart-shopping__badge-count')
    const cartShoppingBadge = document.querySelector('#cart-shopping__badge')
    const cartShoppingContainer = document.querySelector('#cart-shopping__container')
    cartShoppingContainer.classList.add('ps-lg-3')

    userBasketBadgeNumberContainer.classList.remove('hidden')
    cartPriceContainer.classList.remove('hidden')
    fullCartContainer.classList.remove('hidden')
    cartShoppingBadge.classList.remove('hidden')
    emptyCartContainer.classList.add('hidden')

    const userID = getUserID()
    let totalPrice = 0
    let totalPriceWithDiscount = 0
    let productsQuantity = 0
    let totalDiscount = 0

    const res = await fetch(`http://localhost:5000/basket/${userID}`)
    const userBasket = await res.json()

    cartShoppingBadge.innerHTML = (userBasket[0].Products.length).toLocaleString('fa-IR')

    productsQuantity = userBasket[0].Products.length
    userBasket[0].Products.forEach(userBasket => {
        totalPrice = totalPrice + (userBasket.product.price * userBasket.quantity)
        totalPriceWithDiscount = (totalPriceWithDiscount + (userBasket.product.price - (userBasket.product.price * userBasket.product.discount / 100)) * userBasket.quantity)
        totalDiscount = totalPrice - totalPriceWithDiscount
    })

    userBasketBadgeNumber.innerHTML = productsQuantity.toLocaleString('fa-IR')
    cartShoppingBasketBadge.innerHTML = productsQuantity.toLocaleString('fa-IR')
    // totalPurchasePriceMobile.innerHTML = totalPrice
    console.log(totalPrice);


    userBasketProductContainer.innerHTML = ''
    userBasket[0].Products.forEach(p => {

        fetch(`http://localhost:5000/seller/${p.product.seller}`)
            .then(res => res.json())
            .then(seller => {
                userBasketProductContainer.insertAdjacentHTML('beforeend', `
                    <div class="bg-white py-3 pe-lg-4 user-basket-item" id=product-${p.product._id}>
                        <div class="mx-3">
                            <div class="row">
                                <div class="col-2 p-0">
                                    <div class="d-flex flex-column align-items-center">
                                        <a href="../product.html?name=${p.product.shortName}&page=1" style="width: 114px; height: 114px">
                                        <img class="w-100 object-fit-contain d-inline-block" src="../assets/covers/${p.product.images.find(image => image.isMain).url}" alt="">
                                        </a>
                                    </div>
                                </div>
                                <div class="col-10">
                                    <div class="overflow-hidden">
                                        <h3 class="color-800 text-body2-strong mb-2">${p.product.name}</h3>
                                        <div class="d-flex align-items-center">
                                            <div class="d-flex">
                                                <div class="color-product"></div>
                                            </div>
                                            <p class="text-caption color-600 me-2">سرخابی</p>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <div class="d-flex">
                                                <i class="fa-solid fa-shield-halved cart-shopping__icon"></i>
                                            </div>
                                            <p class="text-caption color-600 me-2">${p.product.guarantee}</p>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <div class="d-flex">
                                                <i class="fa-solid fa-shop cart-shopping__icon"></i>
                                            </div>
                                            <p class="text-caption color-600 me-2">${seller.name}</p>
                                        </div>
                                        <div class="d-flex flex-column w-100 position-relative">
                                            <div class="d-flex align-items-center mb-1">
                                                <div class="d-flex">
                                                    <i class="fa-regular fa-floppy-disk" style="color: #19bfd3;"></i>
                                                </div>
                                                <p class="text-caption color-600 me-2">
                                                    ${seller.digikalaAvailibility ? 'موجود در انبار دیجی‌کالا' : seller.sellerAvailibility ? 'موجود در انبار فروشنده' : 'موجود در انبار فروشنده و دیجی‌کالا'}
                                                </p>
                                            </div>
                                            <div class="d-flex flex-column">
                                                <div class="d-flex ms-3 align-items-center">
                                                    <div class="d-flex position-relative d-flex align-items-center justify-content-center ms-2"
                                                        style="width: 18px; height: 26px">
                                                        <div class="d-flex">
                                                            <i class="info-section__wrapp-icon fa-solid fa-circle fa-2xs"
                                                                style="color: #19bfd3; width: 5px; height: 5px;"></i>
                                                        </div>
                                                        <span class="bullet-line position-absolute top-0 d-block"></span>
                                                    </div>
                                                    <div class="d-flex mx-1">
                                                        <i class="fa-solid fa-truck delivery-express-icon"></i>
                                                    </div>
                                                    <p class="text-caption color-500 me-1">${seller.post[0]}</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-column">
                                                <div class="d-flex ms-3 align-items-center">
                                                    <div class="d-flex position-relative d-flex align-items-center justify-content-center ms-2"
                                                    style="width: 18px; height: 26px">
                                                        <div class="d-flex">
                                                            <i class="info-section__wrapp-icon fa-solid fa-circle fa-2xs"
                                                            style="color: #19bfd3; width: 5px; height: 5px;"></i>
                                                        </div>
                                                        <span class="bullet-line position-absolute top-0 d-block"></span>
                                                    </div>
                                                    <div class="d-flex mx-1">
                                                        <i class="fa-solid fa-truck delivery-express-icon" style="color: #19bfd3"></i>
                                                    </div>
                                                    <p class="text-caption color-neutral-500 ms-1 ellipsis">${seller.post[1]}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-2 p-0">
                                    <div class="d-flex align-items-center justify-content-between px-2 item-quantity__container">
                                        <div class="d-flex pointer" onclick='incProductQuantity(event,${JSON.stringify(p.product)})'>
                                            <i class="item-quantity__icon fa fa-plus"></i>
                                        </div>
                                        <span class="d-flex flex-column align-items-center justify-content-between color-primary-500">
                                            <span class="position-relative d-flex align-items-center text-h5 justify-content-center item-quantity__box-count">
                                                ${p ? p.quantity.toLocaleString('fa-IR') : '۱'}
                                            </span>
                                        </span>
                                        <div class="d-flex align-items-center pointer" id=trash-miunus-icon-wrapper-${p.product._id}>
                                        ${p.quantity === 1 ?
                        `<i class="item-quantity__icon fa fa-trash" onclick='delProductFromBasket(event,${JSON.stringify(p.product._id)})'></i>`
                        :
                        `<i class="item-quantity__icon fa fa-minus" onclick='decProductQuantity(event,${JSON.stringify(p.product._id)})'></i>`}                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="col-10">
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex align-items-center justify-content-start ms-2">
                                            <span class="text-h4 color-800" id="total-price-${p.product._id}">
                                            ${((p.product.price - ((p.product.price * p.product.discount) / 100)) * p.quantity).toLocaleString('fa-IR')}</span>
                                            <div class="d-flex mt-1 me-1">
                                                <p class="product-price__toman">تومان</p>
                                            </div>
                                        </div>
                                    </div>
                                    ${p.product.discount !== 0 ? `<div class="text-caption color-primary-700 d-flex align-items-center">تنها ${p.product.stock.toLocaleString('fa-IR')} عدد در انبار باقی مانده</div>` : ''}
                                </div>
                            </div>
                        </div>
                `)
            })
    })
    getAndShowcartChoppingMiniBox(userBasket[0])
}

const showEmptyCart = () => {

    const emptyCartContainer = document.querySelector('#empty-cart-container')
    const fullCartContainer = document.querySelector('#full-cart-container')
    const cartShoppingContainer = document.querySelector('#cart-shopping__container')
    const cartPriceContainer = document.querySelector('#cart-price-container')
    const userBasketBadgeNumberContainer = document.querySelector('.cart-shopping__badge-count')
    const cartShoppingBadge = document.querySelector('#cart-shopping__badge')
    const cartBoxBottom = document.querySelector('.cart__box-bottom')

    userBasketBadgeNumberContainer.classList.add('hidden')
    cartPriceContainer.classList.add('hidden')
    fullCartContainer.classList.add('hidden')
    cartShoppingBadge.classList.add('hidden')
    emptyCartContainer.classList.remove('hidden')

    cartShoppingContainer.classList.remove('ps-lg-3')
    cartBoxBottom.classList.add('hidden')

    emptyCartContainer.innerHTML = ''
    emptyCartContainer.insertAdjacentHTML('beforeend', `
        <div class="py-4 px-lg-0 bg-white border-radius-8">
            <div class="d-flex justify-content-center">
                <img src="../assets/covers/shopping cart/empty-cart.svg" alt="">
            </div>
            <p class="cart-shopping__footer-title text-center mt-4">سبد خرید شما خالی است!
            </p>
            <p class="cart-shopping__footer-subtitle text-center mt-2">می‌توانید برای مشاهده
                محصولات بیشتر به صفحات زیر بروید:</p>
            <div class="d-flex justify-content-center align-items-center mt-5">
                <a class="px-4" href="/promotion-center/"></a>
                <a class="px-4" href="/best-selling/"></a>
            </div>
        </div>        
    `)
}

const recentlyViewed = async () => {

    const userID = getUserID()
    const isUserLogin = isLogin()
    let mainProduct = null

    if (isUserLogin) {
        const lastRecentlyProductContainer = document.querySelector('#last-recently-products__container')

        const res = await fetch(`http://localhost:5000/user/${userID}/recently-viewed`)
        const productsRecentlyViewed = await res.json()


        const respones = await fetch(`http://localhost:5000/basket/${userID}`)
        const userBasket = await respones.json()


        lastRecentlyProductContainer.innerHTML = ''
        productsRecentlyViewed.recentlyViewed.forEach(productRecentlyViewed => {

            mainProduct = userBasket[0].Products.find(p => {
                return p.product._id === productRecentlyViewed.product._id
            })

            lastRecentlyProductContainer.insertAdjacentHTML('beforeend', `
            <div class="swiper-slide">
                <a href="../product.html?name=${productRecentlyViewed.product.shortName}&page=1" class="d-block position-relative bg-white overflow-hidden flex-grow-1 py-4 px-3 px-lg-2">
                    <div class="overflow-hidden d-flex flex-column align-items-stretch justify-content-start h-100">
                        <div class="d-flex grow-1 position-relative flex-column">
                            <div>
                                <div class="d-flex align-items-stretch flex-column position-relative mb-1">
                                    <div class="d-flex align-items-start mx-auto">
                                        <div>
                                            <div class="d-flex align-items-center justify-content-start flex-wrap position-absolute top-0 right-0">
                                                <br><br>
                                            </div>
                                            <div class="related-product__img">
                                                <img src="../assets/covers/${productRecentlyViewed.product.images.find(image => image.isMain).url}" alt="">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="add-product-btn-recently-view" id="inc-dec-product-btn" onmouseover="showQuantityBadge(event)">
                                        ${mainProduct ?
                    `<div class="me-2 mb-2 quantity-red-border show-quantity-cyrcle">
                                            <div class="position-relative d-flex align-items-center text-body2-strong add-product-btn-recently-view-outline">
                                                <div class="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                                                    <div class="d-flex">
                                                        <span style="color: #ef394e" id="quantity-cyrcle-number-${productRecentlyViewed.product._id}">
                                                            ${mainProduct ? mainProduct.quantity.toLocaleString('fa-IR') : '۱'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`
                    : ``
                }
                                    ${
                    mainProduct ?
                        `<div class="hidden show-add-dec-product-btn" onmouseleave="hideQuantityBadge(event)">
                                            <div class="d-flex align-items-center justify-content-between px-2 item-quantity-recently__container">
                                                <div class="d-flex pointer" onclick='incProductQuantity(event,${JSON.stringify(mainProduct.product)})'>
                                                    <i class="item-quantity__icon fa fa-plus"></i>
                                                </div>
                                                <span class="d-flex flex-column align-items-center justify-content-between">
                                                    <span class="position-relative d-flex align-items-center justify-content-center item-quantity__box-count">
                                                        ${mainProduct ? mainProduct.quantity.toLocaleString('fa-IR') : '۱'}
                                                    </span>
                                                </span>
                                                <div class="d-flex align-items-center pointer">
                                                ${mainProduct.quantity === 1 ?
                            `<i class="item-quantity__icon fa fa-trash" onclick='delProductFromBasket(event,${JSON.stringify(mainProduct.product._id)})'></i>`
                            :
                            `<i class="item-quantity__icon fa fa-minus" onclick='decProductQuantity(event,${JSON.stringify(mainProduct.product._id)})'></i>`
                        }     
                                                </div>
                                            </div>
                                        </div>`
                        :
                        `<div class="me-2 mb-2 quantity-red-border" onclick='addRecentlyProductToUserBasket(event,${JSON.stringify(productRecentlyViewed.product._id)})'>
                                            <div class="position-relative d-flex align-items-center text-body2-strong add-product-btn-recently-view-outline">
                                                <div class="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                                                    <div class="d-flex">
                                                        <i class="fa fa-plus" style="width: 20px; height: 20px; color: #ef4056"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`
                }
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1 d-flex flex-column align-items-stretch justify-content-start">
                                <div>
                                    <h3 class="color-700 product-card__title">${productRecentlyViewed.product.name}</h3>
                                </div>
                                ${productRecentlyViewed.product.discount === 0 ?
                    `<div class="mb-1 d-flex align-items-center justify-content-between">
                                        <div class="d-flex align-items-center">
                                            <div class="d-flex flex-shrink-0 ms-1">
                                                <i class="fa fa-user" style="width: 15px; height: 15px; color: #d86b00"></i>
                                            </div>
                                            <p class="text-caption text-neutral-600">ارسال فروشنده</p>
                                            <br>
                                        </div>
                                    </div>` : ''
                }
                                <div class="mb-1 d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center">
                                    ${productRecentlyViewed.product.discount === 0 ? ``
                    :
                    `<p class="product-card__stock-text">
                                            تنها ${new Intl.NumberFormat('fa-IR').format(productRecentlyViewed.product.stock)} عدد در انبار باقی مانده
                                            </p>
                                        <br>`
                }
                                    </div>
                                </div>
                                <div class="d-flex flex-column align-items-stretch justify-content-start">
                                    <div class="pt-1 d-flex flex-column align-items-stretch justify-content-between">
                                        <div class="d-flex align-items-center justify-content-between">
                                        ${productRecentlyViewed.product.discount === 0 ? `` :
                    `<div class="px-1 text-white d-flex align-items-center justify-content-center flex-shrink-0 me-lg-1 me-0 product-price__discount-wrapp">
                                                <span class="product-price__discount-text px-1">${(productRecentlyViewed.product.discount).toLocaleString('fa-IR')}%</span>
                                            </div>`
                }
                                            <div class="d-flex justify-content-end align-items-center me-auto">
                                                <span class="product-price">${(productRecentlyViewed.product.price - ((productRecentlyViewed.product.price * productRecentlyViewed.product.discount) / 100)).toLocaleString('fa-IR')}</span>
                                                <div class="d-flex me-1">
                                                    <p class="product-price__toman">تومان
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        ${productRecentlyViewed.product.discount === 0 ? `` :
                    `<div class="d-flex justify-content-end align-items-center pl-5">
                                                <div class="product-prev-price me-1">${productRecentlyViewed.product.price.toLocaleString('fa-IR')}</div>
                                            </div>`
                }
                                        <div class="mt-auto">
                                            <div>
                                                <div class="position-relative loading-wrapp">
                                                    <div class="loading-count position-absolute">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        `)
        })
    } else {
        const cartShoppingColLeftContainer = document.querySelector('.cart-shopping__colLeft-container')
        const recentProductsSlider = document.querySelector('.recent-products__slider')
        const cartPriceContainer = document.querySelector('#cart-price-container')
        const adContainer = document.querySelector('.ad-container')
        const cartShoppingBadge = document.querySelector('.cart-shopping__badge')
        const cartShoppingBadgeCount = document.querySelector('.cart-shopping__badge-count')
        const cartShoppingContainer = document.querySelector('#cart-shopping__container')
        
        recentProductsSlider.classList.add('hidden')
        cartShoppingColLeftContainer.classList.remove('hidden')
        cartPriceContainer.classList.add('hidden')
        adContainer.classList.add('hidden')
        cartShoppingBadge.classList.add('hidden')
        cartShoppingBadgeCount.classList.add('hidden')
        
        showEmptyCart()
        cartShoppingContainer.classList.add('ps-lg-3')
    }
}

const addRecentlyProductToUserBasket = async (event, productID) => {

    event.preventDefault()
    let userID = getUserID()

    const incDecProductBtn = document.querySelector('#inc-dec-product-btn')

    const res = await fetch(`http://localhost:5000/basket/${userID}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id: productID })
    })
    const userBasket = await res.json()

    const respones = await fetch(`http://localhost:5000/basket/${userID}`)
    const basket = await respones.json()

    let mainProduct = basket[0].Products.find(p => {
        return p.product._id === productID
    })

    getUserCartCount()
    incDecProductBtn.innerHTML = ''
    incDecProductBtn.insertAdjacentHTML('beforeend', `
        <div class="d-flex align-items-center">
            <div class="d-flex align-items-center justify-content-between px-2 item-quantity__container">
                <div class="d-flex pointer">
                    <i class="item-quantity__icon fa fa-plus"></i>
                </div>
                <span class="d-flex flex-column align-items-center justify-content-between">
                    <span class="position-relative d-flex align-items-center justify-content-center item-quantity__box-count">
                        ${mainProduct.quantity.toLocaleString('fa-IR')}
                    </span>
                </span>
                <div class="d-flex align-items-center pointer">
                    ${mainProduct.quantity === 1 ?
            `<i class="item-quantity__icon fa fa-trash" onclick='delProductFromBasket(event,${JSON.stringify(mainProduct.productID)})'></i>`
            :
            `<i class="item-quantity__icon fa fa-minus" onclick='decProductQuantity(event,${JSON.stringify(mainProduct.productID)})'></i>`
        }     
                </div>
            </div>
        </div>
    `)
}

const incProductQuantity = async (event, product) => {

    event.preventDefault()
    let userID = getUserID()

    const res = await fetch(`http://localhost:5000/basket/${userID}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id: product._id })
    })
    const basket = await res.json()

    // Find the element for this product
    const productElement = document.querySelector(`#product-${product._id}`)
    const trashMinusIconWrapper = document.querySelector(`#trash-miunus-icon-wrapper-${product._id}`)
    const itemQuantityRecentlyContainer = document.querySelector('.show-add-dec-product-btn')
    const cartShoppingBadge = document.querySelector('#cart-shopping__badge')

    cartShoppingBadge.innerHTML = (basket.Products.length).toLocaleString('fa-IR')

    // Update the quantity display for this product
    const quantityElement = productElement.querySelector('.item-quantity__box-count')

    let mainProduct = basket.Products.find(p => {
        return p.product._id === product._id
    })


    itemQuantityRecentlyContainer.innerHTML = ''
    itemQuantityRecentlyContainer.insertAdjacentHTML('beforeend', `
        <div class="d-flex align-items-center justify-content-between px-2 item-quantity-recently__container">
            <div class="d-flex pointer" onclick='incProductQuantity(event,${JSON.stringify(mainProduct.product)})'>
                <i class="item-quantity__icon fa fa-plus"></i>
            </div>
            <span class="d-flex flex-column align-items-center justify-content-between">
                <span class="position-relative d-flex align-items-center justify-content-center item-quantity__box-count">
                    ${mainProduct ? mainProduct.quantity.toLocaleString('fa-IR') : '۱'}
                </span>
            </span>
            <div class="d-flex align-items-center pointer">
            ${mainProduct.quantity === 1 ?
            `<i class="item-quantity__icon fa fa-trash" onclick='delProductFromBasket(event,${JSON.stringify(mainProduct.product._id)})'></i>`
            :
            `<i class="item-quantity__icon fa fa-minus" onclick='decProductQuantity(event,${JSON.stringify(mainProduct.product._id)})'></i>`
        }     
            </div>
        </div>
    `)

    quantityElement.textContent = mainProduct.quantity.toLocaleString('fa-IR')

    // Update the icon for this product
    trashMinusIconWrapper.innerHTML = ''
    if (mainProduct.quantity === 1) {
        trashMinusIconWrapper.insertAdjacentHTML('beforeend', `
            <i class="item-quantity__icon fa fa-trash" onclick='delProductFromBasket(event,${JSON.stringify(product._id)})'></i>
        `)
    } else {
        trashMinusIconWrapper.insertAdjacentHTML('beforeend', `
            <i class="item-quantity__icon fa fa-minus" onclick='decProductQuantity(event,${JSON.stringify(product._id)})'></i>
        `)
    }

    // Update the total price display
    const totalPriceElement = document.querySelector(`#total-price-${mainProduct.product._id}`)
    totalPriceElement.textContent = `${((mainProduct.product.price - ((mainProduct.product.price * mainProduct.product.discount) / 100)) * mainProduct.quantity).toLocaleString('fa-IR')}`.toLocaleString('fa-IR')

    recentlyViewed()
    getAndShowcartChoppingMiniBox(basket)
}

const delProductFromBasket = async (event, productID) => {

    event.preventDefault()
    const userID = getUserID()
    const incDecProductBtn = document.querySelector('#inc-dec-product-btn')
    const userBasketProductContainer = document.querySelector('#user-basket__products-container')
    const cartShoppingBadge = document.querySelector('#cart-shopping__badge')

    const res = await fetch(`http://localhost:5000/basket/${userID}/${productID}`, {
        method: 'DELETE'
    })
    const updatedBasket = await res.json()

    cartShoppingBadge.innerHTML = (updatedBasket.Products.length).toLocaleString('fa-IR')

    if (updatedBasket.Products.length) {
        getAndShowUserBasketinCartPage()
        recentlyViewed()
    } else {
        getAndShowUserBasketinCartPage()
        showEmptyCart()
        recentlyViewed()
    }

}

const decProductQuantity = async (event, productID) => {

    event.preventDefault()
    const userID = getUserID()

    const res = await fetch(`http://localhost:5000/basket/${userID}/${productID}`, {
        method: 'PATCH'
    })
    const updatedBasket = await res.json()

    // Find the element for this product
    const productElement = document.querySelector(`#product-${productID}`)
    const trashMinusIconWrapper = document.querySelector(`#trash-miunus-icon-wrapper-${productID}`)
    const cartShoppingBadge = document.querySelector('#cart-shopping__badge')

    cartShoppingBadge.innerHTML = (updatedBasket.Products.length).toLocaleString('fa-IR')

    // Update the quantity display for this product
    const quantityElement = productElement.querySelector('.item-quantity__box-count');
    let mainProduct = updatedBasket.Products.find(p => {
        return p.product._id === productID;
    })
    quantityElement.textContent = mainProduct ? mainProduct.quantity.toLocaleString('fa-IR') : '0';

    // Update the total price display
    const totalPriceElement = document.querySelector(`#total-price-${productID}`);
    totalPriceElement.textContent = `${((mainProduct.product.price - ((mainProduct.product.price * mainProduct.product.discount) / 100)) * mainProduct.quantity).toLocaleString('fa-IR')}`.toLocaleString('fa-IR');


    const itemQuantityRecentlyContainer = document.querySelector('.show-add-dec-product-btn')

    itemQuantityRecentlyContainer.innerHTML = ''
    itemQuantityRecentlyContainer.insertAdjacentHTML('beforeend', `
        <div class="d-flex align-items-center justify-content-between px-2 item-quantity-recently__container">
            <div class="d-flex pointer" onclick='incProductQuantity(event,${JSON.stringify(mainProduct.product)})'>
                <i class="item-quantity__icon fa fa-plus"></i>
            </div>
            <span class="d-flex flex-column align-items-center justify-content-between">
                <span class="position-relative d-flex align-items-center justify-content-center item-quantity__box-count">
                    ${mainProduct ? mainProduct.quantity.toLocaleString('fa-IR') : '۱'}
                </span>
            </span>
            <div class="d-flex align-items-center pointer">
            ${mainProduct.quantity === 1 ?
            `<i class="item-quantity__icon fa fa-trash" onclick='delProductFromBasket(event,${JSON.stringify(mainProduct.product._id)})'></i>`
            :
            `<i class="item-quantity__icon fa fa-minus" onclick='decProductQuantity(event,${JSON.stringify(mainProduct.product._id)})'></i>`
        }     
            </div>
        </div>
    `)

    if (mainProduct.quantity === 0) {
        productElement.remove()
        trashMinusIconWrapper.innerHTML = ''
        document.querySelector(`#trash-miunus-icon-wrapper-${mainProduct.product._id}`).insertAdjacentHTML('beforeend', `
            <i class="item-quantity__icon fa fa-minus" onclick='decProductQuantity(event,${JSON.stringify(mainProduct.product._id)})'></i>
        `)
    } else if (mainProduct.quantity === 1) {
        trashMinusIconWrapper.innerHTML = ''
        document.querySelector(`#trash-miunus-icon-wrapper-${mainProduct.product._id}`).insertAdjacentHTML('beforeend', `
            <i class="item-quantity__icon fa fa-trash" onclick='delProductFromBasket(event,${JSON.stringify(mainProduct.product._id)})'></i>
        `)
    }

    recentlyViewed()
    getAndShowcartChoppingMiniBox(updatedBasket)

}

const showQuantityBadge = event => {
    const productBox = event.currentTarget
    const addButton = productBox.querySelector('.show-add-dec-product-btn')
    const quantityCircle = productBox.querySelector('.show-quantity-cyrcle')
    if (addButton && (!event.relatedTarget || !productBox.contains(event.relatedTarget))) {
        addButton.classList.remove('hidden');
        if (quantityCircle) {
            quantityCircle.classList.add('hidden');
        }
    }
}

const hideQuantityBadge = event => {
    const addButton = event.currentTarget
    const productBox = addButton.parentElement
    const quantityCircle = productBox.querySelector('.show-quantity-cyrcle')
    addButton.classList.add('hidden')
    if (quantityCircle) {
        quantityCircle.classList.remove('hidden')
    }
}

const getAndShowcartChoppingMiniBox = async (basket) => {

    const cartPriceContainer = document.querySelector('#cart-shopping__mini-box')
    const totalPurchasePriceMobile = document.querySelector('#total-purchase-price__mobile')
    const cartBoxBottom = document.querySelector('.cart__box-bottom')

    let totalPrice = 0
    let totalPriceWithDiscount = 0
    let totalDiscount = 0
    let discount = 0

    const isUserLogin = isLogin()

    basket.Products.forEach(userBasket => {
        totalPrice = totalPrice + (userBasket.product.price * userBasket.quantity)
        totalPriceWithDiscount = (totalPriceWithDiscount + (userBasket.product.price - (userBasket.product.price * userBasket.product.discount / 100)) * userBasket.quantity)
        totalDiscount = totalPrice - totalPriceWithDiscount
        discount = (((totalPrice - totalPriceWithDiscount) / totalPrice) * 100)
    })

    if (isUserLogin) {
      
        cartPriceContainer.innerHTML = ''
        cartPriceContainer.insertAdjacentHTML('beforeend', `
                <div class="px-3">
                    <div class="d-flex align-items-center justify-content-between pt-2">
                        <div class="d-flex align-items-center">
                            <div class="me-1 text-body-3 d-flex align-items-center color-600">
                                <span>قیمت کالاها (${basket.Products.length.toLocaleString('fa-IR')})</span>
                            </div>
                        </div>
                        <div class="d-flex align-items-center">
                            <div class="d-flex align-items-center justify-content-start">
                                <span class="color-600 text-subtitle-strong">${totalPrice.toLocaleString('fa-IR')}</span>
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex me-1 pt-1">
                                            <p class="product-price__toman">تومان</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between pt-2">
                        <div class="d-flex align-items-center">
                            <div class="me-1 text-body-3 d-flex align-items-center color-800">
                                <span>جمع سبد خرید</span>
                            </div>
                        </div>
                        <div class="d-flex align-items-center">
                            <div class="d-flex align-items-center justify-content-start">
                                <span class="color-800 text-subtitle-strong">${totalPriceWithDiscount.toLocaleString('fa-IR')}</span>
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex me-1 pt-1">
                                            <p class="product-price__toman color-800">تومان</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between pt-2">
                        <div class="d-flex align-items-center">
                            <div class="me-1 text-body-3 d-flex align-items-center color-primary-500">
                                <span>سود شما از خرید</span>
                            </div>
                        </div>
                        <div class="d-flex align-items-center">
                            <div class="d-flex align-items-center justify-content-start">
                                <span class="color-primary-500 text-subtitle-strong">(${Math.round(discount).toLocaleString('fa-IR')}٪)${totalDiscount.toLocaleString('fa-IR')}</span>
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex me-1 pt-1">
                                            <p class="product-price__toman color-primary-500">تومان</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-1 my-lg-3 d-lg-block d-none" onclick='submitProducts(event,${JSON.stringify(basket)})'>
                        <a class="checkout-btn d-flex align-items-center w-100"
                            href="#">
                            <div class="d-flex align-items-center justify-content-center flex-grow-1">
                                ثبت سفارش</div>
                        </a>
                    </div>
                </div>
                <div class="cart-shopping__colLeft-box-bottom px-3 pb-2">
                    <div class="d-flex align-items-center justify-content-between pt-2">
                        <div class="d-flex align-items-center">
                            <div>
                                <img class="w-100 d-inline-block object-fit-contain" alt="دیجی‌کلاب"
                                    src="../assets/images/club-point.svg">
                            </div>
                            <div class="me-1 text-body2-strong d-flex align-items-center color-600">
                                <span>دیجی‌کلاب</span>
                                <div class="me-2">
                                    <div>
                                        <div class="d-flex">
                                            <i class="fa-solid fa-circle-exclamation variantInfo-error-icon"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-start">
                            <span class="color-800 text-subtitle-strong ms-1">۱۴۰</span>
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                    <span class="mr-1 product-price__toman">امتیاز</span>
                                </div>
                            </div>
                        </div>
                    
                </div>
        `)

        cartBoxBottom.classList.remove('hidden')
        totalPurchasePriceMobile.innerHTML = totalPriceWithDiscount.toLocaleString('fa-IR')
    } else {
        cartPriceContainer.innerHTML = ''
        cartBoxBottom.classList.add('hidden')
    }
}

const showDeleteAllPurchaseModal = () => {

    const cartSaveAllWrapper = document.querySelector('.cart-save-all-wrapper')
    const cartDeleteItemsAllbtn = document.querySelector('.cart-delete-items-all')
    const deleteAllProductsBasketModal = document.querySelector('.delete-all-products-basket__modal-bg')

    cartSaveAllWrapper.classList.remove('hidden')
    cartDeleteItemsAllbtn.addEventListener('click', () => {
        deleteAllProductsBasketModal.classList.remove('hidden')
    })
}

const closedeleteAllPurchaseFromUserBasketModal = () => {

    const cartSaveAllWrapper = document.querySelector('.cart-save-all-wrapper')
    const deleteAllProductsBasketModal = document.querySelector('.delete-all-products-basket__modal-bg')

    cartSaveAllWrapper.classList.add('hidden')
    deleteAllProductsBasketModal.classList.add('hidden')
}

const deleteAllPurchaseFromUserBasket = async () => {

    const userID = getUserID()

    const res = await fetch(`http://localhost:5000/basket/${userID}`, {
        method: "DELETE",
    })
    const updatedBasket = await res.json()

    showEmptyCart()
    recentlyViewed()
    closedeleteAllPurchaseFromUserBasketModal()
}

const submitProducts = async (event, userBasket) => {

    event.preventDefault()
    console.log(userBasket);

    showSwal(
        'آیا از ثبت سفارش خود اطمینان دارید؟',
        'warning',
        ["خیر", "بله"],
        async (result) => {
            if (result) {
                showSwal(
                    'سفار ش شما با موفقیت ثبت شد',
                    'success',
                    'ok',
                    () => {
                        const userID = getUserID()

                        fetch(`http://localhost:5000/basket/${userID}`, {
                            method: "DELETE",
                        })
                            .then(res => res.json())
                        showEmptyCart()
                        recentlyViewed()
                        location.href = './../index.html'
                    }
                )
            } else {
                showSwal(
                    'ثبت سفارش شما لغو شد',
                    'success',
                    'ok',
                    () => { }
                )
            }
        }
    )
}


window.submitProducts = submitProducts
window.closedeleteAllPurchaseFromUserBasketModal = closedeleteAllPurchaseFromUserBasketModal
window.deleteAllPurchaseFromUserBasket = deleteAllPurchaseFromUserBasket
window.showDeleteAllPurchaseModal = showDeleteAllPurchaseModal
window.addRecentlyProductToUserBasket = addRecentlyProductToUserBasket
window.incProductQuantity = incProductQuantity
window.delProductFromBasket = delProductFromBasket
window.decProductQuantity = decProductQuantity
window.showQuantityBadge = showQuantityBadge
window.hideQuantityBadge = hideQuantityBadge


export { getUserCartCount }
