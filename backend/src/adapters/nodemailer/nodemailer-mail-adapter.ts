import nodemailer from "nodemailer";

import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e19332c0cc0350",
    pass: "889348c5e6f8d3",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Wildes Piva <wildeshenrique8@gmail.com>",
      subject,
      html: body,
    });
  }
}
