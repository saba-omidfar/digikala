const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRouter = require("./routes/authRouter");
const usersRouter = require("./routes/usersRouter");
const citiesRouter = require("./routes/citiesRouter");
const topbarmenusRouter = require("./routes/topBarMenusRouter");
const megaMenusRouter = require("./routes/megaMenusRouter");
const productsRouter = require("./routes/productsRouter");
const categoriesRouter = require("./routes/CategoriesRouter");
const HeaderSliderRouter = require("./routes/headerSliderRouter");
const servicesRouter = require("./routes/digikalaServicesRouter");
const adsRouter = require("./routes/adsRouter");
const popularBrandsRouter = require("./routes/popularBrandsRouter");
const commentsRouter = require("./routes/commentsRouter");
const sellerRouter = require("./routes/sellerRouter");
const productsUserRouter = require("./routes/usersRouter");
const basketRouter = require("./routes/basketRouter");
const userProductsViewRouter = require("./routes/userProductViewRouter");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/provinces", citiesRouter);
app.use("/topbarmenus", topbarmenusRouter);
app.use("/megaMenus", megaMenusRouter);
app.use("/", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/header-slider", HeaderSliderRouter);
app.use("/services", servicesRouter);
app.use("/ads", adsRouter);
app.use("/popular-brands", popularBrandsRouter);
app.use("/comments", commentsRouter);
app.use("/seller", sellerRouter);
app.use("/users", productsUserRouter);
app.use("/basket", basketRouter);
app.use("/user", userProductsViewRouter);

mongoose.connect("mongodb://127.0.0.1:27017/digikala");
mongoose.Promise = global.Promise;
app.listen(5000);
