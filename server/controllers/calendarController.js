crear estos cotrollers addNote,addSymptom,
addMood,addSex, addPeriod, updateNote, updateSymptom,
updateMood, updateSex, updateSex

const { calendarDao, symptomsDao, moodsDao, sexDao, phasesDao, periodsDao } = require("../DatabaseAndDao/calendarDao");

const addCompleteEntry = async (req, res) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).send("Acceso denegado. Se requieren privilegios de administrador.");
    }
    const userId = req.user.userId;
    try {
        const calendarId = await calendarDao.addCompleteEntry({...req.body, userId});
        res.status(201).json({ message: "Calendario e información creados exitosamente.", calendarId });
    } catch (error) {
        console.error("Error al agregar información al calendario:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const getAllCalendarEntries = async (req, res) => {
    const userId = req.user.userId;
    try {
        const calendarEntries = await calendarDao.getAllCalendarEntries(userId);
        if (calendarEntries.length > 0) {
            res.json(calendarEntries);
        } else {
            res.status(404).json({ message: "No se encontraron entradas de calendario." });
        }
    } catch (error) {
        console.error("Error al obtener las entradas de calendario:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const updateCompleteEntries = async (req, res) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).send("Acceso denegado. Se requieren privilegios de administrador.");
    }
    const userId = req.user.userId;
    const calendarId = req.params.calendarId;
    try {
        const updatedData = req.body;
        const updated = await calendarDao.updateCompleteEntries(userId, calendarId, updatedData);
        if (!updated) {
            return res.status(404).send("No se encontró el calendario con el ID proporcionado.");
        }
        res.json({ message: "Calendario actualizado exitosamente." });
    } catch (error) {
        console.error("Error al actualizar el calendario:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const deleteAllCalendarEntriesOneDay = async (req, res) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).send("Acceso denegado. Se requieren privilegios de administrador.");
    }
    const userId = req.user.userId;
    const calendarId = req.params.calendarId;
    try {
        const deleted = await calendarDao.deleteAllCalendarEntriesOneDay(userId, calendarId);
        if (!deleted) {
            return res.status(404).send("No se encontraron entradas para eliminar en ese día.");
        }
        res.json({ message: "Entradas de calendario eliminadas exitosamente." });
    } catch (error) {
        console.error("Error al eliminar las entradas de calendario:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// verificar si para los individuales hay que agregar el calendarId También 

const deleteSymptom = async (req, res) => {
  const userId = req.user.userId;
  const symptomId = req.params.symptomId;
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .send("Acceso denegado. Se requieren privilegios de administrador.");
  }
  try {
    await symptomsDao.deleteSymptom(userId, symptomId);
    res.json({ message: "Síntoma eliminado exitosamente." });
  } catch (error) {
    console.error("Error al eliminar el síntoma:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const deleteMood = async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .send("Acceso denegado. Se requieren privilegios de administrador.");
  }
  const userId = req.user.userId;
    const moodId = req.params.moodId;
  try {
    
   const deleted= await moodsDao.deleteMood(userId, moodId);
   if (!deleted) {
    return res.status(404).send('No se encontró la fase con el ID proporcionado.');
}
    res.json({ message: "Mood succesfuly deleted " });
  } catch (error) {
    console.error("Error deleting mood:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const deleteSex = async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .send("Acceso denegado. Se requieren privilegios de administrador.");
  }
  const userId = req.user.userId;
    const sexId = req.params.sexId;
  try {
    
    const deleted = await sexDao.deleteSex(userId, sexId);
    if (!deleted) {
        return res.status(404).send('No se encontró la fase con el ID proporcionado.');
    }
    res.json({ message: "Sex details succesfuly deleted" });
  } catch (error) {
    console.error("Error deleting sex details:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const deletePhase = async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .send("Acceso denegado. Se requieren privilegios de administrador.");
  }
  const userId = req.user.userId;
  const phaseId = req.params.phaceId;

  if (!phaseId) {
    return res.status(400).send("Falta el ID de la fase para la eliminación.");
  }

  try {
    const deleted = await phasesDao.deletePhase(userId, phaseId);
    if (!deleted) {
      return res
        .status(404)
        .send("No se encontró la fase con el ID proporcionado.");
    }
    res.json({ message: "Phase succesfully deleted " });
  } catch (error) {
    console.error("Error deleting menstrual phase:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const deletePeriod = async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .send("Acceso denegado. Se requieren privilegios de administrador.");
  }
  const userId = req.user.userId;
    const periodId = req.params.periodId;
  try {
    
    const deleted = await periodsDao.deletePeriod(userId, periodId);
    if (!deleted) {
        return res.status(404).send('No se encontró la fase con el ID proporcionado.');
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
};
