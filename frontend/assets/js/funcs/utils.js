const showSwal = (title, icon, buttons, callback) => {
    swal({
        title,
        icon,
        buttons
    }).then(result => callback(result))
}

const saveIntoLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value))
}

const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

const getUrlParam = key => {

    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(key)
}

const getUserID = () => {
    const userID = JSON.parse(localStorage.getItem('userID'))
    return userID ? userID : null
}

const getUserByPhone = async () => {
    const res = await fetch('http://localhost:5000/users')
    const users = await res.json()

    return users
}

const getUserIDByUserPhone = async (userPhone) => {
    const res = await fetch(`http://localhost:5000/users/phone`, {
        headers: {
            Authorization: `${userPhone}`
        }
    })
    const data = await res.json()
    saveIntoLocalStorage('userID', data[0]._id)
    location.href = '../index.html'
}

const isLogin = () => {
    const userInfos = JSON.parse(localStorage.getItem("userID"))
    return userInfos ? true : false
}

const addParamToUrl = (param, value) => {
    let url = new URL(location.href)
    let searchParams = url.searchParams
    searchParams.set(param, value)
    url.search = searchParams.toString()
    location.href = url.toString()
}
window.addParamToUrl = addParamToUrl

const paginateItems = (array, itemsPerPage, paginatedParentElem, currPage) => {

    const commentPrevPage = document.querySelector('#comment-prev-page')
    const commentNextPage = document.querySelector('#comment-next-page')

    paginatedParentElem.innerHTML = ''
    let endIndex = itemsPerPage * currPage
    let startIndex = endIndex - itemsPerPage
    let paginatedItems = array.slice(startIndex, endIndex)
    let paginatedCount = Math.ceil(array.length / itemsPerPage)

    for (let i = 1; i < paginatedCount + 1; i++) {
        if (array.length > 4) {
            paginatedParentElem.insertAdjacentHTML('beforeend', `
            ${i === Number(currPage) ?
                    `<span onclick="addParamToUrl('page',${i})" class="d-flex justify-content-center active align-items-center m-1 text-body2-strong page-number-button">
                    <span>${i}</span>
                </span>`
                    :
                    `<span onclick="addParamToUrl('page',${i})" class="d-flex justify-content-center align-items-center m-1 text-body2-strong page-number-button">
                    <span>${i}</span>
                </span>`
                }
            `)
            
            commentPrevPage.addEventListener('click', () => {
                if (Number(currPage) > 1) {
                    addParamToUrl('page', Number(currPage) - 1)
                }
            })
            commentNextPage.addEventListener('click', () => {
                if (Number(currPage) !== array.length) {
                    addParamToUrl('page', Number(currPage) + 1)
                }
            })

            if (Number(currPage) === paginatedCount) {
                commentPrevPage.classList.remove('hidden')
                commentNextPage.classList.add('hidden')
            } else if (Number(currPage) === 1) {
                commentPrevPage.classList.add('hidden')
                commentNextPage.classList.remove('hidden')
            }
        }
    }

    return paginatedItems
}

const getProductIdByShortName = async () => {

    const productShortName = getUrlParam('name')

    const res = await fetch(`http://localhost:5000/product/name/${productShortName}`)
    const product = await res.json()

    return product
}

const setValueInSearchParams = (urlLink, param, key) => {
    let url = new URL(urlLink)
    let searchParams = new URLSearchParams(url.search)
    searchParams.set(param, key)
    url.search = searchParams.toString()
    return url.toString()
}

const removeParamFromURL = (urlLink, param) => {
    let url = new URL(urlLink)
    let searchParams = new URLSearchParams(url.search)
    searchParams.delete(param)
    url.search = searchParams.toString()
    return url.toString()
}

const searchInArray = (array, searchProperty, searchValue ) => {
    let outputArray = array.filter(item => {
        return item[searchProperty].includes(searchValue)
    })
    return outputArray
}


export { 
    saveIntoLocalStorage,
    getFromLocalStorage,
    getUserID,
    isLogin,
    getUserIDByUserPhone,
    getUserByPhone,
    getUrlParam,
    paginateItems,
    getProductIdByShortName,
    showSwal,
    searchInArray,
    setValueInSearchParams,
    removeParamFromURL
}