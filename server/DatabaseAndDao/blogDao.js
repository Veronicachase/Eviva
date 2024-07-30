const db = require("./DataBase/db");
const moment = require("moment");
const { removeUndefinedKeys } = require("../utils/removeUndefinedKeys");
const blogDao = {};

blogDao.addBlog = async (blogData) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    let blogObj = {
      date: moment().format("YYYY-MM-DD"),
      title: blogData.title,
      author: blogData.author,
      category: blogData.category,
      topic: blogData.topic,
      description: blogData.description,
      content:blogData.content,
      userId: blogData.userId,
    };
    blogObj = await removeUndefinedKeys(blogObj);
    await db.query("INSERT INTO blogs SET ?", blogObj, "insert", conn);
    return blogObj.blogId;
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};

blogDao.getBlogById = async (blogId, userId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const results = await db.query(
      "SELECT * FROM blogs WHERE blogId = ? AND userId = ?",
      [blogId, userId],
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

blogDao.getAllBlogs = async (userId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const results = await db.query(
      "SELECT * FROM blogs WHERE userId = ?",
      [userId],
      "select",
      conn
    );
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

blogDao.updateBlog = async (userId, blogId, data) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const cleanData = removeUndefinedKeys(data);
    await db.query(
      "UPDATE blogs SET ? WHERE blogId = ? AND userId = ?",
      [cleanData, blogId, userId],
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

blogDao.deleteBlog = async (userId, blogId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    await db.query(
      "DELETE FROM blogs WHERE blogId = ? AND userId = ?",
      [blogId, userId],
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

module.exports = blogDao;
