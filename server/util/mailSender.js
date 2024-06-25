import nodemailer from 'nodemailer'
const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      service:process.env.SERVICE,
        auth: {
          user: process.env.SENDER,
          pass: process.env.PASS,
        },
      });
    let info = await transporter.sendMail({
      from: process.env.SENDER,
      to: email,
      subject: title,
      html: body,
    });
    return info;
  } catch (error) {
      // res.status(401).json({message:"Error"});
  }
};

export default mailSender;
