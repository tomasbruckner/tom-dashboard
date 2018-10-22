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
const ProjectModel = use('App/Models/Project')
const StandupProjectRatingEnumModel = use('App/Models/StandupProjectRatingEnum')
const StandupProjectRatingModel = use('App/Models/StandupProjectRating')
const StandupModel = use('App/Models/Standup')
const UserModel = use('App/Models/User')

class TruncateSeeder {
  async run () {
    await ProjectExpModifierModel.query().delete()
    await UserModel.query().delete()
    await StandupProjectRatingModel.query().delete()
    await ProjectModel.query().delete()
    await StandupModel.query().delete()
    await StandupProjectRatingEnumModel.query().delete()
  }
}

module.exports = TruncateSeeder
