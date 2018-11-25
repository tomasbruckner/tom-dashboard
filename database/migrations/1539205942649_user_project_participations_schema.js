'use strict';

const Schema = use('Schema');

class UsersSchema extends Schema {
  up () {
    this.alter('user_project_participations', (table) => {
      table.dropColumn('project_month_instance_id');
      table.integer('project_id').unsigned().index();
    });
  }

  down () {
    this.table('user_project_participations', (table) => {
      // reverse alternations
    });
  }
}

module.exports = UsersSchema;
