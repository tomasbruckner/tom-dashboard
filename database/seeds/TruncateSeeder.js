'use strict'

/*
|--------------------------------------------------------------------------
| TruncateSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const ProjectExpModifierModel = use('App/Models/ProjectExpModifier')
const ProjectMonthInstanceModel = use('App/Models/ProjectMonthInstance')
const ProjectModel = use('App/Models/Project')
const StandupProjectRatingEnumModel = use('App/Models/StandupProjectRatingEnum')
const StandupProjectRatingModel = use('App/Models/StandupProjectRating')
const StandupModel = use('App/Models/Standup')
const UserModel = use('App/Models/User')

class TruncateSeeder {
  async run () {
    await ProjectExpModifierModel.truncate()
    await UserModel.truncate()
    await StandupProjectRatingModel.truncate()
    await ProjectMonthInstanceModel.truncate()
    await ProjectModel.truncate()
    await StandupModel.truncate()
    await StandupProjectRatingEnumModel.truncate()
  }
}

module.exports = TruncateSeeder
