'use strict'

const ProjectModel = use('App/Models/Project')
const StandupModel = use('App/Models/Standup')
const ProjectMonthInstanceModel = use('App/Models/ProjectMonthInstance')
const StandupProjectRatingEnumModel = use('App/Models/StandupProjectRatingEnum')
const StandupProjectRating = use('App/Models/StandupProjectRating')

class ApiController {
  async getProjects ({request, response, session}) {
    // TODO to param
    const currentMonth = new Date(2018, 7, 1)

    const projects = await ProjectModel
      .query()
      .with('projectMonthInstance', builder => {
        builder.where('month', currentMonth)
      }).fetch()

    return projects.toJSON()
  }

  async setProjectRating ({request, response, session}) {
    const {projectRatingId, ratingValueId} = request.body

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

  async getProjectRatings ({request, response, session}) {
    // TODO dynamic month from param
    const currentMonth = new Date(2018, 7, 1)
    const nextMonth = new Date(2018, 8, 1)

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
