// require mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create the schema
var PollSchema = new mongoose.Schema({
  question: String,
  options: Array,
  _user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})
// register the schema as a model
var Poll = mongoose.model('Poll', PollSchema);
