const validator = require('validator');

exports.valid = function (body) {
  const errors = {};
  const rules = [
      {type: "int", field: "year", minLength: 4, maxLength: 4},
      {type: "int", field: "rent_number", minLength: 1, maxLength: 11},
      {type: "string", field: "title", minLength: 1, maxLength: 255},
      {type: "string", field: "author", minLength: 1, maxLength: 80},
      {type: "string", field: "editor", minLength: 1, maxLength: 125},
      {type: "string", field: "index", minLength: 1, maxLength: 125},
      {type: "string", field: "bib", minLength: 1, maxLength: 20},
      {type: "string", field: "ref", minLength: 1, maxLength: 20},
      {type: "string", field: "cat1", minLength: 1, maxLength: 20},
      {type: "string", field: "cat2", minLength: 1, maxLength: 10}
  ];

  rules.forEach((obj, index) => {
      if (obj.type == "int") {
          intValidation(body, errors, obj.field, obj.minLength, obj.maxLength);
      } else if (obj.type == "string") {
          stringValidation(body, errors, obj.field, obj.minLength, obj.maxLength);
      }
  });

  return errors;
}

function intValidation(body, errors, field, minLength, maxLength) {
  if (!body[field] || validator.isEmpty(body[field].toString())) {
      errors[field] = {};
      errors[field].message = "This parameter is required";
  } else {
      if (!validator.isLength(body[field].toString(),{min:minLength, max: maxLength})) {
          errors[field] = {};
          if (minLength == maxLength) {
              errors[field].length = "Must contain " + maxLength + " digits";
          } else {
              errors[field].length = "Length between " + minLength + " and " + maxLength;
          }
      }

      if (!validator.isInt(body[field].toString())) {
          if (!errors.hasOwnProperty(field)) 
              errors[field] = {};
          errors[field].type = "Invalid integer";
      }
  }
}

function stringValidation(body, errors, field, minLength, maxLength) {
  if (!body[field] || validator.isEmpty(body[field].toString())) {
      errors[field] = {};
      errors[field].message = "This parameter is required";
  } else {
      if (!validator.isLength(body[field].toString(),{min:minLength, max: maxLength})) {
          errors[field] = {};
          errors[field].length = "Length between " + minLength + " and " + maxLength + " characters";
      }
  }
}