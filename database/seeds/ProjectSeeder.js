'use strict'

/*
|--------------------------------------------------------------------------
| ProjectSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Database = use('Database')

class ProjectSeeder {
  async run () {
    await Database.table('projects')
      .insert(ProjectSeeder.getInitialData())
  }

  static getInitialData () {
    return [
      {
        code: 'ETS',
        active: true,
      },
      {
        code: 'EMB',
        active: true,
      },
      {
        code: 'GEB',
        active: true,
      },
      {
        code: 'TFP',
        active: true,
      },
      {
        code: 'SEAL',
        active: true,
      },
      {
        code: 'CDC',
        active: true,
      },
      {
        code: 'BGT',
        active: true,
      },
      {
        code: 'FUND',
        active: true,
      },
      {
        code: 'ORCH',
        active: true,
      },
      {
        code: 'MYP',
        active: true,
      },
      {
        code: 'STR',
        active: true,
      },
      {
        code: 'RED',
        active: true,
      },
      {
        code: 'AB',
        active: true,
      },
    ]
  }
}

module.exports = ProjectSeeder
