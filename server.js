const express = require("express");
const app = express();
const server = require("http").Server(app);
app.use(express.json())

var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'saanvisinha261048@gmail.com',
        pass: 'vrfpmprjmsnlfxxv',
    },
    secure: true,
});

app.post("/send-mail", (req, res) => {
    const to = req.body.to;
    const mailData = {
        from: "saanvisinha261048@gmail.com",
        to: to,
        subject: "Your payment is due!",
        html: ` <p>
                    Hello ${req.body.name},
                </p>
                <p>
                    This is a reminder email that your payment of amount - ${amount} is due on date - ${date}
                </p>
                <p>
                    Kindly make the payment before the due date to avoid any inconvenience.
                </p>
                <p>
                    Thanks and Regards,\n Saanvi 
                </p>`
    };
    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Invitation sent!", message_id: info.messageId });
    });
})

server.listen(process.env.PORT || 3030);