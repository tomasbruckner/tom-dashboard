'use strict'

/*
|--------------------------------------------------------------------------
| StandupSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Database = use('Database')

class StandupSeeder {
  async run () {
    await Database.table('standups')
      .insert(StandupSeeder.getInitialData())
  }

  static getInitialData () {
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000
    const end = new Date(2019, 0, 1)
    let monday = new Date(2018, 6, 2)
    let thursday = new Date(2018, 6, 5)
    const data = []

    while (monday < end) {
      data.push(monday)

      if (thursday < end) {
        data.push(thursday)
      }

      monday = new Date(monday.getTime() + SEVEN_DAYS)
      thursday = new Date(thursday.getTime() + SEVEN_DAYS)
    }

    return data.map(date => ({ date }));
  }
}

module.exports = StandupSeeder
