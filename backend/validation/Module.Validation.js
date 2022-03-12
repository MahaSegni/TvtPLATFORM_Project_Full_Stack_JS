const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateUser(data) {
  let errors = {};
  data.label = !isEmpty(data.label) ? data.label : "";
  data.description = !isEmpty(data.description) ? data.description : "";

 
  
  if (validator.isEmpty(data.label)) {
    errors.label = "Required label";
  }
  if (validator.isEmpty(data.description)) {
    errors.description = "Required description";
  }


  return {
      errors,
      isValid: isEmpty(errors)
  }
};