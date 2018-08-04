'use strict'

/*
|--------------------------------------------------------------------------
| StandupProjectRatingSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Database = use('Database')

class StandupProjectRatingSeeder {
  async run () {
    const projectInstances = await Database.table('project_month_instances').select('id', 'month', 'project_id')
    const projects = await Database.table('projects').select('id')
    const standups = await Database.table('standups').select('id', 'date')
    const standupProjectRatings = StandupProjectRatingSeeder.getInitialData(projects, projectInstances, standups)

    await Database.table('standup_project_ratings').insert(standupProjectRatings)
  }

  static getInitialData (projects, projectInstances, standups) {
    return projects.reduce((acc, p) => [
      ...acc,
      ...StandupProjectRatingSeeder.getRatingsForStandups(p, projectInstances, standups),
    ], [])
  }

  static getRatingsForStandups (project, projectInstances, standups) {
    return standups.reduce((acc, s) => [
      ...acc,
      {
        standup_id: s.id,
        project_month_instance_id: StandupProjectRatingSeeder.getProjectIdInstanceForStandup(
          s,
          project,
          projectInstances,
        ),
        standup_project_rating_enum_id: 0,
      }
    ], [])
  }

  static getProjectIdInstanceForStandup (standup, project, projectInstances) {
    const standupDate = new Date(standup.date)
    const firstDay = new Date(standupDate.setDate(1))

    const foundProject = projectInstances.find(p => {
      const isSameProject = p.project_id === project.id
      const projectDate = new Date(p.month).toString()
      const isSameDate = projectDate === firstDay.toString()

      return isSameProject && isSameDate
    })
    if (!foundProject) {
      console.log(project.id, projectInstances, firstDay.toString())
    }
    return foundProject.id
  }
}

module.exports = StandupProjectRatingSeeder
