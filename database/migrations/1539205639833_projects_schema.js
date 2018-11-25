'use strict';

const Schema = use('Schema');

class ProjectsSchema extends Schema {
  up () {
    this.alter('projects', (table) => {
      table.dropColumn('project_start_at');
      table.dropColumn('project_end_at');
    });
  }

  down () {
    this.table('projects', (table) => {
      // reverse alternations
    });
  }
}

module.exports = ProjectsSchema;
