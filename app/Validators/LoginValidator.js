'use strict';

class LoginValidator {
  get rules () {
    return {
      username: `required|max:255|min:1`,
      password: 'required|max:255|min:1',
    };
  }
}

module.exports = LoginValidator;
