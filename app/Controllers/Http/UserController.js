'use strict';

const UserModel = use('App/Models/User');

class UserController {
  static mapToDbEntity (request) {
    const {
      firstName,
      lastName,
      isActive,
      totalExp,
      username,
    } = request.only(['firstName', 'lastName', 'isActive', 'totalExp', 'username']);

    return {
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

    if (!request.input('password')) {
      response.status(422).send({ message: 'Unprocessable entity' });
      return;
    }

    user.password = request.input('password');
    await user.save();

    return user.toJSON();
  }

  async editUser ({ request, response, params }) {
    const { id } = params;
    const user = await UserModel.find(id);
    user.merge(UserController.mapToDbEntity(request));

    if (request.input('password')) {
      user.password = request.input('password');
    }

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
