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
      },
      {
        code: 'EMB',
      },
      {
        code: 'GEB',
      },
      {
        code: 'TFP',
      },
      {
        code: 'SEAL',
      },
      {
        code: 'CDC',
      },
      {
        code: 'BGT',
      },
      {
        code: 'FUND',
      },
      {
        code: 'ORCH',
      },
      {
        code: 'MYP',
      },
      {
        code: 'STR',
      },
      {
        code: 'RED',
      },
      {
        code: 'AB',
      },
    ]
  }
}

module.exports = ProjectSeeder
