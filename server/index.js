const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(cookieParser());
const db = require("./models");

// Routers
const categoryRouter = require("./routes/Categories");
app.use("/categories", categoryRouter);
const productRouter = require("./routes/Products");
app.use("/products", productRouter);
const productCategoryRouter = require("./routes/productCategory");
app.use("/productCategory", productCategoryRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
