const db = require("./DataBase/db");
const moment = require("moment");
const { removeUndefinedKeys } = require("../utils/removeUndefinedKeys");
const testDao = {};

testDao.getQuestions = async (userId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const results = await db.query(
      "SELECT  questionId, questionText, healthFact FROM assessmentquestions WHERE userId = ?",
      [userId],
      "select",
      conn
    );
    if (results.length) {
      return results;
    }
    return null;
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn)  conn.release();
  }
};

testDao.addResponses = async (responseData) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    let responseObj = {
      questionId: responseData.questionId,
      userUUID: response.userUUID,
      answerText: responseData.answerText,
      score: responseData.points,
      date: moment().format("YYYY-MM-DD"),
    };
responseObj = await removeUndefinedKeys(responseObj);
await db.query("INSERT INTO assessmentresponses SET ?", responseObj, "insert", conn)
return responseObj.responseId;


} catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn)  conn.release();
  }
};

// faltan dao de survey

module.exports = testDao;

 
