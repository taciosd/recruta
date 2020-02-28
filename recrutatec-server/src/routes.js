const { Router } = require('express');
const CompanyController = require('./controllers/CompanyController');
const CandidateController = require('./controllers/CandidateController');
const OpportunityController = require('./controllers/OpportunityController');

const router = Router();

router.get('/company', CompanyController.get);
router.put('/company', CompanyController.store);

router.get('/candidates/:id', CandidateController.get);
router.get('/candidates', CandidateController.index);
router.post('/candidates/:id', CandidateController.update);
router.post('/candidates', CandidateController.store);
router.get('/candidates/auth/linkedin', CandidateController.loginWithLinkedIn);

router.get('/opportunities', OpportunityController.index);
router.post('/opportunities', OpportunityController.store);


module.exports = router;