
const db = require("./DataBase/db");
const moment = require("moment");
const { removeUndefinedKeys } = require("../utils/removeUndefinedKeys");
const paymentDao = {};


paymentDao.savePaymentDetails =async (paymentDetails)=>{

    const { userId, paymentIntentId, amount, status, currency, paymentMethodId } = paymentDetails;
    let conn = null 
    try {
        conn = await db.createConnection();
        let paymentObj = {
          date:moment().format("YYYY-MM-DD"),
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






module.exports =paymentDao;