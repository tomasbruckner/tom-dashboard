'use strict'

const Schema = use('Schema')

class StandupProjectRatingsSchema extends Schema {
  up () {
    this.alter('project_month_instances', (table) => {
      table.integer('project_id').unsigned().notNullable().references('id').inTable('projects').onDelete('CASCADE').alter()
    })
  }

  down () {
    this.alter('project_month_instances', (table) => {
      table.integer('project_id').unsigned().notNullable().alter()
      table.foreign('project_id').references('projects')
    })
  }
}

module.exports = StandupProjectRatingsSchema
