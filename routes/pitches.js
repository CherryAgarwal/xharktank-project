const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const Pitch = require('../models/pitch')
var VerifyToken = require('./VerifyToken');
const app = express()
app.use(bodyParser.json());
app.use(express.json())


// Get all pitches along with their offers in reverse chronological order
router.get('/',VerifyToken, async (req, res) => {
  try {
    const pitches = await Pitch.find().sort({
      $natural: -1
    })
    res.status(200).json(pitches)
  } catch (err) {
    res.status(400).send(err)
  }
})

//Get a single pitch according to provided id
router.get('/:pitch_id',VerifyToken, async (req, res) => {
  try {
    const pitch = await Pitch.findById(req.params.pitch_id)
    res.status(200).json(pitch)
  } catch (err) {
    res.status(404).send(err)
  }

})

//post a pitch and returning id in response
router.post('/',VerifyToken, async (req, res) => {
  const pitch = new Pitch({
    entrepreneur: req.body.entrepreneur,
    pitchTitle: req.body.pitchTitle,
    pitchIdea: req.body.pitchIdea,
    askAmount: req.body.askAmount,
    equity: req.body.equity
  })
  try {
    const a1 = await pitch.save()
    res.status(201).json({
      id: a1._id
    })
  } catch (err) {
    res.status(400).send('Status:Bad Request')
  }
})

module.exports = router
