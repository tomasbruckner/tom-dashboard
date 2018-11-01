'use strict';

const Model = use('Model');

class Project extends Model {
  static get hidden () {
    return ['created_at', 'updated_at'];
  }

  notes () {
    return this.hasMany('App/Models/Note');
  }
}

module.exports = Project;
