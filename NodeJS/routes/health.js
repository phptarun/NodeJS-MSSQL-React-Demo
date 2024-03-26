var express = require("express");
var router = express.Router();

/**
 * @swagger
 * /api/v1/health/heartbeat:
 *  get:
 *      summary: Get heartbeat from server
 *      tags:
 *          - Health
 *      description: Get heartbeat from server. This API wont check for header.
 *      responses:
 *          '200':
 *              description: Successful
 *              content:
 *                      'application/json':
 *                           schema:
 *                               type: array
 *                               description: response
 */
router.get("/heartbeat", async (req, res, next) => {
  res.status(200).json("success");
});

module.exports = router;
