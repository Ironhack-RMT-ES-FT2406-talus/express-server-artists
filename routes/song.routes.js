const express = require("express")
const Song = require("../models/Song.model")
const router = express.Router()



// POST "/api/songs" => crear canciones
router.post("/", async (req, res, next) => {

  try {
   
    const { title, releasedDate, artist, collaborators } = req.body

    await Song.create({
      title,
      releasedDate,
      artist,
      collaborators
    })

    res.sendStatus(201)
  } catch (error) {
    next(error)
  }

})

// GET "/api/songs" => buscar todas las canciones
router.get("/", async (req, res, next) => {

  try {
    
    const response = await Song.find().populate("artist", "name genre").populate("collaborators", "name genre")
    res.json(response)

  } catch (error) {
    next(error)
  }

})


module.exports = router