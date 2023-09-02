const nodemailer = require('nodemailer');
async function sendGmail(req, res, next) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        port:465,
        secure:true,
        auth: {

            user: 'tansou57@gmail.com', // Thay thế bằng địa chỉ email của bạn
            pass: 'wuygvkjxkmjhdyrq' // Thay thế bằng mật khẩu email của bạn
        },
        tls:{
            rejectUnauthorized:true
        }
    });
    const { to, subject } = req.body;
    const verifyCode=Math.floor(Math.random() * 999999)
    console.log(to)
    const mailOptions = {
        from: 'tansou57@gmail.com',
        to: to,
        subject: subject,
        text: `Your verify code: " ${verifyCode}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('Error sending email: ' + error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json(verifyCode);
        }
    });
}
module.exports={sendGmail}