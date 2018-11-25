'use strict';

const UserModel = use('App/Models/User');

class UserController {
  static mapToDbEntity (request) {
    const {
      firstName,
      lastName,
      isActive,
      password,
      totalExp,
      username,
    } = request.only(['firstName', 'lastName', 'isActive', 'password', 'totalExp', 'username']);

    return {
      password,
      username,
      first_name: firstName,
      last_name: lastName,
      is_active: isActive,
      total_exp: totalExp,
    };
  }

  async getUsers ({ request, response, params }) {
    const notes = await UserModel
      .query()
      .fetch();

    return notes.toJSON();
  }

  async createUser ({ request, response, params }) {
    const user = new UserModel();
    user.fill(UserController.mapToDbEntity(request));
    try {
      console.log('x');
      await user.save();
    } catch (e) {
      console.error(e);
    }
    return user.toJSON();
  }

  async editUser ({ request, response, params }) {
    const { id } = params;
    const user = await UserModel.find(id);
    user.merge(UserController.mapToDbEntity(request));
    await user.save();

    return user.toJSON();
  }

  async deleteUser ({ request, response, params }) {
    const { id } = params;
    const user = await UserModel.find(id);

    try {
      await user.delete();
      response.send();
    } catch (e) {
      return e.toJSON();
    }
  }
}

module.exports = UserController;
