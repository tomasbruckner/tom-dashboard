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

/**
 * AUTH
 */
Route.post('/api/auth/login', 'AuthController.login')
  .validator('LoginValidator');
Route.post('/api/auth/logout', 'AuthController.logout');
Route.get('/api/auth/me', 'AuthController.me');

/**
 * NOTES
 */
Route
  .get('/api/notes', 'NoteController.getNotes');
Route
  .post('/api/notes', 'NoteController.createNote')
  .validator('StoreNoteValidator');
Route
  .put('/api/notes/:id', 'NoteController.editNote')
  .validator('StoreNoteValidator');
Route
  .post('/api/notes/:id/completed', 'NoteController.markCompleted');

/**
 * PROJECTS
 */
Route
  .get('/api/projects', 'ProjectController.getProjects');
Route
  .post('/api/projects', 'ProjectController.createProject')
  .validator('StoreProjectValidator');
Route
  .put('/api/projects/:id', 'ProjectController.editProject')
  .validator('StoreProjectValidator');
Route
  .delete('/api/projects/:id', 'ProjectController.deleteProject');
Route
  .get('/api/projects', 'ProjectController.getProjects');
Route
  .post('/api/projects', 'ProjectController.createProject')
  .validator('StoreProjectValidator');
Route
  .put('/api/projects/:id', 'ProjectController.editProject')
  .validator('StoreProjectValidator');
Route
  .delete('/api/projects/:id', 'ProjectController.deleteProject');

/**
 * PROJECT RATINGS
 */
Route
  .get('/api/projectRatings', 'ProjectRatingController.getProjectRatings');
Route
  .post('/api/projectRatings', 'ProjectRatingController.setProjectRating');

/**
 * STANDUPS
 */
Route
  .get('/api/standups', 'StandupController.getStandups');
Route
  .post('/api/standups', 'StandupController.createStandup');
Route
  .delete('/api/standups', 'StandupController.deleteStandup');

/**
 * STATISTICS
 */
Route
  .get('/api/statistics/projects', 'StatisticsController.getProjectStatistics');

/**
 * USERS
 */
Route
  .get('/api/users', 'UserController.getUsers');
Route
  .post('/api/users', 'UserController.createUser')
  .validator('StoreUserValidator');
Route
  .put('/api/users/:id', 'UserController.editUser')
  .validator('StoreUserValidator');
Route
  .delete('/api/users/:id', 'UserController.deleteUser');

/**
 * NUXT
 */
Route
  .any('*', 'NuxtController.render');
