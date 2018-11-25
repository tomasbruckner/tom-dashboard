'use strict';

const Schema = use('Schema');

class StandupProjectRatingsSchema extends Schema {
  up () {
    this.alter('standup_project_ratings', (table) => {
      table.integer('standup_id').unsigned().references('id').inTable('standups').alter();
      table.integer('project_month_instance_id').unsigned().references('id').inTable('project_month_instances').alter();
      table.integer('standup_project_rating_enum_id').unsigned().references('id').inTable('standup_project_rating_enums').alter();
    });
  }

  down () {
    this.alter('standup_project_ratings', (table) => {
      table.integer('standup_id').unsigned().notNullable().alter();
      table.foreign('standup_id').references('standups');
      table.integer('project_month_instance_id').unsigned().notNullable().alter();
      table.foreign('project_month_instance_id').references('project_month_instances');
      table.integer('standup_project_rating_enum_id').unsigned().notNullable().alter();
      table.foreign('standup_project_rating_enum_id').references('standup_project_rating_enums');
    });
  }
}

module.exports = StandupProjectRatingsSchema;
