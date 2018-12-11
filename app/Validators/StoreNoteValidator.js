'use strict';

class StoreNoteValidator {
  get rules () {
    return {
      projectId: 'required|number',
      deadlineDate: 'required|date',
      note: `required|min:1`,
    };
  }
}

module.exports = StoreNoteValidator;
