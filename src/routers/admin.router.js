const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.controller");
const loginController = require("../controllers/login.controller");
const Validator = require("../validators/validator");
const auth = require("../middleware/auth")

router.post('/save-user', loginController.saveUser);
router.post('/login-user', loginController.loginUser);

router.post('/add-blog',auth,Validator.validateBlog,blogController.addBlog);
router.get('/get-all-blog',auth,blogController.getAllBlogs);
router.get('/get-blog/:id',auth,blogController.getBlogById);
router.put('/update-blog/:id',auth, blogController.updateBlog);
router.delete('/delete-blog/:id',auth,blogController.deleteBlog);

module.exports = router;
