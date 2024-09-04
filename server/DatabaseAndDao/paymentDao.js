const db = require("./DataBase/db");
const moment = require("moment");
const { removeUndefinedKeys } = require("../utils/removeUndefinedKeys");
const paymentDao = {};

paymentDao.savePaymentDetails = async (paymentDetails) => {
  const { userId, paymentIntentId, amount, status, currency, paymentMethodId } =
    paymentDetails;
  let conn = null;
  try {
    conn = await db.createConnection();
    let paymentObj = {
      date: moment().format("YYYY-MM-DD"),
      userId,
      paymentIntentId,
      amount,
      status,
      paymentMethodId,
      currency,
    };
    paymentObj = await removeUndefinedKeys(paymentObj);
    await db.query("INSERT INTO payments SET ?", paymentObj, "insert", conn);
    return paymentObj.paymentId;
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};

paymentDao.getPaymentRecord = async ( userId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const results = await db.query(
      "SELECT * FROM payments where userId=? ORDER BY date DESC LIMIT 1",
      [userId],
      "select",
      conn
    );
    if (results.length > 0) {
      return results[0];
    }
    return null;
  } catch (error) {
    console.error(error.message);
    throw error;
  } finally {
    if (conn) await conn.end();
  }
};

module.exports = paymentDao;
