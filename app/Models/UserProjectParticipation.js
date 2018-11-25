'use strict';

const Model = use('Model');

class UserProjectParticipation extends Model {
  static get hidden () {
    return ['created_at', 'updated_at'];
  }

  user () {
    return this.belongsTo('App/Models/User');
  }

  projectExpModifier () {
    return this.belongsTo('App/Models/ProjectExpModifier');
  }

  project () {
    return this.belongsTo('App/Models/Project');
  }
}

module.exports = UserProjectParticipation;
