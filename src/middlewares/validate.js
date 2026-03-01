const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return next({
      status: 400,
      message: "Validation échouée",
      details: result.error.flatten(),
    });
  }

  req.body = result.data;
  next();
};

export default validate;