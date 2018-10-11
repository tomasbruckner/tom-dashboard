'use strict'

const ProjectModel = use('App/Models/Project')
const StandupModel = use('App/Models/Standup')
const StandupProjectRatingEnumModel = use('App/Models/StandupProjectRatingEnum')
const StandupProjectRating = use('App/Models/StandupProjectRating')

class ApiController {
  static getProjectData (request) {
    const {
      code,
      description,
      isActive,
    } = request.only(['code', 'description', 'isActive'])

    return {
      code,
      description,
      is_active: isActive,
    }
  }

  async getProjects ({ request, response, params }) {
    const { isActive } = params
    const projectsQuery = ProjectModel.query()

    if (typeof isActive === 'boolean') {
      projectsQuery.where('is_active', isActive)
    }

    const projects = await projectsQuery.fetch()

    return projects.toJSON()
  }

  async addProject ({ request, response }) {
    const project = new ProjectModel()
    project.fill(ApiController.getProjectData(request))
    await project.save()

    return project.toJSON()
  }

  async editProject ({ request, response, params }) {
    const { id } = params
    const project = await ProjectModel.find(id)
    project.merge(ApiController.getProjectData(request))
    await project.save()

    return project.toJSON()
  }

  async deleteProject ({ request, response, params }) {
    const { id } = params
    const project = await ProjectModel.find(id)

    try {
      await project.delete()
      response.send()
    } catch (e) {
      return e.toJSON()
    }
  }

  async setProjectRating ({ request, response, session }) {
    const { projectId, standupId, ratingValueId } = request.body

    try {
      const ratingData = { project_id: projectId, standup_id: standupId }
      const [rating, ratingValue] = await Promise.all([
        StandupProjectRating.findOrCreate(ratingData, ratingData),
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

  async getProjectRatings ({ request, response, session }) {
    let { month, year } = request.get()
    month = Number(month)
    year = Number(year)
    const currentMonth = new Date(year, month, 1)
    const nextMonth = new Date(year, month + 1, 1)

    const projects = await StandupModel
      .query()
      .where('date', '>=', currentMonth)
      .where('date', '<', nextMonth)
      .with('standupProjectRating')
      .fetch()

    return projects.toJSON()
  }

  async addStandup ({ request, response, params }) {
    const standup = new StandupModel()
    standup.date = new Date()
    await standup.save()

    return standup.toJSON()
  }

  async deleteStandup ({ request, response, params }) {
    const { id } = params
    const standup = await StandupModel.find(id)

    try {
      await standup.delete()
      response.send()
    } catch (e) {
      return e.toJSON()
    }
  }
}

module.exports = ApiController
