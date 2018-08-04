'use strict'

const Schema = use('Schema')

class BonusExpSchema extends Schema {
  up () {
    this.create('bonus_exps', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users')
      table.string('description').notNullable()
      table.dateTime('date').notNullable()
      table.integer('exp').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('bonus_exps')
  }
}

module.exports = BonusExpSchema
