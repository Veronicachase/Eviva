const express = require("express");
const {addCompleteEntry, getAllCalendarEntries, updateCompleteEntries, deleteAllCalendarEntriesOneDay, deleteSymptom, deleteMood, deleteSex, deletePhase, deletePeriod } = require("../controllers/calendarController")
const calendarRouter =express.Router();
const authenticateToken = require("../middleWares/authenticateToken");
const requireSubscription =require("../middleWares/requireSubcription");

calendarRouter.use(authenticateToken);

calendarRouter.get("/:calendarId", authenticateToken, requireSubscription, getAllCalendarEntries);
calendarRouter.post("/",authenticateToken, requireSubscription,addCompleteEntry);
calendarRouter.patch("/: calendarId",authenticateToken, requireSubscription, updateCompleteEntries);
calendarRouter.delete("/:calendarId", authenticateToken, requireSubscription, deleteAllCalendarEntriesOneDay)

// specific routes to delete individually
calendarRouter.delete("/:calendarId/symptoms/:symptomId",authenticateToken, requireSubscription, deleteSymptom);
calendarRouter.delete("/:calendarId/moods/:moodId",authenticateToken, requireSubscription, deleteMood);
calendarRouter.delete("/:calendarId/sex/:sexId",authenticateToken, requireSubscription, deleteSex);
calendarRouter.delete("/:calendarId/phases/:phaseId",authenticateToken, requireSubscription, deletePhase);
calendarRouter.delete("/:calendarId/periods/:periodId",authenticateToken, requireSubscription, deletePeriod);


module.exports = calendarRouter




