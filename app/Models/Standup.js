'use strict';

const Model = use('Model');

class Standup extends Model {
  static get dates () {
    return super.dates.concat(['date']);
  }

  static get hidden () {
    return ['created_at', 'updated_at'];
  }

  standupProjectRating () {
    return this.hasMany('App/Models/StandupProjectRating');
  }
}

module.exports = Standup;
