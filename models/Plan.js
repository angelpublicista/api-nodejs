const conn = require('../utils/database')

module.exports = {
    getAllPlans: (req, res) => {
        conn.getConnection(function(err, conn){
            if(err){
                res.status(500).json({
                    success: false,
                    message: "Error conection to database",
                    error: err
                })
            }

            if(conn){
                conn.query('SELECT * FROM plan', (err, data) => {
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
                            plans: data
                        }
                    })
                })
            }
        })
    },

    createPlan: (req, res) => {
        conn.getConnection(function(err, conn){
            if(err){
                res.status(500).json({
                    success: false,
                    message: "Error conection to database",
                    error: err
                })
            }

            if(conn){
                conn.query('INSERT INTO plan set ?', [req.body] , (err, data) => {
                    if(err){
                        res.status(404).json({
                            success: false,
                            message: "Data not found"
                        })

                        return
                    }

                    res.status(200).json({
                        success: true,
                        message: "Plan added",
                        data: req.body
                    })
                })
            }
        })
    },

    updatePlan: (req, res) => {
        conn.getConnection(function(err, conn){
            if(err){
                res.status(500).json({
                    success: false,
                    message: "Error conection to database",
                    error: err
                })
            }

            if(conn){
                conn.query('UPDATE plan set ? WHERE id = ?', [req.body, req.params.id] , (err, data) => {
                    if(err){
                        res.status(404).json({
                            success: false,
                            message: "Data not found"
                        })

                        return
                    }

                    res.status(200).json({
                        success: true,
                        message: "Plan updated",
                        data: req.body
                    })
                })
            }
        })
    },

    deletePlan: (req, res) => {
        conn.getConnection(function(err, conn){
            if(err){
                res.status(500).json({
                    success: false,
                    message: "Error conection to database",
                    error: err
                })
            }

            if(conn){
                conn.query('DELETE FROM plan WHERE id = ?', [req.params.id] , (err, data) => {
                    if(err){
                        res.status(404).json({
                            success: false,
                            message: "Error can't delete"
                        })

                        return
                    }

                    res.status(200).json({
                        success: true,
                        message: "Plan deleted",
                        data: req.body
                    })
                })
            }
        })
    },

    getPlanById: (req, res) => {
        conn.getConnection(function(err, conn){
            if(err){
                res.status(500).json({
                    success: false,
                    message: "Error conection to database",
                    error: err
                })
            }

            if(conn){
                conn.query('SELECT * FROM plan WHERE id = ?', [req.params.id] , (err, data) => {
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