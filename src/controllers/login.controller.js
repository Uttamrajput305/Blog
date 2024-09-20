const loginService = require("../services/login.service");
const StatusCode = require("../../commons/utils/statusCode");
const response = require("../../commons/response/response");
const mongoose = require("mongoose");

const saveUser = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const result = await loginService.saveUser(req.body, session);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const loginUser = async (req, res) => {
  try {
    const result = await loginService.login(req.body);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res,
      error
    );
  }
};
module.exports = {
  /**
   * @swagger
   * tags:
   *   name: User Management
   *   description: APIs for managing users
   * definitions:
   *   User:
   *     properties:
   *       name:
   *         type: string
   *         required: true
   *       email:
   *         type: string
   *         required: true
   *         unique: true
   *       password:
   *         type: string
   *         required: true
   * /save-user:
   *   post:
   *     summary: Save a new user
   *     description: Use this API to save a new user
   *     tags:
   *       - User Management
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: user
   *         description: User details to store
   *         schema:
   *           $ref: '#/definitions/User'
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   *       409:
   *         description: User already exists
   */
  saveUser,
  /**
   * @swagger
   * tags:
   *   name: User Management
   *   description: User authentication APIs
   *
   * /login-user:
   *   post:
   *     summary: User login
   *     description: Use this API to authenticate a user
   *     tags:
   *       - User Management
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: credentials
   *         description: The user credentials for login
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             username:
   *               type: string
   *               format: email
   *               description: The username or email address of the user
   *               example: Your Gmail
   *             password:
   *               type: string
   *               description: The password of the user
   *               example: password
   *     responses:
   *       200:
   *         description: Successful response indicating successful login
   *       401:
   *         description: Unauthorized - Invalid credentials
   *       500:
   *         description: Internal server error
   */
  loginUser,
};
