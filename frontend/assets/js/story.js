const options = {}; // See ./src/options.ts

const element = document.querySelector("#stories");
const cube = new Zuck(element, {
    skin: 'snapgram',
    avatars: true,
    list: false,
    cubeEffect: true,
    autoFullScreen: false,
    backButton: true,
    previousTap: true,
    localStorage: true,
    backNative: true,
    // stories : [
    //     {
    //         id: "1",
    //     },
    //     {
    //         id: "2",
    //     },
    //     {
    //         id: "3",
    //     },
    //     {
    //         id: "4",
    //     },
    //     {
    //         id: "5",
    //     },
    //     {
    //         id: "6",
    //     },
    //     {
    //         id: "7",
    //     },
    //     {
    //         id: "8",
    //     }
    
    // ]
})

// document.querySelectorAll('.story').forEach(story => {
//     story.addEventListener('click', event => {
//         let storyParent = event.target.parentElement.parentElement.parentElement
//         let id = storyParent.dataset.id
//         cube.stories.findIndex(story => {
//             return story.id === id
//         })
//         if(index !== -1) {
//             cube.next(index)
//             angleY += 90;
//             rotateCube()
//         }
//     })
// })

// function rotateCube () {
//     cube.container.style.transform = 'rotateX('+ angleX +'deg) rotateY(' + angleY +'deg)'
// }

// let angleX = 0
// let angleY = 0


