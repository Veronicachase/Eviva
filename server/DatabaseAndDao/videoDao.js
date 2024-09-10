const db = require("./DataBase/db");
const moment = require("moment");
const { removeUndefinedKeys } = require("../utils/removeUndefinedKeys");
const videoDao = {};

videoDao.addVideo = async (videoData) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    let videoObj = {
      date: moment().format("YYYY-MM-DD"),
      title: videoData.title,
      duration: videoData.duration,
      category: videoData.category,
      description: videoData.description,
      topic: videoData.topic,
      performer: videoData.performer,
      url: videoData.url,
      times: videoData.timesPlayed,
      image:videoData.image,
      userId: videoData.userId,
    };
    videoObj = await removeUndefinedKeys(videoObj);
    await db.query("INSERT INTO videos SET ?", videoObj, "insert", conn);
    return videoObj.videoId;
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn)  conn.release();
  }
};

videoDao.getVideoById = async (videoId, userId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const results = await db.query(
      "SELECT * FROM videos WHERE videoId = ? AND userId = ?",
      [videoId, userId],
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
    if (conn)  conn.release();
  }
};

videoDao.getAllVideos = async (userId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const results = await db.query(
      "SELECT * FROM videos WHERE userId = ?",
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
    if (conn)  conn.release();
  }
};

videoDao.updateVideo = async (userId, videoId, data) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const cleanData = removeUndefinedKeys(data);
    await db.query(
      "UPDATE videos SET ? WHERE videoId = ? AND userId = ?",
      [cleanData, videoId, userId],
      "update",
      conn
    );
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn)  conn.release();
  }
};

videoDao.deleteVideo = async (userId, videoId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    await db.query(
      "DELETE FROM videos WHERE videoId = ? AND userId = ?",
      [videoId, userId],
      "delete",
      conn
    );
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn)  conn.release();
  }
};

module.exports = videoDao;