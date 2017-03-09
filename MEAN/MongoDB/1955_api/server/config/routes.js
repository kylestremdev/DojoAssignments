var personController = require('./../controllers/persons.js');

module.exports = function (app) {
  app.get('/', personController.index);
  app.get('/new/:name', personController.create);
  app.get('/remove/:name', personController.delete);
  app.get('/:name', personController.show);
}
