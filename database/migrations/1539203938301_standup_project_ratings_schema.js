'use strict'

const Schema = use('Schema')

class StandupProjectRatingsSchema extends Schema {
  up () {
    this.table('standup_project_ratings', (table) => {
      table.dropForeign('project_month_instance_id')
      table.dropColumn('project_month_instance_id')
    })
  }

  down () {
    this.table('standup_project_ratings', (table) => {
      // reverse alternations
    })
  }
}

module.exports = StandupProjectRatingsSchema
