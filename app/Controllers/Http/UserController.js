'use strict';

const UserModel = use('App/Models/User');

class UserController {
  static mapToDbEntity (request) {
    const {
      first_name,
      last_name,
      is_active,
      total_exp,
    } = request.only(['first_name', 'last_name', 'is_active', 'total_exp']);

    return {
      first_name,
      last_name,
      is_active,
      total_exp,
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
    await user.save();

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
    user.is_active = 0;

    await user.save();

    return user.toJSON();
  }
}

module.exports = UserController;
