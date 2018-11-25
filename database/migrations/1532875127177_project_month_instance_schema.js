'use strict';

const Schema = use('Schema');

class ProjectMonthInstanceSchema extends Schema {
  up () {
    this.create('project_month_instances', (table) => {
      table.increments();
      table.integer('project_id').unsigned().notNullable();
      table.foreign('project_id').references('projects');
      table.dateTime('month').notNullable();
      table.timestamps();
    });
  }

  down () {
    this.drop('project_month_instances');
  }
}

module.exports = ProjectMonthInstanceSchema;
