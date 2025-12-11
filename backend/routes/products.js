const express = require("express");
const router = express.Router();
const db = require("../db");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

/**
 * GET /api/products
 * Público
 */
router.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM products ORDER BY id");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
      const result = await db.query("SELECT * FROM products WHERE id=$1", [id]);

      if (result.rows.length === 0) {
          return res.status(404).json({ error: "Product not found" });
      }

      res.json(result.rows[0]);

  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});



/**
 * POST /api/products
 * Crear producto (solo admin)
 */
router.post("/", auth, role("admin"), upload.single("image"), async (req, res) => {
    const { name, description, price, stock } = req.body;

    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const result = await db.query(
            "INSERT INTO products (name, description, price, stock, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [name, description, price, stock, image_url]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



/**
 * PUT /api/products/:id
 * Actualizar producto (solo admin)
 */
router.put("/:id", auth, role("admin"), async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    try {
        const result = await db.query(
            `UPDATE products
             SET name = COALESCE($1, name),
                 description = COALESCE($2, description),
                 price = COALESCE($3, price),
                 stock = COALESCE($4, stock)
             WHERE id = $5
             RETURNING *`,
            [name, description, price, stock, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


/**
 * DELETE /api/products/:id
 * Eliminar producto (solo admin)
 */
router.delete("/:id", auth, role("admin"), async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            "DELETE FROM products WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product deleted", product: result.rows[0] });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
