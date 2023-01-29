const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const Pitch = require('../models/pitch')
const app = express()
app.use(bodyParser.json());
app.use(express.json())


// Get all pitches along with their offers in reverse chronological order
router.get('/', async (req, res) => {
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
router.get('/:pitch_id', async (req, res) => {
  try {
    const pitch = await Pitch.findById(req.params.pitch_id)
    res.status(200).json(pitch)
  } catch (err) {
    res.status(404).send(err)
  }

})

//post a pitch and returning id in response
router.post('/', async (req, res) => {
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

//post an offer provided id of the pitch
router.post('/:id/makeOffer', async (req, res) => {
  const pitchId = req.params.id;
  const new_offer = {
    investor: req.body.investor,
    amount: req.body.amount,
    equity: req.body.equity,
    comment: req.body.comment
  };
  if (!req.body.investor || !req.body.amount || !req.body.equity || !req.body.comment || req.body.equity < 0 || req.body.equity > 100) {
    res.status(400).send("invalid")
  } else {
    Pitch.findOneAndUpdate({
        _id: pitchId
      }, {
        $push: {
          offers: new_offer
        }
      }, {
        new: true
      },
      (err, result) => {
        if (!err) {
          res.status(201).json({
            id: pitchId
          });
        } else {
          console.log(err);
          res.status(404).send(err);
        }
      }
    );
  }
});

module.exports = router
