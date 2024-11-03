import { getUserBasketCountAndShowModal, showEmptyBasket } from "./shared.js"
import { getUserID, isLogin, showSwal } from "./utils.js"

const mainURL = `https://digikala-backend.vercel.app`

const isUserLogin = isLogin()
const supportOnlineBtn = document.querySelector('.support-btn__online')
const supportPageTwo = document.querySelector('.support-page__two')
const supportPageOne = document.querySelector('.support-page__one')

const getAndShowAllHeaderSliders = async () => {

    const headerSliderContainer = document.querySelector('#header-slider-container')

    const res = await fetch(`${mainURL}/header-slider`)
    const headerSlides = await res.json()

    headerSliderContainer.innerHTML = ''

    headerSlides.forEach(slide => {
        headerSliderContainer.insertAdjacentHTML('beforeend', `
            <div class="swiper-slide" lazy="true">
                <img src="assets/covers/digikala-adservice-banners/${slide.cover}" class="img-fluid swiper-slide-img" loading="lazy" alt="slide-image">
            </div>
        `)
    })

    swiperLoad()
}

const getAndShowAllServices = async () => {

    const servicesContainer = document.getElementById('services-container')

    const res = await fetch(`${mainURL}/services`)
    const services = await res.json()

    servicesContainer.innerHTML = '';

    [...services].splice(0, 6).forEach(service => {

        servicesContainer.insertAdjacentHTML('beforeend', `
            <a href="${service.href}" class="d-flex flex-column align-items-center my-2 my-0-lg">
                <div>
                    <img class="ventures-img" src="assets/covers/digikala-services/${service.cover}" alt="">
                </div>
                <span class="ventures-caption mt-1 align-center">${service.title}</span>
            </a>
        `)
    })

    servicesContainer.insertAdjacentHTML('beforeend', `
        <div class="read-more d-flex flex-column align-items-center my-2 my-lg-0" onclick='showMoreServices()'>
            <div class="read-more-wrapp d-flex align-items-center justify-content-center">
                <div class="d-flex justify-content-center align-items-center read-more-icon">
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
            </div>
            <span class="read-more-text mt-1">بیشتر</span>
        </div>
    `)
}

const showMoreServices = async () => {

    const showMoreServicesModal = document.querySelector('.show-services__modal-bg')
    const closeServiceModalIcon = document.querySelector('.show-service__modal-icon')
    const showMoreServicesWrapper = document.querySelector('#show-more-services-wrapper')
    const digikalaGroupServicesWrapper = document.querySelector('#digikala-group-services-wrapper')

    const res = await fetch(`${mainURL}/services`)
    const services = await res.json()

    let shuffledServices = [...services].sort((a, b) => .5 - Math.random())
    showMoreServicesWrapper.innerHTML = ''

    // Insert Shuffled Services To Header
    shuffledServices.splice(0, 10).forEach(service => {
        showMoreServicesWrapper.insertAdjacentHTML('beforeend', `
            <div class="col-2 p-2">
                <a class="d-flex flex-column align-items-center my-2 my-lg-0" href="${service.href}">
                    <div style="width: 52px; height: 52px;">
                        <img src="assets/covers/digikala-services/${service.cover}" class="w-100 d-inline-block" alt="">
                    </div>
                    <span class="text-body-1 color-700 mt-1 text-center">${service.title}</span>
                </a>
            </div>
        `)
    })

    // Insert Digikala Group Services
    services.forEach(service => {
        if (service.desc) {
            digikalaGroupServicesWrapper.insertAdjacentHTML('beforeend', `
                <div class="col-6 my-2">
                    <a href="${service.href}" class="border-all d-flex align-items-center py-2 px-lg-3 all-services">
                        <div style="width: 52px; height: 52px;">
                            <img src="assets/covers/digikala-services/${service.cover}" class="d-inline-block w-100 object-fit-contain" alt="">
                        </div>
                        <div class="me-3 flex-grow-1">
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="text-subtitle-strong color-700">${service.title}</p>
                                <div class="d-flex mr-4">
                                    <i class="fa fa-arrow-left color-400"></i>
                                </div>
                            </div>
                            <p class="text-body-2 color-500">${service.desc}</p>
                        </div>
                    </a>
                </div>
            `)
        }
    })

    showMoreServicesModal.classList.remove('hidden')

    // Close Modal By Clicking On Body
    document.body.addEventListener('click', event => {
        if (event.target.id === 'modal') {
            showMoreServicesModal.classList.add('hidden')
        }
    })

    // close Modal By Clicking On Close Icon
    closeServiceModalIcon.addEventListener('click', () => {
        showMoreServicesModal.classList.add('hidden')
    })

    // close By Clicking On ESC Key
    document.body.addEventListener('keydown', event => {
        if (event.code === 'Escape') {
            showMoreServicesModal.classList.add('hidden')
        }
    })

}

const getAndShowAllIncredibleOffers = async () => {

    const incredibleOffersContainer = document.querySelector('#icredible-offers-container')
    const incredibleProductsContainer = document.querySelector('.incredible-products')
    const showMoreIncredibleOffersIcon = document.querySelector('.incredible-products__btn-text')

    const res = await fetch(`${mainURL}/incridble-offers`)
    const incredibleOffers = await res.json()

    incredibleOffersContainer.innerHTML = ''

    incredibleOffersContainer.insertAdjacentHTML('beforeend', `
        <div class="swiper-slide swiper-slide-active">
            <div class="ms-2 me-4 my-auto h-100 d-flex flex-column justify-content-center align-items-center">
                <a class="d-flex justify-content-center align-items-center flex-column" href="index/incredible-offers.html">
                    <div class="incredible-wrapp">
                        <img class="incredible w-100 d-inline-block" alt="شگفت انگیز" src="assets/images/Amazings.svg">
                    </div>
                    <div class="mt-2 box-wrapp">
                        <img class="box w-100 d-inline-block" alt="شگفت انگیز" src="assets/images/box.png">
                    </div>
                    <div
                        class="show-all-text d-flex justify-content-center align-items-center text-white">
                        مشاهده همه
                        <div class="d-flex">
                            <i class="show-all-icon fa-solid fa-chevron-left"></i>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <div class="swiper-slide slide-show-all__wrapp">
            <div class="border-left px-8 h-100 bg-white d-flex flex-column align-items-center justify-content-center px-8 ms-lg-0 h-full-lg" onclick="goToIncredibleOffersPage()">
                    <a class="d-flex flex-column align-items-center justify-content-center" href="#">
                        <div class="p-3 ShowAllCard">
                            <div class="d-flex align-items-center justify-content-center">
                                <i class="fa-solid fa-arrow-left ShowAllCard-icon"></i>
                            </div>
                        </div>
                        <p class="slide-show-all__text mt-3">مشاهده همه</p>
                    </a>
                </div>
            </div>
    `)

    const showAllIncredibleOffers = document.querySelector('.slide-show-all__wrapp')
    let discountPrice

    incredibleOffers.forEach(incredibleOffer => {
        showAllIncredibleOffers.insertAdjacentHTML('beforebegin', `
            <div class="swiper-slide">
                <a href="product.html?name=${incredibleOffer.shortName}&page=1" class="border-right bg-white d-block position-relative flex-grow-1 py-3 px-4 px-lg-3 px-xs-3"  style="height: 225px;">
                    <div class="overflow-hidden d-flex flex-column align-items-stretch justify-content-start h-full">
                        <div class="d-flex flex-grow-1 position-relative flex-column">
                            <div>
                                <div class="d-flex align-items-stretch flex-column position-relative mb-1">
                                    <div class="d-flex align-items-start mx-auto">
                                        <div>
                                            <div class="d-flex align-items-center justify-content-start flex-wrap position-absolute top-0 right-0">
                                                <br><br>
                                            </div>
                                            <div class="slide-item__img">
                                                <img src="assets/covers/${incredibleOffer.images[0].url}" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex flex-column align-items-stretch justify-content-start">
                                <div class="pt-1 d-flex flex-column align-items-stretch justify-content-between">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="item-price-percent__wrapp px-1 d-flex justify-content-center align-items-center">
                                            <span class="item-price-percent">${new Intl.NumberFormat('fa-IR').format(incredibleOffer.discount)}%</span>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-end">
                                        <span class="item-price">${new Intl.NumberFormat('fa-IR').format(incredibleOffer.price)}</span>
                                            <div class="d-flex me-1">
                                                <span class="text-body-3 color-700">تومان</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-end align-items-center ps-4">
                                        <div class="item-price__off mr-auto">
                                        ${discountPrice = incredibleOffer.price - (incredibleOffer.price * incredibleOffer.discount / 100),
            new Intl.NumberFormat('fa-IR').format(discountPrice)
            }
                                        </div>
                                    </div>
                                    <div class="mt-auto">
                                        <div>
                                            <div class="position-relative loading-wrapp hidden">
                                                <div class="loading-count position-absolute"></div>
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

    const goToIncredibleOffersPage = () => {
        window.location = 'index/incredible-offers.html'
    }
    window.goToIncredibleOffersPage = goToIncredibleOffersPage

    incredibleProductsContainer.innerHTML = ''
    incredibleOffers.forEach(incredibleOffer => {
        incredibleProductsContainer.insertAdjacentHTML('beforeend', `
            <div class="incredible-product-item d-flex justify-content-center align-items-center p-2 ms-2">
                <div class="incredible-product-item-radius">
                    <img class="incredible-product-item-img" src="assets/covers/${incredibleOffer.images[0].url}"
                </div>
                <div class="incredible-product-item__price-wrapp px-1 d-flex align-items-center justify-content-center position-absolute">
                    <span class="incredible-product-item__price">${new Intl.NumberFormat('fa-IR').format(incredibleOffer.discount)}%</span>
                </div>
            </div>
        `)
    })

    showMoreIncredibleOffersIcon.addEventListener('click', goToIncredibleOffersPage)
}

const getAndShowAllAdBanners = async () => {

    const adBannersContainer = document.querySelector('#banners-ad-container')
    const bannersWrapper = document.querySelector('#banners-wrapper')
    const digikalaBannersContainer = document.querySelector('#digikala-banners-container')

    const res = await fetch(`${mainURL}/ads`)
    const ads = await res.json()

    adBannersContainer.innerHTML = '',
        // bannersWrapper.innerHTML = ''

        [...ads].splice(0, 4).forEach(ad => {
            adBannersContainer.insertAdjacentHTML('beforeend', `
            <a href="${ad.href}" class="adservice-img-link d-block position-relative">
                <img class="adservice-img h-100 w-100" src="assets/covers/adservice-banner/${ad.banner}" alt="">
            </a>
        `)
        }),

        [...ads].splice(4, 2).forEach(ad => {
            bannersWrapper.insertAdjacentHTML('beforeend', `
            <a href="${ad.href}" class="w-50 d-block banner-img__wrapp">
                <img class="w-100 h-100 banner-img" src="assets/covers/adservice-banner/${ad.banner}" alt="">
            </a>
        `)
        }),

        [...ads].splice(6, 2).forEach(ad => {
            digikalaBannersContainer.insertAdjacentHTML('beforeend', `
            <a href="${ad.href}" class="w-50 h-100 d-block banner-img__wrapp-lg">
                <img class="w-100 h-100 banner-img" src="assets/covers/adservice-banner/${ad.banner}" alt="">
            </a>
        `)
        })

}

const getAndShowAllCategories = async () => {

    const categoriesContainer = document.querySelector('#categories-container')

    const res = await fetch(`${mainURL}/categories`)
    const categories = await res.json()

    categories.forEach(category => {
        
        categoriesContainer.insertAdjacentHTML('beforeend', `
            <div class="category-item">
                <a href="/index/main/${category.title}" class="d-flex flex-column align-items-center w-100 p-lg-0 mx-lg-0">
                    <div class="category-item__img align-items-center justify-content-center">
                        <img src="assets/covers/categories/${category.cover}" alt="">
                    </div>
                    <p class="category-item__text mt-2 align-center">${category.name}</p>
                </a>
            </div>
        `)
    })
}

const getAndShowAllPopularBrands = async () => {

    const popularBrandsContainer = document.querySelector('#popular-brands-container')

    const res = await fetch(`${mainURL}/popular-brands`)
    const popularBrands = await res.json()

    popularBrandsContainer.innerHTML = ''

    popularBrands.forEach(brand => {
        popularBrandsContainer.insertAdjacentHTML('beforeend', `
            <div class="swiper-slide">
                <a class="popular-brand__link px-4 py-1 overflow-hidden d-flex align-items-center justify-content-center h-100"
                    href="/index${brand.href}">
                    <div class="popular-brand__img-wrapp d-flex justify-content-center align-items-center">
                        <img class="popular-brand__img" src="assets/covers/popular-brands/${brand.cover}"
                            alt="${brand.name}">
                    </div>
                </a>
            </div>
        `)
    })


}

const getAndShowUserBasketModalInOtherPages = async () => {

    if (isUserLogin) {

        const userID = getUserID()

        const response = await fetch(`${mainURL}/basket/${userID}`)
        const userBasket = await response.json()

        if (userBasket) {
            getUserBasketCountAndShowModal(userBasket)
        }
    } else {
        showEmptyBasket()
    }
}

const addProductToUserBasket = async (product) => {

    if (isUserLogin) {

        let userID = getUserID()
        fetch(`${mainURL}/basket/${userID}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: product._id })
        })

        fetch(`${mainURL}/product/${product.shortName}`)
            .then(res => res.json())
            .then(product => {

                fetch(`${mainURL}/basket/${userID}`)
                    .then(res => res.json())
                    .then(userBasket => {

                        if (userBasket[0].Products.length) {
                            mainProduct = userBasket[0].Products.find(p => {
                                if (product._id === p.product._id) {
                                    let temp = p
                                    return temp
                                }
                            })
                        } else {
                            showEmptyBasket()
                        }

                        if (userBasket) {
                            getUserBasketCountAndShowModal(userBasket)
                        }
                    })
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

const deleteProductFromBasket = async (productID) => {

    const userID = getUserID()

    if (userID) {
        const res = await fetch(`${mainURL}/basket/${userID}/${productID}`, {
            method: 'DELETE'
        })
        const updatedBasket = await res.json()

        const response = await fetch(`${mainURL}/product/id/${productID}`)

        if (updatedBasket.Products.length) {
            fetch(`${mainURL}/basket/${userID}`)
                .then(res => res.json())
                .then(userBasket => {
                    getUserBasketCountAndShowModal(userBasket)
                })
        } else {
            fetch(`${mainURL}/basket/${userID}`)
                .then(res => res.json())
                .then(userBasket => {
                    getUserBasketCountAndShowModal(userBasket)
                    showEmptyBasket()
                })
        }
    }
}

const decreaseProductQuantity = async (productID) => {

    const userID = getUserID()

    if (userID) {
        const res = await fetch(`${mainURL}/basket/${userID}/${productID}`, {
            method: 'PATCH'
        })

        const response = await fetch(`${mainURL}/product/id/${productID}`)

        fetch(`${mainURL}/basket/${userID}`)
            .then(res => res.json())
            .then(userBasket => {
                getUserBasketCountAndShowModal(userBasket)
            })
    }

}

window.showMoreServices = showMoreServices
const swiperLoad = () => {
    const swiper2 = new Swiper('.swiper1', {
        // Optional parameters
        autoplay: {
            delay: 2200,
            disableOnInteraction: false,
        },
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    })
}

supportOnlineBtn.addEventListener('click', () => {

    const createRoom = document.querySelector('#create-room')
    const supportModal = document.querySelector('.support-modal')

    supportPageOne.classList.add('hidden')
    supportPageTwo.classList.remove('hidden')

    createRoom.addEventListener('click', event => {
        event.preventDefault()
        showSwal(
            'لطفا صبور باشید، شما را به اولین اپراتور آزاد وصل میکنیم',
            'success',
            'تایید',
            () => { supportModal.classList.add('hidden') }
        )
    })
})

window.addProductToUserBasket = addProductToUserBasket
window.deleteProductFromBasket = deleteProductFromBasket
window.decreaseProductQuantity = decreaseProductQuantity

export {
    getAndShowAllHeaderSliders,
    getAndShowAllServices,
    showMoreServices,
    getAndShowAllIncredibleOffers,
    getAndShowAllAdBanners,
    getAndShowAllCategories,
    getAndShowAllPopularBrands,
    getAndShowUserBasketModalInOtherPages
}