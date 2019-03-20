var Datastore = require('nedb')
  , db = new Datastore({ filename: './db.feedbak', autoload: true });
  module.exports = db