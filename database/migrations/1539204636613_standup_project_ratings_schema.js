'use strict';

const Schema = use('Schema');

class StandupProjectRatingsSchema extends Schema {
  up () {
    this.table('standup_project_ratings', (table) => {
      table.integer('project_id').unsigned().index();
      table.foreign('project_id').references('id').inTable('projects');
    });
  }

  down () {
    this.table('standup_project_ratings', (table) => {
      table.dropForeign('project_id');
    });
  }
}

module.exports = StandupProjectRatingsSchema;
