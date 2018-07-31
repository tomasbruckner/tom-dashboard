'use strict'

const Model = use('Model')

class StandupProjectRating extends Model {
  static get hidden () {
    return ['created_at', 'updated_at']
  }

  projectMonthInstance () {
    return this.belongsTo('App/Models/ProjectMonthInstance')
  }

  projectRating () {
    return this.belongsTo('App/Models/ProjectRatingEnum')
  }

  standup () {
    return this.belongsTo('App/Models/Standup')
  }
}

module.exports = StandupProjectRating
