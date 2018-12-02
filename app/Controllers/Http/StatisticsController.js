'use strict';

const StandupProjectRatingsModel = use('App/Models/StandupProjectRating');
const StandupsModel = use('App/Models/Standup');

class StatisticsController {
  async getProjectStatistics ({ request, response, params }) {
    let { month, year } = request.get();
    month = Number(month);
    year = Number(year);
    const currentMonth = new Date(year, month, 1);
    const nextMonth = new Date(year, month + 1, 1);

    const standups = (await StandupsModel
      .query()
      .where('date', '>=', currentMonth)
      .where('date', '<', nextMonth)
      .fetch()).toJSON();

    const projectRatings = (await StandupProjectRatingsModel
      .query()
      .whereHas('standup', (builder) => {
        builder
          .where('date', '>=', currentMonth)
          .where('date', '<', nextMonth);
      })
      .with('projectRating')
      .with('project')
      .fetch()).toJSON();

    const projectStatisticsMap = projectRatings.reduce((acc, p) => {
      if (!acc[p.project_id]) {
        acc[p.project_id] = {
          projectCode: p.project.code,
          ratings: [],
        };
      }

      acc[p.project_id].ratings.push(p.projectRating.value);

      return acc;
    }, {});

    const totalStandups = standups.length;
    const projectStatistics = Object
      .keys(projectStatisticsMap)
      .map(projectId => {
        const project = projectStatisticsMap[projectId];
        const ratings = project.ratings.filter(r => r !== 0);
        const sum = ratings.reduce((acc, r) => acc + r, 0) || 0;
        const exps = sum / ratings.length * totalStandups;

        return {
          exps,
          projectId,
          ratings,
          projectCode: project.projectCode,
        };
      });

    return projectStatistics;
  }
}

module.exports = StatisticsController;
