/*const nodemailer = require("nodemailer")

//para mañana implementar la solucion antes de levantar el servidor para minimizar el numero de peticiones intentar con emailjs
//hacerlo lo mas rapido posible para terminar el proyecto
//si no funcion utilizar recent en los videos gurardados en youtube esta el ejemplo
const email = process.env.EMAIL
const password = process.env.PASSWORD

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email,
        pass: password,
    },
    tls: { //generar un certificado SMTP es util para pruebas pero no para un entorno de produccion es decir es mejor utilizar un servicio que utilice un certificado 
        rejectUnauthorized: false, // Esto desactiva la verificación del certificado lo cual lo convierte en una forma insegura de enviar correos
      },
})

export const mailOptions = {
    from: email,
    to: email,
}*/