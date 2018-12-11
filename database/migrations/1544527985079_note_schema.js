'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NoteSchema extends Schema {
  up () {
    this.alter('notes', (table) => {
      table.date('deadline');
    })
  }

  down () {
    this.alter('notes', (table) => {
      table.dropColumn('deadline');
    })
  }
}

module.exports = NoteSchema
