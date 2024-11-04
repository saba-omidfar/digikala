const mongoose = require("mongoose");
require('dotenv').config();
const express = require("express");
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
const productsUserRouter = require("./routes/productsUserRouter"); // تغییر نام
const basketRouter = require("./routes/basketRouter");
const userProductsViewRouter = require("./routes/userProductViewRouter");

const app = express();

app.use(cors());
app.use(express.json()); // استفاده از express.json() به جای bodyParser


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
app.use("/products-user", productsUserRouter); // تغییر نام
app.use("/basket", basketRouter);
app.use("/user", userProductsViewRouter);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    const port = process.env.PORT || 5000;
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas', err);
    process.exit(1);
  });
