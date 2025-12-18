const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/authMiddleware");

// Crear una nueva orden
router.post("/", auth, async (req, res) => {
    const userId = req.user.id;
    const { items } = req.body; 
    // items = [{ id, quantity }]

    if (!items || items.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
    }

    try {
        await db.query("BEGIN"); // INICIAMOS LA TRANSACCIÓN

        // Calcular el precio total
        let total = 0;

        for (const item of items) {
            const productRes = await db.query(
                "SELECT price, stock FROM products WHERE id = $1",
                [item.id]
            );

            if (productRes.rows.length === 0) {
                throw new Error("Product not found");
            }

            const product = productRes.rows[0];

            if (product.stock < item.quantity) {
                throw new Error(`Not enough stock for product ID ${item.id}`);
            }

            total += product.price * item.quantity;

            // Reducir stock
            await db.query(
                "UPDATE products SET stock = stock - $1 WHERE id = $2",
                [item.quantity, item.id]
            );
        }

        // Crear la orden
        const orderRes = await db.query(
            "INSERT INTO orders (user_id, status, total_price, created_at) VALUES ($1, 'pending', $2, NOW()) RETURNING id",
            [userId, total]
        );

        const orderId = orderRes.rows[0].id;

        // Insertar order_items
        for (const item of items) {
            const productRes = await db.query(
                "SELECT price FROM products WHERE id = $1",
                [item.id]
            );

            const price = productRes.rows[0].price;

            await db.query(
                "INSERT INTO order_items (order_id, product_id, quantity, subtotal) VALUES ($1, $2, $3, $4)",
                [orderId, item.id, item.quantity, price * item.quantity]
            );
        }

        await db.query("COMMIT"); // FINALIZAR TRANSACCIÓN

        res.json({ message: "Order created", orderId });

    } catch (err) {
        await db.query("ROLLBACK"); // EN CASO DE ERROR
        res.status(500).json({ error: err.message });
    }
});

// Obtener pedidos del usuario logueado
router.get("/my", auth, async (req, res) => {
    const userId = req.user.id;

    try {
        const result = await db.query(
            `SELECT id, status, total_price, created_at
             FROM orders
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [userId]
        );

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
