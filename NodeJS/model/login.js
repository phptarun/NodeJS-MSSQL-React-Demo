const uuid = require("uuid4");
const crypto = require("crypto");
const CryptoJS = require("crypto-js");
const messageHelper = require("../helper/message");
const utilHelper = require("../helper/utils");
const oathService = require("../service/oath");
const db = require("../db/mssql.db");

const isUserExists = async (username) => {
  let sql = `SELECT [userName] FROM [dbo].[users] WHERE userName = '${username}'`;
  let login = await db.query(sql);
  return login;
};

const login = async (req) => {
  console.log("------- login -------------");
  //let con = await db.dbConnect();
  let error = [];
  let response = messageHelper.successMsgFormat();

  try {
    
    let sql = `SELECT [id],[userName] FROM [dbo].[users] WHERE userName = '${req.body.username}' AND password = '${utilHelper.encrypt(req.body.password, "$%#@!()*&^$FRcdew+1&5!&9Ly")}'`; 
    console.log(
      utilHelper.encrypt(req.body.password)
    );
    let result = await db.query(sql);

    console.log("------- login -------------", result);

    if (result["recordset"].length) {
      let account = result["recordset"][0];
      req.userInfo = account;
      let token_params = {};
      token_params["userID"] = account.id;
      token_params["UserName"] = account.userName;

      let token = await oathService.generateToken(token_params);
      response["data"]["message"] = "success";
      response["data"]["accessToken"] = token;
      return response;
    } else {
      response = messageHelper.errorMsgFormat();
      response["data"]["error"] = "";
      response["data"]["message"] = "Invalid Password!";
      return response;
    }
  } catch (err) {
    console.log(err);
    response = messageHelper.errorMsgFormat();
    error.push(err.message);
    response["data"]["error"] = error;
    return response;
  }
};

module.exports = { isUserExists, login };
