const sgMail = require("@sendgrid/mail");
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);
require("dotenv").config();

const nodemailer = require("nodemailer");
//const sgTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jimtwelve6@gmail.com",
    pass: "J!al10427283",
  },
});

function sendEmail(emailData) {
  return new Promise((resolve, reject) => {
    console.log(emailData);
    console.log(emailData);
    const mailOptions = {
      from: "jimtwelve6@gmail.com",
      to: "jaimeslange@gmail.com",
      subject: "Invoices due",
      html: `
                  <h1>email from contact page in your website</h1>
                 <p><strong>Name:</strong> ${emailData.name}</p>
                  <p><strong>email:</strong> ${emailData.email}</p>
                  <p><strong>department:</strong> ${emailData.subject}</p>
                  <p>${emailData.message}</p>   `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("email sent" + info.response);
        resolve(info);
      }
    });
  });
}

// const mailOptions = {
//   from: "jimtwelve@gmail.com",
//   to: "jaimeslange@gmail.com",
//   subject: "Invoices due",
//   text: "hihihi",
// };

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("email sent" + info.response);
//   }
// });

// const options = {
//   auth: {
//     api_user: process.env.SENDGRID_USERNAME,
//     api_key: process.env.SENDGRID_API_KEY,
//   },
// };
//const client = nodemailer.createTransport(sgTransport(options));

// create transporter object which contains email host configuration
// const msg = {
//   to: process.env.CONTACT_EMAIL, // Change to your recipient
//   from: process.env.SENDGRID_USERNAME, // Change to your verified sender
//   subject: "Email from your website",
//   html: `
//            <h1>email from contact page in your website</h1>
//           <p><strong>Name:</strong> ${emailData.name}</p>
//            <p><strong>email:</strong> ${emailData.email}</p>
//            <p><strong>department:</strong> ${emailData.department}</p>
//            <p>${emailData.message}</p>   `,
// };

// function sendEmail(emailData) {
//   return new Promise((resolve, reject) => {
//     const msg = {
//       to: process.env.CONTACT_EMAIL, // Change to your recipient
//       from: process.env.SENDGRID_USERNAME, // Change to your verified sender
//       subject: "Email from your website",
//       html: `
//            <h1>email from contact page in your website</h1>
//           <p><strong>Name:</strong> ${emailData.name}</p>
//            <p><strong>email:</strong> ${emailData.email}</p>
//            <p><strong>department:</strong> ${emailData.subject}</p>
//            <p>${emailData.message}</p>   `,
//     };
//     client.sendMail(msg, (err, info) => {
//       console.log(info);
//       if (err) {
//         console.log(err);
//         reject(err);
//       } else {
//         resolve(info);
//       }
//     });
//   });
// }

// using promise

// function sendEmail(emailData) {
//   return new Promise((resolve, reject) => {
//     const mailOption = {
//       from: process.env.APP_EMAIL,
//       to: process.env.CONTACT_EMAIL,
//       subject: "Email from your website",
//       html: `
//             <h1>email from contact page in your website</h1>
//             <p><strong>Name:</strong> ${emailData.name}</p>
//             <p><strong>email:</strong> ${emailData.email}</p>
//             <p><strong>department:</strong> ${emailData.department}</p>
//             <p>${emailData.message}</p>
//             `,
//     };
//     transporter.sendMail(mailOption, (err, info) => {
//       console.log(info);
//       if (err) {
//         reject(err);
//       } else {
//         resolve(info);
//       }
//     });
//   });
// }

// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

module.exports = {
  sendEmail,
};
