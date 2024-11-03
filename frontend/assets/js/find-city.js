const selectCityModalContainer = document.querySelector('.select-city__modal-bg')
const selectCityModalProvinces = document.querySelector('.select-city__modal-provinces')
const selectCityModalCloseIcon = document.querySelector('.select-city__modal-icon')
const backToProvinceModal = document.querySelector('.back-province-modal')
const showCityModals = document.querySelectorAll('.show-city-modal')
const selectCityModalCities = document.querySelector('.select-city__modal-cities')
const userCityLocationName = document.querySelector('.city-content__wrapper')
const headerNavigationCityModal = document.querySelector('.header-navigation__city-modal ')

let selectedProvince = null

const selectCityModalHandler = async () => {

    // Show Modal
    selectCityModalContainer.classList.toggle('hidden')

    const res = await fetch('http://localhost:5000/provinces')
    const allProvincesInfo = await res.json()
    
    // Insert Provinces To Modal
    selectCityModalProvinces.innerHTML = ''
    allProvincesInfo.forEach(provinceInfo => {
        document.querySelector('.select-city__modal-provinces').insertAdjacentHTML('beforeend', `
            <span class="select-city__modal-city border-bottom-1 py-3 d-block">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="flex-grow-1">
                        <option value="${provinceInfo.province}" class="flex-grow-1 city-name" onclick="showCitiesOfThisProvince('${provinceInfo.province}')">${provinceInfo.province}</option>
                    </div>
                    <div
                        class="select-city_icon d-flex align-items-center justify-content-center flex-shrink-0 me-2">
                        <div class="d-flex">
                            <i class="fa fa-chevron-left"></i>
                        </div>
                    </div>
                </div>
            </span>
        `)
    })

    // back To Province Modal
    backToProvinceModal.addEventListener('click', () => {
        showCityModals.forEach(cityModal => {
            cityModal.classList.toggle('hidden')
        })
    })

    // Close Modal
    selectCityModalCloseIcon.addEventListener('click', () => {
        selectCityModalContainer.classList.add('hidden')
    })

    window.showCitiesOfThisProvince = showCitiesOfThisProvince
}

const showCitiesOfThisProvince = async (provinceName) => {

    // Toggle Between Cities and Provincec Modals
    showCityModals.forEach(cityModal => {
        cityModal.classList.toggle('hidden')
    })

    // Get All ProvinceInfo
    const res = await fetch('http://localhost:5000/provinces')
    const allProvincesInfo = await res.json()

    // Get Main Province Info
    const mainProvince = allProvincesInfo.filter(provinceInfo => {
        if(provinceInfo.province === provinceName) {
            return provinceInfo
        }
    })
    
    let cities = mainProvince[0].cities
    selectedProvince = mainProvince[0].province
    selectCityModalCities.innerHTML = ''

    // Insert Cities Of Selected Province
    cities.forEach(city => {
        city.split(',').forEach(city => {
            selectCityModalCities.insertAdjacentHTML('beforeend', `
                <span class="select-city__modal-city border-bottom-1 py-3 d-block">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="flex-grow-1">
                            <option class="flex-grow-1" onclick=insertUserLocation('${city}')>${city}</option>
                        </div>
                        <div class="select-city_icon d-flex align-items-center justify-content-center flex-shrink-0 me-2">
                            <div class="d-flex">
                                <i class="fa fa-chevron-left"></i>
                            </div>
                        </div>
                    </div>
                </span>
            `)
        })
    }) 
}

const insertUserLocation = (cityName) => {
    
    let cityInfos = {
        city: cityName,
        province: selectedProvince
    }

    userCityLocationName.innerHTML = ''
    headerNavigationCityModal.innerHTML = ''

    userCityLocationName.insertAdjacentHTML('beforeend', `ارسال به ${selectedProvince}، ${cityName}`)
    headerNavigationCityModal.insertAdjacentHTML('beforeend',  `ارسال به ${selectedProvince}، ${cityName}`)

    localStorage.setItem('userLocationCity', JSON.stringify(cityInfos))
    selectCityModalContainer.classList.add('hidden')
}

const getUerLocation = () => {

    let userCityLocation = JSON.parse(localStorage.getItem('userLocationCity'))

    if(userCityLocation) {

        userCityLocationName.innerHTML = ''
        headerNavigationCityModal.innerHTML = ''
    
        userCityLocationName.insertAdjacentHTML('beforeend', `ارسال به ${userCityLocation.province}، ${userCityLocation.city}`)
        headerNavigationCityModal.insertAdjacentHTML('beforeend',  `ارسال به ${userCityLocation.province}، ${userCityLocation.city}`)
    }
}

// Close Modal By Clicking On Window
window.addEventListener('click', event => {
    if(event.target.id === 'modal') {
        selectCityModalContainer.classList.add('hidden')
    }
})

window.insertUserLocation = insertUserLocation

export { selectCityModalHandler, getUerLocation }