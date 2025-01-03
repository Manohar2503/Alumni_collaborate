const { MailtrapClient } = require('mailtrap-client'); 

const  dotenv = require( "dotenv");

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN; 

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Manohar",
};
const recipients = [
  {
    email: "manujinka22@gmail.com",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(response => {
    console.log('Email sent successfully:', response);
  })
  .catch(error => {
    console.error('Error sending email:', error);
  });
