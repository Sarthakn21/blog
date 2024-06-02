import User from "../models/user.js";

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or Email already exists' });
        }

        const user = new User({ username, email, password });
        await user.save();

        const token = user.generateAccessToken();
        res.cookie('accessToken', token, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000, });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = user.generateAccessToken();
        res.cookie("accessToken", token, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000, });
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};





export {
    registerUser,
    loginUser
}