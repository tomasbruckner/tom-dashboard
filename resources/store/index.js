import axios from '~/plugins/axios';

export const state = () => ({
  notes: [],
  projects: [],
  standups: [],
  standupRatings: {},
  users: [],
});

const sortByProperty = function (property, a, b) {
  return a[property] > b[property] ? 1
    : a[property] === b[property] ? 0 : -1;
};

const getDateParams = function (date = new Date()) {
  return {
    params: {
      month: date.getMonth(),
      year: date.getFullYear(),
    },
  };
};

const getProjectParams = () => {
  return {
    params: {
      isActive: true,
    },
  };
};

const filterProjectsByRatings = (projects, ratings) => {
  const allowedProjectIds = {};
  for (const { standupProjectRating } of ratings) {
    for (const { project_id } of standupProjectRating) {
      allowedProjectIds[project_id] = true;
    }
  }

  return projects.filter(p => allowedProjectIds[p.id]);
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
    const newStandupRatings = [...state.standupRatings];
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
  setAllProjects (state, projects) {
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
  setNotes (state, notes) {
    state.notes = notes.map(n => ({
      id: n.id,
      projectCode: n.project.code,
      text: n.note,
    })).sort(sortByProperty.bind(this, 'projectCode'));
  },
  setUsers (state, users) {
    state.users = users.map(u => ({
      firstName: u.first_name,
      id: u.id,
      isActive: u.is_active,
      lastName: u.last_name,
      totalExp: u.total_exp,
      username: u.username,
    }));
  },
};

export const actions = {
  async getProjects ({ commit }) {
    const res = await axios.get('/api/projects',
      getProjectParams(),
    );

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
  async getProjectsForMonth ({ commit }, date) {
    const dateParams = getDateParams(date);
    const [projectData, ratingsData] = await Promise.all([
      axios.get(
        '/api/projects',
      ),
      axios.get(
        '/api/projectRatings',
        dateParams,
      ),
    ]);

    const projects = filterProjectsByRatings(projectData.data, ratingsData.data);

    commit('setProjects', projects);
    commit('setProjectRatings', ratingsData.data);
  },
  async getStandupData ({ commit }) {
    const [projectData, ratingsData] = await Promise.all([
      axios.get(
        '/api/projects',
        getProjectParams(),
      ),
      axios.get(
        '/api/projectRatings',
        getDateParams(),
      ),
    ]);

    commit('setProjects', projectData.data);
    commit('setProjectRatings', ratingsData.data);
  },
  async getNotes ({ commit }) {
    const notes = await axios.get('/api/notes');

    commit('setNotes', notes.data);
  },
  async createNote ({ commit }, note) {
    await axios.post('/api/notes', note);
    const res = await axios.get('/api/notes');

    commit('setNotes', res.data);
  },
  async markNoteCompleted ({ commit }, noteId) {
    const [_, notes] = await Promise.all(
      [
        axios.post(`/api/notes/${noteId}/completed`),
        axios.get(`/api/notes`),
      ],
    );

    commit('setNotes', notes.data);
  },
  async getUsers ({ commit }) {
    const users = await axios.get('/api/users');

    commit('setUsers', users.data);
  },
};
