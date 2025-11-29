import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let transporter: Transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "porter.johns@ethereal.email",
    pass: "p4npqh7Fa8XQxcBsrp",
  },
});

let message = {
  from: "TheRoll <omar_ashraf@live.com>",
  to: "Mostafa Sherif <mostafa@live.com>",
  subject: "تأكيد الحساب",
  html: "<h1>اضغط هنا لتاكيد الحساب<a href='http://google.com'>i</a></h1>",
};

transporter.sendMail(message, (err, info) => {
  if (err) {
    console.log("error", err);
    return process.exit(1);
  }

  console.log(`Message send ${info.messageId}`);
  console.log(`preview URL ${nodemailer.getTestMessageUrl(info)}`);
  console.log(info);
});
