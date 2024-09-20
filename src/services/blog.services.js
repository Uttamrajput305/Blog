const blogQuery = require("../queries/blog.query");
const query = require("../queries/login.query");
const customException = require("../../commons/exception/customException");
const statuscode = require("../../commons/utils/statusCode");

const addBlog = async (body, email, session) => {
  try {
    const foundUser = await query.findByEmail(email);
    if (!foundUser) {
      throw new Error("User not found");
    }

    const { title, body: blogBody } = body;
    const saveData = {
      title,
      body: blogBody,
      author: foundUser.name,
      email: foundUser.email
    };
    
    return await blogQuery.saveBlog(saveData, session);
  } catch (error) {
    throw error;
  }
};

const getAllBlogs = async (page, pageSize) => {
  try {
    return await blogQuery.findAllBlogs(page, pageSize);
  } catch (error) {
    throw error;
  }
};

const getBlog = async (blogId) => {
  try {
    const blog = await blogQuery.findBlog(blogId);
    if (!blog) {
      throw customException.error(
        statuscode.NOT_FOUND,
        null,
        "There is no blog associated with this Id, Please check and enter correct one..."
      );
    }
    return blog;
  } catch (error) {
    throw error;
  }
};

const updateBlog = async (blogId, updatedData) => {
  try {
    const existingBlog = await blogQuery.findBlog(blogId);
    if (!existingBlog) {
      throw customException.error(
        statuscode.NOT_FOUND,
        null,
        "There is no blog associated with this Id, Please check and enter correct one..."
      );
    }
    return await blogQuery.updateBlog(blogId, updatedData);
  } catch (error) {
    throw error;
  }
};

const deleteBlog = async (blogId) => {
  try {
    const blogExists = await blogQuery.findBlog(blogId);
    if (!blogExists) {
      throw customException.error(
        statuscode.NOT_FOUND,
        null,
        "There is no blog associated with this Id, Please check and enter correct one..."
      );
    }
    return await blogQuery.deleteBlog(blogId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
