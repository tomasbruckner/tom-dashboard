'use strict';

const Schema = use('Schema');

class NoteSchema extends Schema {
  up () {
    this.create('notes', (table) => {
      table.increments();
      table.timestamps();
      table.text('note');
      table.boolean('is_active');
      table.integer('project_id').unsigned();
    });
  }

  down () {
    this.drop('notes');
  }
}

module.exports = NoteSchema;
