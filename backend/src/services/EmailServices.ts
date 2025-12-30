import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

class EmailServices {
  protected transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "izaiah.conroy92@ethereal.email",
        pass: "vayd16UzK68RvfnPrj",
      },
    });
  }

  async sendConfirmEmail(userEmail: string, userName: string, token: string) {
    const message = {
      from: "Roll01 <mostafa_sherif@live.com>",
      to: `${userName} <${userEmail}>`,
      subject: "تأكيد الحساب",
      // This is should be a route to front with token
      // and the front should send token to api and then get
      // response that user is confirmed and go to sign in page
      html: `confirm link\n
            <a target="_blank" href="http://localhost:8080/auth/confirm/${token}">CLICK HERE</a>`,
    };
    await this.transporter.sendMail(message);
  }

  async sendForgetPassEmail(userEmail: string, token: string) {
    const message = {
      from: "Roll01 <mostafa_sherif@live.com>",
      to: `<${userEmail}>`,
      subject: "اعاده ضبط كلمه المرور",
      // This is should be a route to front with token
      // and the front should send token to api and then get
      // response that user is can change pass and go to sign in page
      html: `to reset password: \n
            <a href="http://localhost:5000/forgetPass/${token}">CLICK HERE</a>`,
    };
    await this.transporter.sendMail(message);
  }
}

const emailServices = new EmailServices();
export default emailServices;
