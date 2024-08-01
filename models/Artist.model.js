const mongoose = require("mongoose")

// crear schema (el formato que tendrá cada documento)
const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // indica que el campo es obligatorio
    unique: true // que el valor no se puede repetir en otro documento
  },
  awardsWon: {
    type: Number,
    min: 0, // valor numerico minimo posible
    default: 0 // si el valor, no se recibe, este el valor predeterminado
  },
  isTouring: Boolean,
  genre: {
    type: [String], // esto define un array de strings como su unico posible valor
    enum: ["rock", "alternative", "grunge", "metal", "indie"] // estos son los unicos posibles valores que se pueden agregar a esta propiedad.
   }
})



// crear model (la manito que nos permite hacer acciones sobre esta colección en la DB)
const Artist = mongoose.model( "Artist", artistSchema )
// Siempre dos argumentos
// 1. El valor interno de mongo como se conocerá al model
// 2. el schema de validará los documentos de esta colección

// exportar nuestro modelo
module.exports = Artist