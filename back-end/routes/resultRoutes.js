const express = require('express');
const router = express.Router();
const { submitResult, getResultsByStudent } = require('../controllers/resultController');
const auth = require('../middleware/authMiddleWare');

router.post('/', auth, submitResult);
router.get('/my', auth, getResultsByStudent);

module.exports = router;
