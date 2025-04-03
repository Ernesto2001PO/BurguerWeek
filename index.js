const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')

const app = express()
const port = 4000

// Configuración de las vistas (donde están los archivos .ejs)
app.set('views', path.join(__dirname, 'Frontend','pages', 'views'));

// Establecer EJS como motor de plantillas
app.set('view engine', 'ejs')

// Middleware para parsear datos del cuerpo
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

// Servir archivos estáticos (CSS y JS)
app.use("/css", express.static(path.join(__dirname, 'Frontend', 'public', 'css')));
app.use("/js", express.static(path.join(__dirname, 'Frontend', 'public', 'js')));

// Ruta para renderizar la página principal
app.get('/', (req, res) => {
    res.render('index', { title: 'Express' })  // Renderizar index.ejs
})

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})
