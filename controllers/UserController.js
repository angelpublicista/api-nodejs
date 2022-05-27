const userModel = require('../models/User')

module.exports = {
    getAllUsers: userModel.getAllUsers,
    getUserById: userModel.getUserById,
    createUser: userModel.createUser,
    updateUser: userModel.updateUser,
    deleteUser: userModel.deleteUser
}