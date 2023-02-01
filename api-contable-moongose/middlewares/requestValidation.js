module.exports = (schema) => {
  return async (req, res, next) => {
    try {
      if (Object.keys(req.body).length) {
        await schema.validateAsync(req.body);
      }
      if (Object.keys(req.params).length) {
        await schema.validateAsync(req.params);
      }

      next();
    } catch (error) {
      res.status(400).send({
        status: "error",
        message: error.message,
      });
    }
  };
};
