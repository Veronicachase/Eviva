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
    conn && (await conn.end());
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
      age: userData.age,
      email: userData.email,
      password: userData.password,
      diagnosed: userData.diagnosed,
      avatar: userData.avatar,
      subscription:userData.subscription,
      role:userData.role
    };
    return await db.query("INSERT INTO users SET ?", userObj, "insert", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
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
    conn && (await conn.end());
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
    conn && (await conn.end());
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
      subscription:userData.subscription,
      role:userData.role

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
    conn && (await conn.end());
  }
};

module.exports = userDao;
