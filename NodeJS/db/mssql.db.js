const mssql = require("mssql");
const config = require("../config/config");

mssql.on("error", (err) => {
  console.log("// ... error handler");
  console.log(err);
});

const query = async (sql) => {
  // console.log(config)
  let pool = await mssql.connect(config.sqlConfig);
  try {
    let result = await pool.request().query(sql);
    pool.close();
    return result;
  } catch (err) {
    console.log(err);
    pool.close();
  }
};

const char_escape = (text) => {
  return typeof text === "string" ? text.replace("/'/g", "'") : text;
};

module.exports = { query, char_escape };
