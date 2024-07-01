const nodemailer = require("nodemailer");

// Function to send an email using nodemailer
const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body; // Destructure email details from the request body

  try {
    // Create a transporter object using the Gmail service
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "", // Gmail email address
        pass: "", // Gmail password or app-specific password
      },
    });

    // Send email using the transporter
    let info = await transporter.sendMail({
      from: "lipholomoeketsi2gmail.com", // Sender email address
      to: to, // Recipient email address
      subject: subject, // Email subject
      text: text, // Email body text
    });

    console.log("Email sent:", info.response); // Log the response from nodemailer
    res.status(200).send("Email sent successfully"); // Send a success response
  } catch (error) {
    console.error("Error sending email:", error); // Log any errors
    res.status(500).send("Failed to send email"); // Send an error response
  }
};

module.exports = {
  sendEmail,
};
