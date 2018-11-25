'use strict';

const Schema = use('Schema');

class StandupProjectRatingSchema extends Schema {
  up () {
    this.create('standup_project_ratings', (table) => {
      table.increments();
      table.integer('standup_id').unsigned().notNullable();
      table.foreign('standup_id').references('standups');
      table.integer('project_month_instance_id').unsigned().notNullable();
      table.foreign('project_month_instance_id').references('project_month_instances');
      table.integer('standup_project_rating_enum_id').unsigned().notNullable();
      table.foreign('standup_project_rating_enum_id').references('standup_project_rating_enums');
      table.timestamps();
    });
  }

  down () {
    this.drop('standup_project_ratings');
  }
}

module.exports = StandupProjectRatingSchema;
