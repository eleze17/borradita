// server.js (Ejemplo simplificado)
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Para permitir solicitudes desde tu frontend
import { config } from 'dotenv'; 
config();

const uri = process.env.URL

const app = express();
const port = 3000;

// Configuración de Mongoose (usa tus propias credenciales y URI)

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Mongoose conectado a MongoDB!'))
.catch(err => console.error('Error de conexión de Mongoose:', err));

const Jugada = mongoose.models.jugadas

// Middlewares
app.use(cors()); // Habilita CORS para que tu frontend pueda hacer peticiones
app.use(express.json()); // Habilita el parsing de JSON en el cuerpo de la petición

// Endpoint para actualizar una jugada
app.put('/api/update-jugada', async (req, res) => {
    const { id, numeros } = req.body;

    if (!id || !numeros || !Array.isArray(numeros) || numeros.length !== 20 || numeros.some(isNaN)) {
        return res.status(400).json({ message: 'Datos inválidos. Se requiere un ID y un array de 20 números.' });
    }

    try {
        const updatedJugada = await Jugada.findByIdAndUpdate(
            id,
            { $push: { numeros:{$each: numeros }} }, // $set es importante para reemplazar el array completo
            { new: true, runValidators: true } // new: true devuelve el documento actualizado; runValidators: true ejecuta validadores del esquema
        );

        if (!updatedJugada) {
            return res.status(404).json({ message: 'Jugada no encontrada.' });
        }

        res.status(200).json({ message: 'Jugada actualizada con éxito', jugada: updatedJugada });
    } catch (error) {
        console.error('Error al actualizar la jugada:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

// Opcional: Endpoint para obtener una jugada por ID (para prellenar el formulario)
app.get('/api/jugada/:id', async (req, res) => {
    try {
        const jugada = await Jugada.findById(req.params.id);
        if (!jugada) {
            return res.status(404).json({ message: 'Jugada no encontrada.' });
        }
        res.status(200).json(jugada);
    } catch (error) {
        console.error('Error al obtener jugada:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});