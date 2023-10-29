import { getUrlParam, setValueInSearchParams, removeParamFromURL } from "./utils.js"

const filterSwitchElems = document.querySelectorAll('.filter-switch__wrapp')
const priceSlider = document.getElementById('price-slider')
const productsFilteringSelections = document.querySelectorAll('.filter-product-btn')
const productListWrapper = document.querySelector('#product-list__wrapper')
const categoryTitle = document.querySelector('#category-title')
const categoryChildrenTitle = document.querySelector('#category-children-title')
const categoriesContainer = document.querySelector('.categories-container')
const showAllProductsByCategoryBtn = document.querySelector('#show-all-products-btn')
let categories


const getAndShowAllProductsByCategory = async () => {

    const categoryName = getUrlParam('cat')

    const res = await fetch(`http://localhost:5000/products/${categoryName}`)
    const products = await res.json()

    if (products.length) {
        showFullProductsListWrapper(products)
    } else {
        showEmptyProductsListWrapper()
    }

    getAllCategoriesAndShowInFilteringContainer(categoryName)
}

const showFullProductsListWrapper = (products) => {

    productListWrapper.innerHTML = ''
    products.forEach(product => {
        fetch(`http://localhost:5000/seller/${product.seller}`)
            .then(res => res.json())
            .then(seller => {
                productListWrapper.insertAdjacentHTML('beforeend', `
                    <div class="product-list__item p-0 col-xxl-3 col-lg-6 col-md-6 col-12">
                        <div class="h-100">
                            <a href="product.html?name=${product.shortName}&page=1" class="product-list__item-link h-100 d-block position-relative bg-white overflow-hidden flex-grow-1 py-3 px-4 px-lg-2">
                                <div>
                                    <article class="overflow-hidden d-flex flex-column align-items-stretch justify-content-start h-100">
                                        <div class="d-flex align-items-center justify-content-start mb-2">
                                            <div class="ms-1" style="width: 116px; height: 14px;">
                                                ${product.discount !== 0 ?
                        `<img class="w-100 object-fit-contain d-inline-block" src="assets/images/incredible.svg" alt="">`
                        :
                        ``
                    }
                                            </div>
                                        </div>
                                        <div class="d-flex flex-grow-1 flex-column">
                                            <div class="d-flex align-items-stretch flex-column mb-1">
                                                <div class="position-relative d-flex align-items-start mx-auto">
                                                    <div style="width: 240px; height: 240px;">
                                                        <img class="w-100 d-inline-block object-fit-contain" src="assets/covers/${product.images.find(image => image.isMain).url}" alt="">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-grow-1 d-flex flex-column align-items-stretch justify-content-start">
                                                <div class="d-flex align-items-center justify-content-start flex-wrap mb-1">
                                                    <br>
                                                </div>
                                                <div>
                                                    <h3 class="text-body2-strong color-700 vertical-product-card__title">${product.name}</h3>
                                                </div>
                                                <div class="mb-1 d-flex align-items-center justify-content-between">
                                                    <div class="d-flex align-items-center">
                                                        <div class="d-flex ms-1">
                                                            <i class="fa fa-truck supermarket-icon"></i>
                                                        </div>
                                                        <p class="text-caption color-600">${seller.post[0]}</p>
                                                    </div>
                                                    <div class="d-flex align-items-center">
                                                        <p class="text-body2-strong color-700">${product.rating.toLocaleString('fa-IR')}</p>
                                                        <div class="d-flex me-2">
                                                            <i class="fa fa-star rating-icon"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="pt-1 d-flex flex-column align-items-stretch justify-content-between">
                                                    <div class="d-flex align-items-center justify-content-between">
                                                        ${product.discount === 0 ?
                        ``
                        :
                        `<div class="px-2 text-white d-flex align-items-center justify-content-center product-price__discount-wrapp">
                                                                                                <span class="text-body2-strong">${product.discount.toLocaleString('fa-IR')}٪</span>
                                                                                            </div>`
                    }
                                                        <div class="d-flex align-items-center justify-content-end flex-grow-1">
                                                            <span class="color-700 color-400 text-h5">
                                                                ${(product.price - ((product.price * product.discount) / 100)).toLocaleString('fa-IR')}
                                                            </span>
                                                            <div class="d-flex me-1">
                                                                <span class="text-body-3  color-700">تومان</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    ${product.discount === 0 ?
                        ``
                        :
                        `<div class="d-flex align-items-center justify-content-between ps-3">
                                                            <div class="selected-product__prevPrice me-auto color-300 text-caption">
                                                                ${product.price.toLocaleString('fa-IR')}
                                                            </div>
                                                        </div>`
                    }
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </a>
                        </div>
                    </div>
                `)
            })
    })
}

const showEmptyProductsListWrapper = () => {
    productListWrapper.innerHTML = ''
    productListWrapper.insertAdjacentHTML('beforeend', `
        <div class="product-list__empty-wrapper">
            <div class="w-100 d-flex flex-column align-items-center justify-content-between px-3 pt-3 pb-2">
                <div class="mb-3 not-found-product__image">
                    <img class="w-100 d-inline-block object-fit-contain" src="assets/covers/not-found.svg" alt="نتیجه‌ای یافت نشد">
                </div>
                <div class="d-flex flex-column product-not-found py-4 px-3 w-100">
                    <div class="text-subtitle-strong font-bold color-700 d-flex align-items-center">
                    <div class="d-flex ms-3">
                        <i class="fa-solid fa-circle-exclamation variantInfo-error-icon"></i>
                    </div>
                        کالایی با این مشخصات پیدا نکردیم
                    </div>
                    <div class="text-caption color-500 me-3">پیشنهاد می‌کنیم فیلترها را تغییر دهید</div>
                </div>
            </div>
        </div>
    `)
}

const getpriceValueSelectedByUser = () => {

    let priceSliderSkipValues = [
        document.getElementById("min-price"),
        document.getElementById("max-price"),
    ]

    noUiSlider.create(priceSlider, {
        start: [0, 10_000_000],
        connect: true,
        step: 50_000,
        range: {
            min: 0,
            max: 10000000
        },
        direction: "rtl",
        format: {
            from: function (value) {
                return parseInt(value)
            },
            to: function (value) {
                return parseInt(value).toLocaleString()
            }
        }
    })


    priceSlider.noUiSlider.on("update", function (values, handle) {
        priceSliderSkipValues[handle].value = values[handle]
    })

}

const getAllCategoriesAndShowInFilteringContainer = async (categoryName) => {

    const brandsContainer = document.querySelector('.brands-container')

    const res = await fetch(`http://localhost:5000/megaMenus`)
    categories = await res.json()

    let mainCategory = [...categories].find(category => {
        return category.href === categoryName
    })

    // Handle Category Filtering
    categoryTitle.innerHTML = ''
    categoryTitle.insertAdjacentHTML('beforeend', `
        <div class="w-100 d-flex align-items-center justify-content-start pointer">
            <div class="d-flex ms-3"
                style="width: 12px; height:12px; color:#424750">
                <i class="w-100 fa fa-chevron-down"></i>
            </div>
            <div class="flex-grow-1 color-700">
                <div class="w-100 d-flex align-items-center justify-content-between py-3 border-bottom-f0">
                    <div class="text-body2-strong" style="color: #424750;">${mainCategory.title}</div>
                    <div class="d-flex">
                        <i class="fa fa-check" style="width: 18px; height:18px; color: #19bfd3;"></i>
                    </div>
                </div>
            </div>
        </div>
    `)

    showCategoryChildren(mainCategory.submenus)

    // Handle Brands Filtering
    brandsContainer.innerHTML = ''
    mainCategory.submenus[0].submenus.forEach(submenu => {
        brandsContainer.insertAdjacentHTML('beforeend', `
            <div class="w-100">
                <div class="w-100 d-flex align-items-center justify-content-start position-relative">
                    <div class="d-flex">
                        <input class="text-body-1 color-700 filter-checkbox__input" type="checkbox" id="samsung">
                        <label class="position-relative d-flex align-items-center pointer filter-checkbox__input-container" for="samsung">
                            <span></span>
                        </label>
                    </div>
                    <div class="d-flex w-100 flex-grow text-neutral-700">
                        <label class="w-100 d-flex align-items-center justify-content-between py-2 ps-lg-2 border-bottom-f0">
                            <div class="text-body2-strong color-700">${submenu.title.slice(5)}
                            </div>
                            <div class="text-caption color-700 ltr text-left">
                                Samsung</div>
                        </label>
                    </div>
                </div>
            </div>
        `)
    })
}

// Handling Filter Switcher
filterSwitchElems.forEach(filterSwitch => {
    filterSwitch.addEventListener('click', () => {
        filterSwitch.querySelector('.switch-input__slider').classList.toggle('switch-input__slider--active')
        filterSwitch.querySelector('.switch-input__track').classList.toggle('switch-input__track--active')
    })
})

// Handling Remove Border Bottom When Collapse Is Enabled
document.querySelectorAll('.accordion-collapse').forEach(element => {

    element.addEventListener('show.bs.collapse', () => {
        let prevElement = element.previousElementSibling;
        if (prevElement) {
            let borderElement = prevElement.querySelector('.border-bottom-1');
            if (borderElement) {
                borderElement.classList.add('border-bottom-0');
                borderElement.classList.remove('border-bottom-1');
            }
        }
        let closestElement = element.closest('.d-flex.w-100.flex-column.align-items-start.justify-content-start.pointer');
        if (closestElement) {
            closestElement.classList.add('border-bottom-1');
        }
    })

    element.addEventListener('hide.bs.collapse', function () {
        let prevElement = element.previousElementSibling;
        if (prevElement) {
            let borderElement = prevElement.querySelector('.border-bottom-0');
            if (borderElement) {
                borderElement.classList.add('border-bottom-1');
                borderElement.classList.remove('border-bottom-0');
            }
        }
        let closestElement = element.closest('.d-flex.w-100.flex-column.align-items-start.justify-content-start.pointer');
        if (closestElement) {
            closestElement.classList.remove('border-bottom-1');
        }
    })
})

const showCategorySubmenu = (categoryHref) => {

    const allProductsTitleCheckIcon = document.querySelector('.all-products-title-check')

    let updateUrl = setValueInSearchParams(window.location.href, 'cat', `${categoryHref}`)
    window.history.pushState({}, '', updateUrl)
    allProductsTitleCheckIcon.classList.add('hidden')
    getAndShowAllProductsByCategory()
}

const showChildrenOfCategorySubmenu = async (submenu) => {

    if (submenu.submenus.length) {
        categoryTitle.insertAdjacentHTML('beforeend', `
            <div class="w-100 accordion-body p-0">
                <div class="w-100 d-flex align-items-center justify-content-start pointer">
                    <div class="d-flex ms-3" style="width: 12px; height:12px; color:#424750">
                        <i class="w-100 fa fa-chevron-down"></i>
                    </div>
                    <div class="flex-grow-1 color-700">
                        <div class="w-100 d-flex align-items-center justify-content-between py-3 border-bottom-f0">
                            <div class="text-body2-strong" style="color: #424750;">${submenu.title}</div>
                            <div class="d-flex">
                                <i class="fa fa-check" style="width: 18px; height:18px; color: #19bfd3;"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
    }

    categoriesContainer.innerHTML = ''
    submenu.submenus.forEach(child => {
        console.log('child:', child)
        categoriesContainer.insertAdjacentHTML('beforeend', `
            <div class="pe-5"  onclick='setCategoryInURL(${JSON.stringify(child.href)})'>
                <div class="w-100">
                    <div class="w-100 d-flex align-items-center justify-content-start
                        pointer">
                        <div class="d-flex ms-3"
                            style="width: 12px; height:12px; color:#424750">
                            <i class="w-100 fa fa-chevron-down"></i>
                        </div>
                        <div class="flex-grow-1 color-700">
                            <div class="w-100 d-flex align-items-center justify-content-between py-3 border-bottom-f0">
                                <div class="text-body2-strong">${child.title}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
    })
}

const showProductsIfExists = async (child) => {
    console.log(child)
    const categoryName = getUrlParam('cat')
    
    //getAllCategoriesAndShowInFilteringContainer(categoryName)
}

const showCategoryChildren = children => {

    categoriesContainer.innerHTML = ''
    children.forEach(child => {
        categoriesContainer.insertAdjacentHTML('beforeend', `
            <div class="pe-5 child-category" onclick='showChildrenOfCategorySubmenu(${JSON.stringify(child)})'>
                <div class="w-100">
                    <div class="w-100 d-flex align-items-center justify-content-start
                        pointer">
                        <div class="d-flex ms-3"
                            style="width: 12px; height:12px; color:#424750">
                            <i class="w-100 fa fa-chevron-down"></i>
                        </div>
                        <div class="flex-grow-1 color-700">
                            <div class="w-100 d-flex align-items-center justify-content-between py-3 border-bottom-f0">
                                <div class="text-body2-strong">${child.title}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
    })

    // document.querySelectorAll('.child-category').forEach(childCategory => {
    //     childCategory.addEventListener('click', () => {
    //         console.log('clicked');
    //         // categoriesContainer.innerHTML = ''
    //         // categoriesContainer.insertAdjacentHTML('beforeend', `

    //         // `)
    //         // getAndShowAllProductsByCategory()
    //     })
    // })
}

showAllProductsByCategoryBtn.addEventListener('click', async () => {

    const allProductsTitleCheckIcon = document.querySelector('.all-products-title-check')
    allProductsTitleCheckIcon.classList.remove('hidden')

    categoryChildrenTitle.innerHTML = ''
    categoryTitle.innerHTML = ''
    categoriesContainer.innerHTML = ''
    if (categories.length) {
        categories.forEach(category => {
            categoriesContainer.insertAdjacentHTML('beforeend', `
                <div class="pe-5" onclick='setCategoryInURL(${JSON.stringify(category.href)})'>
                    <div class="w-100">
                        <div class="w-100 d-flex align-items-center justify-content-start pointer">
                            <div class="d-flex ms-3"
                                style="width: 12px; height:12px; color:#424750">
                                <i class="w-100 fa fa-chevron-down"></i>
                            </div>
                            <div class="flex-grow-1 color-700" onclick='showCategorySubmenu(${JSON.stringify(category.href)})'>
                                <div class="w-100 d-flex align-items-center justify-content-between py-3 border-bottom-f0">
                                    <div class="text-body2-strong">${category.title}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `)
        })
    }

    let updateUrl = removeParamFromURL(window.location.href, 'cat')
    window.history.pushState({}, '', updateUrl)
    showAllProductsWithoutFiltering()
})

const setCategoryInURL = (categoryHref) => {

    if (categoryHref) {
        let updateUrl = setValueInSearchParams(window.location.href, 'cat', `${categoryHref}`)
        window.history.pushState({}, '', updateUrl)
    }
}

const showAllProductsWithoutFiltering = async () => {

    const result = await fetch(`http://localhost:5000/products`)
    const products = await result.json()

    productListWrapper.innerHTML = ''
    if (products.length) {
        products.forEach(product => {
            fetch(`http://localhost:5000/seller/${product.seller}`)
                .then(res => res.json())
                .then(seller => {
                    productListWrapper.insertAdjacentHTML('beforeend', `
             <div class="product-list__item p-0 col-xxl-3 col-lg-6 col-md-6 col-12">
                 <div class="h-100">
                     <a href="product.html?name=${product.shortName}&page=1" class="product-list__item-link h-100 d-block position-relative bg-white overflow-hidden flex-grow-1 py-3 px-4 px-lg-2">
                         <div>
                             <article class="overflow-hidden d-flex flex-column align-items-stretch justify-content-start h-100">
                                 <div class="d-flex align-items-center justify-content-start mb-2">
                                     <div class="ms-1" style="width: 116px; height: 14px;">
                                         ${product.discount !== 0 ?
                            `<img class="w-100 object-fit-contain d-inline-block" src="assets/images/incredible.svg" alt="">`
                            :
                            ``
                        }
                                     </div>
                                 </div>
                                 <div class="d-flex flex-grow-1 flex-column">
                                     <div class="d-flex align-items-stretch flex-column mb-1">
                                         <div class="position-relative d-flex align-items-start mx-auto">
                                             <div style="width: 240px; height: 240px;">
                                                 <img class="w-100 d-inline-block object-fit-contain" src="assets/covers/${product.images.find(image => image.isMain).url}" alt="">
                                             </div>
                                         </div>
                                     </div>
                                     <div class="flex-grow-1 d-flex flex-column align-items-stretch justify-content-start">
                                         <div class="d-flex align-items-center justify-content-start flex-wrap mb-1">
                                             <br>
                                         </div>
                                         <div>
                                             <h3 class="text-body2-strong color-700 vertical-product-card__title">${product.name}</h3>
                                         </div>
                                         <div class="mb-1 d-flex align-items-center justify-content-between">
                                             <div class="d-flex align-items-center">
                                                 <div class="d-flex ms-1">
                                                     <i class="fa fa-truck supermarket-icon"></i>
                                                 </div>
                                                 <p class="text-caption color-600">${seller.post[0]}</p>
                                             </div>
                                             <div class="d-flex align-items-center">
                                                 <p class="text-body2-strong color-700">${product.rating.toLocaleString('fa-IR')}</p>
                                                 <div class="d-flex me-2">
                                                     <i class="fa fa-star rating-icon"></i>
                                                 </div>
                                             </div>
                                         </div>
                                         <div class="pt-1 d-flex flex-column align-items-stretch justify-content-between">
                                             <div class="d-flex align-items-center justify-content-between">
                                                 ${product.discount === 0 ?
                            ``
                            :
                            `<div class="px-2 text-white d-flex align-items-center justify-content-center product-price__discount-wrapp">
                                                         <span class="text-body2-strong">${product.discount.toLocaleString('fa-IR')}٪</span>
                                                     </div>`
                        }
                                                 <div class="d-flex align-items-center justify-content-end flex-grow-1">
                                                     <span class="color-700 color-400 text-h5">
                                                         ${(product.price - ((product.price * product.discount) / 100)).toLocaleString('fa-IR')}
                                                     </span>
                                                     <div class="d-flex me-1">
                                                         <span class="text-body-3  color-700">تومان</span>
                                                     </div>
                                                 </div>
                                             </div>
                                             ${product.discount === 0 ?
                            ``
                            :
                            `<div class="d-flex align-items-center justify-content-between ps-3">
                                                     <div class="selected-product__prevPrice me-auto color-300 text-caption">
                                                         ${product.price.toLocaleString('fa-IR')}
                                                     </div>
                                                 </div>`
                        }
                                         </div>
                                     </div>
                                 </div>
                             </article>
                         </div>
                     </a>
                 </div>
             </div>
         `)
                })
        })
    } else {
        productListWrapper.insertAdjacentHTML('beforeend', `محصولی وجود ندارد`)
    }
}


window.showProductsIfExists = showProductsIfExists
window.showCategorySubmenu = showCategorySubmenu
window.setCategoryInURL = setCategoryInURL
window.showChildrenOfCategorySubmenu = showChildrenOfCategorySubmenu


export { getAndShowAllProductsByCategory, getpriceValueSelectedByUser }