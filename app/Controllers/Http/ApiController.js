'use strict'

const addMonths = require('date-fns/add_months')
const Database = use('Database')
const ProjectModel = use('App/Models/Project')
const ProjectMonthInstanceModel = use('App/Models/ProjectMonthInstance')
const StandupModel = use('App/Models/Standup')
const StandupProjectRatingEnumModel = use('App/Models/StandupProjectRatingEnum')
const StandupProjectRating = use('App/Models/StandupProjectRating')

class ApiController {
  async getProjects({ request, response, session }) {
    const projects = await ProjectModel
      .query()
      .fetch()

    return projects.toJSON()
  }

  static getProjectData(request) {
    const {
      code,
      description,
      projectStartAt,
      projectEndAt,
    } = request.only(['code', 'description', 'projectStartAt', 'projectEndAt'])

    return {
      code,
      description,
      project_start_at: projectStartAt,
      project_end_at: projectEndAt,
    }
  }

  static async generateRatingsForNewProject(project) {
    const startDate = project.project_start_at ? new Date(project.project_start_at) : new Date()
    const endDate = project.project_end_at ? new Date(project.project_end_at) : new Date(2019, 1, 0)
    const monthInstancesMap = {}

    for (let date = startDate; date < endDate; date = addMonths(date, 1)) {
      const fullYear = date.getFullYear()
      const month = date.getMonth()
      const monthInstance = { month: new Date(fullYear, month, 1) }
      await project.projectMonthInstance().create(monthInstance)
    }

    await ApiController.generateRatings(project)
  }

  static async generateRatings(project) {
    const monthInstances = await project.projectMonthInstance().fetch()
    const projectRatingEnum = await StandupProjectRatingEnumModel.find(0)

    for (let i = 0; i < monthInstances.rows.length; i++) {
      const startDate = new Date(monthInstances.rows[i].month)
      const endDate = addMonths(startDate, 1)
      const standups = await StandupModel
        .query()
        .where('date', '>=', startDate)
        .where('date', '<', endDate)
        .fetch()

      for (let j = 0; j < standups.rows.length; j++) {
        const r = new StandupProjectRating()

        // this is slow, but there is no better option right now
        // https://forum.adonisjs.com/t/two-or-more-nonnullable-associations/1827
        await r.save()
        await r.projectMonthInstance().associate(monthInstances.rows[i])
        await r.projectRating().associate(projectRatingEnum)
        await r.standup().associate(standups.rows[j])
      }
    }
  }

  async addProject({ request, response }) {
    const project = new ProjectModel()
    project.fill(ApiController.getProjectData(request))
    await project.save()
    await ApiController.generateRatingsForNewProject(project)

    return project.toJSON()
  }

  async editProject({ request, response, params }) {
    const { id } = params
    const project = await ProjectModel.find(id)
    project.merge(ApiController.getProjectData(request))
    await project.save()

    return project.toJSON()
  }

  async deleteProject({ request, response, params }) {
    const { id } = params
    const project = await ProjectModel.find(id)

    try {
      await project.delete()
      response.send()
    } catch (e) {
      return e.toJSON()
    }
  }

  async getProjectsWithInstances({ request, response, session }) {
    let { month, year } = request.get()
    month = Number(month)
    year = Number(year)
    const currentMonth = new Date(year, month, 1)

    const projects = await ProjectModel
      .query()
      .with('projectMonthInstance', builder => {
        builder.where('month', currentMonth)
      }).fetch()

    return projects.toJSON()
  }

  async setProjectRating({ request, response, session }) {
    const { projectRatingId, ratingValueId } = request.body

    try {
      const [rating, ratingValue] = await Promise.all([
        StandupProjectRating.find(projectRatingId),
        StandupProjectRatingEnumModel.find(ratingValueId),
      ])

      rating
        .projectRating()
        .associate(ratingValue)

      await rating.save()
      response.status(200).send()
    } catch (e) {
      console.error(e)
      response.status(404).send()
    }
  }

  async getProjectRatings({ request, response, session }) {
    let { month, year } = request.get()
    month = Number(month)
    year = Number(year)
    const currentMonth = new Date(year, month, 1)
    const nextMonth = new Date(year, month + 1, 1)

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
