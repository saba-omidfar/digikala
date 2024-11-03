// Options for the observer (which mutations to observe)
const config = { childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const tooltipElement = document.querySelector('#price__tooltip')
            if(tooltipElement) {

                tippy('#digiclub-score__tooltip', {
                    content: 'بعد از پایان مهلت مرجوعی، برای دریافت امتیاز به صفحه ماموریت‌های کلابی سر بزنید.',
                    theme: 'digikala',
                    placement: 'bottom',
                    arrow: false
                })

                tippy('#price__tooltip', {
                    content: 'این کالا توسط فروشنده آن قیمت‌گذاری شده است',
                    theme: 'digikala',
                    placement: 'bottom',
                    arrow: false
                })

                tippy('#comment__tooltip', {
                    content: 'خریداران کالا با انتخاب یکی از گزینه‌های پیشنهاد یا عدم پیشنهاد، تجربه خرید خود را با کاربران به اشتراک می‌گذارند',
                    theme: 'digikala',
                    placement: 'bottom',
                    arrow: false
                })
                

                tippy('#product-heart__icon', {
                    content:'اضافه به علاقه‌مندی',
                    theme: 'digikala',
                    placement: 'left',
                    arrow: false
                })

                tippy('#product-heart__icon', {
                    content:'به اشتراک‌گذاری کالا',
                    theme: 'digikala',
                    placement: 'left',
                    arrow: false
                })

                tippy('#product-bell__icon', {
                    content:'اطلاع‌رسانی شگفت‌انگیز',
                    theme: 'digikala',
                    placement: 'left',
                    arrow: false
                })

                tippy('#product-line__icon', {
                    content:'نمودار قیمت',
                    theme: 'digikala',
                    placement: 'left',
                    arrow: false
                })

                tippy('#product-compare__icon', {
                    content:'مقایسه کالا',
                    theme: 'digikala',
                    placement: 'left',
                    arrow: false
                })

                tippy('#product-list__icon', {
                    content:'افزودن به لیست',
                    theme: 'digikala',
                    placement: 'left',
                    arrow: false
                })

            }
        }
        else if (mutation.type === 'attributes') {
            const tooltipElement = document.querySelector('#price__tooltip');
            if (tooltipElement) {
                console.log('The ' + mutation.attributeName + ' attribute was modified.')
            }
        }
    }
}

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback)

// Start observing the document for configured mutations
observer.observe(document, config)