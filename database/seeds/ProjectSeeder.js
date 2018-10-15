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
        is_active: true,
      },
      {
        code: 'EMB',
        is_active: true,
      },
      {
        code: 'GEB',
        is_active: true,
      },
      {
        code: 'SEAL',
        is_active: true,
      },
      {
        code: 'CDC',
        is_active: true,
      },
      {
        code: 'BGT',
        is_active: true,
      },
      {
        code: 'FUND',
        is_active: true,
      },
      {
        code: 'ORCH',
        is_active: true,
      },
      {
        code: 'STR',
        is_active: true,
      },
    ]
  }
}

module.exports = ProjectSeeder
