const express = require("express");
const {
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
} = require("../controllers/calendarController");

const calendarRouter = express.Router();
const authenticateToken = require("../middleWares/authenticateToken");
const requireSubscription = require("../middleWares/requireSubscription");

calendarRouter.use(authenticateToken);

// Rutas generales
calendarRouter.get("/:calendarId", requireSubscription, getAllCalendarEntries);
calendarRouter.post("/", requireSubscription, addCompleteEntry);
calendarRouter.patch("/:calendarId", requireSubscription, updateCompleteEntries);
calendarRouter.delete("/:calendarId", requireSubscription, deleteAllCalendarEntriesOneDay);

// Rutas para agregar datos individuales
calendarRouter.post("/addNote", requireSubscription, addNote);
calendarRouter.post("/symptom", requireSubscription, addSymptom);
calendarRouter.post("/mood", requireSubscription, addMood);
calendarRouter.post("/sex", requireSubscription, addSex);
calendarRouter.post("/period", requireSubscription, addPeriod);

// Rutas para actualizar datos individuales
calendarRouter.patch("/updateNote/:calendarId", requireSubscription, updateNote);
calendarRouter.patch("/updatesymptom/:calendarId/:symptomId", requireSubscription, updateSymptom);
calendarRouter.patch("/updatemood/:calendarId/:moodId", requireSubscription, updateMood);
calendarRouter.patch("/updatesex/:calendarId/:sexId", requireSubscription, updateSex);
calendarRouter.patch("/updateperiod/:calendarId/:periodId", requireSubscription, updatePeriod);

// Rutas para eliminar datos individuales
calendarRouter.delete("/:calendarId/symptoms/:symptomId", requireSubscription, deleteSymptom);
calendarRouter.delete("/:calendarId/moods/:moodId", requireSubscription, deleteMood);
calendarRouter.delete("/:calendarId/sex/:sexId", requireSubscription, deleteSex);
calendarRouter.delete("/:calendarId/phases/:phaseId", requireSubscription, deletePhase);
calendarRouter.delete("/:calendarId/periods/:periodId", requireSubscription, deletePeriod);

module.exports = calendarRouter;
