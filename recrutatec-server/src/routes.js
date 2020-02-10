const { Router } = require('express');
const CandidateController = require('./controllers/CandidateController');

const router = Router();

router.get('/candidates', CandidateController.index);
router.post('/candidates/:id', CandidateController.update);
router.post('/candidates', CandidateController.store);


module.exports = router;