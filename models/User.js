const conn = require('../utils/database')
const bcrypt = require('bcrypt')

module.exports = {
    getAllUsers: (req, res) => {
        conn.getConnection(function(err, conn){
            if(err){
                res.status(500).json({
                    success: false,
                    message: "Error conection to database",
                    error: err
                })
            }

            if(conn){
                conn.query('SELECT * FROM user', (err, data) => {
                    if(err){
                        res.status(404).json({
                            success: false,
                            message: "Data not found"
                        })

                        return
                    }

                    res.status(200).json({
                        success: true,
                        message: "Data found",
                        data: {
                            books: data
                        }
                    })
                })
            }
        })
    },

    createUser: (req, res) => {
        conn.getConnection(function(err, conn){
            if(err){
                res.status(500).json({
                    success: false,
                    message: "Error conection to database",
                    error: err
                })
            }

            if(conn){
                conn.query('INSERT INTO user set ?', [req.body] , (err, data) => {
                    if(err){
                        res.status(404).json({
                            success: false,
                            message: "Data not found"
                        })

                        return
                    }

                    res.status(200).json({
                        success: true,
                        message: "User added",
                        data: req.body
                    })
                })
            }
        })
    },

    updateUser: (req, res) => {
        conn.getConnection(function(err, conn){
            if(err){
                res.status(500).json({
                    success: false,
                    message: "Error conection to database",
                    error: err
                })
            }

            if(conn){
                conn.query('UPDATE user set ? WHERE id = ?', [req.body, req.params.id] , (err, data) => {
                    if(err){
                        res.status(404).json({
                            success: false,
                            message: "Data not found"
                        })

                        return
                    }

                    res.status(200).json({
                        success: true,
                        message: "User updated",
                        data: req.body
                    })
                })
            }
        })
    },

    deleteUser: (req, res) => {
        conn.getConnection(function(err, conn){
            if(err){
                res.status(500).json({
                    success: false,
                    message: "Error conection to database",
                    error: err
                })
            }

            if(conn){
                conn.query('DELETE FROM user WHERE id = ?', [req.params.id] , (err, data) => {
                    if(err){
                        res.status(404).json({
                            success: false,
                            message: "Error can't delete"
                        })

                        return
                    }

                    res.status(200).json({
                        success: true,
                        message: "User deleted",
                        data: req.body
                    })
                })
            }
        })
    },

    getUserById: (req, res) => {
        conn.getConnection(function(err, conn){
            if(err){
                res.status(500).json({
                    success: false,
                    message: "Error conection to database",
                    error: err
                })
            }

            if(conn){
                conn.query('SELECT * FROM user WHERE id = ?', [req.params.id] , (err, data) => {
                    if(err){
                        res.status(404).json({
                            success: false,
                            message: "Data not found"
                        })

                        return
                    }

                    res.status(200).json({
                        success: true,
                        message: "Data found",
                        data: {
                            plan: data
                        }
                    })
                })
            }
        })
    }
}
