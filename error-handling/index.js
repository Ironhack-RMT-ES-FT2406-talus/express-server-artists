function errorHandling(app) {
  app.use((req, res, next) => {
    // gestor de error 404
    res.status(404).json({errorMessage: "Ruta no encontrada"})
  })
  
  app.use((error, req, res, next) => {
    // el hecho que este callback tenga 4 parametros lo convierte en gestor de error 500
    console.log(error)
    res.status(500).json({errorMessage: "Lo sentimos, hubo un problema de servidor"})
  })
}

module.exports = errorHandling