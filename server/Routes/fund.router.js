const express = require('express');
const router = express.Router();
const {getMutualFunds, getMutualFundsById, saveMutualFunds, getSavedMutualFunds, deleteSavedMutualFunds, } = require("../Controllers/fund.controller");
const ensureAuthenticated = require('../Middleware/Auth')

router.get('/getsavedfunds', ensureAuthenticated, getSavedMutualFunds);
router.get('/', ensureAuthenticated, getMutualFunds);
router.get('/:schemeCode', ensureAuthenticated, getMutualFundsById);
router.post('/savefunds', ensureAuthenticated, saveMutualFunds);
router.delete('/deletesavedfunds/:schemeCode', ensureAuthenticated, deleteSavedMutualFunds);

module.exports = router;