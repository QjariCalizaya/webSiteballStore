const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth.js");
const usersRoutes = require("./routes/users.js");
const productsRoutes = require("./routes/products.js");
const ordersRoutes = require("./routes/orders.js");
const couriersRoutes = require("./routes/couriers.js");
const warehousesRoutes = require("./routes/warehouses.js");





// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/couriers", couriersRoutes);
app.use("/api/warehouses", warehousesRoutes);
app.use("/uploads", express.static("uploads"));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor backend МойМяч corriendo en http://localhost:" + PORT);
});



