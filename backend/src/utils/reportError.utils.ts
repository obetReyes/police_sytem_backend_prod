import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();
//report error is an util which we use to get information about critical errors these which could throw our server down
export const reportError = (error:string, subject:string) => {
    const pass = process.env.MAIL_PASSWORD ?? "";
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "anibalobett@gmail.com",
        pass: pass
      }
    });
    
    const mailOptions = {
      from: "anibalobett@gmail.com",
      to: "obetreyes699@gmail.com",
      subject: `correo desde el servidor de infomexico ${subject}`,
      html: `ocurrio el siguiente error ${error}`
    };
    
    transporter.sendMail(mailOptions);
    };
    
