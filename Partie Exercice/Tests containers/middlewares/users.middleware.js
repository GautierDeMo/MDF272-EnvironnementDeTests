const User = require('../src/models/user.model');

const createUser = async (req, res, next) => {
    try {
        const { name } = req.body;
        const user = new User({ name });
        await user.save();
        res.status(201).json({user, jwt_secret: "REGARDER MON BEAU SECRET"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const user = await User.findByIdAndUpdate(id, { name }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
