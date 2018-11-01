'use strict'

const StandupModel = use('App/Models/Standup');
const StandupProjectRatingEnumModel = use('App/Models/StandupProjectRatingEnum');
const StandupProjectRating = use('App/Models/StandupProjectRating');

class ProjectRatingController {

  async setProjectRating ({ request, response, session }) {
    const { projectId, standupId, ratingValueId } = request.body;

    try {
      const ratingData = { project_id: projectId, standup_id: standupId };
      const [rating, ratingValue] = await Promise.all([
        StandupProjectRating.findOrCreate(ratingData, ratingData),
        StandupProjectRatingEnumModel.find(ratingValueId),
      ]);

      rating
        .projectRating()
        .associate(ratingValue);

      await rating.save();
      response.status(200).send();
    } catch (e) {
      console.error(e);
      response.status(404).send();
    }
  }

  async getProjectRatings ({ request, response, session }) {
    let { month, year } = request.get();
    month = Number(month);
    year = Number(year);
    const currentMonth = new Date(year, month, 1);
    const nextMonth = new Date(year, month + 1, 1);

    const projects = await StandupModel
      .query()
      .where('date', '>=', currentMonth)
      .where('date', '<', nextMonth)
      .with('standupProjectRating')
      .fetch();

    return projects.toJSON();
  }
}

module.exports = ProjectRatingController
