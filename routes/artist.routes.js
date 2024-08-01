const express = require("express")
const router = express.Router()

const Artist = require("../models/Artist.model.js")

// creamos una ruta que permite al cliente acceder a la BD, a la colección de artistas y buscar todos los artistas.
router.get("/", (req, res, next) => {
  
  console.log(req.query)

  // Artist.find() // buscar multiples documentos (TODOS LOS DOCUMENTOS)
  // Artist.find( { isTouring: true } )
  // Artist.find( { awardsWon: { $gte: 20 } } )
  Artist.find( req.query )
  .select( { name: 1, isTouring: 1} ) // funciona exactamente igual al project de Compass
  .then((responseFromDB) => {
    //console.log(responseFromDB)
    res.status(200).json(responseFromDB)
  })
  .catch((error) => {
    console.log(error)
  })

})

// permitimos al cliente crear nuevos artistas
router.post("/", (req, res, next) => {

  console.log(req.body)

  Artist.create({
    name: req.body.name,
    awardsWon: req.body.awardsWon,
    isTouring: req.body.isTouring,
    genre: req.body.genre
  })
  .then(() => {
    res.sendStatus(201) // cuando enviamos un codigo de estatus sin JSON, utilizamos sendStatus
    // .status() es para acompañar la respuesta de un codigo HTTP
    // .sendStatus() es para unicamente enviar el código de HTTP, sin respuesta.
  })
  .catch((error) => {
    console.log(error)
  })

})

// => /artists/12345
router.get("/:artistId", (req, res, next) => {

  console.log(req.params)

  Artist.findById(req.params.artistId)
  .then((response) => {
    res.status(200).json(response)
  })
  .catch((error) => {
    console.log(error)
  })

})

// quiero hacer una ruta para remover el genero rock de un artista

router.delete("/:artistId", async (req, res, next) => {
  try {

    console.log(patata)

    await Artist.findByIdAndDelete(req.params.artistId)
    res.sendStatus(202)
  } catch (error) {
    next(error)
    // si invocamos next() sin ningun argumento, continua con la siguiente ruta hasta que consiga otra que concuerde o llegue al gestor 404
    // si invocamos next() con cualquier valor de argumento envia la llamada directamente al gestor de errores 500.
  }
})

router.put("/:artistId", async (req, res, next) => {

  console.log(req.params)
  console.log(req.body)

  try {
    
    const response = await Artist.findByIdAndUpdate(req.params.artistId, {
      name: req.body.name,
      awardsWon: req.body.awardsWon,
      genre: req.body.genre,
      isTouring: req.body.isTouring
    }, { new: true }) // el new true va a forzar a mongo a darnos en el response el documento despues de la actualización

    res.status(200).json(response) // le damos al frontend el documento actualizado

  } catch (error) {
    console.log(error)
  }

})

router.patch("/:artistId/is-touring", async (req, res, next) => {

  try {
    
    const response = await Artist.findById(req.params.artistId)
    await Artist.findByIdAndUpdate(req.params.artistId, {
      isTouring: !response.isTouring
    })
    res.sendStatus(202)

  } catch (error) {
    console.log(error)
  }

})


module.exports = router
