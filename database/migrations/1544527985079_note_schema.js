'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NoteSchema extends Schema {
  up () {
    this.table('notes', (table) => {
      table.date('deadline');
    })
  }

  down () {
    this.table('notes', (table) => {
      table.dropColumn('deadline');
    })
  }
}

module.exports = NoteSchema
