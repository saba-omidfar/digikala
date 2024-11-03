import { register } from "./funcs/auth.js";

const registerBtn = document.querySelector('#register-btn')

registerBtn.addEventListener('click', e => {
    e.preventDefault()
    register()
})