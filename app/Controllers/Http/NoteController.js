'use strict';

const NoteModel = use('App/Models/Note');

class NoteController {
  static mapToDbEntity (request) {
    const {
      note,
      projectId,
    } = request.only(['note', 'projectId']);

    return {
      note,
      is_active: 1,
      project_id: projectId,
    };
  }

  async getNotes ({ request, response, params }) {
    const query = NoteModel
      .query()
      .where('is_active', true)
      .with('project');
    const notes = await query.fetch();

    return notes.toJSON();
  }

  async createNote ({ request, response, params }) {
    const note = new NoteModel();
    note.fill(NoteController.mapToDbEntity(request));
    await note.save();

    return note.toJSON();
  }

  async markCompleted ({ request, response, params }) {
    const { id } = params;
    const note = await NoteModel.find(id);
    note.is_active = false;
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

module.exports = NoteController;
