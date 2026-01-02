import User from '../models/user.model.js';

export const signUp = async (req, res) => {
    const { username, passcode } = req.body;

    try {
        const user = await User.signup(username, passcode);
        
        res.status(201).json({ message: 'User created', user });
    } catch (error) {
        let errors = {};
        try {
            errors = JSON.parse(error.message);
        } catch {
            errors.general = 'An error occurred during signup';
        }
        res.status(400).json({ errors });
    }
};