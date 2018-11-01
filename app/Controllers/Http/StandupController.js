'use strict'

const StandupModel = use('App/Models/Standup');

class StandupController {

  async getStandups ({ request, response, session }) {
    let { month, year } = request.get();
    month = Number(month);
    year = Number(year);
    const currentMonth = new Date(year, month, 1);
    const nextMonth = new Date(year, month + 1, 1);

    const standups = await StandupModel
      .query()
      .where('date', '>=', currentMonth)
      .where('date', '<', nextMonth)
      .fetch();

    return standups.toJSON();
  }

  async createStandup ({ request, response, params }) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    const standup = await StandupModel.findOrCreate(
      { date },
      { date },
    );

    return standup.toJSON();
  }

  async deleteStandup ({ request, response, params }) {
    const { id } = params;
    const standup = await StandupModel.find(id);

    try {
      await standup.delete();
      response.send();
    } catch (e) {
      return e.toJSON();
    }
  }
}

module.exports = StandupController
