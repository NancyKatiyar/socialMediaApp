const joiValidate = (schema) => {
  return (req, res, next) => {
  
    const requestData = { ...req.body, ...req.params};

    const { error } = schema.validate(requestData, { abortEarly: false });

    if (!error) {
      return next();
    }
    const messages = error.details.map((i) => i.message);

    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: messages,
    });
  };
};

module.exports = joiValidate;
