import { getUserBasketCountAndShowModal, showEmptyBasket } from "./../funcs/shared.js";
import { getProductIdByShortName, getUrlParam, getUserID, paginateItems, showSwal, isLogin } from "./utils.js";


let isScrollingDueToClick = false
const productComment = document.querySelector('#product-comment')
const productQustion = document.querySelector('#product-question')
const productCommentsContainer = document.querySelector('#product-comments-container')
const productQuestionsContainer = document.querySelector('#product-questions-container')
const commentPaginationContainer = document.querySelector('#paginated-container')
const digikalaPostContainer = document.querySelector('.digikala-post__modal-bg')
const otherImagesModal = document.querySelector('#other-images-modal')
const listItems = document.querySelectorAll('.info-section__tab_title')
const addQuestionBtn = document.querySelector('#add-question')
const addCommentBtn = document.querySelector('#add-comment')
const questionModal = document.querySelector('#question__modal')
const commentModal = document.querySelector('#comment__modal')
const closeQuestionModalBtn = document.querySelector('#close-question__modal-btn')
const closeCommentModalBtn = document.querySelector('#close-comment__modal-btn')
const questionTextareaModal = document.querySelector('.queation__modal-textarea')
const questionLengthModal = document.querySelector('#question-length-modal')
const questionSubmitBtnModal = document.querySelector('#question-submit__btn-modal')
const commentModalProductName = document.querySelector('#comment-modal__product-name')
const addPositivePoint = document.querySelector('#add-positive-point')
const positiveCommentInput = document.querySelector('#positive-input')
const positivePointsContainer = document.querySelector('#positive-point-container')
const hintTextPositivePoint = document.querySelector('#pos-comment-hint-text')
const addNegativePoint = document.querySelector('#add-negative-point')
const negativeCommentInput = document.querySelector('#negative-input')
const negativePointsContainer = document.querySelector('#negative-point-container')
const hintTextNegativePoint = document.querySelector('#neg-comment-hint-text')
const submitAddCommentBtn = document.querySelector('#add-comment__submit-btn')
const commentCheckboxInput = document.querySelector('#comment-checkbox__input')
const similarProductsContainer = document.querySelector('#similar-products__container')
const productAllCommentsCount = document.querySelector('#all-comments')

let previouslySelectedColor, previouslySelectedCheckIcon, selectedColor, mainCategory
let positivePointsArray = []
let negativePointsArray = []


const getAndShowProductDetails = async () => {

    const productName = document.querySelector('#product-name')
    const productTitle = document.querySelector('#product-title')
    const productBrand = document.querySelector('#product-brand')
    const productEngTitle = document.querySelector('#product-eng-title')
    const productRating = document.querySelector('#product-rating')
    const productColorsContainer = document.querySelector('#product-colors-container')
    const productClientSatisfaction = document.querySelector('#product-client-satisfaction')
    const productMainImage = document.querySelector('#originalImage')
    const productImagesContainer = document.querySelector('#product-images-container')
    const productZoomedImage = document.querySelector('#zoomedImage')
    const productIncredibleOffersLogo = document.querySelector('#product-incredible-offers-logo')
    const productIncredibleOffersTiming = document.querySelector('#product-incredible-offers-timing')
    const productIntroduction = document.querySelector('#product-introduction-container')
    const productIntroToggleBtn = document.querySelector('#product-intro-toggle-btn')
    const productIntroToggleText = document.querySelector('#product-intro-toggle-text')
    const productAttributesContainer = document.querySelector('#product-attributes-container')
    const productUserScore = document.querySelector('#product-user-score')
    const productScoreContainer = document.querySelector('#product-score-container')
    const specificAttributeWrapper = document.querySelector('#specific-attribute')
    const specificAttributeContainer = document.querySelector('.specific-attribute-container')
    const breadcrumbListContainer = document.querySelector('#breadcrumb__list-container')
    const feedbackTextGroup = document.querySelector('#feedback-text-group')
    const productIntroduct = document.querySelector('#product-introduction')
    const productIntroductionTitle = document.querySelector('#product-introduction-title')
    const selectColorElem = document.querySelector('#select-color')
    const productAttributes = document.querySelector('#product-attributes')

    selectColorElem.innerHTML = ''
    let allComments = []

    const productShortName = getUrlParam('name')
    const isUserLogin = isLogin()

    const res = await fetch(`http://localhost:5000/product/name/${productShortName}`)
    const product = await res.json()

    feedbackTextGroup.innerHTML = `درخواست مرجوع کردن کالا در گروه ${product.categoryID.name} با دلیل "انصراف از خرید" تنها در صورتی قابل تایید است که کالا در شرایط اولیه باشد (در صورت پلمپ بودن، کالا نباید بازشده باشد).`

    if (isUserLogin) {
        const userID = getUserID()
        recordProductView(userID, product.shortName)
    } else {
        showEmptyBasket()
    }

    getAndShowSimilarProducts(product._id)

    // Handle Product Details
    productTitle.innerHTML = product.title
    productName.innerHTML = product.name
    productBrand.innerHTML = product.brand
    productRating.innerHTML = `${new Intl.NumberFormat('fa-IR').format(product.rating)}`
    productUserScore.innerHTML = `${new Intl.NumberFormat('fa-IR').format(product.rating)}`
    if (product.engTitle) {
        productEngTitle.innerHTML = product.engTitle
    }
    product.comments.forEach(comment => {
        if (!comment.isQuestion && !comment.isAnswer) {
            allComments.push(comment)
        }
    })
    productAllCommentsCount.innerHTML = `${allComments.length.toLocaleString('fa-IR')} دیدگاه`

    if (product.colors) {

        let colorsLength = document.querySelector('#colors-length')
        colorsLength.innerHTML = `${product.colors.length.toLocaleString('fa-IR')} رنگ`

        productColorsContainer.innerHTML = ''
        product.colors.forEach(colorObject => {
            for (let color in colorObject) {

                productColorsContainer.insertAdjacentHTML('beforeend', `
                    <div class="bg-white d-flex align-items-center justify-content-center mb-2 ms-2 variantInfo-border variantInfo-px" onclick='selectColor(event, ${JSON.stringify(colorObject)}, ${JSON.stringify(product)})'>
                        <div class="d-flex align-items-center">
                            <div lass="d-flex align-items-center justify-content-center variantInfo-color__content">
                                <div class="mx-auto d-flex align-items-center justify-content-center variantInfo-color__content-main" style="background-color: ${colorObject[color]}">
                                    <div class="d-flex">
                                        <i class="fa-solid fa-check variantInfo-color__check-icon" style="display: none;"></i>
                                    </div>
                                </div>
                                <span class="d-lg-none d-block me-2 variantInfo-text-body">${color}</span>
                            </div>
                        </div>
                    </div>
                `)
            }
        })
    }

    // Handle Specific Attribute
    for (const attribute in product.specificAttribute) {
        if (Object.keys(product.specificAttribute).length !== 0) {
            specificAttributeWrapper.insertAdjacentHTML('beforeend', `
            <li class="d-flex align-items-center mb-1">
                <div class="d-flex align-items-center">
                    <div class="m-2 d-flex">
                        <i class="comment-rate__icon fa-solid fa-circle fa-2xs" style="color: #9e9fb1;"></i>
                    </div>
                    <p class="color-500 text-body-2">${attribute}: </p>
                </div>
                <p class="text-body-2 mr-2 color-700">${product.specificAttribute[attribute]}</p>
            </li>
    `)
        } else {
            specificAttributeContainer.innerHTML = ''
        }
    }

    productClientSatisfaction.innerHTML = `${product.clientSatisfaction.toLocaleString('fa-IR')}% از خریداران، این کالا را پیشنهاد کرده‌اند`
    let mainImage = product.images.find(image => image.isMain)
    if (mainImage) {
        productMainImage.setAttribute('src', `./assets/covers/${mainImage.url}`)
        productZoomedImage.style.backgroundImage = `url("./assets/covers/${mainImage.url}")`
    }

    let otherImages = product.images.filter(image => !image.isMain)
    otherImages.slice(0, 5).forEach(image => {
        productImagesContainer.insertAdjacentHTML('beforeend', `
            <div class="product-pics__item p-1 ms-2" onclick='showAllImages(${JSON.stringify(otherImages)})'>
                <div class="product-pics__img-wrapp">
                    <img class="object-fit-contain w-100 d-inline-block" src="./assets/covers/${image.url}" alt="">
                </div>
            </div>
        `)
    })

    if (otherImages.length > 5) {
        productImagesContainer.insertAdjacentHTML('beforeend', `
            <div class="product-pics__item p-1 ms-2 position-relative">
                <div class="product-pics__img-wrapp product-pics__blur">
                    <img class="object-fit-contain w-100 d-inline-block" src="./assets/covers/${product.images[0].url}" alt="">
                </div>
                <div class="d-flex position-absolute extra-img-icon" onclick='showAllImages(${JSON.stringify(otherImages)})'>
                    <i class="fa-solid fa-ellipsis extra-img-color"></i>
                </div>
            </div>
        `)
    }

    // Handle Incredible Offers Logo & Text
    if (product.discount > 50 && product.stock > 100) {
        productIncredibleOffersLogo.classList.remove('hidden')
        productIncredibleOffersTiming.classList.remove('hidden')
    }

    // Handle Product Introduction
    if (product.productIntroduction) {

        productIntroduction.innerHTML = product.productIntroduction.split('').slice(0, 500).join('') + "..."

        productIntroToggleBtn.addEventListener('click', () => {
            if (productIntroduction.classList.contains('collapsed')) {
                productIntroduction.innerHTML = product.productIntroduction
                productIntroduction.classList.remove('collapsed')
                productIntroToggleText.innerHTML = 'بستن'
            } else {
                productIntroduction.innerHTML = product.productIntroduction.split('').slice(0, 500).join('') + "..."
                productIntroduction.classList.add('collapsed')
                productIntroToggleText.innerHTML = 'بیشتر'
            }
        })
    } else {
        productIntroduction.classList.add('hidden')
        productIntroduct.classList.add('hidden')
        productIntroductionTitle.classList.add('hidden')
        productAttributes.classList.remove('bt-8')
    }

    productAttributesContainer.innerHTML = ''
    for (const attribute in product.attributes) {
        productAttributesContainer.insertAdjacentHTML('beforeend', `
            <div class="w-100 flex-grow-1">
                <div class="w-100 d-flex specification-attribute__values-box">
                    <p class="specification-attribute__value ms-3 py-1 py-lg-2 p-lg-2 flex-shrink-0">${attribute}</p>
                    <div class="py-1 py-lg-2 flex-grow-1 border-bottom-1">
                        <p class="specification-attribute__text d-flex align-items-center w-100">${product.attributes[attribute]}</p>
                    </div>
                </div>
            </div>
        `)
    }

    productScoreContainer.insertAdjacentHTML('beforeend', `
        ${Array(product.rating).fill(0).map(score => `
                <div class="star-icon">
                    <img class="object-fit-contain d-inline-block w-100" src="./assets/covers/star-yellow.png" alt="امتیاز">
                </div>
            `).join('')
        }
        ${Array(5 - (product.rating)).fill(0).map(score => `
                <div class="star-icon">
                    <img class="object-fit-contain d-inline-block w-100" src="./assets/covers/star.png" alt="امتیاز">
                </div>
            `).join('')
        }
    `)

    //  Handle BreadCrumn Path
    breadcrumbListContainer.innerHTML = ''
    breadcrumbListContainer.insertAdjacentHTML('beforeend', `
                <li class="breadcrumb__item">
                    <a href="/" class="breadcrumb__link">
                        دیجی‌کالا
                        <span class="mx-2">/</span>
                    </a>
                </li>
                <li class="breadcrumb__item">
                    <a href="#" class="breadcrumb__link">
                        ${product.categoryID.name}
                        <span class="mx-2">/</span>
                    </a>
                </li>
                <li class="breadcrumb__item">
                    <a href="#" class="breadcrumb__link">
                        ${product.submenuID.title}
                        <span class="mx-2">/</span>
                    </a>
                </li>
                <li class="breadcrumb__item">
                    <a href="#" class="breadcrumb__link">
                        ${product.subSubmenu.title}
                        <span class="mx-2">/</span>
                    </a>
                </li>
                <li class="breadcrumb__item">
                    <a href="#" class="breadcrumb__link">
                        ${product.name}
                    </a>
                </li>`
    )

    getAndShowComments()
    getAndShowMiniBuyBoxDetails(product.seller, product)
    getAndShowStickyMiniBuyBox(product)

}

const selectColor = async (event, colorObject, product) => {

    let selectColorElem = document.querySelector('#select-color')

    for (let color in colorObject) {
        selectColorElem.innerHTML = `رنگ: ${color}`

        // Get the color from the clicked element
        selectedColor = colorObject
    }

    // If there was a previously selected color, remove the selected class from it
    if (previouslySelectedColor) {
        previouslySelectedColor.classList.remove('variantInfo-color__selected')
        previouslySelectedCheckIcon.style.display = 'none'; // Hide the check icon
    }

    // Add the selected class to the clicked color and set it as the previously selected color
    event.currentTarget.classList.add('variantInfo-color__selected')
    previouslySelectedColor = event.currentTarget;

    // Show the check icon for the selected color
    let checkIcon = event.currentTarget.querySelector('.fa-check')
    checkIcon.style.display = 'block'

    for (let color in colorObject) {
        if (colorObject[color] === 'rgb(255,255,255)') {
            checkIcon.style.color = 'black'
        } else {
            checkIcon.style.color = 'white'
        }
    }

    previouslySelectedCheckIcon = checkIcon

    //Send the selected color to your server
    fetch('http://localhost:5000/product/selectColor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId: product._id,
            selectedColor: selectedColor,
        }),
    })
        .then(response => response.json())
        .then(data => {
            const selectColorBG = document.querySelector('#select-color__bg')
            const selectColorElem = document.querySelector('#select-color-elem')

            for (let color in colorObject) {
                selectColorBG.style.backgroundColor = colorObject[color]
                selectColorElem.innerHTML = color
            }
        })
        .catch((error) => {
            console.error('Error:', error)
        })
}

const getAndShowStickyMiniBuyBox = async (product) => {

    const miniBuyBoxSticky = document.querySelector('#mini-buy-box__sticky')

    const sellerID = product.seller
    const res = await fetch(`http://localhost:5000/seller/${sellerID}`)
    const seller = await res.json()

    let mainImage = product.images.find(image => image.isMain)
    let isUserLogin = isLogin()

    let mainProduct = null
    let userBasket
    let selectColor, selectColorBG

    if (isUserLogin) {

        const userID = getUserID()

        const response = await fetch(`http://localhost:5000/basket/${userID}`)
        userBasket = await response.json()

        if (userBasket[0].Products.length) {
            mainProduct = userBasket[0].Products.find(p => {
                if (product._id === p.product._id) {
                    let temp = p;
                    return temp;
                }
            })
        } else {
            showEmptyBasket()
        }
    }

    const isUserBuyThisProduct = mainProduct ? mainProduct.isUserBuyThisProduct : false;

    if (product.selectedColors) {
        for (let color in product.selectedColors[0]) {
            selectColor = color
            selectColorBG = product.selectedColors[0][color]
        }
    }

    miniBuyBoxSticky.innerHTML = ''
    miniBuyBoxSticky.insertAdjacentHTML('beforeend', `
        <div class="bg-white mb-2 mt-3 p-3 mini-buy__box">
            <div class="d-flex align-items-center py-2 mx-3 mx-lg-0">
                <div class="d-flex align-items-center justify-content-center ms-2 incredible-offers">
                    <img src="assets/covers/IncredibleOffer.svg" class="w-100 object-fit-contain d-inline-block h-100" alt="">
                </div>
            </div>
            <div class="d-flex pb-3 mb-3 border-bottom-1-e6">
                <div class="flex-shrink-0 mini-buy-box__img">
                    <img src="assets/covers/${mainImage.url}" alt="">
                </div>
                <div class="d-flex flex-column me-4">
                    <p class="mini-buy-box__text">${product.name}</p>
                    <div class="d-flex align-items-center mt-auto">
                        <div class="mini-buy-box__color" style="background: ${selectColorBG}" id="select-color__bg"></div>
                        <p class="me-2" id="select-color-elem">${selectColor}</p>
                    </div>
                </div>
            </div>
            <div class="d-flex mb-2">
                <a href="#" class="d-flex align-items-center">
                    ${seller.name === 'دیجی‌کالا' ?
            `<div class="ms-3" style="width: 25px; height: 25px;">
                            <img class="d-inline-block object-fit-contain" src="assets/covers/footerlogo2.png" alt="">
                        </div>
                        <div class="d-flex flex-column w-100">
                            <div class="d-flex align-items-center">
                                <p class="ms-2 color-600">دیجی‌کالا</p>
                            </div>
                        </div>`
            :
            `<div class="d-flex ms-3">
                            <i class="fa-solid fa-store color-700 buy-box__icon"></i>
                        </div>
                        <div class="d-flex flex-column w-100">
                            <div class="d-flex align-items-center">
                                <p class="ms-2 color-600">${seller.name}</p>
                            </div>
                        </div>`
        }
                </a>
            </div>
            <div class="d-flex mb-2 align-items-center">
                <div class="ms-3">
                    <div class="d-flex">
                        <i class="fa-solid fa-shield-halved buy-box__icon"></i>
                    </div>
                </div>
                <div class="d-flex w-100">
                    <p class="color-600">${product.guarantee}</p>
                </div>
            </div>
            <div class="d-flex mb-2 align-items-center">
                <div class="d-flex w-100">
                    <div class="d-flex flex-column w-100 position-relative">
                        <span class="d-flex align-items-center mb-1">
                            <div class="d-flex ms-3">
                                <i class="fa-regular fa-floppy-disk buy-box__icon"
                                    style="color: #19bfd3;"></i>
                            </div>
                            <span class="color-600">
                            ${seller.digikalaAvailibility ? 'موجود در انبار دیجی‌کالا' : seller.sellerAvailibility ? 'موجود در انبار فروشنده' : 'موجود در انبار فروشنده و دیجی‌کالا'}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="position-relative w-100">
            <div class="w-100">
                <div>
                    <div class="d-flex align-items-end py-3">
                        <div class="me-2 mt-1 pb-2 pointer" id="price__tooltip">
                            <div class="d-flex">
                                <i class="fa fa-circle-exclamation variantInfo-error-icon"></i>
                            </div>
                        </div>
                        <div class="d-flex justify-content-start flex-column align-items-end me-auto">
                            ${product.discount === 0 ?
            `<div class="d-flex flex-row align-items-center">
                                    <span class="ms-1 product-price">${product.price.toLocaleString('fa-IR')}</span>
                                    <div class="d-flex me-1">
                                        <span class="text-body-3 color-700">تومان</span>
                                    </div>
                                </div>`
            :
            `<div class="d-flex align-items-center justify-content-end w-100">
                                    <span class="product-prev-price me-1">${(product.price).toLocaleString('fa-IR')}</span>
                                    <div class="px-1 text-white d-flex align-items-center justify-content-center flex-shrink-0 me-lg-1 me-0 product-price__discount-wrapp">
                                        <span class="product-price__discount-text px-1">${(product.discount).toLocaleString('fa-IR')}%</span>
                                    </div>
                                </div>
                                <div class="d-flex flex-row align-items-center">
                                    <span class="ms-1 product-price">${(product.price - ((product.price * product.discount) / 100)).toLocaleString('fa-IR')}</span>
                                    <div class="d-flex me-1">
                                        <span class="text-body-3 color-700">تومان</span>
                                    </div>
                                </div>`
        }
                        </div>
                    </div>
                    ${isUserBuyThisProduct ?
            `<div class="d-flex align-items-center">
                            <div class="d-flex align-items-center justify-content-between px-2 item-quantity__container">
                                <div class="d-flex pointer" onclick='addProductToUserBasket(${JSON.stringify(product)})'>
                                    <i class="item-quantity__icon fa fa-plus"></i>
                                </div>
                                <span class="d-flex flex-column align-items-center justify-content-between">
                                    <span class="position-relative d-flex align-items-center justify-content-center item-quantity__box-count">
                                        ${mainProduct ? new Intl.NumberFormat('fa-IR').format(mainProduct.quantity) : '۱'}
                                    </span>
                                </span>
                                <div class="d-flex align-items-center pointer">
                                    ${mainProduct ?
                (mainProduct.quantity === 1 ?
                    `<i class="item-quantity__icon fa fa-trash" onclick='deleteProductFromBasket(${JSON.stringify(product._id)})'></i>`
                    :
                    `<i class="item-quantity__icon fa fa-minus" onclick='decreaseProductQuantity(${JSON.stringify(product._id)})'></i>`)
                :
                `<div class="d-flex align-items-center" onclick='addProductToUserBasket(${JSON.stringify(product)})'>
                                            <button class="buy-box__btn-wrapp position-relative d-flex align-items-center d-flex-lg w-100">
                                                <div class="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                                                    افزودن به سبد</div>
                                            </button>
                                        </div>`
            }     
                                </div>
                            </div>
                            <div class="me-2 me-lg-3">
                                <p class="item-quantity__text-1">در سبد شما</p>
                                <div class="item-quantity__chekout-link d-flex align-items-center">مشاهده
                                    <a href="checkout/cart.html">
                                        <p class="item-quantity__text-2 me-1">سبد خرید</p>
                                    </a>
                                </div>
                            </div>
                        </div>`
            :
            `<div class="d-flex align-items-center" onclick='addProductToUserBasket(${JSON.stringify(product)})'>
                            <button class="buy-box__btn-wrapp position-relative d-flex align-items-center d-flex-lg w-100">
                                <div class="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                                    افزودن به سبد</div>
                            </button>
                        </div>`
        }
                </div>
            </div>
        </div>
        </div>
    `)
}

const recordProductView = async (userID, productShortName) => {
    try {
        const res = await fetch(`http://localhost:5000/product/product-view`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userID, productShortName })
        })

        if (!res.ok) {
            const error = await res.text()
        }
    } catch (error) {
        console.error('Fetch error:', error)
    }
}

const getAndShowSimilarProducts = async (productID) => {

    const res = await fetch(`http://localhost:5000/product/${productID}/similar`)
    const similarProducts = await res.json()

    if (similarProducts.length) {
        similarProductsContainer.innerHTML = ''
        similarProducts.forEach(similarProduct => {
            similarProductsContainer.insertAdjacentHTML('beforeend', `
            <div class="swiper-slide">
                <a href="product.html?name=${similarProduct.shortName}&page=1" class="d-block position-relative bg-white overflow-hidden flex-grow-1 py-4 px-3 px-lg-2">
                    <div class="overflow-hidden d-flex flex-column align-items-stretch justify-content-start h-full">
                        <div class="d-flex grow-1 position-relative flex-column">
                            <div>
                                <div class="d-flex align-items-stretch flex-column position-relative mb-1">
                                    <div class="d-flex align-items-start mx-auto">
                                        <div>
                                            <div class="d-flex align-items-center justify-content-start flex-wrap position-absolute top-0 right-0">
                                                <br><br>
                                            </div>
                                            <div class="related-product__img">
                                                <img src="assets/covers/${similarProduct.images.find(image => image.isMain).url}" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1 d-flex flex-column align-items-stretch justify-content-start">
                                <div>
                                    <h3 class="color-700 product-card__title">${similarProduct.name}</h3>
                                </div>
                                <div class="mb-1 d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center">
                                        <p class="product-card__stock-text">
                                            تنها ${similarProduct.stock.toLocaleString('fa-IR')} عدد در انبار باقی مانده
                                        </p>
                                        <br>
                                    </div>
                                </div>
                                <div class="d-flex flex-column align-items-stretch justify-content-start">
                                    <div class="pt-1 d-flex flex-column align-items-stretch justify-content-between">
                                        <div class="d-flex align-items-center justify-content-between">
                                            ${similarProduct.discount === 0 ?
                    ``
                    :
                    `<div class="px-1 text-white d-flex align-items-center justify-content-center flex-shrink-0 me-lg-1 me-0 product-price__discount-wrapp">
                                                    <span class="product-price__discount-text px-1">${similarProduct.discount.toLocaleString('fa-IR')}٪</span>
                                                </div>`
                }
                                            <div class="d-flex justify-content-end align-items-center">
                                                <span class="ms-1 product-price">${(similarProduct.price - ((similarProduct.price * similarProduct.discount) / 100)).toLocaleString('fa-IR')}</span>
                                                <div class="d-flex me-1">
                                                    <span class="text-body-3 color-700">تومان</span>
                                                </div>
                                            </div>
                                        </div>
                                        ${similarProduct.discount === 0 ?
                    ``
                    :
                    `<div class="d-flex justify-content-end align-items-center ps-3">
                                                <div class="product-prev-price me-1">${similarProduct.price.toLocaleString('fa-IR')}</div>
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
        similarProductsContainer.innerHTML = ''
        similarProductsContainer.insertAdjacentHTML('beforeend', `
            <div class="swiper-slide">
                <div class="p-3 color-700 text-body2-strong">متاسفانه کالایی یافت نشد</div>
            </div>`
        )
    }
}

const showAllImages = (images) => {

    const imageProductModalWrapper = document.querySelector('#image-product__modal-wrapper')
    const imagesProductSliderModalContainer = document.querySelector('#images-product__slider-container')
    const swiperButtonPrev9 = document.querySelector('.swiper-button-prev9')
    const swiperButtonNext9 = document.querySelector('.swiper-button-next9')
    otherImagesModal.classList.remove('hidden')

    imageProductModalWrapper.innerHTML = ''
    imagesProductSliderModalContainer.innerHTML = ''

    images.forEach((image, index) => {

        imageProductModalWrapper.insertAdjacentHTML('beforeend', `
            <div id="slider-image-${index}" class="images-product__modal-image overflow-hidden bg-white ms-2 mb-lg-3 d-flex align-items-center">
                <img class="w-100 bg-white d-block object-fit-cover" src="./assets/covers/${image.url}" alt="">
            </div>
        `)

        imagesProductSliderModalContainer.insertAdjacentHTML('beforeend', `
            <div class="swiper-slide">
                <img id="slider-image-${index}" class="img-fluid w-100 bg-white d-inline-block object-fit-contain" style="height: 550px;" src="./assets/covers/${image.url}" alt="">
            </div>
        `)
    })

    const imagesArray = document.querySelectorAll('.images-product__modal-image')

    // Clicking On Images Modal And Change Image In Swiper
    imagesArray.forEach(image => {
        image.addEventListener('click', event => {
            removeAllImagesBorder(imagesArray)
            event.target.parentElement.style.border = '2px solid #19bfd3'
            if (event.target.tagName === 'IMG') {
                const index = Array.from(imageProductModalWrapper.children).indexOf(event.target.parentElement)
                const swiper = document.querySelector('.swiper9').swiper
                swiper.slideTo(index)
            }
        })
    })

    swiperButtonPrev9.addEventListener('click', () => {
        showImgBorder()
    })

    swiperButtonNext9.addEventListener('click', () => {
        showImgBorder()
    })

    const showImgBorder = () => {
        const modalImages = document.querySelectorAll('.images-product__modal-image')
        let currentImage = document.querySelector('.swiper-slide-active img')
        let mainImage

        removeAllImagesBorder(modalImages)
        let currentImageID = currentImage.getAttribute('id')

        Array.from(modalImages).forEach(image => {
            if (image.getAttribute('id') == currentImageID) {
                mainImage = image
            }
        })
        mainImage.style.border = '2px solid #19bfd3'
    }

    const removeAllImagesBorder = (elems) => {
        elems.forEach(elem => elem.style.border = 'none')
    }
}

const getAndShowComments = async () => {

    const productShortName = getUrlParam('name')
    const userID = getUserID()
    let currentPage = getUrlParam('page')
    let commentsArray = []
    let commentQuestions = []

    const commentsFilteringSelections = document.querySelectorAll('.comment-sorting')

    const res = await fetch(`http://localhost:5000/product/name/${productShortName}`)
    const product = await res.json()

    product.comments.forEach(comment => {

        if (!comment.isQuestion && !comment.isAnswer) {
            commentsArray.push(comment)
        } else {
            commentQuestions.push(comment)
        }
    })

    productQuestionsContainer.innerHTML = ''
    commentQuestions.forEach(question => {
        productQuestionsContainer.insertAdjacentHTML('beforeend', `
            <article class="bb py-3 question-item-box">
                <div class="d-flex align-items-center">
                    <div class="d-flex ms-3">
                        <i class="fa-regular fa-circle-question submit-answer__question-icon"></i>
                    </div>
                    <p class="text-body-2 w-100">
                        ${question.body}
                    </p>
                </div>
                ${question.answerContent ?
                `<div>
                            <div class="d-flex align-items-center mt-2">
                                <p class="ms-4 comment-question__submit-text">پاسخ</p>
                                <div class="flex-grow-1">
                                    <p class="answer-text">${question.answerContent.body}</p>
                                </div>
                            </div>
                            <div class="d-flex flex-column align-items-start justify-content-center me-5">
                                <p class="comment__question__rating-text">${question.answerContent.creator.name}</p>
                                <div class="comment-rate__badge d-inline-flex align-items-center px-2">
                                    <p class="comment-rate__badge-text d-inline-block comment__question__rating-text" style="color: #2e7b32">
                                        ${question.answerContent.creator.role === 'USER' ? 'خریدار' : 'فروشنده'}
                                    </p>
                                </div>
                                <div class="d-flex align-items-center justify-content-lg-end pt-3 me-auto">
                                    <p class="usefull__text ms-lg-4">آیا این پاسخ مفید بود؟</p>
                                    <div class="me-auto me-lg-0 d-flex align-items-center">
                                    ${question.likesUser.includes(userID) ? `
                                        <button class="comment-like__button d-flex align-items-center position-relative" onclick="likeComment('${question._id}')">
                                            <div class="d-flex align-items-center justify-content-center flex-grow-1">
                                                <p style="color: #4caf50">${new Intl.NumberFormat('fa-IR').format(question.likesUser.length)}</p>
                                                <div class="d-flex ms-2 variantInfo-like-icon">
                                                    <i class="me-1 fa-regular fa-thumbs-up" style="width: 18px;"></i>
                                                </div>
                                            </div>
                                        </button>
                                    ` : `
                                        <button class="comment-like__button d-flex align-items-center position-relative" onclick="likeComment('${question._id}')">
                                            <div class="d-flex align-items-center justify-content-center flex-grow-1">
                                                <p>${new Intl.NumberFormat('fa-IR').format(question.likesUser.length)}</p>
                                                <div class="d-flex ms-2">
                                                    <i class="me-1 fa-regular fa-thumbs-up variantInfo-error-icon"></i>
                                                </div>
                                            </div>
                                        </button>
                                    `
                }

                                    ${question.unlikesUser.includes(userID) ? `
                                        <button class="comment-like__button rating__color-unlike d-flex align-items-center position-relative" onclick="unlikeComment('${question._id}')">
                                            <div class="d-flex align-items-center justify-content-center flex-grow-1">
                                                <p style="color: #b2001a">${new Intl.NumberFormat('fa-IR').format(question.unlikesUser.length)}</p>
                                                <div class="d-flex ms-2 variantInfo-unlike-icon">
                                                    <i class="me-1 fa-regular fa-thumbs-down"></i>
                                                </div>
                                            </div>
                                        </button>
                                    ` : `
                                        <button class="comment-like__button d-flex align-items-center position-relative" onclick="unlikeComment('${question._id}')">
                                            <div class="d-flex align-items-center justify-content-center flex-grow-1">
                                                <p>${new Intl.NumberFormat('fa-IR').format(question.unlikesUser.length)}</p>
                                                <div class="d-flex ms-2">
                                                    <i class="me-1 fa-regular fa-thumbs-down variantInfo-error-icon"></i>
                                                </div>
                                            </div>
                                        </button>
                                    `
                }
                                    </div>
                                </div>
                                <div class="w-100 border-top-1 mt-2">
                                    <button class="w-100 d-flex align-items-center me-2 ms-auto mt-2 submit-answer__button">
                                        <div class="d-flex align-items-center justify-content-start flex-grow-1">
                                            ثبت پاسخ جدید
                                            <div class="submit-answer__left-icon d-flex align-items-center justify-content-center me-2">
                                                <i class="fa fa-chevron-left w-100"></i>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>`
                :
                `<div class="me-5 border-top-1 mt-3">
                            <button class="d-flex align-items-center mt-3 submit-answer__button">
                                ثبت پاسخ
                                <div class="submit-answer__left-icon d-flex align-items-center me-2">
                                    <i class="fa fa-chevron-left w-100"></i>
                                </div>
                            </button>
                        </div>`
            }
            </article>
    `)
    })

    product.comments.forEach(comment => {
        if (comment.isQuestion === '0.1') {
            commentQuestions.push(comment)
        }
    })

    if (!commentQuestions.length) {
        productQuestionsContainer.innerHTML = ''
        productQuestionsContainer.insertAdjacentHTML('beforeend', `
        <div class="d-flex justify-content-start align-items-start mt-3">
            <div class="w-100 me-10">
                <p class="text-neutral-900 text-subtitle-strong">درباره این کالا چه پرسشی دارید؟</p>
                <div class="my-2"><div>
                <label class="text-body-2 w-100 d-inline-block">
                    <div class="question_textarea__container px-2 bg-neutral-100 lg:bg-neutral-000">
                        <div class="grow text-body-3">
                            <textarea maxlength="100" class="py-2 px-3 text-subtitle w-100 question_textarea" onKeydown="getValueFromTextarea(event)"></textarea>
                        </div>
                    </div>
                </label>
                <div class="question__modal-text text-neutral-400 text-body-2 me-3">
                    <span id="question-max-length">100</span>/<span id="question-length">0</span>
                </div>
            </div>
            <div>
                <div class="d-flex justify-content-between align-items-center">
                    <p class="text-center text-caption">ثبت پاسخ به معنی موافقت با
                        <a class="mx-1 text-secondary-500" target="_blank" href="/page/comments-rules/">قوانین انتشار دیجی‌کالا</a>است.</p>
                    <button class="d-flex align-items-center text-caption submit-quesstion__btn px-3" onclick="addFirstQuestion()">
                        <div class="d-flex align-items-center justify-content-center">ثبت پرسش</div>
                    </button>
                </div>
            </div>
        </div>
        `)
    }

    productComment.addEventListener('click', () => {
        if (productCommentsContainer) {
            productCommentsContainer.scrollIntoView({ behavior: 'smooth' })
        }
    })

    productQustion.addEventListener('click', () => {
        if (productQuestionsContainer) {
            productQuestionsContainer.scrollIntoView({ behavior: 'smooth' })
        }
    })

    // Handle Pagination Comments
    const shownComments = paginateItems(commentsArray, 4, commentPaginationContainer, currentPage)
    insertCommentsBoxHtmlTemplate(shownComments)

    // Show Comments By User Filtering Method
    commentsFilteringSelections.forEach(commentsFilteringSelection => {
        commentsFilteringSelection.addEventListener('click', event => {
            commentsFilteringSelections.forEach(SelectionElem =>
                SelectionElem.classList.remove('header-sort__text-active')
            )

            event.target.classList.add('header-sort__text-active')

            let userFilteringSelection = event.target.dataset.key
            let sortCommentsArray = commentsSorting([...shownComments], userFilteringSelection)
            insertCommentsBoxHtmlTemplate(sortCommentsArray)
        })
    })


    // Handle Click On Tabs 
    listItems.forEach(item => {
        item.addEventListener('click', () => {

            isScrollingDueToClick = true

            listItems.forEach(li => {
                li.classList.remove('tab-active')
                let bb = li.querySelector('.tab-title-bb')
                bb.classList.remove('info-section__tab__border-bottom')
            })

            item.classList.add('tab-active')
            let bb = item.querySelector('.tab-title-bb')
            bb.classList.add('info-section__tab__border-bottom')

            let id = item.id
            let sectionID = id.replace('-title', '')
            console.log(sectionID);

            let section = document.getElementById(sectionID)
            section.scrollIntoView({ behavior: "smooth" })

            setTimeout(() => {
                isScrollingDueToClick = false;
            }, 1000)
        })
    })

    productQustion.innerHTML = `${commentQuestions.length.toLocaleString('fa-IR')} پرسش`
    productComment.innerHTML = `${commentsArray.length.toLocaleString('fa-IR')} دیدگاه`

    productAllCommentsCount.innerHTML = `${commentsArray.length.toLocaleString('fa-IR')} دیدگاه`
}

const insertCommentsBoxHtmlTemplate = (shownComments) => {

    const userID = getUserID()

    if (shownComments.length > 4) {
        productCommentsContainer.innerHTML = ''
        shownComments.forEach(comment => {
            productCommentsContainer.insertAdjacentHTML('beforeend', `
                       <article class="bb py-3 mt-lg-0 d-flex align-items-stretch">
                       ${comment.score > 3 ?
                    `<div class="ms-2 mt-1 comment-rate">
                                <div class="p-1 d-flex justify-content-center align-items-center px-2 comment-rate__main">${new Intl.NumberFormat('fa-IR').format(comment.score)}.${new Intl.NumberFormat('fa-IR').format(0)}</div>
                            /</div>`
                    :
                    `
                            <div class="ms-2 mt-1">
                               <div class="p-1 d-flex justify-content-center align-items-center px-2 comment-hint__main">${new Intl.NumberFormat('fa-IR').format(comment.score)}.${new Intl.NumberFormat('fa-IR').format(0)}</div>
                           </div>`
                }
                           <div class="w-100 d-flex align-items-center justify-content-between">
                               <div class="w-100">
                               ${comment.title ? `<p class="comment-rate__text pb-3">${comment.title}</p>` : `<p class="comment-rate__text hidden pb-3"></p>`}
                                   <div class="d-flex align-items-start w-100 mt-1">
                                       <div class="flex-grow-1">
                                           <div>
                                               <div class="d-flex align-items-center pb-3 border-bottom-1">
                                                   <p class="d-inline comment__question__rating-text">${moment(comment.createdAt).locale('fa-IR').format('D jMMMM YYYY')}</p>
                                                   <div class="m-2 d-flex">
                                                       <i class="comment-rate__icon fa-solid fa-circle fa-2xs"></i>
                                                   </div>
                                                   <p class="d-inline comment__question__rating-text">
                                                       ${!comment.hideName ? comment.creator.name : 'کاربر دیجی‌کالا'}
                                                   </p>
                                                   <div class="comment-rate__badge d-inline-flex align-items-center me-2 px-2">
                                                       <p class="comment-rate__badge-text d-inline-block comment__question__rating-text">
                                                           ${comment.creator.role === 'USER' ? 'خریدار' : 'فروشنده'}
                                                       </p>
                                                   </div>
                                               </div>
                                               <div class="d-flex align-items-center">
                                                   <div class="d-flex align-items-center pt-2">
                                                       <div class="d-flex ms-2">
                                                           ${comment.score > 2 ?
                    '<i class="rating__color fa-regular fa-thumbs-up" style="width: 14px;"></i>'
                    :
                    '<i class="rating__color-unlike fa-regular fa-thumbs-down" style="width: 14px;"></i>'
                }
                                                       </div>
                                                       ${comment.score > 2 ?
                    '<p class="rating__text">پیشنهاد می‌کنم</p>'
                    :
                    '<p class="rating__text-unlike">پیشنهاد نمی‌کنم</p>'
                }
                                                   </div>
                                               </div>
                                           </div>
                                           <p class="mb-1 pt-2 text-body-2">
                                               ${comment.body}
                                           </p>
                                           ${comment.positivePoints ?
                    `${comment.positivePoints.map(posPoint => (
                        `<div class="d-flex align-items-center pt-2px">
                                                           <div class="d-flex ms-2">
                                                               <i class="rating__color fa fa-plus" style="width: 14px;"></i>
                                                           </div>
                                                           <p class="comment-rate__comment-text">${posPoint}</p>
                                                       </div>`
                    )).join('')
                    }` : ''
                }
                                           ${comment.negativePoints ?
                    `${comment.negativePoints.map(negPoint => (
                        `<div class="d-flex align-items-center pt-2px">
                                                           <div class="d-flex ms-2">
                                                               <i class="rating__text-unlike fa fa-minus" style="width: 14px;"></i>
                                                           </div>
                                                           <p class="comment-rate__comment-text">${negPoint}</p>
                                                       </div>`
                    )).join('')
                    }` : ''
                }
                                           <div class="d-flex align-items-center pt-3 border-top-1 mt-2">
                                               <div class="d-flex align-items-center">
                                                   <div class="comment-rate__store-icon d-flex ms-2">
                                                       <i class="w-100 h-100 fa-solid fa-shop"></i>
                                                   </div>
                                                   <p class="comment-rate__comment-text">دیجی‌کالا</p>
                                               </div>
                                               ${comment.colors ?
                    `<div class="mx-3 my-2 d-flex">
                                                           <i class="comment-rate__icon fa-solid fa-circle fa-2xs"></i>
                                                       </div>
                                                       <div class="d-flex align-items-center mt-auto">
                                                           <div class="mini-buy-box__color" style="background-color: rgb(0, 255, 240)"></div>
                                                           <p class="comment-rate__comment-text me-2">${comment.colors}</p>
                                                       </div>` : ''
                }
                                           </div>
                                           <div class="d-flex align-items-center justify-content-lg-end">
                                               <p class="usefull__text ms-lg-4">آیا این دیدگاه مفید بود؟</p>
                                               <div class="me-auto me-lg-0 d-flex align-items-center">
                                               ${userID && comment.likesUser.includes(userID) ? `
                                               <button class="comment-like__button d-flex align-items-center position-relative" onclick="likeComment('${comment._id}')">
                                                  <div class="d-flex align-items-center justify-content-center flex-grow-1">
                                                      <p style="color: #4caf50">${new Intl.NumberFormat('fa-IR').format(comment.likesUser.length)}</p>
                                                      <div class="d-flex ms-2 variantInfo-like-icon">
                                                          <i class="me-1 fa-regular fa-thumbs-up" style="width: 18px;"></i>
                                                      </div>
                                                  </div>
                                              </button>
                                               ` : `
                                               <button class="comment-like__button d-flex align-items-center position-relative" onclick="likeComment('${comment._id}')">
                                                  <div class="d-flex align-items-center justify-content-center flex-grow-1">
                                                      <p>${new Intl.NumberFormat('fa-IR').format(comment.likesUser.length)}</p>
                                                      <div class="d-flex ms-2">
                                                          <i class="me-1 fa-regular fa-thumbs-up" style="width: 18px;"></i>
                                                      </div>
                                                  </div>
                                              </button>
                                               `
                }
                                              ${userID && comment.unlikesUser.includes(userID) ? `
                                               <button class="comment-like__button rating__color-unlike d-flex align-items-center position-relative" onclick="unlikeComment('${comment._id}')">
                                                  <div class="d-flex align-items-center justify-content-center flex-grow-1">
                                                       <p style="color: #b2001a">${new Intl.NumberFormat('fa-IR').format(comment.unlikesUser.length)}</p>
                                                      <div class="d-flex ms-2 variantInfo-unlike-icon">
                                                          <i class="me-1 fa-regular fa-thumbs-down"></i>
                                                      </div>
                                                  </div>
                                              </button>
                                               ` : `
                                               <button class="comment-like__button d-flex align-items-center position-relative" onclick="unlikeComment('${comment._id}')">
                                                  <div class="d-flex align-items-center justify-content-center flex-grow-1">
                                                       <p>${new Intl.NumberFormat('fa-IR').format(comment.unlikesUser.length)}</p>
                                                      <div class="d-flex ms-2">
                                                          <i class="me-1 fa-regular fa-thumbs-down"></i>
                                                      </div>
                                                  </div>
                                              </button>
                                               `
                }
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </article>
                   `)
        })
    } else {
        productCommentsContainer.innerHTML = ''
        if (shownComments.length) {
            shownComments.forEach(comment => {
                productCommentsContainer.insertAdjacentHTML('beforeend', `
                <article class="bb py-3 mt-lg-0 d-flex align-items-stretch">
                ${comment.score > 3 ?
                        `<div class="ms-2 mt-1 comment-rate">
                        <div class="p-1 d-flex justify-content-center align-items-center px-2 comment-rate__main">${new Intl.NumberFormat('fa-IR').format(comment.score)}.${new Intl.NumberFormat('fa-IR').format(0)}</div>
                    </div>`
                        :
                        `
                    <div class="ms-2 mt-1">
                       <div class="p-1 d-flex justify-content-center align-items-center px-2 comment-hint__main">${new Intl.NumberFormat('fa-IR').format(comment.score)}.${new Intl.NumberFormat('fa-IR').format(0)}</div>
                   </div>`
                    }
                    <div class="w-100 d-flex align-items-center justify-content-between">
                        <div class="w-100">
                        ${comment.title ? `<p class="comment-rate__text pb-3">${comment.title}</p>` : `<p class="comment-rate__text hidden pb-3"></p>`}
                            <div class="d-flex align-items-start w-100 mt-1">
                                <div class="flex-grow-1">
                                    <div>
                                        <div class="d-flex align-items-center pb-3 border-bottom-1">
                                            <p class="d-inline comment__question__rating-text">${moment(comment.createdAt).locale('fa-IR').format('jD jMMMM jYYYY')}</p>
                                            <div class="m-2 d-flex">
                                                <i class="comment-rate__icon fa-solid fa-circle fa-2xs"></i>
                                            </div>
                                            <p class="d-inline comment__question__rating-text">
                                                ${!comment.hideName ? comment.creator.name : 'کاربر دیجی‌کالا'}
                                            </p>
                                            <div class="comment-rate__badge d-inline-flex align-items-center me-2 px-2">
                                                <p class="comment-rate__badge-text d-inline-block comment__question__rating-text">
                                                    ${comment.creator.role === 'USER' ? 'خریدار' : 'فروشنده'}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <div class="d-flex align-items-center pt-2">
                                                <div class="d-flex ms-2">
                                                    ${comment.score > 2 ?
                        '<i class="rating__color fa-regular fa-thumbs-up" style="width: 14px;" style="color: #a1a3a8"></i>'
                        :
                        '<i class="rating__color-unlike fa-regular fa-thumbs-down" style="width: 14px;" style="color: #a1a3a8"></i>'
                    }
                                                </div>
                                                    ${comment.score > 2 ?
                        '<p class="rating__text">پیشنهاد می‌کنم</p>'
                        :
                        '<p class="rating__text-unlike">پیشنهاد نمی‌کنم</p>'
                    }
                                            </div>
                                        </div>
                                    </div>
                                    <p class="mb-1 pt-2 text-body-2">
                                        ${comment.body}
                                    </p>
                                    ${comment.positivePoints ?
                        `${comment.positivePoints.map(posPoint => (
                            `<div class="d-flex align-items-center pt-2px">
                                                    <div class="d-flex ms-2">
                                                        <i class="rating__color fa fa-plus" style="width: 14px;"></i>
                                                    </div>
                                                    <p class="comment-rate__comment-text">${posPoint}</p>
                                                </div>`
                        )).join('')
                        }` : ''
                    }
                                    ${comment.negativePoints ?
                        `${comment.negativePoints.map(negPoint => (
                            `<div class="d-flex align-items-center pt-2px">
                                                    <div class="d-flex ms-2">
                                                        <i class="rating__text-unlike fa fa-minus" style="width: 14px;"></i>
                                                    </div>
                                                    <p class="comment-rate__comment-text">${negPoint}</p>
                                                </div>`
                        )).join('')
                        }` : ''
                    }
                                    <div class="d-flex align-items-center pt-3 border-top-1 mt-2">
                                        <div class="d-flex align-items-center">
                                            <div class="comment-rate__store-icon d-flex ms-2">
                                                <i class="w-100 h-100 fa-solid fa-shop"></i>
                                            </div>
                                            <p class="comment-rate__comment-text">دیجی‌کالا</p>
                                        </div>
                                        ${comment.colors ?
                        `<div class="mx-3 my-2 d-flex">
                                                    <i class="comment-rate__icon fa-solid fa-circle fa-2xs"></i>
                                                </div>
                                                <div class="d-flex align-items-center mt-auto">
                                                    <div class="mini-buy-box__color" style="background-color: rgb(0, 255, 240)"></div>
                                                    <p class="comment-rate__comment-text me-2">${comment.colors}</p>
                                                </div>` : ''
                    }
                                    </div>
                                    <div class="d-flex align-items-center justify-content-lg-end">
                                        <p class="usefull__text ms-lg-4">آیا این دیدگاه مفید بود؟</p>
                                        <div class="me-auto me-lg-0 d-flex align-items-center">
                                        ${userID && comment.likesUser.includes(userID) ? `
                                                   <button class="comment-like__button d-flex align-items-center position-relative" onclick="likeComment('${comment._id}')">
                                                      <div class="d-flex align-items-center justify-content-center flex-grow-1">
                                                          <p style="color: #4caf50">${new Intl.NumberFormat('fa-IR').format(comment.likesUser.length)}</p>
                                                          <div class="d-flex ms-2 variantInfo-like-icon">
                                                              <i class="me-1 fa-regular fa-thumbs-up" style="width: 18px;"></i>
                                                          </div>
                                                      </div>
                                                  </button>
                                                   ` : `
                                                   <button class="comment-like__button d-flex align-items-center position-relative" onclick="likeComment('${comment._id}')">
                                                      <div class="d-flex align-items-center justify-content-center flex-grow-1">
                                                          <p>${new Intl.NumberFormat('fa-IR').format(comment.likesUser.length)}</p>
                                                          <div class="d-flex ms-2">
                                                              <i class="me-1 fa-regular fa-thumbs-up" style="width: 18px;"></i>
                                                          </div>
                                                      </div>
                                                  </button>
                                                   `
                    }
                                                  ${userID && comment.unlikesUser.includes(userID) ? `
                                                   <button class="comment-like__button rating__color-unlike d-flex align-items-center position-relative" onclick="unlikeComment('${comment._id}')">
                                                      <div class="d-flex align-items-center justify-content-center flex-grow-1">
                                                           <p style="color: #b2001a">${new Intl.NumberFormat('fa-IR').format(comment.unlikesUser.length)}</p>
                                                          <div class="d-flex ms-2 variantInfo-unlike-icon">
                                                              <i class="me-1 fa-regular fa-thumbs-down"></i>
                                                          </div>
                                                      </div>
                                                  </button>
                                                   ` : `
                                                   <button class="comment-like__button d-flex align-items-center position-relative" onclick="unlikeComment('${comment._id}')">
                                                      <div class="d-flex align-items-center justify-content-center flex-grow-1">
                                                           <p>${new Intl.NumberFormat('fa-IR').format(comment.unlikesUser.length)}</p>
                                                          <div class="d-flex ms-2">
                                                              <i class="me-1 fa-regular fa-thumbs-down"></i>
                                                          </div>
                                                      </div>
                                                  </button>
                                                   `
                    }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
                `)
            })
        } else {
            productCommentsContainer.insertAdjacentHTML('beforeend', `
            <div class="d-flex justify-content-start align-items-start mt-3">
                <div class="w-100 me-10">
                    <p class="text-neutral-900 text-subtitle-strong">درباره این کالا چه دیدگاهی دارید؟</p>
                    <div class="my-2"><div>
                </div>
                <div>
                    <div class="d-flex justify-content-between align-items-center" onclick="showCommentModal()">
                        <button class="d-flex align-items-center text-caption submit-quesstion__btn px-3">
                            <div class="d-flex align-items-center justify-content-center">ثبت دیدگاه</div>
                        </button>
                    </div>
                </div>
            </div>
            `)
        }
    }

}

const likeComment = (commentID) => {

    const userID = getUserID()

    if (userID) {
        getProductIdByShortName().then(product => {
            fetch(`http://localhost:5000/comments/like/${commentID}`, {
                method: 'PUT',
                body: JSON.stringify({ userId: userID, productId: product._id }),
                headers: {
                    'Content-Type': 'Application/json'
                }
            })
                .then(res => {
                    getAndShowComments()
                })
        })
    } else {
        location.href = './././users/login.html'
    }
}

const unlikeComment = (commentID) => {

    const userID = getUserID()

    if (userID) {
        getProductIdByShortName().then(product => {
            fetch(`http://localhost:5000/comments/unlike/${commentID}`, {
                method: 'PUT',
                body: JSON.stringify({ userId: userID, productId: product._id }),
                headers: {
                    'Content-Type': 'Application/json'
                }
            })
                .then(res => {
                    getAndShowComments()
                })
        })
    } else {
        location.href = './././users/login.html'
    }
}

const getAndShowMiniBuyBoxDetails = async (productSellersID, product) => {

    const sellerDetailsContainer = document.getElementById('seller-details-container')
    const buyProductContainerResponsive = document.querySelector('#buy-product__container-responsive')

    const sellerID = productSellersID
    const userID = getUserID()

    const res = await fetch(`http://localhost:5000/seller/${sellerID}`)
    const seller = await res.json()

    let mainProduct = null
    let userBasket

    if (userID) {

        const response = await fetch(`http://localhost:5000/basket/${userID}`)
        userBasket = await response.json()

        if (userBasket[0].Products.length) {
            mainProduct = userBasket[0].Products.find(p => {
                if (product._id === p.product._id) {
                    let temp = p;
                    return temp;
                }
            })
        } else {
            showEmptyBasket()
        }
    }

    const { years, months } = getYearAndMonthDifference(new Date(), new Date(seller.createdAt.slice(0, 10)))

    const isUserBuyThisProduct = mainProduct ? mainProduct.isUserBuyThisProduct : false;

    sellerDetailsContainer.innerHTML = ''
    sellerDetailsContainer.insertAdjacentHTML('beforeend', `
        <div class="p-3 w-100 d-flex align-items-center justify-content-between">
            <h3 class="flex-grow-1 buy-box__title">فروشنده</h3>
        </div>
        <!-- Popper -->
        <div class="popper">
            <div class="bg-white overflow-y-auto border-radius-8">
                <div class="py-2 px-3 bg-white">
                    <div class="d-flex justify-content-between align-items-center w-100 seller-info-details__title">فروشگاه ${seller.name}</div>
                    <p class="seller-info-details__subtitle">عضو از
                        ${years.toLocaleString('fa-IR')}سال و
                        ${months.toLocaleString('fa-IR')}ماه پیش
                    <div class="align-center my-4 text-center">
                        <p class="seller-info-details__percent">${seller.clientSatisfaction.toLocaleString('fa-IR')}%</p>
                        <p class="seller-info-details__title-middle">رضایت خریداران از کیفیت کالاها</p>
                        <p class="seller-info-details__subtitle">${seller.usersScore.length} نفر امتیاز داده‌اند</p>
                    </div>
                    <div class="seller-info-details__successBar-wrapp w-100 d-flex align-items-center justify-content-center mt-3">
                        <div class="bg-rating-4-5 seller-info-details__successBar color__green-bg" style="width: 52%;"></div>
                        <div class="bg-rating-3-4 seller-info-details__successBar color__light-green-bg" style="width: 32%;"></div>
                        <div class="bg-rating-2-3 seller-info-details__successBar color__dark-green-bg" style="width: 8%;"></div>
                        <div class="bg-rating-0-2 seller-info-details__successBar color__yellow-bg" style="width: 4%;"></div>
                        <div class="bg-hint-caution seller-info-details__successBar color__orange-bg" style="width: 4%;"></div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between w-100 mt-1 pb-3">
                        <span class="seller-info-details__subtitle">کاملا راضی</span>
                        <span class="seller-info-details__subtitle">کاملا ناراضی</span>
                    </div>
                    <div class="text-center my-2">
                        <p class="seller-info-details__percent">${seller.efficiency}</p>
                        <p class="seller-info-details__title-middle">عملکرد کلی فروشنده</p>
                    </div>
                    <div class="d-flex content-center mt-2 justify-content-between">
                        <div class="text-center">
                            <p class="seller-info-details__subtitle text-center fw-bold">${seller.supplyProduct.toLocaleString('fa-IR')}%</p>
                            <p class="seller-info-details__caption">تامین به موقع</p>
                        </div>
                        <div class="align-center">
                            <p class="seller-info-details__subtitle text-center fw-bold">${seller.postCommitment.toLocaleString('fa-IR')}%</p>
                            <p class="seller-info-details__caption">تعهد ارسال</p>
                        </div>
                        <div class="align-center">
                            <p class="seller-info-details__subtitle text-center fw-bold">${seller.productWithoutReturns.toLocaleString('fa-IR')}%</p>
                            <p class="seller-info-details__caption">بدون مرجوعی
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <a href="#" class="buy-box__customer-satisfaction show-customer-satisfaction-popper" onmouseenter="showCustomerSatisfactionPopper()" onmouseleave="hideCustomerSatisfactionPopper()">
                <div class="w-100 px-3 d-flex">
                    <div class="py-2 d-flex flex-grow-1 d-flex">
                        <div class="ms-3 position-relative" style="padding-top: 8px">
                            ${seller.name === 'دیجی کالا' ?
            `<div class="d-flex">
                                                                <img style="width: 24px; height: 24px;" src="assets/images/footerlogo2.png" alt="">
                                                            </div>`
            :
            `<div class="d-flex ms-3">
                                        <i class="fa-solid fa-store color-700" style="width: 24px; height:24px;"></i>
                                    </div>
                                    <div class="d-flex ms-3 box-seller__icon-badge">
                                        <i class="fa-solid fa-check" style="width: 12px; height: 12px;"></i>
                                    </div>`
        }
                        </div>
                        <div class="d-flex flex-column w-100">
                            <div class="d-flex align-items-center mb-2 mb-lg-1">
                                <p class="ms-2 buy-box__logo-title">${seller.name}</p>
                            </div>
                            <div class="w-100 d-flex align-items-center">
                                <div class="ps-2 d-flex align-items-center">
                                    <p class="ms-1 text-caption buy-box__rating-count text-body-3">${seller.clientSatisfaction.toLocaleString('fa-IR')}%</p>
                                    <p class="buy-box__rating-text text-caption">رضایت از کالا</p>
                                </div>
                                <div class="pe-2 d-flex align-items-center">
                                    <p class="ms-1 buy-box__rating-text text-caption">عملکرد</p>
                                    <p class="buy-box__rating-count text-body-3">${seller.efficiency}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        <div class="w-100 px-3 d-flex align-items-center">
            <div class="py-2 d-flex flex-grow-1 d-flex align-items-center border-top-1-e6">
                <div class="ms-3">
                    <div class="d-flex">
                        <i class="fa-solid fa-shield-halved buy-box__guarantee-icon"></i>
                    </div>
                </div>
                <div class="d-flex w-100">
                    <p class="buy-box__guarantee-text">${product.guarantee}</p>
                </div>
            </div>
        </div>
        <div class="w-100 px-3 pointer" onclick="closeDigikalaPostModal()">
            <div class="py-3 d-flex flex-grow-1 border-top-1-e6">
                <div class="d-flex w-100">
                    <div class="d-flex flex-column w-100 position-relative">
                        <span class="d-flex align-items-center mb-1">
                            <div class="d-flex ms-3">
                                <i class="fa-regular fa-floppy-disk buy-box__disk-icon"></i>
                            </div>
                            <span class="buy-box__title-strong">
                            ${seller.digikalaAvailibility ? 'موجود در انبار دیجی‌کالا' : seller.sellerAvailibility ? 'موجود در انبار فروشنده' : 'موجود در انبار فروشنده و دیجی‌کالا'}
                            </span>
                        </span>
                        <div class="d-flex flex-column">
                            <div class="d-flex ms-3 align-items-center">
                                <div class="d-flex position-relative d-flex align-items-center justify-content-center ms-2"
                                    style="width: 24px; height: 24px;">
                                    <div class="d-flex">
                                        <i class="info-section__wrapp-icon fa-solid fa-circle fa-2xs" style="color: #19bfd3;"></i>
                                    </div>
                                    <span class="bullet-line position-absolute top-0 d-block"></span>
                                </div>
                                <div class="d-flex mx-1">
                                    <i class="fa-solid fa-truck delivery-express-icon"></i>
                                </div>
                                <p class="me-1 delivery-express-text">${seller.post[0]}</p>
                            </div>
                        </div>
                        <div class="d-flex flex-column">
                            <div class="d-flex ms-3 align-items-center">
                                <div class="d-flex position-relative d-flex align-items-center justify-content-center ms-2"
                                    style="width: 24px; height: 24px;">
                                    <div class="d-flex">
                                        <i class="info-section__wrapp-icon fa-solid fa-circle fa-2xs" style="color: #19bfd3;"></i>
                                    </div>
                                    <span class="bullet-line position-absolute top-0 d-block"></span>
                                </div>
                                <div class="d-flex mx-1">
                                    <i class="fa-solid fa-truck delivery-express-icon" style="color: #19bfd3"></i>
                                </div>
                                <p class="me-1 delivery-express-text">${seller.post[1]}</p>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-column">
                        <div class="d-flex me-auto">
                            <i class="fa fa-chevron-left buy-box__left-chevron-icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-100 px-3">
            <div class="d-flex align-items-center border-top-1-e6">
                <div class="py-2 d-flex flex-grow-1 d-flex border-bottom-1-e6 align-items-center">
                    <div class="d-flex ms-3">
                        <div class="club-point__icon-wrapp">
                            <img class="w-100 d-inline-block object-fit-contain" src="assets/images/club-point.svg" alt="">
                        </div>
                    </div>
                    <div class="d-flex w-100 pointer">
                        <p class="digiclub-rating__text">${seller.digiclubScore.toLocaleString('fa-IR')} امتیاز دیجی‌کلاب</p>
                        <div class="me-2 mt-1" id="digiclub-score__tooltip">
                            <div class="d-flex">
                                <i class="fa fa-circle-exclamation variantInfo-error-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="position-relative w-100 px-lg-4 pb-lg-3">
            <div class="w-100">
                <div>
                    <div class="d-flex align-items-end py-3">
                        <div class="me-2 mt-1 pb-2 pointer" id="price__tooltip">
                            <div class="d-flex">
                                <i class="fa fa-circle-exclamation variantInfo-error-icon"></i>
                            </div>
                        </div>
                        <div class="d-flex justify-content-start flex-column align-items-end me-auto">
                            ${product.discount === 0 ?
            `<div class="d-flex flex-row align-items-center">
                                    <span class="ms-1 product-price">${product.price.toLocaleString('fa-IR')}</span>
                                    <div class="d-flex me-1">
                                        <span class="text-body-3 color-700">تومان</span>
                                    </div>
                                </div>`
            :
            `<div class="d-flex align-items-center justify-content-end w-100">
                                    <span class="product-prev-price me-1">${(product.price).toLocaleString('fa-IR')}</span>
                                    <div class="px-1 text-white d-flex align-items-center justify-content-center flex-shrink-0 me-lg-1 me-0 product-price__discount-wrapp">
                                        <span class="product-price__discount-text h-100 px-1">${(product.discount).toLocaleString('fa-IR')}%</span>
                                    </div>
                                </div>
                                <div class="d-flex flex-row align-items-center">
                                    <span class="ms-1 product-price">${(product.price - ((product.price * product.discount) / 100)).toLocaleString('fa-IR')}</span>
                                    <div class="d-flex me-1">
                                        <span class="text-body-3 color-700">تومان</span>
                                    </div>
                                </div>`
        }
                        </div>
                    </div>
                    ${product.discount === 0 ? `` :
            `<div>
                            <p class="product-card__stock-text mb-3">تنها ${new Intl.NumberFormat('fa-IR').format(product.stock)} عدد در انبار باقی مانده</p>
                        </div>`
        }
                    ${isUserBuyThisProduct ?
            `<div class="d-flex align-items-center">
                            <div class="d-flex align-items-center justify-content-between px-2 item-quantity__container">
                                <div class="d-flex pointer" onclick='addProductToUserBasket(${JSON.stringify(product)})'>
                                    <i class="item-quantity__icon fa fa-plus"></i>
                                </div>
                                <span class="d-flex flex-column align-items-center justify-content-between">
                                    <span class="position-relative d-flex align-items-center justify-content-center item-quantity__box-count">
                                        ${mainProduct ? new Intl.NumberFormat('fa-IR').format(mainProduct.quantity) : '۱'}
                                    </span>
                                </span>
                                <div class="d-flex align-items-center pointer">
                                    ${mainProduct ?
                (mainProduct.quantity === 1 ?
                    `<i class="item-quantity__icon fa fa-trash" onclick='deleteProductFromBasket(${JSON.stringify(product._id)})'></i>`
                    :
                    `<i class="item-quantity__icon fa fa-minus" onclick='decreaseProductQuantity(${JSON.stringify(product._id)})'></i>`)
                :
                `<div class="d-flex align-items-center" onclick='addProductToUserBasket(${JSON.stringify(product)})'>
                                            <button class="buy-box__btn-wrapp position-relative d-flex align-items-center d-flex-lg w-100">
                                                <div class="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                                                    افزودن به سبد</div>
                                            </button>
                                        </div>`
            }     
                                </div>
                            </div>
                            <div class="me-2 me-lg-3">
                                <p class="item-quantity__text-1">در سبد شما</p>
                                <div class="item-quantity__chekout-link d-flex align-items-center">مشاهده
                                    <a href="checkout/cart.html">
                                        <p class="item-quantity__text-2 me-1">سبد خرید</p>
                                    </a>
                                </div>
                            </div>
                        </div>`
            :
            `<div class="d-flex align-items-center" onclick='addProductToUserBasket(${JSON.stringify(product)})'>
                            <button class="buy-box__btn-wrapp position-relative d-flex align-items-center d-flex-lg w-100">
                                <div class="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                                    افزودن به سبد</div>
                            </button>
                        </div>`
        }
                </div>
            </div>
        </div>
    `)
    buyProductContainerResponsive.innerHTML = ''
    buyProductContainerResponsive.insertAdjacentHTML('beforeend', `
        <div class="d-flex">
            <p class="color-primary-500 text-caption">تنها ${product.stock.toLocaleString('fa-IR')} عدد در انبار باقی مانده</p>
        </div>
        ${isUserBuyThisProduct ?
            `<div class="d-flex align-items-center">
                    <div class="d-flex align-items-center justify-content-between px-2 item-quantity__container" style="min-width: 50%">
                        <div class="d-flex pointer" onclick='addProductToUserBasket(${JSON.stringify(product)})'>
                            <i class="item-quantity__icon fa fa-plus"></i>
                        </div>
                        <span class="d-flex flex-column align-items-center justify-content-between">
                            <span class="position-relative d-flex align-items-center justify-content-center item-quantity__box-count">
                                ${mainProduct ? new Intl.NumberFormat('fa-IR').format(mainProduct.quantity) : '۱'}
                            </span>
                        </span>
                        <div class="d-flex align-items-center pointer">
                            ${mainProduct ?
                (mainProduct.quantity === 1 ?
                    `<i class="item-quantity__icon fa fa-trash" onclick='deleteProductFromBasket(${JSON.stringify(product._id)})'></i>`
                    :
                    `<i class="item-quantity__icon fa fa-minus" onclick='decreaseProductQuantity(${JSON.stringify(product._id)})'></i>`)
                :
                `<div class="d-flex align-items-center" onclick='addProductToUserBasket(${JSON.stringify(product)})'>
                                    <button class="buy-box__btn-wrapp position-relative d-flex align-items-center d-flex-lg w-100">
                                        <div class="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                                            افزودن به سبد</div>
                                    </button>
                                </div>`
            }     
                        </div>
                    </div>
                    <div class="d-flex justify-content-start flex-column align-items-end me-auto text-h4 pe-3">
                        <div class="d-flex align-items-center justify-content-end w-100">
                            <span class="product-prev-price ms-1">${(product.price).toLocaleString('fa-IR')}</span>
                            <div class="px-1 text-white d-flex align-items-center justify-content-center flex-shrink-0 me-lg-1 me-0 product-price__discount-wrapp">
                                <span class="product-price__discount-text px-1">${product.discount.toLocaleString('fa-IR')}%</span>
                            </div>
                        </div>
                        <div class="d-flex flex-row align-items-center">
                            <span class="color-800 ms-1 text-h4">${(product.price - ((product.price * product.discount) / 100)).toLocaleString('fa-IR')}</span>
                            <div class="d-flex me-1">
                                <span class="text-body-3 color-700">تومان</span>
                            </div>
                        </div>
                    </div>
                </div>`
            :
            `<div class="d-flex align-items-center" onclick='addProductToUserBasket(${JSON.stringify(product)})'>
                    <button class="buy-box__btn-wrapp w-50 align-items-center justify-content-center d-lg-flex">
                        <div class="d-flex align-items-center justify-content-center text-caption text-center">افزودن به سبد خرید</div>
                    </button>
                    <div class="d-flex justify-content-start flex-column align-items-end me-auto text-h4 pe-3">
                        <div class="d-flex align-items-center justify-content-end w-100">
                            <span class="product-prev-price ms-1">${(product.price).toLocaleString('fa-IR')}</span>
                            <div class="px-1 text-white d-flex align-items-center justify-content-center flex-shrink-0 me-lg-1 me-0 product-price__discount-wrapp">
                                <span class="product-price__discount-text px-1">${product.discount.toLocaleString('fa-IR')}%</span>
                            </div>
                        </div>
                        <div class="d-flex justify-content-start align-items-center me-auto pe-3">
                            <div class="d-flex justify-content-end align-items-center w-100">
                                <span class="product-price__footer ms-1">${(product.price - ((product.price * product.discount) / 100)).toLocaleString('fa-IR')}</span>
                            </div>
                            <div class="d-flex">
                                <span class="text-body-3 color-700">تومان</span>
                            </div>
                        </div>
                    </div>
                </div>`
        }
    `)


    if (userBasket) {
        getUserBasketCountAndShowModal(userBasket)
    }
}

const getYearAndMonthDifference = (startDate, endDate) => {

    // Convert the input dates to JavaScript Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the difference between the two dates in milliseconds
    const diffInMilliseconds = Math.abs(end.getTime() - start.getTime());

    // Convert the milliseconds difference to years and months
    const years = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));

    return { years, months }
}

const showCustomerSatisfactionPopper = () => {
    const customerSatisfactionPopper = document.querySelector('.popper')
    customerSatisfactionPopper.classList.remove('popper-animate__inactive')
    customerSatisfactionPopper.classList.add('popper-animate__active')
}

const hideCustomerSatisfactionPopper = () => {
    const customerSatisfactionPopper = document.querySelector('.popper')
    customerSatisfactionPopper.classList.remove('popper-animate__active')
    customerSatisfactionPopper.classList.add('popper-animate__inactive')
}

const closeDigikalaPostModal = () => {
    digikalaPostContainer.classList.remove('hidden')
}

const addProductToUserBasket = async (product) => {

    const isUserLogin = isLogin()
    if (isUserLogin) {

        let userID = getUserID()
        const productShortName = getUrlParam('name')

        const res = await fetch(`http://localhost:5000/basket/${userID}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: product._id }) // Include the isUserBuyThisProduct flag
        })
        const basket = await res.json()

        fetch(`http://localhost:5000/product/name/${productShortName}`)
            .then(res => res.json())
            .then(product => {
                getAndShowMiniBuyBoxDetails(product.seller, product)
                getAndShowStickyMiniBuyBox(product, userID)
            })
    } else {
        location.href = './././users/login.html'
    }
}

const deleteProductFromBasket = async (productID) => {

    const userID = getUserID()
    const productShortName = getUrlParam('name')

    const res = await fetch(`http://localhost:5000/basket/${userID}/${productID}`, {
        method: 'DELETE'
    })
    const updatedBasket = await res.json()

    const response = await fetch(`http://localhost:5000/product/name/${productShortName}`)
    const mainProduct = await response.json()

    if (updatedBasket.Products.length) {
        getAndShowMiniBuyBoxDetails(mainProduct.seller, mainProduct)
        getAndShowStickyMiniBuyBox(mainProduct, userID)
    } else {
        getAndShowMiniBuyBoxDetails(mainProduct.seller, mainProduct)
        getAndShowStickyMiniBuyBox(mainProduct, userID)
        showEmptyBasket()
    }
}

const decreaseProductQuantity = async (productID) => {

    const userID = getUserID()
    const productShortName = getUrlParam('name')

    const res = await fetch(`http://localhost:5000/basket/${userID}/${productID}`, {
        method: 'PATCH'
    })
    const updatedBasket = await res.json()

    const response = await fetch(`http://localhost:5000/product/name/${productShortName}`)
    const mainProduct = await response.json()

    getAndShowMiniBuyBoxDetails(mainProduct.seller, mainProduct)
    getAndShowStickyMiniBuyBox(mainProduct, userID)
}

const commentsSorting = (array, filterMethod) => {

    let outputArray = []

    switch (filterMethod) {
        case 'default': {
            outputArray = array
            break
        }
        case 'newest': {
            outputArray = array
            break
        }
        case 'most-helpful': {
            outputArray = array.sort((a, b) => b.likesUser.length - a.likesUser.length)
        }
        default: {
            outputArray = array
        }
    }

    return outputArray

}

const showQuestionModal = () => {

    const isUserLogin = isLogin()

    if (isUserLogin) {

        questionModal.classList.remove('hidden')
        questionTextareaModal.addEventListener('keydown', event => {

            // Handle MaxLength
            if (event.code === 'Backspace') {
                if (questionLengthModal.innerHTML !== '0') {
                    questionLengthModal.innerHTML = --(questionLengthModal.innerHTML)
                }
            } else {
                questionLengthModal.innerHTML = ++(questionLengthModal.innerHTML)
            }
        })

        questionSubmitBtnModal.addEventListener('click', async () => {
            if (questionTextareaModal.value) {
                const productShortName = getUrlParam('name')
                let userID = getUserID()

                const res = await fetch(`http://localhost:5000/product/name/${productShortName}`)
                const product = await res.json()

                let newQuestionInfoObject = {
                    "body": questionTextareaModal.value,
                    "product": product._id,
                    "seller": product.seller,
                    "creator": userID,
                    "hideName": false,
                    "isAnswer": 0,
                    "isQuestion": 1
                }

                addQuestion(newQuestionInfoObject)

            } else {
                showSwal(
                    'لطفا پرسش خود را مطرح کنید',
                    'error',
                    'ok',
                    () => { }
                )
            }
        })

    } else {
        showSwal(
            'لطفا ابتدا وارد شوید',
            'error',
            'ok',
            () => { location.href = "./users/login.html" }
        )
    }

}

const getValueFromTextarea = event => {

    const questionLength = document.querySelector('#question-length')

    // Handle MaxLength
    if (event.code === 'Backspace') {
        if (questionLength.innerHTML !== '0') {
            questionLength.innerHTML = --(questionLength.innerHTML)
        }
    } else {
        questionLength.innerHTML = ++(questionLength.innerHTML)
    }
}

const addFirstQuestion = async () => {

    const isUserLogin = isLogin()

    if (isUserLogin) {

        const questionTextarea = document.querySelector('.question_textarea')

        if (questionTextarea.value) {
            const productShortName = getUrlParam('name')
            let userID = getUserID()

            const res = await fetch(`http://localhost:5000/product/name/${productShortName}`)
            const product = await res.json()

            let newQuestionInfoObject = {
                "body": questionTextarea.value,
                "product": product._id,
                "seller": product.seller,
                "creator": userID,
                "hideName": false,
                "isAnswer": 0,
                "isQuestion": 1
            }

            addQuestion(newQuestionInfoObject)

        } else {
            showSwal(
                'لطفا پرسش خود را مطرح کنید',
                'error',
                'ok',
                () => { }
            )
        }

    } else {
        showSwal(
            'لطفا ابتدا وارد شوید',
            'error',
            'ok',
            () => { location.href = "./users/login.html" }
        )
    }
}

const closeQuestionModal = () => {
    questionModal.classList.add('hidden')
}

const showCommentModal = async () => {

    const isUserLogin = isLogin()

    if (isUserLogin) {

        const productShortName = getUrlParam('name')
        let slider = document.getElementById('no-ui-target')
        const commentScoreText = document.querySelector('#comment__score-text')
        const commentTextarea = document.querySelector('.comment__textarea')
        const commentTitle = document.querySelector('#comment-title')
        let commentScoreNumber

        commentModal.classList.remove('hidden')

        const res = await fetch(`http://localhost:5000/product/name/${productShortName}`)
        const product = await res.json()

        commentModalProductName.innerHTML = ''
        commentModalProductName.innerHTML = product.name

        if (!slider.noUiSlider) {
            noUiSlider.create(slider, {
                start: [0],
                step: 5,
                range: {
                    'min': [0],
                    'max': [25]
                },
                direction: 'rtl',
                connect: [true, false]
            })
        }

        // Update Slider 
        slider.noUiSlider.on('update', function (values, handle) {

            let value = values[handle]

            if (value == '0.00') {
                commentScoreText.innerHTML = ''
                commentScoreNumber = 1
            } else if (value == '5.00') {
                commentScoreText.innerHTML = 'خیلی بد'
                commentScoreNumber = 1
            } else if (value == '10.00') {
                commentScoreText.innerHTML = 'بد'
                commentScoreNumber = 2
            } else if (value == '15.00') {
                commentScoreText.innerHTML = 'معمولی'
                commentScoreNumber = 3
            } else if (value == '20.00') {
                commentScoreText.innerHTML = 'خوب'
                commentScoreNumber = 4
            } else if (value == '25.00') {
                commentScoreText.innerHTML = 'عالی'
                commentScoreNumber = 5
            }
        })

        submitAddCommentBtn.addEventListener('click', async () => {

            const res = await fetch(`http://localhost:5000/product/name/${productShortName}`)
            const product = await res.json()

            let userID = getUserID()
            let ishideName = false

            commentCheckboxInput.checked ? ishideName = true : ishideName = false

            let newCommentInfoObject = {
                "title": commentTitle.value,
                "body": commentTextarea.value,
                "product": product._id,
                "seller": product.seller,
                "creator": userID,
                "hideName": ishideName,
                "score": commentScoreNumber,
                "positivePoints": positivePointsArray,
                "negativePoints": negativePointsArray,
                "isAnswer": 0,
                "isQuestion": 0
            }

            addComment(newCommentInfoObject)
        })

    } else {
        showSwal(
            'لطفا ابتدا وارد شوید',
            'error',
            'ok',
            () => { location.href = "./users/login.html" }
        )
    }
}

const addComment = async (commentInfo) => {

    const res = await fetch(`http://localhost:5000/comments/comment/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentInfo)
    })

    if (res.status === 200) {

        showSwal(
            `کاربر عزیز کامنت شما با موفقیت ثبت شد`,
            'success',
            'تایید',
            () => {
                closeCommentnModal()
                clearCommentInputs()
                getAndShowComments()
            }
        )
    }
}

const addQuestion = async (questionInfo) => {

    const res = await fetch(`http://localhost:5000/comments/question/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionInfo)
    })

    if (res.status === 200) {

        showSwal(
            `کاربر عزیز پرسش شما با موفقیت ثبت شد`,
            'success',
            'تایید',
            () => {
                closeQuestionModal()
                getAndShowComments()
            }
        )
    }
}

const clearCommentInputs = () => {

    let slider = document.getElementById('no-ui-target')
    const commentScoreText = document.querySelector('#comment__score-text')
    const commentTextarea = document.querySelector('.comment__textarea')
    const commentTitle = document.querySelector('#comment-title')

    slider.noUiSlider.set(0)
    commentScoreText.innerHTML = ''
    commentTextarea.value = ''
    commentTitle.value = ''
    positivePointsContainer.innerHTML = ''
    negativePointsContainer.innerHTML = ''
    commentCheckboxInput.checked = false
}

const closeCommentnModal = () => {
    commentModal.classList.add('hidden')
}

const removeNegativePoint = (event) => {
    const pointDiv = event.target.parentNode.parentNode.parentNode
    const pointDivValue = pointDiv.querySelector('.text-caption').innerHTML

    negativePointsArray = negativePointsArray.filter(point => point !== pointDivValue)
    pointDiv.remove()
}

const removePositivePoint = (event) => {
    const pointDiv = event.target.parentNode.parentNode.parentNode
    const pointDivValue = pointDiv.querySelector('.text-caption').innerHTML

    positivePointsArray = positivePointsArray.filter(point => point !== pointDivValue)
    pointDiv.remove()
}

addPositivePoint.addEventListener('click', () => {

    const positiveValueInput = positiveCommentInput.value

    if (!positiveValueInput) {

        hintTextPositivePoint.classList.remove('hidden')
        hintTextPositivePoint.innerHTML = 'متن وارد شده باید حداقل ۳ کاراکتر باشد'

    } else {
        hintTextPositivePoint.classList.add('hidden')
        hintTextPositivePoint.innerHTML = ''

        positivePointsContainer.insertAdjacentHTML('beforeend', `
            <div class="d-flex align-items-center mt-2 px-1 w-100">
                <div class="d-flex pointer">
                    <i class="fa fa-plus" style="width: 16px; height: 16px; color:#4caf50"></i>
                </div>
                <p class="me-2 text-caption">${positiveValueInput}</p>
                <div class="d-flex pointer me-auto pointer" onclick="removePositivePoint(event)">
                    <i class="fa fa-trash" style="width: 16px; height: 16px; color:#a1a3a8"></i>
                </div>
            </div>
        `)

        positivePointsArray.push(positiveValueInput)
        positiveCommentInput.value = ''
    }
})

addNegativePoint.addEventListener('click', () => {
    const negativeValueInput = negativeCommentInput.value;

    if (!negativeValueInput) {

        hintTextNegativePoint.classList.remove('hidden')
        hintTextNegativePoint.innerHTML = 'متن وارد شده باید حداقل ۳ کاراکتر باشد'

    } else {

        hintTextNegativePoint.classList.add('hidden')
        hintTextNegativePoint.innerHTML = ''

        negativePointsContainer.insertAdjacentHTML('beforeend', `
            <div class="d-flex align-items-center mt-2 px-1 w-100">
                <div class="d-flex pointer">
                    <i class="fa fa-minus" style="width: 16px; height: 16px; color:#d32f2f"></i>
                </div>
                <p class="me-2 text-caption">${negativeValueInput}</p>
                <div class="d-flex pointer me-auto pointer" onclick="removeNegativePoint(event)">
                    <i class="fa fa-trash" style="width: 16px; height: 16px; color:#a1a3a8"></i>
                </div>
            </div>
        `)

        negativePointsArray.push(negativeValueInput)
        negativeCommentInput.value = ''
    }
})

// Close POST Modal By Clicking On Window
window.addEventListener('click', event => {
    if (event.target.id === 'modal') {
        digikalaPostContainer.classList.add('hidden')
    } else if (event.target.id === 'question__modal') {
        questionModal.classList.add('hidden')
    } else if (event.target.id === 'comment__modal') {
        commentModal.classList.add('hidden')
    }
})

// Close POST Modal by pressing ESC Key On Keyboard
window.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
        digikalaPostContainer.classList.add('hidden')
        questionModal.classList.add('hidden')
        commentModal.classList.add('hidden')
    }
})


closeQuestionModalBtn.addEventListener('click', closeQuestionModal)
closeCommentModalBtn.addEventListener('click', closeCommentnModal)
addQuestionBtn.addEventListener('click', showQuestionModal)
addCommentBtn.addEventListener('click', showCommentModal)

window.addEventListener('scroll', () => {

    if (isScrollingDueToClick) return

    // Get all sections
    const sections = document.querySelectorAll('.tab-item')

    sections.forEach(section => {
        const rect = section.getBoundingClientRect()

        // Check if any part of the section is in the viewport
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            // Get the corresponding list item
            const id = section.id
            const listItem = document.querySelector(`#${id}-title`)

            // Remove the active class from all list items
            listItems.forEach(li => {
                li.classList.remove('tab-active')
                let bb = li.querySelector('.tab-title-bb')
                bb.classList.remove('info-section__tab__border-bottom')
            })

            // Add the active class to the current list item
            listItem.classList.add('tab-active')
            let bb = listItem.querySelector('.tab-title-bb')
            bb.classList.add('info-section__tab__border-bottom')
        }
    })
})


window.removeNegativePoint = removeNegativePoint
window.removePositivePoint = removePositivePoint
window.selectColor = selectColor
window.likeComment = likeComment
window.unlikeComment = unlikeComment
window.showCustomerSatisfactionPopper = showCustomerSatisfactionPopper
window.hideCustomerSatisfactionPopper = hideCustomerSatisfactionPopper
window.closeDigikalaPostModal = closeDigikalaPostModal
window.addProductToUserBasket = addProductToUserBasket
window.deleteProductFromBasket = deleteProductFromBasket
window.decreaseProductQuantity = decreaseProductQuantity
window.showAllImages = showAllImages
window.showCommentModal = showCommentModal
window.addFirstQuestion = addFirstQuestion
window.getValueFromTextarea = getValueFromTextarea

export { getAndShowProductDetails }