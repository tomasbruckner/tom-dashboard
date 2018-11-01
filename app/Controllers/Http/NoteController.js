'use strict'

const NoteModel = use('App/Models/Note')

class NoteController {
  static mapToDbEntity(request) {
    const {
      isActive,
      note,
      projectId,
    } = request.only(['isActive', 'note', 'projectId']);

    return {
      note,
      is_active: isActive,
      project_id: projectId,
    };
  }

  async getNotes ({ request, response, params }) {
    const { isActive } = request.get();
    const query = NoteModel.query();

    if (isActive === 'true') {
      query.where('is_active', true);
    }

    const notes = await query.fetch();

    return notes.toJSON();
  }

  async createNote ({ request, response, params }) {
    const note = new NoteModel();
    note.fill(NoteController.mapToDbEntity(request));
    await note.save();

    return note.toJSON();
  }

  async editNote ({ request, response, params }) {
    const { id } = params;
    const project = await NoteModel.find(id);
    project.merge(NoteController.mapToDbEntity(request));
    await project.save();

    return project.toJSON();
  }
}

module.exports = NoteController
