const express = require('express');

const home = require('./webSiteHome');
const cohortWebsite = require('./cohortWebsite');
const clientProjectsWebsite = require('./clientWebsite');
const communityProjectsWebsite = require('./communityWebsite');
const projectPageWebsite = require('./projectPageWebsite');
const login = require('./login');
const error = require('./error');
const adminHomePage = require('./adminHomePage');
const cohorts = require('./cohorts');
const students = require('./Students');
const { authCheck } = require('./middleware');

const router = express.Router();

router.get('/', home.get);
router.get('/cohort', cohortWebsite.get);
router.get('/clientProjects', clientProjectsWebsite.get);
router.get('/communityProjects', communityProjectsWebsite.get);
router.get('/id', projectPageWebsite.get);


router.get('/admin/login', login.get);
router.post('/admin/login', login.post);

router.get('/admin', authCheck, adminHomePage.get);
router.get('/admin/logout', authCheck, adminHomePage.logout);
router.get('/admin/cohorts', authCheck, cohorts.get);
router.post('/admin/cohorts', authCheck, cohorts.addCohort);
router.delete('/admin/cohorts', authCheck, cohorts.deleteCohort);
router.get('/admin/cohorts/:cohortID/students', authCheck, cohorts.getStudents);
router.post('/admin/cohorts/:cohortID/newStudent', authCheck, students.post);

router.use(error.client);
router.use(error.server);

module.exports = router;
