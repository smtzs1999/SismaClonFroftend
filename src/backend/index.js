import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { name, email, department, phone, message } = req.body;

  const contenido = `

  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px;
     overflow: hidden; box-shadow: 0 2px 8px rgba(2, 2, 2, 1);">

      <!-- LOGO -->
      <div style="text-align: center; padding: 20px;">
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.phenompeople.com%2FCareerConnectResources%2FHHHHHHUS%2Fimages%2FHH-Health-color-300dpi-1692809162455.png&f=1&nofb=1&ipt=63ff36fce26121c25bff84f4599a836f1d8b5b69efdf654f42a7fd4ea6615099" alt="Logo Consultorio" style="max-width: 180px;" />
      </div>

      <div style="background-color: #34e220ff; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">¡Bienvenido Gracias por agendar tu cita en HEALTH BENEFITS!</h1>
      </div>
      <div style="padding: 20px; color: #333;">
        <p style="color: #000000ff;">Hola <strong>${name}</strong>,</p>
        <p style="color: #000000ff;">Hemos recibido tu solicitud para una cita médica.:</p>
        <p style="color: #000000ff;" >datos que ingresaste</p>
        
        <ul style="line-height: 1.6;, color: #000000ff;">
          <li><strong>Correo:      </strong> ${email}</li>
          <li><strong>Departamento:</strong> ${department}</li>
          <li><strong>Teléfono:    </strong> ${phone}</li>
          <li><strong>Mensaje:     </strong> ${message}</li>
        </ul>
        
        <p style="color: #000000ff;">Por favor, llega con 10 minutos de anticipación. Si necesitas reprogramar tu cita, puedes hacerlo desde el enlace de Calendly.</p>
        
        <p style="margin-top: 20px;">Gracias por confiar en nuestro consultorio.</p>
        
        <p style="color: #000000ff;">Atentamente,<br><strong>Consultorio Médico UTSH</strong></p>
      </div>
      <div style="background-color: #e5e7eb; padding: 15px; text-align: center; font-size: 12px; color: #555;">
        © 2025 Consultorio Médico UTSH - Todos los derechos reservados.
      </div>
    </div>
  </div>
  `;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "esmevega9809@gmail.com",
      pass: "tadpwuvfhsdvklaz"
    }
  });

  const mailOptions = {
    from: "esmevega9809@gmail.com",
    to: email,
    subject: "Confirmación personalizada de tu cita",
    html: contenido
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).json({ error: "No se pudo enviar el correo" });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
