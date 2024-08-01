
const express = require("express")
const router = express.Router()

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "all good here!" })
})


const artistRouter = require("./artist.routes.js")
router.use("/artists", artistRouter)

const songRouter = require("./song.routes.js")
router.use("/songs", songRouter)



module.exports = router