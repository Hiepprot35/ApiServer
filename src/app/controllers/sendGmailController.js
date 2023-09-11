const nodemailer = require('nodemailer');
async function sendGmail(req, res, next) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        secure: true,
        auth: {

            user: 'tansou57@gmail.com', // Thay thế bằng địa chỉ email của bạn
            pass: 'wuygvkjxkmjhdyrq' // Thay thế bằng mật khẩu email của bạn
        },
        tls: {
            rejectUnauthorized: true
        }
    });
    const { to, subject, message } = req.body;
    const verifyCode = Math.floor(Math.random() * 999999)
    const mailOptions = message ? {

        from: 'tansou57@gmail.com',
        to: "kimunmonlu@gmail.com",
        subject: subject,
        text: `User "${to}" send message to you: "${message}"`,
        html: ` <html>
        <head>
          <style>
            /* Sử dụng CSS inline để cài đặt font chữ */
            body {
              font-family: Arial, sans-serif; /* Đổi thành font bạn muốn sử dụng */
            }
            div {
                padding: 40px;
                border-radius: 10px;
                background-color: #d5bebe;
               
            }
          </style>
        </head>
        <body>
            <h1>Thư của nhà tuyển dụng</h1>
            <p>User "${to}" send message to you: "${message}"</p>
            <p>Tuan Hiep</p>
        </body>
      </html>`

    } : {

        from: 'tansou57@gmail.com',
        to: to,
        subject: subject,
        text: `Your verify code: "${verifyCode}"`,
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
module.exports = { sendGmail }