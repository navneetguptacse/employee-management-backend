const { token } = require("morgan");
const nodemailer = require("nodemailer");

const sendEmail = async (email, token) => {
  const subject = "Email Verification";
  const encodedToken = encodeURIComponent(token);

  const text = `Please click on the link to verify your email: http://localhost:3000/auth/verify/${encodedToken}`;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "navneetguptacse@gmail.com",
        pass: "xyz@ gmail",
      },
    });

    const mailOptions = {
      from: "",
      to: email,
      subject: subject,
      text: text,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = { sendEmail };
