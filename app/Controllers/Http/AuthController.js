'use strict';

const UserModel = use('App/Models/User');

class AuthController {
  async login ({ request, response, auth }) {
    const { username, password } = request.all();
    try {
      const { token } = await auth.attempt(username, password);
      const user = await UserModel
        .findByOrFail('username', username);

      return {
        token,
        ...user.toJSON(),

      };
    } catch (e) {
      response.status(401).send({ message: 'Invalid credentials' });
    }
  }

  async logout ({ request, response, auth }) {
    return { message: 'logout' };
  }

  async me ({ request, response, auth }) {
    try {
      return await auth.getUser();
    } catch (e) {
      response.status(401).send({ message: 'Invalid credentials' });
    }
  }
}

module.exports = AuthController;
