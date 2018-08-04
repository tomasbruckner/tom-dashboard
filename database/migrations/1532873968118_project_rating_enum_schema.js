'use strict'

const Schema = use('Schema')

class StandupProjectRatingEnumSchema extends Schema {
  up () {
    this.create('standup_project_rating_enums', (table) => {
      table.integer('id').unsigned().primary()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.integer('value').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('standup_project_rating_enums')
  }
}

module.exports = StandupProjectRatingEnumSchema
