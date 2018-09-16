const getCohortStudentsQuery = require('../database/queries/getCohortStudents');
const getCohortsQuery = require('../database/queries/getCohorts');

exports.get = (request, response) => {
  getCohortsQuery((err, res) => {
    if (err) {
      return response.render('cohort', {
        err: 'cannot get the cohorts !', styleFile: 'cohorts', jsFile: 'cohort', layout: 'adminLayout',
      });
    }
    return response.render('cohort', {
      res, styleFile: 'cohorts', jsFile: 'cohort', layout: 'adminLayout',
    });
  });
};


exports.getStudents = (request, response) => {  
  const { cohortID } = request.params;
  getCohortStudentsQuery(cohortID, (err, res) => {
    if (err) {
      return response.render('cohortStudents', {
        err: 'cannot get cohort Students !',
        styleFile: 'cohorts',
        jsFile: 'cohort',
        layout: 'main',
      });
    }

    if (res.length === 0) {
      return response.render('cohortStudents', {
        err: 'There are No Student in this Fac !',
        styleFile: 'cohorts',
        jsFile: 'cohortStudent',
        layout: 'adminLayout',
      });
    }

    return response.render('cohortStudents', {
      res,
      cohortname: res[0].cohortname,
      styleFile: 'cohorts',
      jsFile: 'cohortStudent',
      layout: 'adminLayout',
    });
  });
};