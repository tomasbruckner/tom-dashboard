'use strict'

const ProjectModel = use('App/Models/Project')
const StandupModel = use('App/Models/Standup')
const StandupProjectRatingEnumModel = use('App/Models/StandupProjectRatingEnum')
const StandupProjectRating = use('App/Models/StandupProjectRating')

class ApiController {
  async getProjects({ request, response, session }) {
    const projects = await ProjectModel
      .query()
      .where('is_active', true)
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

  async addProject({ request, response }) {
    const project = new ProjectModel()
    project.fill(ApiController.getProjectData(request))
    await project.save()

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
      .where('is_active', true)
      .fetch()

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
        builder.with('project')
      }).fetch()

    return projects.toJSON()
  }
}

module.exports = ApiController
