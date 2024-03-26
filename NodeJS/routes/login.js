const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const userService = require("../service/login");
const messageHelper = require("../helper/message");

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *      parameters:
 *      - in: body
 *        name: userdetails
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *              description: Admin
 *              example: Admin
 *            password:
 *              type: string
 *              description: admin@123
 *              example: admin@123
 *      summary: Login user
 *      tags:
 *          - User Login
 *      description: Login user.
 *      responses:
 *          '200':
 *              description: Successful
 *              content:
 *                      'application/json':
 *                           schema:
 *                               type: array
 *                               description: response
 *          '401':
 *              description: Unauthorized
 */
router.post("/", async (req, res, next) => {
  let error = [];
  let response = messageHelper.errorMsgFormat();
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      error = errors.array();
    }
    let validUserName = await userService.isUserExists(req.body.username);
    if (!validUserName) {
      error.push("User does not exist.");
    }

    if (error.length > 0) {
      console.log(error);
      console.log(response);
      response["data"]["message"] = error[0];
      res
        .status(messageHelper.errorCode.error)
        .json(messageHelper.preResponse(response));
    } else {
      response = await userService.login(req);
      console.log(response);
      res
        .status(messageHelper.errorCode.success)
        .json(messageHelper.preResponse(response));
    }
  } catch (e) {
    console.log(e);
    response["data"]["error"] = e.message;
    res
      .status(messageHelper.errorCode.error)
      .json(messageHelper.preResponse(response));
  }
});

module.exports = router;