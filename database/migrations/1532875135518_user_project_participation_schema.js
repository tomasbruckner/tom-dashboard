'use strict'

const Schema = use('Schema')

class UserProjectParticipationSchema extends Schema {
  up () {
    this.create('user_project_participations', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users')
      table.integer('project_month_instance_id').unsigned().notNullable()
      table.foreign('project_month_instance_id').references('project_month_instances')
      table.integer('project_exp_modifier_id').unsigned().notNullable()
      table.foreign('project_exp_modifier_id').references('project_exp_modifiers')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_project_participations')
  }
}

module.exports = UserProjectParticipationSchema
