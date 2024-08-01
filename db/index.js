// al iniciar el server, nos conectamos a la DB
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/artists-db")
.then(() => {
  console.log("todo bien, conectado a la DB, pa lante")
})
.catch((error) => {
  console.log(error)
})