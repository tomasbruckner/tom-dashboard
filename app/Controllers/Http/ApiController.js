'use strict'

const ProjectModel = use('App/Models/Project')
const StandupModel = use('App/Models/Standup')

class ApiController {
  async getProjects ({request, response, session}) {
    const currentMonth = new Date(2018, 6, 1)

    const projects = await ProjectModel
      .query()
      .with('projectMonthInstance', builder => {
        builder.where('month', currentMonth)
      }).fetch()

    return projects.toJSON()
  }

  async getProjectRatings ({request, response, session}) {
    const currentMonth = new Date(2018, 6, 1)
    const nextMonth = new Date(2018, 7, 1)

    const projects = await StandupModel
      .query()
      .where('date', '>=', currentMonth)
      .where('date', '<', nextMonth)
      .with('standupProjectRating', builder => {
        builder.with('projectMonthInstance', builder => {
          builder.with('project')
        })
      }).fetch()

    return projects.toJSON()
  }
}

module.exports = ApiController
