const { Router } = require('express');
const CandidateController = require('./controllers/CandidateController');

const router = Router();

router.get('/candidates/:id', CandidateController.get);
router.get('/candidates', CandidateController.index);
router.post('/candidates/:id', CandidateController.update);
router.post('/candidates', CandidateController.store);
router.get('/candidates/auth/linkedin', CandidateController.loginWithLinkedIn);


module.exports = router;