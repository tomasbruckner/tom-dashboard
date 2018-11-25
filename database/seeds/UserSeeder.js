'use strict';

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Database = use('Database');

class UserSeeder {
  async run () {
    await Database.table('users').insert({
      name: 'Tomáš Bruckner',
      alias: 'Tom',
    });
  }
}

module.exports = UserSeeder;
