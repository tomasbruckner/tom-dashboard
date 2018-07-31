'use strict'

/*
|--------------------------------------------------------------------------
| ProjectExpModifierSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Database = use('Database')

class ProjectExpModifierSeeder {
  async run () {
    await Database.table('project_exp_modifiers')
      .insert(ProjectExpModifierSeeder.getInitialData())
  }

  static getInitialData () {
    return [
      {
        id: 0,
        description: 'Normal modifier',
        name: 'STANDARD',
        value: 1.0,
      },
      {
        id: 1,
        description: 'Modifier for people working alone on a project',
        name: 'SOLO_PLAYER',
        value: 1.5,
      },
      {
        id: 2,
        description: 'Modifier for team leaders in a project',
        name: 'TEAM_LEADER',
        value: 2.0,
      },
    ]
  }
}

module.exports = ProjectExpModifierSeeder
