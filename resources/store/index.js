import axios from '~/plugins/axios'

export const state = () => ({
  projects: [],
  standups: [],
  standupRatings: {},
})

const sortByProperty = function (property, a, b) {
  return a[property] > b[property] ? 1
    : a[property] === b[property] ? 0 : -1
}

const getDateParams = function () {
  const date = new Date()
  return {
    params: {
      month: date.getMonth(),
      year: date.getFullYear(),
    },
  }
}

export const mutations = {
  update (state, { projectIndex, ratingIndex, ratingValue }) {
    const newItems = [...state.items]
    const project = newItems[projectIndex]
    const newData = project.ratings.slice(0)
    newData[ratingIndex].ratingValue = ratingValue

    state.items = newItems
  },
  setProjects (state, projects) {
    state.projects = projects.map(p => ({
      id: p.id,
      code: p.code,
      description: p.description,
      isActive: p.is_active === 1,
    })).sort(sortByProperty.bind(this, 'code'))
  },
  setProjectRatings (state, standupRatings) {
    state.standupRatings = standupRatings.sort(sortByProperty.bind(this, 'date'))
  },
}

export const actions = {
  async getProjects ({ commit }) {
    const date = new Date()
    const res = await axios.get('/api/projects',
      {
        params: {
          month: date.getMonth(),
          year: date.getFullYear(),
        },
      })

    commit('setProjects', res.data)
  },
  async createStandup ({ commit }) {
    await axios.post('/api/standups')
    const res = await axios.get(
      '/api/projectRatings',
      getDateParams(),
    )

    commit('setProjectRatings', res.data)
  },
}
