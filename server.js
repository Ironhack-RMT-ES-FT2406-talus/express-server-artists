require("dotenv").config();

// al iniciar el server, nos conectamos a la DB
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/artists-db")
.then(() => {
  console.log("todo bien, conectado a la DB, pa lante")
})
.catch((error) => {
  console.log(error)
})



const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();

// all middlewares & configurations here
app.use(logger("dev"));
app.use(express.static("public"));

// to allow CORS access from anywhere
app.use(cors({
  origin: '*'
}));

// below two configurations will help express routes at correctly receiving data. 
app.use(express.json()); // recognize an incoming Request Object as a JSON Object
app.use(express.urlencoded({ extended: false })); // recognize an incoming Request Object as a string or array

// all routes here...


const Artist = require("./models/Artist.model.js")

app.get("/", (req, res, next) => {
  res.json({ message: "all good here!" })
})

// creamos una ruta que permite al cliente acceder a la BD, a la colección de artistas y buscar todos los artistas.
app.get("/artists", (req, res, next) => {
  
  console.log(req.query)

  // Artist.find() // buscar multiples documentos (TODOS LOS DOCUMENTOS)
  // Artist.find( { isTouring: true } )
  // Artist.find( { awardsWon: { $gte: 20 } } )
  Artist.find( req.query )
  .select( { name: 1, isTouring: 1} ) // funciona exactamente igual al project de Compass
  .then((responseFromDB) => {
    //console.log(responseFromDB)
    res.json(responseFromDB)
  })
  .catch((error) => {
    console.log(error)
  })

})

// permitimos al cliente crear nuevos artistas
app.post("/artists", (req, res, next) => {

  console.log(req.body)

  Artist.create({
    name: req.body.name,
    awardsWon: req.body.awardsWon,
    isTouring: req.body.isTouring,
    genre: req.body.genre
  })
  .then(() => {
    res.json("todo ok, artista creado")
  })
  .catch((error) => {
    console.log(error)
  })

})

app.get("/artists/:artistId", (req, res, next) => {

  console.log(req.params)

  Artist.findById(req.params.artistId)
  .then((response) => {
    res.json(response)
  })
  .catch((error) => {
    console.log(error)
  })

})


app.delete("/artists/:artistId", async (req, res, next) => {
  try {
    await Artist.findByIdAndDelete(req.params.artistId)
    res.json("todo ok, documento borrado")
  } catch (error) {
    console.log(error)
  }
})

app.put("/artists/:artistId", async (req, res, next) => {

  console.log(req.params)
  console.log(req.body)

  try {
    
    const response = await Artist.findByIdAndUpdate(req.params.artistId, {
      name: req.body.name,
      awardsWon: req.body.awardsWon,
      genre: req.body.genre,
      isTouring: req.body.isTouring
    }, { new: true }) // el new true va a forzar a mongo a darnos en el response el documento despues de la actualización

    res.json(response) // le damos al frontend el documento actualizado

  } catch (error) {
    console.log(error)
  }

})

app.patch("/artists/:artistId/is-touring", async (req, res, next) => {

  try {
    
    const response = await Artist.findById(req.params.artistId)
    await Artist.findByIdAndUpdate(req.params.artistId, {
      isTouring: !response.isTouring
    })
    res.json("todo ok, is touring cambiado")

  } catch (error) {
    console.log(error)
  }

})


// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
