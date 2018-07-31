'use strict'

const Model = use('Model')
// TODO add date when received bonus
// TODO rename modifier to enum
// TODO rename projectStartsAt
class BonusExp extends Model {
  static get hidden () {
    return ['created_at', 'updated_at']
  }

  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = BonusExp
