const planModel = require('../models/Plan')

module.exports = {
    getAllPlans: planModel.getAllPlans,
    createPlan: planModel.createPlan,
    updatePlan: planModel.updatePlan,
    deletePlan: planModel.deletePlan,
    getPlanById: planModel.getPlanById
}