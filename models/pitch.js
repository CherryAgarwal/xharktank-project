const mongoose = require('mongoose')
const toJson = require('@meanie/mongoose-to-json');
mongoose.plugin(toJson);
var Schema = mongoose.Schema;

const offerSchema = new mongoose.Schema({
    investor:
    {
      type:String,
      required:true
    },
    amount:
    {
      type:Number,
      required:true
    },
    equity:
    {
      type:Number,
      required:true,
      min : 0,
      max : 100
    },
    comment:
    {
      type:String,
      required:true
    }

});

const pitchSchema = new mongoose.Schema({

    entrepreneur:
    {
      type:String,
      required:true
    },
    pitchTitle:
    {
      type:String,
      required:true
    },
    pitchIdea:
    {
      type:String,
      required:true
    },
    askAmount:
    {
      type:Number,
      required:true
    },
    equity:
    {
      type:Number,
      required:true,
      min : 0,
      max : 100
    },
    offers:[offerSchema]
});

module.exports = mongoose.model('Pitch',pitchSchema)
