'use strict';

const Schema = use('Schema');

class ProjectExpModifierSchema extends Schema {
  up () {
    this.create('project_exp_modifiers', (table) => {
      table.integer('id').primary().unsigned();
      table.string('name').notNullable();
      table.string('description').notNullable();
      table.float('value').notNullable().defaultTo(1.0);
    });
  }

  down () {
    this.drop('project_exp_modifiers');
  }
}

module.exports = ProjectExpModifierSchema;
