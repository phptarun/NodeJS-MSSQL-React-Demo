const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userService = require("../service/user");
const messageHelper = require("../helper/message");

/**
 * @swagger
 * /api/v1/user:
 *  get:
 *      summary: Get user info
 *      tags:
 *          - POS
 *      description: get user info
 *      security:
 *        - Bearer: []
 *      responses:
 *          '200':
 *              description: Successful
 *              content:
 *                      'application/json':
 *                           schema:
 *                               type: array
 *                               description: response
 */
router.get("/", async (req, res, next) => {
  let response = messageHelper.errorMsgFormat();
  try {
    response = await userService.getInfo();
    console.log(response);
    res
      .status(messageHelper.errorCode.success)
      .json(messageHelper.preResponse(response));
  } catch (e) {
    console.log(e);
    response["data"]["error"] = e.message;
    res
      .status(messageHelper.errorCode.error)
      .json(messageHelper.preResponse(response));
  }
});

module.exports = router;
