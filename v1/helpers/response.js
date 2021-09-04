exports.error = function (code, message, validations = null) {
  let err = new Error(message);
  err.status = code;
  err.validations = validations;
  return err;
}

exports.catchError = function (res, err) {
  const status = err.status ?? 500;
  const message = err.validations ? {error: err.message, validations: err.validations} : {error: err.message};
  res.status(status).json(message);
}