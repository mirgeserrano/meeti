const nodemailer = require('nodemailer')
const emailConfig = require('../config/emails.js')
const fs = require('fs')
const util = require('util')
const ejs = require('ejs')


var transport = nodemailer.createTransport({
   
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass
    }
  
});


exports.enviarEmail = async (opciones)=> {

    console.log(opciones);

//leer el archivi pare el email
const archivo= __dirname + `/../views/email/${opciones.archivo}.ejs`
console.log(archivo);
//compilarlo
const compilado = ejs.compile(fs.readFileSync(archivo,'utf8'))

//crear Html
const html = compilado({url: opciones.url})

//configurar las opciones del email
const opcionesEmail={
  from : 'Meeti<noreply@meeti.com>',
  to: opciones.usuario.email,
  subjet : opciones.subjet,
  html
}

console.log(opcionesEmail);

//enviar el email
const sendEmail = util.promisify(transport.sendMail, transport)
return sendEmail.call(transport, opcionesEmail)

  }