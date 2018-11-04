'use strict';

const Model = use('Model');

class Note extends Model {
  static get hidden () {
    return ['created_at', 'updated_at'];
  }

  project () {
    return this.belongsTo('App/Models/Project');
  }
}

module.exports = Note;
