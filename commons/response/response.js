const statusCode = require("../utils/statusCode.js");
const constants = require("../constant/constants.js");

module.exports = {
  successWith: (
    data = null,
    httpStatusCode = statusCode.SUCCESS_CODE,
    message = null,
    displayMessage = constants.successMessage,
    customStatusCode = null,
    customData = null
  ) => {
    return {
      httpStatusCode,
      customStatusCode,
      result: { data, customData },
      message,
      displayMessage,
      status: true,
    };
  },
  errorWith: (
    httpStatusCode = statusCode.SERVER_ERROR,
    message = null,
    displayMessage = constants.unknownErrorMessage,
    customStatusCode = null,
    customData = null
  ) => {
    return {
      httpStatusCode,
      customStatusCode,
      result: { data: null, customData },
      message,
      displayMessage,
      status: false,
    };
  },
  handleErrorResponse: (errorObj, res) => {
    const httpStatusCode = errorObj.errorCode || statusCode.SERVER_ERROR;
    return res
      .status(httpStatusCode)
      .json(
        module.exports.errorWith(
          httpStatusCode,
          errorObj.message,
          errorObj.displayMessage,
          errorObj.customStatusCode
        )
      );
  },
  handleSuccessResponse: (
    data,
    res,
    message = null,
    displayMessage = constants.successMessage
  ) => {
    const httpStatusCode = statusCode.SUCCESS_CODE;
    return res
      .status(httpStatusCode)
      .json(
        module.exports.successWith(
          data,
          httpStatusCode,
          message,
          displayMessage
        )
      );
  },
};
