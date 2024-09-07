const db = require("./DataBase/db");
const moment = require("moment");
const { removeUndefinedKeys } = require("../utils/removeUndefinedKeys");
const calendarDao = {}, moodsDao = {}, symptomsDao = {}, phasesDao = {}, sexDao = {}, periodsDao = {};





//******** ADD QUERIES */
calendarDao.addCompleteEntry = async (
  calendarData,
  symptomsData,
  moodsData,
  periodsData,
  sexData,
  phaseData
) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    await conn.beginTransaction(); 

    // Remover claves indefinidas o vacías antes de insertar
    calendarData = removeUndefinedKeys(calendarData);
    symptomsData = removeUndefinedKeys(symptomsData);
    moodsData = removeUndefinedKeys(moodsData);
    periodsData = removeUndefinedKeys(periodsData);
    sexData = removeUndefinedKeys(sexData);
    phaseData = removeUndefinedKeys(phaseData);

    const calendarResults = await db.query(
      "INSERT INTO calendar SET ?",
      [calendarData],"insert",
      conn
    );
    const calendarId = calendarResults.insertId;

    // Preparar  e insertar datos en las tablas relacionadas usando el calendarId obtenido
    symptomsData.calendarId = calendarId;
    moodsData.calendarId = calendarId;
    periodsData.calendarId = calendarId;
    sexData.calendarId = calendarId;
    phaseData.calendarId = calendarId;

    await db.query("INSERT INTO symptoms SET ?", [symptomsData],"insert", conn);

    await db.query("INSERT INTO moods SET ?", [moodsData],"insert", conn);

    await db.query("INSERT INTO sex SET ?", [sexData],"insert", conn);

    await db.query("INSERT INTO periods SET ?", [periodsData],"insert", conn);

    await db.query("INSERT INTO cycle_phase SET ?", [phaseData],"insert", conn);

    await conn.commit();
    return calendarId;
  } catch (e) {
    await conn.rollback();
    console.error(e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};


calendarDao.AddNote = async(noteData)=>{
let conn = null;
let calendarObj ={
  note:noteData.note,
  date: moment().format("YYYY-MM-DD")
}

try {

  conn = await db.createConnection();
  const addData = await db.query("INSERT INTO calendar SET ?", calendarObj, "insert", conn)
  return calendarObj.calendarId
} catch (error) {
  console.error (error.message)
  throw error;
}finally {
  if (conn) await conn.end();
}
}

calendarDao.addSymptom = async(symtomData)=>{
  let conn = null;
  let symptomObj ={
    date: moment().format("YYYY-MM-DD"),
    symptomType:symtomData.symptomType,
    intensity:symtomData.intensity,
  }
  
  try {
  
    conn = await db.createConnection();
    const addData = await db.query("INSERT INTO symptoms SET ?", symptomObj, "insert", conn)
    return symptomObj.symptomId
  } catch (error) {
    console.error (error.message)
    throw error;
  }finally {
    if (conn) await conn.end();
  }
  }

  calendarDao.addMood = async(moodsData)=>{
    let conn = null;
    let moodsObj ={
      date: moment().format("YYYY-MM-DD"),
      moodType:moodsData.moodType,
      
    }
    
    try {
    
      conn = await db.createConnection();
      const addData = await db.query("INSERT INTO moods SET ?", moodsObj, "insert", conn)
      return moodsObj.moodId
    } catch (error) {
      console.error (error.message)
      throw error;
    }finally {
      if (conn) await conn.end();
    }
    }

    calendarDao.addSex = async(sexData)=>{
      let conn = null;
      let sexObj ={
        date: moment().format("YYYY-MM-DD"),
        partnet:sexData.partner,
        protectionUsed:sexData.protectionUsed,
        pain:sexData.pain,
        lubrication:sexData.lubrication,
        orgasm:sexData.orgasm
      }
      
      try {
      
        conn = await db.createConnection();
        const addData = await db.query("INSERT INTO sex SET ?", sexObj, "insert", conn)
        return sexObj.sexId
      } catch (error) {
        console.error (error.message)
        throw error;
      }finally {
        if (conn) await conn.end();
      }
      }
  
      calendarDao.addPeriod= async(periodData)=>{
        let conn = null;
        let periodObj ={
          startDate: moment().format("YYYY-MM-DD"),
          endDate:moment().format("YYYY-MM-DD"),
          flowType:periodData.flowType,
          pregnant:periodData.pregnant,
        }
        
        try {
        
          conn = await db.createConnection();
          const addData = await db.query("INSERT INTO periods SET ?", periodObj, "insert", conn)
          return periodObj.periodId
        } catch (error) {
          console.error (error.message)
          throw error;
        }finally {
          if (conn) await conn.end();
        }
        }
      


/*******GET QUERIES */

calendarDao.getAllCalendarEntries = async (userId) => {
    let conn = null;
    try {
      conn = await db.createConnection();
      const query = `
        SELECT 
          cal.*, 
          cyc.phase, 
          cyc.description, 
          mo.moodType, 
          pe.startDate, 
          pe.endDate, 
          pe.flowType, 
          pe.pregnant, 
          sex.partner, 
          sex.protectionUsed, 
          sex.pain, 
          sex.lubrication, 
          sex.orgasm, 
          sy.symptomType, 
          sy.intensity
        FROM calendar cal
        LEFT JOIN symptoms sy ON cal.calendarId = sy.calendarId
        LEFT JOIN moods mo ON cal.calendarId = mo.calendarId
        LEFT JOIN periods pe ON cal.calendarId = pe.calendarId
        LEFT JOIN sex ON cal.calendarId = sex.calendarId
        LEFT JOIN cycle_phase cyc ON cal.calendarId = cyc.calendarId
        WHERE cal.userId = ?
      `;
      const results = await db.query(query, [userId],"select", conn);
      if (results.length) {
        return results;
      }
      return null;
    } catch (e) {
      console.error(e.message);
      throw e;
    } finally {
      if (conn) await conn.end();
    }
  };




/****** UPDATE QUERIES  */





calendarDao.updateNote = async(userId)=>{}
calendarDao.updateSymptom = async(userId)=>{}
calendarDao.updateMood = async(userId)=>{}
calendarDao.updateSex = async(userId)=>{}
calendarDao.updatePeriod = async(userId)=>{}


  // revisar si colocar o no el userId
calendarDao.updateCompleteEntries = async (userId, calendarId, calendarData, symptomsData, moodsData, periodsData, sexData, phaseData) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    await conn.beginTransaction();

if (Object.keys(calendarData).length > 0){
    calendarData = removeUndefinedKeys(calendarData);
    await db.query ("UPDATE calendar SET ? WHERE calendar = ?", [calendarData, calendarId], "update", conn)
}
if (symptomsData && Object.keys(symptomsData).length > 0 ){
  symptomsData =removeUndefinedKeys(symptomsData);
  await db.query ("UPDATE symptoms SET ? WHERE calendarId = ?",[symptomsData, calendarId], "update", conn )
}

if (moodsData && Object.keys(moodsData).length > 0 ){
    moodsData =removeUndefinedKeys(moodsData);
    await db.query ("UPDATE moods SET ? WHERE calendarId = ?",[moodsData, calendarId], "update", conn )
}
if (periodsData && Object.keys(periodsData).length > 0) {
    periodsData = removeUndefinedKeys(periodsData);
    await db.query("UPDATE periods SET ? WHERE calendarId = ?", [periodsData, calendarId],"update", conn);
  }

  if (sexData && Object.keys(sexData).length > 0) {
    sexData = removeUndefinedKeys(sexData);
    await db.query("UPDATE sex SET ? WHERE calendarId = ?", [sexData, calendarId],"update", conn);
  }

  if (phaseData&& Object.keys(phaseData).length > 0) {
    phaseData = removeUndefinedKeys(phaseData);
    await db.query("UPDATE cycle_phases SET ? WHERE calendarId = ?", [phaseData, calendarId],"update", conn);
  }

  await conn.commit();
  return true; 
} catch (e) {
  await conn.rollback(); 
  console.error(e.message);
  throw e;
} finally {
  if (conn) await conn.end();
}
};




// ***** DELETE QUERIES*********
calendarDao.deleteAllCalendarEntriesOneDay = async (userId, calendarId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    await db.query(
      "DELETE FROM calendar WHERE calendarId = ? AND userId = ?",
      [calendarId, userId],"delete",
      "delete",
      conn
    );
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};


calendarDao.deleteCalendar = async (userId, calendarId, date) => {
    let conn = null;
    try {
      conn = await db.createConnection();
      await conn.query("DELETE FROM calendar WHERE calendarId = ? AND userId = ? AND date = ?", [calendarId, userId, date], "delete", conn);
    } catch (error) {
      console.error("Error al eliminar calendario/ nota:", error);
      throw error;
    } finally {
      if (conn) {
        conn.end();
      }
    }
  };

symptomsDao.deleteSymptom = async (userId, symptomId, date) => {
    let conn = null;
    try {
      conn = await db.createConnection();
      await conn.query("DELETE FROM symptoms WHERE symptomId = ? AND userId=? AND date = ?", [symptomId, userId, date], "delete", conn);
    } catch (error) {
      console.error("Error al eliminar síntoma:", error);
      throw error;
    } finally {
      if (conn) {
        conn.end();
      }
    }
  };
  moodsDao.deleteMood = async (userId, moodId, date) => {
    let conn = null;
    try {
      conn = await db.createConnection();
      await conn.query("DELETE FROM moods WHERE moodId = ? AND userId=? AND date = ?", [moodId, userId, date], "delete",conn);
    } catch (error) {
      console.error("Error al eliminar estado de ánimo--dao:", error);
      throw error;
    } finally {
      if (conn) {
        conn.end();
      }
    }
  };

 sexDao.deleteSex = async (sexId, userId, date) => {
    let conn = null;
    try {
      conn = await db.createConnection();
      await conn.query("DELETE FROM sex WHERE sexId = ? AND userId=? AND date = ?", [sexId, userId, date], "delete",conn);
    } catch (error) {
      console.error("Error al eliminar sex--dao:", error);
      throw error;
    } finally {
      if (conn) {
        conn.end();
      }
    }
  };
  phasesDao.deletePhase = async (userId, phaseId) => {
    let conn = null;
    try {
      conn = await db.createConnection();
      await conn.query("DELETE FROM cycle_phases WHERE phaseId = ? AND userId=? ", [phaseId, userId], "delete",conn);
    } catch (error) {
      console.error("Error al eliminar phases--dao:", error);
      throw error;
    } finally {
      if (conn) {
        conn.end();
      }
    }
  };

  periodsDao.deletePeriod = async (periodId) => {
    let conn = null;
    try {
      conn = await db.createConnection();
      await conn.query("DELETE FROM periods WHERE periodId = ? AND userId=?", [periodId], "delete",);
    } catch (error) {
      console.error("Error al eliminar periodo--dao:", error);
      throw error;
    } finally {
      if (conn) {
        conn.end();
      }
    }
  };

  module.exports = {
    calendarDao,
    symptomsDao,
    moodsDao,
    sexDao,
    phasesDao,
    periodsDao
  };
