const response = require("../../commons/response/response");
const statusCode = require("../../commons/utils/statusCode");
const Joi = require('joi');

const validateBlog = async (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        body: Joi.string().required()

    });

    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return response.handleErrorResponse(
            {
                errorCode: statusCode.BAD_REQUEST,
                message: error,
                displayMessage: { error: error.details[0].message },
            },
            res
        );
    }
};

module.exports = {
    validateBlog,
};
