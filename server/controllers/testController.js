const testDao = require("../DatabaseAndDao/testDao");

const getQuestions = async (req, res) => {
  try {
    const questions = await testDao.getQuestions(userId);
    res.json(questions);
  } catch (error) {
    console.error("Error al obtener las preguntas", error.message);
    res.status(500).json({ error: error.message });
  }
};

const addResponse = async (req, res) => {
  try {
    const responses = req.body.responses;
    for (let response of responses) {
      await testDao.addResponses(response);
    }
    res.status(200).send({ message: "Responses saved successfully" });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

// faltan controller de survey

module.exports = { addResponse, getQuestions };
