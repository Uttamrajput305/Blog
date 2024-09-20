const StatusCode = require("../../commons/utils/statusCode");
const response = require("../../commons/response/response");
const BlogService = require("../services/blog.services");
const mongoose = require("mongoose");

const addBlog = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await BlogService.addBlog(req.body,req.user, session);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res,
      "Blog added successfully...",
      "Blog added successfully..."
    );
  } catch (error) {
    await session.abortTransaction();
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  } finally {
    session.endSession();
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const result = await BlogService.getAllBlogs(page, pageSize);
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res,
      "List of blogs fetched successfully...",
      "List of blogs fetched successfully..."
    );
  } catch (error) {
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error",
        error,
      },
      res
    );
  }
};

const getBlogById = async (req, res) => {
  try {
    const result = await BlogService.getBlog(req.params.id);
    if (!result) {
      return response.handleErrorResponse(
        { errorCode: StatusCode.NOT_FOUND, message: "Blog not found" },
        res
      );
    }
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res,
      "Blog details fetched successfully...",
      "Blog details fetched successfully..."
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};

const updateBlog = async (req, res) => {
  try {
    const result = await BlogService.updateBlog(req.params.id, req.body);
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res,
      "Blog details updated successfully...",
      "Blog details updated successfully..."
    );
  } catch (error) {
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error",
        error,
      },
      res
    );
  }
};

const deleteBlog = async (req, res) => {
  try {
    const result = await BlogService.deleteBlog(req.params.id);
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res,
      "Blog deleted successfully...",
      "Blog deleted successfully..."
    );
  } catch (error) {
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error",
        error,
      },
      res
    );
  }
};


module.exports = {
  /**
   * @swagger
   * tags:
   *  name: Blog Services
   *  description: Blog Service APIs
   * /add-blog:
   *  post:
   *      summary: Add a Blog 
   *      description: Use this API to add a new Blog
   *      tags: 
   *          - Blog Services
   *      produces:
   *          - application/json
   *      consumes:
   *          - application/json
   *      parameters:
   *          - in: header
   *            name: Authorization
   *            description: Access token for Authentication.
   *            type: string
   *            required: true
   *          - in: body
   *            name: blog
   *            description: Blog details to add
   *            required: true
   *            schema:
   *              type: object
   *              properties:
   *                  title: 
   *                      type: string
   *                      required: true
   *                      description: Title of the blog
   *                  body:
   *                      type: string
   *                      required: true
   *                      description: body of the blog
   *      responses:
   *          200: 
   *              description: Success
   *          400:
   *              description: Bad Request
   *          401:
   *              description: Unauthorized
   *          500: 
   *              description: Internal Server Error
   */
  addBlog,
  /**
   * @swagger
   * tags:
   *  name: Blog Services 
   *  description: Blog Service APIs
   * /get-all-blog:
   *  get:
   *      summary: View all blog with pagination
   *      description: Use this API to view all blog
   *      tags:
   *          - Blog Services
   *      parameters:
   *          - in: header
   *            name: Authorization
   *            description: Access token for Authentication.
   *            type: string
   *            required: true
   *          - in: query
   *            name: page
   *            description: Page number for pagination (default is 1).
   *            schema:
   *              type: integer
   *              default: 1
   *          - in: query
   *            name: pageSize
   *            description: Number of blog per page (default is 8).
   *            schema:
   *              type: integer
   *              default: 8
   *      responses:
   *          200:
   *              description: Success
   *          400:
   *              description: Bad Request
   *          401:
   *              description: Unauthorized
   *          500:
   *              description: Internal server error
   */
  getAllBlogs,

  /**
   * @swagger
   * tags:
   *  name: Blog Services
   *  description: Blog Service APIs
   * /get-blog/{id}:
   *  get:
   *      summary: View Blog by ID
   *      description: Use this API to view the Blog by ID
   *      tags:
   *          - Blog Services
   *      produces:
   *          - applicatin/json
   *      consumes:
   *          - application/json
   *      parameters:
   *          - in: header
   *            name: Authorization
   *            description: Access token for Authentication.
   *            type: string
   *            required: true
   *          - in: path
   *            name: id
   *            required: true
   *            description: ID to view Blog
   *      responses:
   *          200: 
   *              description: Success
   *          400:
   *              description: Bad Request
   *          401:
   *              description: Unauthorized
   *          500: 
   *              description: Internal Server Error
   */
  getBlogById,
  /**
   * @swagger
   * tags:
   *  name: Blog Services
   *  description: Blog Service APIs
   * /update-blog/{id}:
   *  put:
   *      summary: Update blog by ID
   *      description: Use this API to update blog with ID
   *      tags:
   *          - Blog Services
   *      produces:
   *          - application/json
   *      consumes:
   *          - application/json
   *      parameters:
   *          - in: header
   *            name: Authorization
   *            description: Access token for Authentication.
   *            type: string
   *            required: true
   *          - in: path
   *            name: id
   *            description: ID to update blog
   *            required: true
   *          - in: body
   *            name: blog
   *            schema:
   *              type: object
   *              required: true
   *              properties:
   *                  title: 
   *                      type: string
   *                      required: true
   *                      description: Title to add blogs
   *                  body:     
   *                      type: string
   *                      description: body of the blog
   *                      required: true
   *      responses:
   *          200:   
   *              description: Success
   *          400:
   *              description: Bad Request
   *          500:
   *              description: Internal Server Error              
   */
  updateBlog,
   /**
   * @swagger
   * tags:
   *  name: Blog Services
   *  description: Blog Service APIs
   * /delete-blog/{id}:
   *  delete:
   *      summary: Delete blog by ID
   *      description: Use this API to delete blog with ID
   *      tags:
   *          - Blog Services
   *      produces:
   *          - application/json
   *      consumes:
   *          - application/json
   *      parameters:
   *          - in: header
   *            name: Authorization
   *            description: Access token for Authentication.
   *            type: string
   *            required: true
   *          - in: path
   *            name: id
   *            description: ID to delete blog
   *            required: true
   *      responses:
   *          200:   
   *              description: Success
   *          400:
   *              description: Bad Request
   *          401:
   *              description: Unauthorized
   *          500:
   *              description: Internal Server Error
   */
  deleteBlog,
}
