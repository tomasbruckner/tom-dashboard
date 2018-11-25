'use strict';

const Schema = use('Schema');

class ProjectMonthInstanceSchema extends Schema {
  up () {
    this.dropIfExists('project_month_instances');
  }

  down () {
    this.createIfNotExists('project_month_instances');
  }
}

module.exports = ProjectMonthInstanceSchema;
