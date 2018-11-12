'use strict';

class StoreProject {
  get rules () {
    const projectId = this.ctx.params.id;

    return {
      firstName: `required|max:255|min:1`,
      lastName: 'required|max:255|min:1',
      totalExp: 'required|number|min:0',
      isActive: 'required|boolean',
    };
  }
}

module.exports = StoreProject;
