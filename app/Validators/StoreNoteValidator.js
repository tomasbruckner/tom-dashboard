'use strict';

class StoreNoteValidator {
  get rules () {
    return {
      note: `required|min:1`,
      projectId: 'required|number',
    };
  }
}

module.exports = StoreNoteValidator;
