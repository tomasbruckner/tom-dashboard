'use strict';

const Model = use('Model');

class Note extends Model {
  static get hidden () {
    return ['updated_at'];
  }

  static get dates () {
    return super.dates.concat(['deadline']);
  }

  project () {
    return this.belongsTo('App/Models/Project');
  }
}

module.exports = Note;
