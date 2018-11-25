'use strict';

const Schema = use('Schema');

class UserSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.string('password');
      table.string('username');
    });
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('password');
      table.dropColumn('username');
    });
  }
}

module.exports = UserSchema;
