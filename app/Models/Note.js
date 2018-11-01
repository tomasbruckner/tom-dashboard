'use strict'

const Model = use('Model')

class Note extends Model {

  project () {
    return this.belongsTo('App/Models/Project')
  }
}

module.exports = Note
