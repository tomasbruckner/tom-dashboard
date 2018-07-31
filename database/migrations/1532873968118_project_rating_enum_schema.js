'use strict'

const Schema = use('Schema')

class ProjectRatingEnumSchema extends Schema {
  up () {
    this.create('project_rating_enums', (table) => {
      table.integer('id').unsigned().primary()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.integer('value').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('project_rating_enums')
  }
}

module.exports = ProjectRatingEnumSchema
