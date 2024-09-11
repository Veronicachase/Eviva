const db = require("./DataBase/db");
const moment = require("moment");
const { removeUndefinedKeys } = require("../utils/removeUndefinedKeys");
const userDao = {};


userDao.getUserByEmail = async (email) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM users WHERE email = ?",
      email,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    if (conn)  conn.release();
  }
};

userDao.addUser = async (userData) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    let userObj = {
      date: moment().format("YYYY-MM-DD"),
      name: userData.name,
      surName: userData.surName,
      age: userData.age||null,
      email: userData.email,
      password: userData.password,
      diagnosed: userData.diagnosed,
      avatar: userData.avatar,
      isSubscribed: userData.isSubscribed,
      role: userData.role || "user",
    };
    return await db.query("INSERT INTO users SET ?", userObj, "insert", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    if (conn)  conn.release();
  }
};

userDao.getUserbyId = async (id) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM users WHERE userId = ?",
      id,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    if (conn)  conn.release();
  }
};

userDao.deleteUser = async (id) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "DELETE FROM users WHERE userId = ?",
      id,
      "delete",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    if (conn)  conn.release();
  }
};

userDao.updateUser = async (id, userData) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    let userObj = {
      date: moment().format("YYYY-MM-DD"),
      name: userData.name,
      surName: userData.surName,
      age: userData.age,
      email: userData.email,
      password: userData.password,
      diagnosed: userData.diagnosed,
      avatar: userData.avatar,
      isSubscribed: userData.isSubscribed,
      role: userData.role,
    };

    userObj = await removeUndefinedKeys(userObj);
    return await db.query(
      "UPDATE users SET ? WHERE userId = ?",
      [userObj, id],
      "update",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    if (conn)  conn.release();
  }
};

userDao.updateUserWithUUID = async (userUUID, userData) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    // Actualizar la tabla de usuarios
    await db.query(
      "UPDATE users SET ? WHERE userUUID = ?",
      [userData, userUUID],
      conn
    );

    // Obtener el userId del usuario actualizado
    const result = await db.query(
      "SELECT userId FROM users WHERE userUUID = ?",
      [userUUID],
      conn
    );
    const userId = result[0]?.userId;

    if (userId) {
      // Actualizar las tablas que tuviesen UUID
      await db.query(
        "UPDATE answers SET userId = ? WHERE userUUID = ?",
        [userId, userUUID],
        conn
      );

      await db.query(
        "UPDATE assessmentQuestions SET userId = ? WHERE userUUID = ?",
        [userId, userUUID],
        conn
      );

      await db.query(
        "UPDATE assessmentResponse SET userId = ? WHERE userUUID = ?",
        [userId, userUUID],
        conn
      );

      await db.query(
        "UPDATE surveyObjectivesAnswerOptions SET userId = ? WHERE userUUID = ?",
        [userId, userUUID],
        conn
      );

      await db.query(
        "UPDATE surveyObjectivesQuestions SET userId = ? WHERE userUUID = ?",
        [userId, userUUID],
        conn
      );

      await db.query(
        "UPDATE surveyObjectiveUserResponses SET userId = ? WHERE userUUID = ?",
        [userId, userUUID],
        conn
      );
    }

    return userId;
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn)  conn.release();
  }
};

module.exports = userDao;
