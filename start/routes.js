'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route');

Route.get('/api/projects', 'ProjectController.getProjects');
Route.post('/api/projects', 'ProjectController.createProject').validator('StoreProject');
Route.put('/api/projects/:id', 'ProjectController.editProject').validator('StoreProject');
Route.delete('/api/projects/:id', 'ProjectController.deleteProject');

Route.get('/api/projectRatings', 'ProjectRatingController.getProjectRatings');
Route.post('/api/projectRatings', 'ProjectRatingController.setProjectRating');

Route.get('/api/standups', 'StandupController.getStandups');
Route.post('/api/standups', 'StandupController.createStandup');
Route.delete('/api/standups', 'StandupController.deleteStandup');

Route.get('/api/notes', 'NoteController.getNotes');
Route.post('/api/notes', 'NoteController.createNote');
Route.put('/api/notes/:id', 'NoteController.editNote');
Route.post('/api/notes/:id/completed', 'NoteController.markCompleted');

Route.any('*', 'NuxtController.render');
