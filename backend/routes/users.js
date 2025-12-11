const express = require("express");
const router = express.Router();
const db = require("../db");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const bcrypt = require("bcrypt");

// GET /api/users    (solo admin puede ver todos los usuarios)
router.get("/", auth, role("admin"), async (req, res) => {
    try {
        const result = await db.query("SELECT id, name, email, role FROM users");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/users/create-admin   (solo admin puede crear nuevos admins)
router.post("/create-admin", auth, role("admin"), async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const check = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (check.rows.length > 0) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hash = await bcrypt.hash(password, 10);

        const result = await db.query(
            "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, 'admin') RETURNING id, name, email, role",
            [name, email, hash]
        );

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch("/change-email", auth, async (req, res) => {
    const { newEmail, password } = req.body;
    const userId = req.user.id;

    if (!newEmail || !password) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        const result = await db.query("SELECT * FROM users WHERE id=$1", [userId]);
        const user = result.rows[0];

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return res.status(400).json({ error: "Invalid password" });

        await db.query("UPDATE users SET email=$1 WHERE id=$2", [newEmail, userId]);

        res.json({ message: "Email updated successfully", newEmail });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch("/change-password", auth, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        const result = await db.query("SELECT * FROM users WHERE id=$1", [userId]);
        const user = result.rows[0];

        const valid = await bcrypt.compare(currentPassword, user.password_hash);
        if (!valid) return res.status(400).json({ error: "Invalid current password" });

        const hash = await bcrypt.hash(newPassword, 10);

        await db.query("UPDATE users SET password_hash=$1 WHERE id=$2", [hash, userId]);

        res.json({ message: "Password updated successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
