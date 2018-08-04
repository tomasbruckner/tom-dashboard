'use strict'

const Model = use('Model')

class Project extends Model {
  static get hidden () {
    return ['created_at', 'updated_at', 'project_start_at', 'project_end_at']
  }

  projectMonthInstance() {
    return this.hasMany('App/Models/ProjectMonthInstance')
  }
}

module.exports = Project
