'use strict';

const Schema = use('Schema');

class StandupSchema extends Schema {
  up () {
    this.create('standups', (table) => {
      table.increments();
      table.dateTime('date').notNullable();
      table.timestamps();
    });
  }

  down () {
    this.drop('standups');
  }
}

module.exports = StandupSchema;
