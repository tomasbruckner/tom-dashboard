export const state = () => ({
  projects: [],
  items: [],
});

const getRatings = (standup) => {
  return standup.standupProjectRating.map(r => ({
    projectInstanceId: r.project_month_instance_id,
    ratingValue: r.project_rating_enum_id,
  })).sort((a, b) => a.projectInstanceId > b.projectInstanceId)
}

export const mutations = {
  update(state, projectId, dataId, value) {
    const newItems = { ...state.items };
    const project = newItems[projectId];
    const newData = project.data.slice(0);
    newData[dataId] = value;

    state.items = newItems;
  },
  setProjects (state, projects) {
    state.projects = projects.map(p => ({
      id: p.id,
      projectInstanceId: p.projectMonthInstance[0].id,
      code: p.code,
    })).sort((a, b) => a.projectInstanceId > b.projectInstanceId);
  },
  setProjectRatings(state, items) {
    state.items = items.map(i => ({
      standupDate: i.date,
      ratings: getRatings(i)
    })).sort((a, b) => a.date > b.date)
  }
};

export const actions = {
};
