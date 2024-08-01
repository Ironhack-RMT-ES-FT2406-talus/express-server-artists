const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({

  title: String,
  releasedDate: Date,
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist" // el nombre interno del model, definido en el archivo .model
  },
  collaborators: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Artist" // el nombre interno del model, definido en el archivo .model
  }

})

const Song = mongoose.model("Song", songSchema)

module.exports = Song