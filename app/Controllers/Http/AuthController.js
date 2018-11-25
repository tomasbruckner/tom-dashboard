'use strict';

const UserModel = use('App/Models/User');

class AuthController {
  async login ({ request, response, auth }) {
    const { username, password } = request.all();
    try {
      const { token } = await auth.attempt(username, password);
      const user = await UserModel
        .query()
        .where('username', username)
        .fetch();

      return {
        token,
        ...user.toJSON(),

      };
    } catch (e) {
      response.send();
    }
  }
}

module.exports = AuthController;
