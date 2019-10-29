export default ValidationRules = (value, rules, form) => {
  let valid = true;
  for (let rule in rules) {
    switch (rule) {
      case 'isRequired':
        valid = valid && validateRequired(value);
        break;
      case 'minLength':
        valid = valid && validateMinLength(value, rules[rule]);
        break;
      case 'isEmail':
        valid = valid && validateEmail(value);
        break;
      case 'confirmPass':
        valid =
          valid && validateConfirmPassword(value, form[rules[rule]].value);
        break;
      default:
        valid = true;
    }
  }
  return valid;
};

const validateRequired = value => {
  return value !== '';
};

const validateMinLength = (value, minLength) => {
  return value.length >= minLength;
};

const validateEmail = email => {
  const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return expression.test(email);
};

const validateConfirmPassword = (confirmPass, pass) => {
  return confirmPass === pass;
};
