'use strict'

const Schema = use('Schema')

class ProjectSchema extends Schema {
  up () {
    this.alter('projects', (table) => {
      table.boolean('is_active').index()
    })
  }

  down () {
    this.alter('projects', (table) => {
      table.dropIndex('is_active')
      table.dropColumn('is_active')
    })
  }
}

module.exports = ProjectSchema
