'use strict';

const Schema = use('Schema');

class UserSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.dropColumn('alias');
      table.dropColumn('name');
      table.dropColumn('project_id');
      table.string('first_name');
      table.string('last_name');
      table.boolean('is_active');
    });
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
    });
  }
}

module.exports = UserSchema;
