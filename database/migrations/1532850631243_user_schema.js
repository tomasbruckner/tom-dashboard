'use strict';

const Schema = use('Schema');

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments();
      table.string('name');
      table.string('alias');
      table.integer('total_exp').defaultTo(0);
      table.timestamps();
    });
  }

  down () {
    this.drop('users');
  }
}

module.exports = UserSchema;
