
const calendarDao = require("../DatabaseAndDao/calendarDao");

//**** TODOS LOS ADD -- POST  ****** */

const addCompleteEntry = async (req, res) => {
  if (!req.user) {
    return res.status(403).send("Access denied. Requires login.");
  }
  const userId = req.user.userId;
  try {
    const calendarId = await calendarDao.addCompleteEntry({
      ...req.body,
      userId,
    });
    res
      .status(201)
      .json({
        message: "Calendar and information successfully created.",
        calendarId,
      });
  } catch (error) {
    console.error("Error adding information to calendar:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const addNote = async (req, res) => {
  if (!req.user) {
    return res.status(403).send("Access denied. Requires login.");
  }
  const userId = req.user.userId;
  try {
    const calendarId = await calendarDao.AddNote({ ...req.body, userId });
    res.status(201).json({ message: "Note successfully created.", calendarId });
  } catch (error) {
    console.error("Error adding note to calendar (controller):", error.message);
    res.status(500).json({ error: error.message });
  }
};

const addSymptom = async (req, res) => {
  if (!req.user) {
    return res.status(403).send("Access denied. Requires login.");
  }
  const userId = req.user.userId;
  try {
    const { calendarId, symptomId }= await calendarDao.addSymptom({ ...req.body, userId });
    res
      .status(201)
      .json({
        message: "Symptom successfully created.",
        calendarId,
        symptomId,
      });
  } catch (error) {
    console.error("Error adding symptom (controller):", error.message);
    res.status(500).json({ error: error.message });
  }
};

const addMood = async (req, res) => {
  if (!req.user) {
    return res.status(403).send("Access denied. Requires login.");
  }
  const userId = req.user.userId;
  try {
    const { calendarId, moodId } = await calendarDao.addMood({
      ...req.body,
      userId,
      moodId
    });
    res
      .status(201)
      .json({ message: "Mood successfully created.", calendarId, moodId });
  } catch (error) {
    console.error("Error adding mood (controller):", error.message);
    res.status(500).json({ error: error.message });
  }
};

const addSex = async (req, res) => {
  if (!req.user) {
    return res.status(403).send("Access denied. Requires login.");
  }
  const userId = req.user.userId;
  try {
    const { calendarId, sexId } = await calendarDao.addSex({
      ...req.body,
      userId,
      sexId
    });
    res
      .status(201)
      .json({
        message: "Sex details successfully created.",
        calendarId,
        sexId,
      });
  } catch (error) {
    console.error("Error adding sex details (controller):", error.message);

    res.status(500).json({ error: error.message });
  }
};

const addPeriod = async (req, res) => {
  if (!req.user) {
    return res.status(403).send("Access denied. Requires login.");
  }
  const userId = req.user.userId;
  try {
    const { calendarId, periodId } = await calendarDao.addPeriod({
      ...req.body,
      userId,
      periodId
    });
    res
      .status(201)
      .json({ message: "Period successfully created.", calendarId, periodId });
  } catch (error) {
    console.error("Error adding period (controller):", error.message);

    res.status(500).json({ error: error.message });
  }
};

//*******GETS **********  TODOS LOS GETS */

const getAllCalendarEntries = async (req, res) => {
  const userId = req.user.userId;
  try {
    const calendarEntries = await calendarDao.getAllCalendarEntries(userId);
    if (calendarEntries.length > 0) {
      res.json(calendarEntries);
    } else {
      res.status(403).json({ message: "Calendar entries not found." });
    }
  } catch (error) {
    console.error("Error getting calendar entries:", error.message);
    res.status(500).json({ error: error.message });
  }
};

//*** **********TODOS LOS UPDATES*************** */

const updateCompleteEntries = async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).send("Access denied. Requires login.");
  }
  const userId = req.user.userId;
  const calendarId = req.params.calendarId;
  try {
    const updatedData = req.body;
    const updated = await calendarDao.updateCompleteEntries(
      userId,
      calendarId,
      updatedData
    );
    if (!updated) {
      return res.status(404).send("Calendar not found with the provided ID.");
    }
    res.json({ message: "Calendar successfully updated." });
  } catch (error) {
    console.error("Error updating calendar:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const updateNote = async (req, res) => {
  if (!req.user) {
    return res.status(403).send("Access denied. Requires login");
  }
  const userId = req.user.userId;
  const calendarId = req.params.calendarId;
  try {
    const updatedData = req.body;
    const updated = await calendarDao.updateNote(
      userId,
      calendarId,
      updatedData
    );
    if (!updated) {
      return res.status(404).send("Calendar not found with the provided ID.");
    }
    res.json({ message: "Note successfully updated." });
  } catch (error) {
    console.error("Error updating note:", error.message);

    res.status(500).json({ error: error.message });
  }
};

const updateSymptom = async (req, res) => {
  if (!req.user) {
    return res.status(403).send("Access denied. Requires login.");
  }
  const userId = req.user.userId;
  const { calendarId, symptomId } = req.params;
  try {
    const updatedData = req.body;
    const updated = await calendarDao.updateSymptom(
      userId,
      calendarId,
      symptomId,
      updatedData
    );
    if (!updated) {
      return res.status(404).send("Calendar not found with the provided ID.");
    }
    res.json({ message: "Symptom successfully updated." });
  } catch (error) {
    console.error("Error updating symptom:", error.message);

    res.status(500).json({ error: error.message });
  }
};

const updateMood = async (req, res) => {
  if (!req.user) {
    return res.status(403).send("Access denied. Requires login.");
  }
  const userId = req.user.userId;
  const { calendarId, moodId } = req.params;
  try {
    const updatedData = req.body;
    const updated = await calendarDao.updateMood(
      userId,
      calendarId,
      moodId,
      updatedData
    );
    if (!updated) {
      return res.status(404).send("Calendar not found with the provided ID.");
    }
    res.json({ message: "Mood successfully updated." });
  } catch (error) {
    console.error("Error updating mood:", error.message);

    res.status(500).json({ error: error.message });
  }
};

const updateSex = async (req, res) => {
  if (!req.user) {
    return res.status(403).send("Access denied. Requires login.");
  }
  const userId = req.user.userId;
  const { calendarId, sexId } = req.params;
  try {
    const updatedData = req.body;
    const updated = await calendarDao.updateSex(
      userId,
      calendarId,
      sexId,
      updatedData
    );
    if (!updated) {
      res.status(404).send("Calendar not found with the provided ID.");
    }
    res.json({ message: "Sex details successfully updated." });
  } catch (error) {
    console.error("Error updating sex details:", error.message);

    res.status(500).json({ error: error.message });
  }
};

const updatePeriod = async (req, res) => {
  if (!req.user) {
    return res.status(403).send("Access denied. Requires login");
  }
  const userId = req.user.userId;
  const { calendarId, periodId } = req.params;
  try {
    const updatedData = req.body;
    const updated = await calendarDao.updatePeriod(
      userId,
      calendarId,
      periodId,
      updatedData
    );
    if (!updated) {
      return res.status(404).send("Calendar not found with the provided ID.");
    }
    res.json({ message: "Period successfully updated." });
  } catch (error) {
    console.error("Error updating period:", error.message);

    res.status(500).json({ error: error.message });
  }
};

// ************************tODOS LOS DELETES*******************************
const deleteAllCalendarEntriesOneDay = async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).send("Access denied. Requires login.");
  }
  const userId = req.user.userId;
  const {calendarId} = req.params;
  try {
    const deleted = await calendarDao.deleteAllCalendarEntriesOneDay(
      userId,
      calendarId
    );
    if (!deleted) {
      return res.status(404).send("Entries not found.");
    }
    res.json({ message: "Symptom successfully deleted." });
  } catch (error) {
    console.error("Error deleting symptom:", error.message);

    res.status(500).json({ error: error.message });
  }
};

const deleteSymptom = async (req, res) => {
  const userId = req.user.userId;
  const { symptomId } = req.params;
  if (!req.user) {
    return res.status(403).send("Access denied. Requires login.");
  }
  try {
    const deleted = await symptomsDao.deleteSymptom(userId, symptomId);
    if (!deleted) {
      return res.status(404).send("Symptom not found with the provided ID.");
    }

    res.json({ message: "Symptom successfully deleted.." });
  } catch (error) {
    console.error("Error deleting symptom:", error.message);

    res.status(500).json({ error: error.message });
  }
};

const deleteMood = async (req, res) => {
  if (!req.user) {
    return res.status(403).send("Access denied. Requires login.");
  }
  const userId = req.user.userId;
  const { moodId } = req.params;
  try {
    const deleted = await moodsDao.deleteMood(userId, moodId);
    if (!deleted) {
      return res.status(404).send("Mood not found with the provided ID.");
    }
    res.json({ message: "Mood succesfuly deleted " });
  } catch (error) {
    console.error("Error deleting mood:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const deleteSex = async (req, res) => {
  if (!req.user) {
    return res.status(403).send("Access denied. Requires login.");
  }
  const userId = req.user.userId;
  const { sexId } = req.params;
  try {
    const deleted = await sexDao.deleteSex(userId, sexId);
    if (!deleted) {
      return res
        .status(404)
        .send("Sex details not found with the provided ID.");
    }
    res.json({ message: "Sex details successfully deleted" });
  } catch (error) {
    console.error("Error deleting sex details:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const deletePhase = async (req, res) => {
  if (!req.user) {
    return res.status(403).send("Access denied. Requires login.");
  }
  const userId = req.user.userId;
  const { phaseId } = req.params;

  if (!phaseId) {
    return res.status(400).send("Phase ID required for deletion.");
  }

  try {
    const deleted = await phasesDao.deletePhase(userId, phaseId);
    if (!deleted) {
      return res.status(404).send("Phase not found with the provided ID.");
    }
    res.json({ message: "Phase succesfully deleted " });
  } catch (error) {
    console.error("Error deleting phase:", error.message);

    res.status(500).json({ error: error.message });
  }
};

const deletePeriod = async (req, res) => {
  if (!req.user) {
    return res.status(403).send("Access denied. Requires login.");
  }
  const userId = req.user.userId;
  const { periodId } = req.params;
  try {
    const deleted = await periodsDao.deletePeriod(userId, periodId);
    if (!deleted) {
      return res.status(404).send("Period not found with the provided ID.");
    }
    res.json({ message: "Period succesfuly deleted" });
  } catch (error) {
    console.error("Error deleting period:", error.message);

    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addCompleteEntry,
  getAllCalendarEntries,
  updateCompleteEntries,
  deleteAllCalendarEntriesOneDay,
  deleteSymptom,
  deleteMood,
  deleteSex,
  deletePhase,
  deletePeriod,
  addNote,
  addSymptom,
  addMood,
  addSex,
  addPeriod,
  updateNote,
  updateSymptom,
  updateMood,
  updateSex,
  updatePeriod,
};
