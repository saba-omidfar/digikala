const express = require('express')
const megaMenusRouter = express.Router()
const megaMenusModel = require('../models/MegaMenus')

// Get All MegaMenus and SubMenus API
megaMenusRouter.get('/', async (req, res) => {

    const menus = await megaMenusModel.find({}).lean()

    if (menus.length === 0) {
        return res.status(404).json({ message: "No Menus Available!" });
    }

    const modifiedMenus = []

    // Insert SubMenus
    for (const menu of menus) {
        const submenus = []

        for (const m of menus) {
            if (m.parent?.equals(menu._id)) {
                submenus.push(m)
            }
        }

        menu.submenus = submenus
        
        if (!menu.parent) {
            modifiedMenus.push(menu)
        }
    }

    return res.json(modifiedMenus)
})


module.exports = megaMenusRouter