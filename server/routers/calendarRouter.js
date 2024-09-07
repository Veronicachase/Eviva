const express = require("express");
const {
addCompleteEntry, getAllCalendarEntries, 
updateCompleteEntries, deleteAllCalendarEntriesOneDay, 
deleteSymptom, deleteMood, deleteSex, 
deletePhase, deletePeriod, addNote,addSymptom,
addMood,addSex, addPeriod, updateNote, updateSymptom,
updateMood, updateSex, updateSex




} = require("../controllers/calendarController")
const calendarRouter =express.Router();
const authenticateToken = require("../middleWares/authenticateToken");
const requireSubscription =require("../middleWares/requireSubscription");

calendarRouter.use(authenticateToken);
// general routes
calendarRouter.get("/:calendarId",  requireSubscription, getAllCalendarEntries);
calendarRouter.post("/", requireSubscription,addCompleteEntry);
calendarRouter.patch("/:calendarId", requireSubscription, updateCompleteEntries);
calendarRouter.delete("/:calendarId",  requireSubscription, deleteAllCalendarEntriesOneDay)


//specific routes to add single data/ single table

calendarRouter.post("/addNote", requireSubscription, addNote)
calendarRouter.post("/symptom", requireSubscription, addSymptom)
calendarRouter.post("/mood", requireSubscription, addMood)
calendarRouter.post("/sex", requireSubscription, addSex)
calendarRouter.post("/period", requireSubscription, addPeriod)

//specific routes to update single data/ single table

calendarRouter.post("/updateNote", requireSubscription, updateNote)
calendarRouter.post("/updatesymptom", requireSubscription, updateSymptom)
calendarRouter.post("/updatemood", requireSubscription, updateMood)
calendarRouter.post("/updatesex", requireSubscription, updateSex)
calendarRouter.post("/updateperiod", requireSubscription, updatePeriod)


// specific routes to delete individually
calendarRouter.delete("/:calendarId/symptoms/:symptomId", requireSubscription, deleteSymptom);
calendarRouter.delete("/:calendarId/moods/:moodId", requireSubscription, deleteMood);
calendarRouter.delete("/:calendarId/sex/:sexId", requireSubscription, deleteSex);
calendarRouter.delete("/:calendarId/phases/:phaseId", requireSubscription, deletePhase);
calendarRouter.delete("/:calendarId/periods/:periodId", requireSubscription, deletePeriod);


module.exports = calendarRouter




