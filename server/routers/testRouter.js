const express = require ("express");
const { getQuestions, addResponse } = require ("../controllers/testController");
const testRouter =express.Router();




testRouter.get("/assessmentQ", getQuestions);
//testRouter.get("/surveyQ",   getSurveyQuestions);
testRouter.post("/", addResponse);
//testRouter.post("/", addSurveyResponse);

// como plantear lo de la tercera tabla en workbench o hacerlo igual que assessment

module.exports = testRouter;

