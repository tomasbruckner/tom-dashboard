import axios from '~/plugins/axios'

export const state = () => ({
  items: [],
  projects: [],
})

const sortByProperty = function (property, a, b) {
  return a[property] > b[property] ? 1
    : a[property] === b[property] ? 0 : -1
}

const getRatings = (standup) => {
  return standup.standupProjectRating.map(r => ({
    projectInstanceId: r.project_month_instance_id,
    ratingValue: r.standup_project_rating_enum_id,
    projectRatingId: r.id,
    projectCode: r.projectMonthInstance.project.code,
  })).sort(sortByProperty.bind(this, 'projectCode'))
}

export const mutations = {
  update(state, { projectIndex, ratingIndex, ratingValue }) {
    const newItems = [...state.items]
    const project = newItems[projectIndex]
    const newData = project.ratings.slice(0)
    newData[ratingIndex].ratingValue = ratingValue

    state.items = newItems
  },
  setProjects(state, projects) {
    state.projects = projects.map(p => ({
      id: p.id,
      code: p.code,
      description: p.description,
      isActive: p.is_active === 1,
    })).sort(sortByProperty.bind(this, 'code'))
  },
  setProjectRatings(state, items) {
    state.items = items.map(i => ({
      standupDate: i.date,
      standupId: i.standupProjectRating[0].standup_id,
      ratings: getRatings(i),
    })).sort(sortByProperty.bind(this, 'date'))
  },
  updateProjectRating(state, project) {
  },
}

export const actions = {
  async getProjects({ commit }) {
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
}
