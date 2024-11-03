
import { getAndShowProductDetails } from "./funcs/product.js"

const digikalaPostModalCloseIcon = document.querySelector('#close-digikala-post-modal')
const digikalaPostModal = document.querySelector('.digikala-post__modal-bg')


// ----------------------------------------------------------------


// document.querySelector('.zoom-img__container').addEventListener('mousemove', event => {

//     let originalImage = document.getElementById('imgZoom')
//     let detailsImage = document.querySelector('.zoom__window')

//     let posX = event.offsetX ? (event.offsetX) : event.pageX - originalImage.offsetLeft;
//     let posY = event.offsetY ? (event.offsetY) : event.pageY - originalImage.offsetTop;

//     detailsImage.style.backgroundPosition = (posX - 9) + "%" + (posY - 9) + "%"

// })

window.addEventListener('load', () => {
    imageZoom('originalImage' , 'zoomedImage')
    getAndShowProductDetails()
})


document.querySelector('.cart-shopping__link').addEventListener('mouseenter', () => {
    document.querySelector('.cart-shopping__popup').classList.add('active-modal__cart-shopping')
})

document.querySelector('.cart-shopping__popup').addEventListener('mouseleave', () => {
    document.querySelector('.cart-shopping__popup').classList.remove('active-modal__cart-shopping')
})

function imageZoom(originalImageID, zoomedImageID) {

    let img, lens, result, cx, cy

    img = document.getElementById(originalImageID)
    result = document.getElementById(zoomedImageID)

    /*create lens:*/
    lens = document.createElement("DIV")
    lens.classList.add("zoom-lens")

    /*insert lens:*/
    img.parentElement.insertBefore(lens, img)

    /*calculate the ratio between result DIV and lens:*/
    cx = result.offsetWidth / lens.offsetWidth
    cy = result.offsetHeight / lens.offsetHeight

    /*set background properties for the result DIV:*/
    result.style.backgroundImage = "url('" + img.src.slice(22) + "')"
    result.style.backgroundSize = (img.width * cx) + 'px' + (img.height * cy) + 'px'

    /*execute a function when someone moves the cursor over the image, or the lens:*/
    lens.addEventListener("mousemove", moveLens)
    img.addEventListener("mousemove", moveLens)

    /*and also for touch screens:*/
    lens.addEventListener("touchmove", moveLens)
    img.addEventListener("touchmove", moveLens)

    function moveLens(e) {

        let pos, x, y

        /*prevent any other actions that may occur when moving over the image:*/
        e.preventDefault()

        /*get the cursor's x and y positions:*/
        pos = getCursorPos(e)

        /*calculate the position of the lens:*/
        x = pos.x - (lens.offsetWidth / 2)
        y = pos.y - (lens.offsetHeight / 2)

        /*prevent the lens from being positioned outside the image:*/
        if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
        if (x < 0) { x = 0; }
        if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
        if (y < 0) { y = 0; }

        /*set the position of the lens:*/
        lens.style.left = x + "px"
        lens.style.top = y + "px"

        /*display what the lens "sees":*/
        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px"
    }

    function getCursorPos(e) {

        let a, x = 0, y = 0

        e = e || window.event

        /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect()

        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left
        y = e.pageY - a.top

        /*consider any page scrolling:*/
        x = x - window.pageXOffset
        y = y - window.pageYOffset
        return { x: x, y: y }
    }
}

document.querySelectorAll('.product-pics__item').forEach(productItem => {
    productItem.addEventListener('click', () => {
        document.querySelector('.images-product__modal-bg').classList.remove('hidden')
    })
})

document.querySelector('.images-product__modal-close-icon').addEventListener('click', () => {
    document.querySelector('.images-product__modal-bg').classList.add('hidden')
})

document.body.addEventListener('click', event => {
    if(event.target.classList.contains('images-product__modal-bg')) {
        document.querySelector('.images-product__modal-bg').classList.add('hidden')
    }
})

// Close Post Digikala Modal
digikalaPostModalCloseIcon.addEventListener('click', () => {
    digikalaPostModal.classList.add('hidden')
})

