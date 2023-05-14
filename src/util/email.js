import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	auth: {
		user: process.env.EMAIL_USERNAME,
		pass: process.env.EMAIL_PASSWORD,
	},
	
})

module.exports = (options) => {
	transporter
		.sendMail({ from: process.env.EMAIL_USERNAME, ...options })
		.catch((err) => console.log(err))
}



  









