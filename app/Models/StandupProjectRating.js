'use strict'

const Model = use('Model')

class StandupProjectRating extends Model {
  static get hidden () {
    return ['created_at', 'updated_at']
  }

  project () {
    return this.belongsTo('App/Models/Project')
  }

  projectRating () {
    return this.belongsTo('App/Models/StandupProjectRatingEnum')
  }

  standup () {
    return this.belongsTo('App/Models/Standup')
  }
}

module.exports = StandupProjectRating
