/* Controladores de la la logica del negocio*/
var session = require('../controllers/auth')
var auth = require('../config/auth')
var users = require('../controllers/user')
var events = require('../controllers/event')
var comments = require('../controllers/comment')
var bodyParser = require('body-parser')
var multer = require('multer');
var upload = multer({ dest: 'uploads/userimages' })
/* Router*/
module.exports = (app) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  /* Rutas para los controladores*/
  /* Autenticacion y mantenimiento de sesion*/
  app.get('/auth/session', auth.access, session.session)
  app.post('/auth/session', session.login)
  app.delete('/auth/session', session.logout)
  /*CRUD del usuario existente en el sistema*/
  app.post('/api/user/:username', users.create)
  app.get('/api/user/:username', users.get)
  app.put('/api/user/:username', upload.single('profpic'), auth.access, auth.canEdit, users.update)
  app.delete('/api/user/:username', auth.access, users.delete)
  /* CRD y funcionalidad del evento*/
  app.post('/api/event/:eventid', upload.single('photo'), auth.access, events.create)
  app.get('/api/event/:eventid', events.get)
  app.put('/api/event/:eventid', auth.access, events.participate)
  app.delete('/api/event/:eventid', auth.access, events.delete)
  /* CUD para los comentarios*/
  app.post('/api/comment/', auth.access, comments.create)
  app.delete('/api/comment/', auth.access, comments.delete)
  /* CRUD para las amistades*/
  app.post('/api/friend/', auth.access, users.add)
  app.put('/api/friend/', auth.access, users.agree)
  app.delete('/api/friend/', auth.access, users.deny)
  /* discover*/
  app.get('/api/getall/', auth.access, events.getall)
}
