'use strict'

/*
|--------------------------------------------------------------------------
| ProjectMonthInstanceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Database = use('Database')

class ProjectMonthInstanceSeeder {
  async run () {
    const projectIds = await Database.table('projects').select('id')
    const projects = ProjectMonthInstanceSeeder.getInitialData(projectIds)

    await Database.table('project_month_instances').insert(projects)
  }

  static getInitialData (projects) {
    const data = projects.reduce((acc, projectRow) => [
      ...acc,
      ...ProjectMonthInstanceSeeder.getProjectsToEndOfYear(projectRow.id)
    ], [])

    return data
  }

  static getProjectsToEndOfYear (projectId) {
    const projects = []

    for (let i = 6; i < 12; i++) {
      projects.push({
        project_id: projectId,
        month: new Date(2018, i, 1),
      })
    }
    return projects
  }
}

module.exports = ProjectMonthInstanceSeeder
