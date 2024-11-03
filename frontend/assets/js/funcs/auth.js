import { getFromLocalStorage, getUserIDByUserPhone, getUserByPhone, saveIntoLocalStorage, showSwal } from "./utils.js"

const register = () => {

    const phoneInput = document.querySelector('#phone')

    const newUserInfos = {
        username: "",
        name: "",
        email: "",
        password: "",
        phone: phoneInput.value.trim()
    }

    getUserByPhone().then(users => {

        let isUserInDB = users.some(user => {
            return newUserInfos.phone === user.phone
        })

        if (isUserInDB) {
            showSwal(
                'کاربر عزیز شما قبلا ثبت‌نام کرده‌اید',
                'success',
                'ورود به صفحه اصلی',
                () => {
                    getUserIDByUserPhone(newUserInfos.phone)
                }
            )
        } else {
            showSwal(
                'کاربر عزیز ثبت‌نام شما با موفیت انجام شد',
                'success',
                'ok',
                () => {
                    createNewUserAccount(newUserInfos)
                }
            )
        }
    })
}

const createNewUserAccount = (userInfos) => {
    fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfos)
    })

    fetch(`http://localhost:5000/users/phone`, {
        headers: {
            Authorization: `${userInfos.phone}`
        }
    })
        .then(response => response.json())
        .then(data => {
            saveIntoLocalStorage('userID', data[0]._id)

            // Create a new basket for the user
            fetch(`http://localhost:5000/basket/create/${data[0]._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            location.href = '../index.html'
        })
}

const getMe = async () => {

    const userID = getFromLocalStorage('userID')

    if (userID) {
        const res = await fetch(`http://localhost:5000/auth/me`, {
            headers: {
                Authorization: `${userID}`
            }
        })
        const data = await res.json()
        return data
    }
}

export { register, getMe }