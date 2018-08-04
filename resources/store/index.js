export const state = () => ({
  projects: [],
  items: [],
})

const getRatings = (standup) => {
  return standup.standupProjectRating.map(r => ({
    projectInstanceId: r.project_month_instance_id,
    ratingValue: r.standup_project_rating_enum_id,
    projectRatingId: r.id,
  })).sort((a, b) => a.projectInstanceId > b.projectInstanceId)
}

export const mutations = {
  update (state, {projectIndex, ratingIndex, ratingValue}) {
    const newItems = {...state.items}
    const project = newItems[projectIndex]
    const newData = project.ratings.slice(0)
    newData[ratingIndex].ratingValue = ratingValue

    state.items = newItems
  },
  setProjects (state, projects) {
    state.projects = projects.map(p => ({
      id: p.id,
      projectInstanceId: p.projectMonthInstance[0].id,
      code: p.code,
    })).sort((a, b) => a.projectInstanceId > b.projectInstanceId)
  },
  setProjectRatings (state, items) {
    state.items = items.map(i => ({
      standupDate: i.date,
      standupId: i.standupProjectRating[0].standup_id,
      ratings: getRatings(i)
    })).sort((a, b) => a.date > b.date)
  },
  updateProjectRating (state, project) {

  }
}

export const actions = {}
