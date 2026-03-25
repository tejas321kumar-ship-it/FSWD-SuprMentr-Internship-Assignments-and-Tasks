const express = require("express");
const productRoutes = require("./routes/productRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = 3013;

app.use(express.json());
app.use(logger);

app.get("/", function (req, res) {
  res.send("Task 13 Product MVC API is running");
});

app.use("/products", productRoutes);

app.use(errorHandler);

app.listen(PORT, function () {
  console.log("Task 13 server running on http://localhost:" + PORT);
});
