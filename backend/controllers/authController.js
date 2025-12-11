const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {

    register: async (req, res) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Missing fields" });
        }

        try {
            const exists = await db.query(
                "SELECT 1 FROM users WHERE email = $1",
                [email]
            );

            if (exists.rows.length > 0) {
                return res.status(400).json({ error: "Email already exists" });
            }

            const hash = await bcrypt.hash(password, 10);

            const role = "user"; // nadie puede autodefinirse admin aquí

            const result = await db.query(
                "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
                [name, email, hash, role]
            );

            res.json({ message: "User registered", user: result.rows[0] });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const result = await db.query(
                "SELECT * FROM users WHERE email=$1",
                [email]
            );

            const user = result.rows[0];
            if (!user) return res.status(400).json({ error: "User not found" });

            const valid = await bcrypt.compare(password, user.password_hash);
            if (!valid) return res.status(400).json({ error: "Invalid password" });

            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "5h" }
            );

            res.json({
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = authController;
