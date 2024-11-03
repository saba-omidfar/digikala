import { getUrlParam, setValueInSearchParams, removeParamFromURL } from "./utils.js"

const priceSlider = document.getElementById('price-slider')
const priceSliderMobile = document.getElementById('price-slider-mobile')
const productListWrapper = document.querySelector('#product-list__wrapper')
const categoryTitle = document.querySelector('#category-title')
const categoryTitleMobile = document.querySelector('#category-title-mobile')
const categoryChildrenTitle = document.querySelector('#category-children-title')
const categoryChildrenTitleMobile = document.querySelector('#category-children-title-mobile')
const categoriesContainer = document.querySelector('.categories-container')
const categoriesContainerMobile = document.querySelector('.categories-container-mobile')
const showAllProductsByCategoryBtn = document.querySelector('#show-all-products-btn')
const showAllProductsByCategoryBtnMobileVersion = document.querySelector('#show-all-products-btn-mobile-version')
const switchInputSliderSellerPostBtn = document.querySelector('#switch-input-slider__seller-post-btn')
const switchInputSliderSellerPostBtnMobile = document.querySelector('#switch-input-slider__seller-post-btn-mobile')
const availableProductsInDigikalaBtn = document.querySelector('#available-products-digikala-btn')
const availableProductsInDigikalaBtnMobile = document.querySelector('#available-products-digikala-btn-mobile')
const availableProductsFilterBtn = document.querySelector('#available-products__filter-btn')
const availableProductsFilterBtnMobile = document.querySelector('#available-products__filter-btn-mobile')
const specialSeller = document.getElementById('special-seller')
const digikalaSeller = document.getElementById('digikala-seller')
const specialSellerMobile = document.querySelector('#special-seller-mobile')
const digikalaSellerMobile = document.querySelector('#digikala-seller-mobile')
const deleteAllFiltersBtn = document.querySelector('#delete-all-filters__btn')
const filterMobileModal = document.querySelector('.filter-mobile-modal')
const backToFilterProductsBbtn = document.querySelector('#back-to-filter-products__btn')
const categoryFilterWrapper = document.querySelector('#category-filter-wrapper')
const allFiltersWrapperIcon = document.getElementById('all-filters-wrapper')
const brandFilterWrappMobile = document.querySelector('#brand-filter-wrapp-mobile')
const priceFilterWrapperMobile = document.querySelector('#price-filter-wrapper')
const sellerFilterWrapperMobile = document.querySelector('#seller-filter-wrapper')
const allProductLengthMobile = document.querySelector('#all-product-length-mobile')
let checkboxes = document.querySelectorAll('.filter-checkbox__input')

let categories, userSelectedBrandsArray = []
let currentCategory = null;


const getAndShowAllProductsByCategory = async () => {

    const categoryName = getUrlParam('cat')

    if (categoryName) {

        currentCategory = categoryName
        let products

        const res = await fetch(`http://localhost:5000/products/${categoryName}`)
        products = await res.json()

        if (!products.length) {
            const result = await fetch(`http://localhost:5000/products/subCategory/${categoryName}`)
            products = await result.json()

        }

        if (products.length) {
            showFullProductsListWrapper(products)
        } else {
            showEmptyProductsListWrapper()
        }

        getAllCategoriesAndShowInFilteringContainer(categoryName)

        if (categoryName === 'mobile-phone') {
            brandFilterWrappMobile.classList.remove('hidden')
        } else {
            brandFilterWrappMobile.classList.add('hidden')
        }

    } else {
        currentCategory = null
        showAllProductsWithoutFiltering()
        getAllCategoriesWhenCategoryNameIsEmpty()
    }
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

    let priceSliderSkipValuesMobile = [
        document.getElementById("min-price-mobile"),
        document.getElementById("max-price-mobile"),
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
                return value
                //return parseInt(value)
            },
            to: function (value) {
                return value
                //return parseInt(value).toLocaleString()
            }
        }
    })

    noUiSlider.create(priceSliderMobile, {
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
                return value
                //return parseInt(value)
            },
            to: function (value) {
                return value
                //return parseInt(value).toLocaleString()
            }
        }
    })



    priceSlider.noUiSlider.on("update", function (values, handle) {
        priceSliderSkipValues[handle].value = values[handle]
    })

    priceSliderMobile.noUiSlider.on("update", function (values, handle) {
        priceSliderSkipValuesMobile[handle].value = values[handle]
    })

    priceSlider.noUiSlider.on("change", function (values, handle) {
        priceSliderSkipValues[handle].value = values[handle]
        let minValue = values[0]
        let maxValue = values[1]
        filters.priceRange = [minValue, maxValue]
        applyFilters()
    })

    priceSliderMobile.noUiSlider.on("change", function (values, handle) {
        priceSliderSkipValuesMobile[handle].value = values[handle]
        let minValue = values[0]
        let maxValue = values[1]
        filters.priceRange = [minValue, maxValue]
        applyFilters()
    })
}

const getAllCategoriesAndShowInFilteringContainer = async (categoryName) => {

    let mainCategory, tempCategory

    const res = await fetch(`http://localhost:5000/megaMenus`)
    categories = await res.json()

    categories.forEach(category => {
        if (category.href !== categoryName) {
            if (category.submenus.length) {
                category.submenus.forEach(sub => {
                    if (sub.submenus.length) {
                        sub.submenus.find(child => {
                            if (child.href === categoryName) {
                                tempCategory = child
                                mainCategory = tempCategory
                            }
                        })
                    }
                })
            }
        } else {
            mainCategory = [...categories].find(category => {
                return category.href === categoryName
            })
        }
    })

    // Handle Category Filtering
    categoryTitle.innerHTML = ''
    categoryTitle.insertAdjacentHTML('beforeend', `
        <div class="w-100 d-flex align-items-center justify-content-start pointer" onclick='showProductsIfExists(${JSON.stringify(mainCategory)})'>
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

    //Handle Brands Filtering
    // if (mainCategory.href === "category-mobile_brands") {
    //     showBrandsMobile(mainCategory)
    // }

}

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
    const allProductsTitleCheckIconMobile = document.querySelector('.all-products-title-check-mobile')

    let updateUrl = setValueInSearchParams(window.location.href, 'cat', `${categoryHref}`)
    window.history.pushState({}, '', updateUrl)
    allProductsTitleCheckIcon.classList.add('hidden')
    allProductsTitleCheckIconMobile.classList.add('hidden')
    getAndShowAllProductsByCategory()
}

const showChildrenOfCategorySubmenu = (submenu) => {

    categoryTitle.insertAdjacentHTML('beforeend', `
        <div class="w-100 p-0">
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

    categoryTitleMobile.insertAdjacentHTML('beforeend', `
        <div class="w-100 p-0">
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

    categoriesContainer.innerHTML = ''
    categoriesContainerMobile.innerHTML = ''

    submenu.submenus.forEach(child => {
        categoriesContainer.insertAdjacentHTML('beforeend', `
            <div class="pe-5" onclick='setCategoryInURL(${JSON.stringify(child.href)})'>
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

        categoriesContainerMobile.insertAdjacentHTML('beforeend', `
            <div class="pe-5" onclick='setCategoryInURL(${JSON.stringify(child.href)})'>
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

    filterMobileModal.classList.add('hidden')
}

const showProductsIfExists = (mainCategory) => {

    categoryTitle.innerHTML = ''
    categoryTitle.insertAdjacentHTML('beforeend', `
        <div class="w-100 p-0">
            <div class="w-100 d-flex align-items-center justify-content-start pointer">
                <div class="d-flex ms-3" style="width: 12px; height:12px; color:#424750">
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
        </div>
   `)

    categoriesContainer.innerHTML = ''
    mainCategory.submenus.forEach(child => {
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

    setCategoryInURL(mainCategory.href)
}

const showCategoryChildren = children => {

    categoriesContainer.innerHTML = ''
    categoriesContainerMobile.innerHTML = ''

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

    children.forEach(child => {
        categoriesContainerMobile.insertAdjacentHTML('beforeend', `
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
}

const showAllProductswithoutFilters = async () => {

    const allProductsTitleCheckIcon = document.querySelector('.all-products-title-check')
    const allProductsTitleCheckIconMobile = document.querySelector('.all-products-title-check-mobile')
    allProductsTitleCheckIcon.classList.remove('hidden')
    allProductsTitleCheckIconMobile.classList.remove('hidden')

    categoryChildrenTitle.innerHTML = ''
    categoryChildrenTitleMobile.innerHTML = ''

    categoryTitle.innerHTML = ''
    categoriesContainer.innerHTML = ''

    categoryTitleMobile.innerHTML = ''
    categoriesContainerMobile.innerHTML = ''

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

        categories.forEach(category => {
            categoriesContainerMobile.insertAdjacentHTML('beforeend', `
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
}

const setCategoryInURL = async (categoryHref) => {

    const brandFilterWrapp = document.querySelector('#brand-filter-wrapp')
    const brandFilterWrappMobile = document.querySelector('#brand-filter-wrapp-mobile')

    if (categoryHref) {
        let updateUrl = setValueInSearchParams(window.location.href, 'cat', `${categoryHref}`)
        window.history.pushState({}, '', updateUrl)
    }

    // Handle Brands Filtering
    if (categoryHref === "mobile-phone") {

        brandFilterWrapp.classList.remove('hidden')
        brandFilterWrappMobile.classList.remove('hidden')

        fetch(`http://localhost:5000/megaMenus`)
            .then(response => response.json())
            .then(categories => {
                let mainCategory = categories.find(category => {
                    return category.href === categoryHref
                })
                showBrandsMobile(mainCategory)
            })

    } else {
        brandFilterWrapp.classList.add('hidden')
        brandFilterWrappMobile.classList.add('hidden')
    }

    const categoryName = getUrlParam('cat')

    const res = await fetch(`http://localhost:5000/products`)
    const products = await res.json()
    let productsArray

    fetch(`http://localhost:5000/megaMenus`)
        .then(response => response.json())
        .then(categories => {
            categories.forEach(category => {
                if (category.href !== categoryHref) {
                    if (category.submenus.length) {
                        category.submenus.forEach(sub => {
                            if (sub.submenus.length) {
                                sub.submenus.forEach(child => {
                                    if (child.href === categoryName) {

                                        productsArray = products.filter(product => {
                                            return child._id === product.subSubmenu
                                        })

                                        if (productsArray.length) {
                                            showFullProductsListWrapper(productsArray)
                                        } else {
                                            showEmptyProductsListWrapper()
                                        }
                                    }
                                })
                            }

                        })
                    }
                } else {
                    fetch(`http://localhost:5000/products/${categoryName}`)
                        .then(result => result.json())
                        .then(products => {
                            if (products.length) {
                                showFullProductsListWrapper(products)
                            } else {
                                showEmptyProductsListWrapper()
                            }
                        })
                }
            })
            filterMobileModal.classList.add('hidden')
        })
}

const showBrandsMobile = (category) => {

    const brandsContainer = document.querySelector('.brands-container')

    brandsContainer.innerHTML = ''
    category.submenus[0].submenus.forEach(submenu => {
        brandsContainer.insertAdjacentHTML('beforeend', `
            <div class="w-100 pointer" onclick='showBrandsMobilewithClicking(event,${JSON.stringify(submenu)})'>
                <div class="w-100 d-flex align-items-center justify-content-start position-relative">
                    <div class="d-flex">
                        <input class="text-body-1 color-700 filter-checkbox__input brand-mobile-input" type="checkbox" id="${submenu._id}">
                        <label class="position-relative d-flex align-items-center pointer filter-checkbox__input-container" for="${submenu._id}">
                            <span></span>
                        </label>
                    </div>
                    <div class="d-flex w-100 flex-grow text-neutral-700">
                        <label class="w-100 d-flex align-items-center justify-content-between py-2 ps-lg-2 border-bottom-f0">
                            <div class="text-body2-strong color-700">${submenu.title.slice(5)}
                            </div>
                            <div class="text-caption color-700 ltr text-left">
                                ${submenu.title.slice(5)}
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        `)
    })

    //addSelectedBrandToUserSelectedBrandWrapper(userSelectedBrandsArray)
}

const showBrandsMobileWithSearching = async (event) => {

    const userSelectedBrand = document.querySelector('#user-selected-brand')
    let searchedBrandValue = event.target.value.trim()

    const res = await fetch(`http://localhost:5000/megaMenus`)
    categories = await res.json()

    if (searchedBrandValue) {

        categories[0].submenus[0].submenus.forEach(submenu => {
            let word = submenu.title.slice(5)
            if (word.toLowerCase().trim() === searchedBrandValue.toLowerCase().trim()) {
                if (!userSelectedBrandsArray.some(item => item._id === submenu._id)) {
                    event.target.value = ''
                    userSelectedBrandsArray.push(submenu)
                    userSelectedBrand.classList.remove('hidden')
                    addSelectedBrandToUserSelectedBrandWrapper(submenu, userSelectedBrandsArray)
                    showProductsByBrandMobileName(userSelectedBrandsArray)
                }
            }
        })
    }
}

const showBrandsMobilewithClicking = (event, submenu) => {

    event.preventDefault()

    const userSelectedBrand = document.querySelector('#user-selected-brand')
    userSelectedBrand.classList.remove('hidden')

    let index = userSelectedBrandsArray.findIndex(brand => brand._id === submenu._id)

    if (index !== -1) {

        // Item exists, remove it
        userSelectedBrandsArray = userSelectedBrandsArray.filter(brand => brand._id !== submenu._id)
        addSelectedBrandToUserSelectedBrandWrapper(submenu, userSelectedBrandsArray)

    } else {
        // Item does not exists, add it
        userSelectedBrandsArray.push(submenu)
        addSelectedBrandToUserSelectedBrandWrapper(submenu, userSelectedBrandsArray)
    }

    showProductsByBrandMobileName(userSelectedBrandsArray)
}

const showProductsByBrandMobileName = async (brandsMobileArray) => {

    const categoryName = getUrlParam('cat')
    let foundedProductBySearchedBrandArray = []


    const res = await fetch(`http://localhost:5000/products/${categoryName}`)
    const products = await res.json()

    console.log(products);

    let foundedProductBySearchedBrand = products.find(product => {
        return brandsMobileArray.some(mobileBrand => product.subSubmenu === mobileBrand._id)
    })

    if (foundedProductBySearchedBrand) {
        foundedProductBySearchedBrandArray.push(foundedProductBySearchedBrand)
    } else {
        showEmptyProductsListWrapper()
    }

    if (foundedProductBySearchedBrandArray.length) {
        showFullProductsListWrapper(foundedProductBySearchedBrandArray)
    } else {
        showEmptyProductsListWrapper()
    }
}

const addSelectedBrandToUserSelectedBrandWrapper = (mainSubmenu, mobileBrandsArray) => {

    const userSelectedBrandsWrapper = document.querySelector('#user-selected-brands-container')
    const userSelectedBrand = document.querySelector('#user-selected-brand')

    if (mobileBrandsArray.length) {
        userSelectedBrandsWrapper.innerHTML = ''
        mobileBrandsArray.forEach(mobileBrand => {
            userSelectedBrandsWrapper.insertAdjacentHTML('beforeend', `
                <div class="w-100" onclick=doNothing(event)>
                    <div class="w-100 d-flex align-items-center justify-content-start position-relative">
                        <div class="d-flex">
                            <input class="text-body-1 color-700 filter-checkbox__input brand-item-array"
                                type="checkbox" id="${mobileBrand._id}" checked>
                            <label class="position-relative d-flex align-items-center pointer filter-checkbox__input-container"
                                for="${mobileBrand._id}">
                                <span></span>
                            </label>
                        </div>
                        <div class="d-flex w-100 flex-grow text-neutral-700">
                            <label for="994" class="w-100 d-flex align-items-center justify-content-between py-2 ps-lg-2 border-bottom-f0">
                                <div class="text-body2-strong color-700">${mobileBrand.title.slice(5)}</div>
                                <div class="text-caption color-700 ltr text-left">Samsung</div>
                            </label>
                        </div>
                    </div>
                </div>
            `)
        })

        let isMainSubmenuInMobileBrandsArray = mobileBrandsArray.some(mobileBrand => mobileBrand._id === mainSubmenu._id)

        if (!isMainSubmenuInMobileBrandsArray) {

            document.querySelectorAll('.brand-mobile-input').forEach(filterCheckboxInput => {
                let brandMobileId = filterCheckboxInput.getAttribute('id')
                if (mainSubmenu._id === brandMobileId) {
                    filterCheckboxInput.checked = false
                }
            })

        } else {
            document.querySelectorAll('.brand-mobile-input').forEach(filterCheckboxInput => {

                let brandMobileId = filterCheckboxInput.getAttribute('id')
                if (mainSubmenu._id === brandMobileId) {
                    filterCheckboxInput.checked = true
                }
            })
        }

    } else {

        userSelectedBrand.classList.add('hidden')
        userSelectedBrandsWrapper.innerHTML = ''
        document.querySelectorAll('.brand-mobile-input').forEach(filterCheckboxInput => {
            filterCheckboxInput.checked = false
        })
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

const getAllCategoriesWhenCategoryNameIsEmpty = async () => {

    const allProductsTitleCheckIcon = document.querySelector('.all-products-title-check')
    allProductsTitleCheckIcon.classList.remove('hidden')

    const res = await fetch(`http://localhost:5000/megaMenus`)
    categories = await res.json()

    // Handle Category Filtering
    categoryTitle.innerHTML = ''
    categories.forEach(category => {
        categoryTitle.insertAdjacentHTML('beforeend', `
                <div class="w-100 d-flex align-items-center justify-content-start pointer" onclick='showProductsIfExists(${JSON.stringify(category)})'>
                    <div class="d-flex ms-3"
                        style="width: 12px; height:12px; color:#424750">
                        <i class="w-100 fa fa-chevron-down"></i>
                    </div>
                    <div class="flex-grow-1 color-700">
                        <div class="w-100 d-flex align-items-center justify-content-between py-3 border-bottom-f0">
                            <div class="text-body2-strong" style="color: #424750;">${category.title}</div>
                            
                        </div>
                    </div>
                </div>
        `)
    })
}

const doNothing = event => {
    event.preventDefault()
}

// Handle Filtering when the user clicks on each filter button
let filters = {
    sellerPost: false,
    digikalaAvailability: false,
    priceAvailability: false,
    specialSeller: false,
    digikalaSeller: false,
    priceRange: [0, 10_000_000]
}

switchInputSliderSellerPostBtn.addEventListener('click', async function () {

    const isActive = this.querySelector('.switch-input__slider').classList.toggle('switch-input__slider--active')
    this.querySelector('.switch-input__track').classList.toggle('switch-input__track--active')

    filters.sellerPost = isActive

    if (!isActive) {
        this.querySelector('.switch-input__slider').classList.remove('switch-input__slider--active')
        this.querySelector('.switch-input__track').classList.remove('switch-input__track--active')
    }

    applyFilters()
})

switchInputSliderSellerPostBtnMobile.addEventListener('click', async function () {

    const isActive = this.querySelector('.switch-input__slider').classList.toggle('switch-input__slider--active')
    this.querySelector('.switch-input__track').classList.toggle('switch-input__track--active')

    filters.sellerPost = isActive

    if (!isActive) {
        this.querySelector('.switch-input__slider').classList.remove('switch-input__slider--active')
        this.querySelector('.switch-input__track').classList.remove('switch-input__track--active')
    }

    applyFilters()
})

availableProductsInDigikalaBtn.addEventListener('click', async function () {

    const isActive = this.querySelector('.switch-input__slider').classList.toggle('switch-input__slider--active')
    this.querySelector('.switch-input__track').classList.toggle('switch-input__track--active')

    filters.digikalaAvailability = isActive

    if (!isActive) {
        this.querySelector('.switch-input__slider').classList.remove('switch-input__slider--active')
        this.querySelector('.switch-input__track').classList.remove('switch-input__track--active')
    }

    applyFilters()
})

availableProductsInDigikalaBtnMobile.addEventListener('click', async function () {

    const isActive = this.querySelector('.switch-input__slider').classList.toggle('switch-input__slider--active')
    this.querySelector('.switch-input__track').classList.toggle('switch-input__track--active')

    filters.digikalaAvailability = isActive

    if (!isActive) {
        this.querySelector('.switch-input__slider').classList.remove('switch-input__slider--active')
        this.querySelector('.switch-input__track').classList.remove('switch-input__track--active')
    }

    applyFilters()
})

availableProductsFilterBtn.addEventListener('click', async function () {

    const isActive = this.querySelector('.switch-input__slider').classList.toggle('switch-input__slider--active')
    this.querySelector('.switch-input__track').classList.toggle('switch-input__track--active')

    filters.priceAvailability = isActive

    if (!isActive) {
        this.querySelector('.switch-input__slider').classList.remove('switch-input__slider--active')
        this.querySelector('.switch-input__track').classList.remove('switch-input__track--active')
    }

    applyFilters()
})

availableProductsFilterBtnMobile.addEventListener('click', async function () {

    const isActive = this.querySelector('.switch-input__slider').classList.toggle('switch-input__slider--active')
    this.querySelector('.switch-input__track').classList.toggle('switch-input__track--active')

    filters.priceAvailability = isActive

    if (!isActive) {
        this.querySelector('.switch-input__slider').classList.remove('switch-input__slider--active')
        this.querySelector('.switch-input__track').classList.remove('switch-input__track--active')
    }

    applyFilters()
})

specialSeller.addEventListener('click', async () => {
    if (specialSeller.checked === true) {
        filters.specialSeller = true
        delete filters.digikalaSeller
    } else {
        delete filters.specialSeller
    }
    applyFilters();
})

digikalaSeller.addEventListener('click', async () => {
    if (digikalaSeller.checked === true) {
        filters.digikalaSeller = true
        delete filters.specialSeller
    } else {
        delete filters.digikalaSeller
    }
    applyFilters()
})

specialSellerMobile.addEventListener('click', async () => {
    if (specialSeller.checked === true) {
        filters.specialSeller = true
        delete filters.digikalaSeller
    } else {
        delete filters.specialSeller
    }
    applyFilters();
})

digikalaSellerMobile.addEventListener('click', async () => {
    if (digikalaSeller.checked === true) {
        filters.digikalaSeller = true
        delete filters.specialSeller
    } else {
        delete filters.digikalaSeller
    }
    applyFilters()
})

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            checkboxes.forEach(c => {
                if (c !== checkbox) c.checked = false;
            })
        }
    })
})

// const applyFilters = async () => {

//     const res = await fetch(`http://localhost:5000/products`)
//     let products = await res.json()

//     if (filters.sellerPost) {
//         const sellers = await Promise.all(products.map(async product => {
//             const res = await fetch(`http://localhost:5000/seller/${product.seller}`)
//             return res.json()
//         }))
//         products = products.filter((product, index) => sellers[index].sellerAvailibility === true)
//     }

//     if (filters.digikalaAvailability) {
//         const sellers = await Promise.all(products.map(async product => {
//             const res = await fetch(`http://localhost:5000/seller/${product.seller}`)
//             return res.json()
//         }))
//         products = products.filter((product, index) => sellers[index].digikalaAvailibility === true)
//     }

//     if (filters.priceAvailability) {
//         products = products.filter(product => product.price !== 0)
//     }

//     if (filters.specialSeller) {
//         products = products.filter(product => product.seller === '650af511a634e47e9c7eb8fd')
//     }

//     if (filters.digikalaSeller) {
//         products = products.filter(product => product.seller !== '650af511a634e47e9c7eb8fd')
//     }

//     if (filters.priceRange) {
//         products = products.filter(product => filters.priceRange[0] < product.price && product.price < filters.priceRange[1])
//     }

//     if (products.length) {
//         showFullProductsListWrapper(products)
//     } else {
//         showEmptyProductsListWrapper()
//     }
// }

const applyFilters = async () => {

    const res = await fetch(currentCategory ? `http://localhost:5000/products/${currentCategory}` : `http://localhost:5000/products`)
    let products = await res.json()

    console.log(products);

    let sellers = null

    if (filters.sellerPost || filters.digikalaAvailability) {
        sellers = await Promise.all(products.map(async product => {
            const res = await fetch(`http://localhost:5000/seller/${product.seller}`)
            return res.json()
        }))
    }

    products = products.filter((product, index) => {

        if (filters.sellerPost && !sellers[index].sellerAvailibility) {
            return false;
        }

        if (filters.digikalaAvailability && !sellers[index].digikalaAvailibility) {
            return false;
        }

        if (filters.priceAvailability && product.price === 0) {
            return false;
        }

        if (filters.specialSeller && product.seller !== '650af511a634e47e9c7eb8fd') {
            return false;
        }

        if (filters.digikalaSeller && product.seller === '650af511a634e47e9c7eb8fd') {
            return false;
        }

        if (filters.priceRange && (product.price <= filters.priceRange[0] || product.price >= filters.priceRange[1])) {
            return false;
        }

        return true;
    })

    if (products.length) {
        showFullProductsListWrapper(products)
    } else {
        showEmptyProductsListWrapper()
    }
}

const deleteAllFiltersAndShowAllProducts = async () => {

    const switchInputSliders = document.querySelectorAll('.switch-input__slider')
    const switchInputTracks = document.querySelectorAll('.switch-input__track')
    const filterCheckboxInputs = document.querySelectorAll('.filter-checkbox__input')

    showAllProductswithoutFilters()

    switchInputSliders.forEach(switchInputSlider => {
        switchInputSlider.classList.remove('switch-input__slider--active')
    })

    switchInputTracks.forEach(switchInputTrack => {
        switchInputTrack.classList.remove('switch-input__track--active')
    })

    filterCheckboxInputs.forEach(filterCheckboxInput => {
        filterCheckboxInput.checked = false
    })

    priceSlider.noUiSlider.updateOptions({
        start: [0, 1_000_000],
        range: {
            min: 0,
            max: 1_000_000
        }
    })
}

// Handle Filtering In Mobile Version
const switchFilterProductsModal = (element) => {

    const priceFilterWrapper = document.querySelector('#price-filter-wrapper')

    // Open the modal
    filterMobileModal.classList.remove('hidden')

    let dataContent = element.getAttribute('data-content')

    switch (dataContent) {

        case 'category-filter':
            categoryFilterWrapper.classList.remove('hidden')
            allFiltersWrapperIcon.classList.add('hidden')
            showAllProductswithoutFilters()
            break;

        case 'brand-filter':
            document.getElementById('brand-filter-wrapper').classList.remove('hidden')
            allFiltersWrapperIcon.classList.add('hidden')
            break;

        case 'price-filter':
            priceFilterWrapper.classList.remove('hidden')
            allFiltersWrapperIcon.classList.add('hidden')
            showAllProductswithoutFilters()
            break;

        case 'seller-filter':
            sellerFilterWrapperMobile.classList.remove('hidden')
            allFiltersWrapperIcon.classList.add('hidden')
            showAllProductswithoutFilters()
            break;
    }
}

const openFilterProductsModal = () => {
    filterMobileModal.classList.remove('hidden')
}

const closeFilterProductsModal = () => {
    filterMobileModal.classList.add('hidden')
}

const backToFilterProductsModal = () => {
    categoryFilterWrapper.classList.add('hidden')
    priceFilterWrapperMobile.classList.add('hidden')
    sellerFilterWrapperMobile.classList.add('hidden')
    allFiltersWrapperIcon.classList.remove('hidden')

    // Create a URL object with the current URL
    let url = new URL(window.location.href)
    let catValue = url.searchParams.get('cat')

    if (catValue === 'mobile-phone') {
        brandFilterWrappMobile.classList.remove('hidden')
    } else {
        brandFilterWrappMobile.classList.add('hidden')
    }
}


const allProductLengthMobileHandler = async () => {

    const res = await fetch(`http://localhost:5000/products`)
    const allProducts = await res.json()

    allProductLengthMobile.innerHTML = `${allProducts.length.toLocaleString('fa-IR')} کالا`

}


deleteAllFiltersBtn.addEventListener('click', deleteAllFiltersAndShowAllProducts)
showAllProductsByCategoryBtn.addEventListener('click', showAllProductswithoutFilters)
showAllProductsByCategoryBtnMobileVersion.addEventListener('click', () => {
    brandFilterWrappMobile.classList.add('hidden')
    showAllProductswithoutFilters()
})
backToFilterProductsBbtn.addEventListener('click', backToFilterProductsModal)

window.showProductsIfExists = showProductsIfExists
window.showCategorySubmenu = showCategorySubmenu
window.setCategoryInURL = setCategoryInURL
window.showChildrenOfCategorySubmenu = showChildrenOfCategorySubmenu
window.addSelectedBrandToUserSelectedBrandWrapper = addSelectedBrandToUserSelectedBrandWrapper
window.showBrandsMobileWithSearching = showBrandsMobileWithSearching
window.showBrandsMobilewithClicking = showBrandsMobilewithClicking
window.showBrandsMobile = showBrandsMobile
window.doNothing = doNothing
window.openFilterProductsModal = openFilterProductsModal
window.closeFilterProductsModal = closeFilterProductsModal
window.backToFilterProductsModal = backToFilterProductsModal
window.switchFilterProductsModal = switchFilterProductsModal

export { getAndShowAllProductsByCategory, getpriceValueSelectedByUser, allProductLengthMobileHandler }