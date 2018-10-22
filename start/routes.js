'use strict'

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

const Route = use('Route')

Route.get('/api/projects', 'ApiController.getProjects')
Route.post('/api/projects', 'ApiController.addProject').validator('StoreProject')
Route.put('/api/projects/:id', 'ApiController.editProject').validator('StoreProject')
Route.delete('/api/projects/:id', 'ApiController.deleteProject')
Route.get('/api/projectRatings', 'ApiController.getProjectRatings')
Route.post('/api/projectRatings', 'ApiController.setProjectRating')
Route.get('/api/standups', 'ApiController.getStandups')
Route.post('/api/standups', 'ApiController.addStandup')
Route.delete('/api/standups', 'ApiController.deleteStandup')

Route.any('*', 'NuxtController.render')
