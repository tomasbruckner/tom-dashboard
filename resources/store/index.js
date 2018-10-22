import axios from '~/plugins/axios';

export const state = () => ({
  projects: [],
  standups: [],
  standupRatings: {},
});

const sortByProperty = function (property, a, b) {
  return a[property] > b[property] ? 1
    : a[property] === b[property] ? 0 : -1;
};

const getDateParams = function () {
  const date = new Date();
  return {
    params: {
      month: date.getMonth(),
      year: date.getFullYear(),
    },
  };
};

const getStandupIndex = (state, standupId) => {
  for (const [index, rating] of state.standupRatings.entries()) {
    if (rating.id === standupId) {
      return index;
    }
  }

  throw new Error('Invalid standup id');
};

export const mutations = {
  updateRating (state, { projectId, ratingValueId, standupId }) {
    const standupIndex = getStandupIndex(state, standupId);
    const newStandupRatings = [ ...state.standupRatings ];
    const newRatings = { ...newStandupRatings[standupIndex].standupProjectRating };
    newRatings[projectId] = ratingValueId;
    newStandupRatings[standupIndex].standupProjectRating = newRatings;

    state.standupRatings = newStandupRatings;
  },
  setProjects (state, projects) {
    state.projects = projects.map(p => ({
      id: p.id,
      code: p.code,
      description: p.description,
      isActive: p.is_active === 1,
    })).sort(sortByProperty.bind(this, 'code'));
  },
  setAllProjects(state, projects) {
    state.allProjects = projects.map(p => ({
      id: p.id,
      code: p.code,
      description: p.description,
      isActive: p.is_active === 1,
    })).sort(sortByProperty.bind(this, 'code'));
  },
  setProjectRatings (state, standupRatings) {
    const newStandupRatings = standupRatings.sort(sortByProperty.bind(this, 'date'));
    for (const [index, { standupProjectRating }] of newStandupRatings.entries()) {
      const newRatings = {};
      for (const { project_id, standup_project_rating_enum_id } of standupProjectRating) {
        // eslint-disable-next-line camelcase
        newRatings[project_id] = standup_project_rating_enum_id;
      }

      newStandupRatings[index].standupProjectRating = newRatings;
    }

    state.standupRatings = newStandupRatings;
  },
};

export const actions = {
  async getProjects ({ commit }) {
    const res = await axios.get('/api/projects',
      {
        params: {
          isActive: true,
        },
      });

    commit('setProjects', res.data);
  },
  async getAllProjects ({ commit }) {
    const res = await axios.get('/api/projects');

    commit('setAllProjects', res.data);
  },
  async createStandup ({ commit }) {
    await axios.post('/api/standups');
    const res = await axios.get(
      '/api/projectRatings',
      getDateParams(),
    );

    commit('setProjectRatings', res.data);
  },
};
