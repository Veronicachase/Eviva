const db = require("./DataBase/db");
const moment = require("moment");
const { removeUndefinedKeys } = require("../utils/removeUndefinedKeys");
const recipeDao = {};

recipeDao.addRecipe = async (recipeData) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    let recipeObj = {
      date:moment().format("YYYY-MM-DD"),
      title: recipeData.title,
      category: recipeData.category,
      type: recipeData.type,
      description: recipeData.description,
      content: recipeData.content,
      image:recipeData.image,
      userId: recipeData.userId,
    };
    recipeObj = await removeUndefinedKeys(recipeObj);
    await db.query("INSERT INTO recipes SET ?", recipeObj, "insert", conn);
    return recipeObj.recipeId;
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};

recipeDao.getRecipeById = async (recipeId, userId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const results = await db.query(
      "SELECT * FROM recipes WHERE recipeId = ? AND userId = ?",
      [recipeId, userId],
      "select",
      conn
    );
    if (results.length) {
      return results[0];
    }
    return null;
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};

recipeDao.getAllRecipes = async (userId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const results = await db.query("SELECT * FROM recipes WHERE userId = ?", [userId], "select", conn);
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

recipeDao.updateRecipe = async (userId, recipeId, data) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const cleanData = removeUndefinedKeys(data);
    await db.query(
      "UPDATE recipes SET ? WHERE recipeId = ? AND userId = ?",
      [cleanData, recipeId, userId],
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

recipeDao.deleteRecipe = async (userId, recipeId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    await db.query(
      "DELETE FROM recipes WHERE recipeId = ? AND userId = ?",
      [recipeId, userId],
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

module.exports = recipeDao;
