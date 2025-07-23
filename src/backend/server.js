// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Conexión MongoDB
mongoose.connect('mongodb://localhost:27017/usuariosDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Modelo
const ImagenSchema = new mongoose.Schema({
  imagenBase64: String
});
const Imagen = mongoose.model('Imagen', ImagenSchema);

// Ruta para guardar la imagen
app.post('/api/guardar-imagen', async (req, res) => {
  try {
    const { imagen } = req.body;

    if (!imagen) {
      return res.status(400).json({ error: 'Imagen no proporcionada' });
    }

    const nuevaImagen = new Imagen({ imagenBase64: imagen });
    await nuevaImagen.save();

    res.status(200).json({ mensaje: 'Imagen guardada correctamente', id: nuevaImagen._id });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar la imagen' });
  }
});

// Nueva ruta para obtener imagen por ID
app.get('/api/imagen/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const imagen = await Imagen.findById(id);

    if (!imagen) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    res.status(200).json(imagen);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la imagen' });
  }
});

// Iniciar servidor
app.listen(3001, () => {
  console.log('🚀 Servidor backend en http://localhost:3001');
});
