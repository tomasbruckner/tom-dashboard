'use strict'

const Model = use('Model')

// TODO hooks that calculate total exp
class User extends Model {
  static get hidden () {
    return ['created_at', 'updated_at']
  }

  bonusExps () {
    return this.hasMany('App/Models/BonusExp')
  }

  projects () {
    return this.hasMany('App/Models/UserProjectParticipation')
  }
}

module.exports = User
