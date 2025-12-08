import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

mongoose.connect('mongodb+srv://admin:Admin.12345678@backendlanding.fot6l7f.mongodb.net/usuariosDB?retryWrites=true&w=majority')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  edad: Number,
  curp: String,
  direccion: String,
  telefono: String,
  nss: String,
  tipoSangre: String,
  imagenBase64: String, // Aquí guardas la imagen en base64
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

app.post('/api/guardar-usuario', async (req, res) => {
  try {
    const { nombre, edad, curp, direccion, telefono, nss, tipoSangre, imagen } = req.body;

    if (!nombre || !edad || !curp || !direccion || !telefono || !nss || !tipoSangre || !imagen) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const nuevoUsuario = new Usuario({
      nombre,
      edad,
      curp,
      direccion,
      telefono,
      nss,
      tipoSangre,
      imagenBase64: imagen,
    });

    await nuevoUsuario.save();

    res.status(200).json({ mensaje: 'Usuario guardado correctamente', id: nuevoUsuario._id });
  } catch (err) {
    console.error('Error guardando usuario:', err);
    res.status(500).json({ error: 'Error al guardar el usuario' });
  }
});

app.listen(3001, () => {
  console.log('🚀 Servidor backend en http://localhost:3001');
});
