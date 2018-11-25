'use strict';

const Schema = use('Schema');

class StandupProjectRatingsSchema extends Schema {
  up () {
    this.alter('standup_project_ratings', (table) => {
      table.dropForeign('project_month_instance_id');
      table.integer('project_month_instance_id').unsigned().references('id').inTable('project_month_instances').onDelete('CASCADE').alter();
    });
  }

  down () {
    this.alter('project_month_instances', (table) => {
      table.dropForeign('project_month_instance_id');
      table.integer('project_month_instance_id').unsigned().references('id').inTable('project_month_instances').alter();
    });
  }
}

module.exports = StandupProjectRatingsSchema;
