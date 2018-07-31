'use strict'

const Model = use('Model')

class ProjectMonthInstance extends Model {
  static get hidden () {
    return ['created_at', 'updated_at']
  }

  static get dates () {
    return super.dates.concat(['month'])
  }

  project () {
    return this.belongsTo('App/Models/Project')
  }

  standupProjectRating () {
    return this.hasMany('App/Models/StandupProjectRating')
  }

  userParticipation () {
    return this.hasMany('App/Models/UserProjectParticipation')
  }
}

module.exports = ProjectMonthInstance
