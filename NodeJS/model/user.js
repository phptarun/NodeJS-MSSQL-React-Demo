const db = require("../db/mssql.db");

const getInfo = async (req) => {
  let sql = `SELECT [id]
    ,[userName]
  FROM [dbo].[users]`;
  let result = await db.query(sql);
  return result["recordset"];
};

module.exports = {
  getInfo,
};
