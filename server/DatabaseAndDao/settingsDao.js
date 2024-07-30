const db = require("./DataBase/db");
const { removeUndefinedKeys } = require("../utils/removeUndefinedKeys");
const settingsDao = {};



settingsDao.getAllSettings = async (userId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const results = await db.query("SELECT * FROM settingss WHERE userId = ?", [userId], "select", conn);
    if (results.length) {
      return results ;
    }
    return null;
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};

settingsDao.updateSettings = async (userId, settingsId, data) => {
  let conn = null
  try {
    conn = await db.createConnection();
    const cleanData = removeUndefinedKeys(data);
    await db.query(
      "UPDATE settingss SET ? WHERE settingsId = ? AND userId = ?",
      [cleanData, settingsId, userId],
      "update",
      conn
    );
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};


module.exports = settingsDao;
