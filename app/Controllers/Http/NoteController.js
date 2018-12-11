'use strict';

const NoteModel = use('App/Models/Note');

class NoteController {
  static mapToDbEntity (request) {
    const {
      note,
      projectId,
      deadlineDate,
    } = request.only(['note', 'projectId', 'deadlineDate']);

    return {
      note,
      is_active: 1,
      deadline: new Date(deadlineDate),
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
    const note = await NoteModel.find(id);
    note.merge(NoteController.mapToDbEntity(request));
    await note.save();

    return note.toJSON();
  }
}

module.exports = NoteController;
