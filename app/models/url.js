const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  bodyParser = require('body-parser');
  autoIncrement = require('mongoose-auto-increment');



// create a schema
const urlSchema = new Schema({
  url: {
    type: String,
    required: [ true, 'A Domain is required' ]
  }

});


autoIncrement.initialize(mongoose.connection);
urlSchema.plugin(autoIncrement.plugin, 'Url');

// create the model
const Url = mongoose.model('Url', urlSchema);


// export the model
module.exports = Url;
