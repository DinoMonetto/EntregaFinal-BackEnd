// src/routes/users.js
import express from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Registrar un nuevo usuario
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ status: 'success', message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Autenticar usuario
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ status: 'error', message: 'Invalid email or password' });
        }

        res.json({ status: 'success', message: 'User authenticated successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export default router;
