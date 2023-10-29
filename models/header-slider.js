const mongoose = require('mongoose')

let headerSliderSchema = mongoose.Schema(
    {
        cover: {
            type: String,
            required: true,
        }
    }, { timestamps: true }
)


let HeaderSlider = mongoose.model('HeaderSlider', headerSliderSchema)
module.exports = HeaderSlider