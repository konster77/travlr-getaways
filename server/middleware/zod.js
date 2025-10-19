
module.exports.validate =
  (schema, source = 'body') =>
  (req, res, next) => {
    const r = schema.safeParse(req[source]);
    if (!r.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: r.error.issues.map(i => ({ path: i.path.join('.'), message: i.message }))
      });
    }
    req[source] = r.data;
    next();
  };
