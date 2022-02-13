const nodemailer = require("nodemailer");
const controller = require("../controllers/email.controller");
module.exports = function(app) {
    app.post(
        "/api/resetpasswordrequestemail",
        controller.sendEmail
      );
    app.post("/api/resetpasswordemailafter", (req, res) => {
        const htmlEmail = `
        <!DOCTYPE html>
        <html>
            <head>
                <style>
                    .button{
                        width: 222px;
                        height: 50px;
                        margin-top: 54px;
                        margin-bottom: 53px;
                        border-width: 1px;
                        border-radius: 8px;
                        border: none;
                        background-color: #f44336;
                        color: white;
                        text-align: center;
                        text-decoration: none;
                        font-size: 16px;
                        cursor: pointer;
                    }
                    .button:hover {color:black}
                    .button:active {
                        background-color: red;
                        box-shadow: 2px 2px 2px 2px #666;
                        transform: translate(2px);
                    }
                    .page{
                        width: 650px; height:1000px; background-color:#F9F9F9; border:#c7c3c3; border-width:1px; border-style: solid;
                    }
                    .rect{
                        width:600px; background-color:#FFFFFF; margin-left:25px; margin-right:25px;margin-top:22px; border:#c7c3c3; border-width:1px; border-style:solid; border-top-color: red;border-top-width: 5px;
                    }
                </style>
            <head>
            <body>
                <div class="page">
                    <div class="rect">
                        <div style="text-align:center;">
                            <div style="margin-top:57px">
                                <div
                                    style="font-size:40px; font-family: sans-serif; font-weight: bold; text-align:center"
                                >
                                    LOGO
                                </div>
                            </div>
                            <div style="font-size:50px; font-family: sans-serif; font-weight: bold; text-align:center; margin-top:71px;">
                                Password Changed
                            </div>
                            <div style="margin-top:109px">
                                <div style="text-align:center; font-size:16px; width: 500px; margin:auto;">
                                    A request has been received to change the password for you account. If you did not initiate this request please contact us immediately at
                                </div>
                                <a href="/" target="_blank" style="text-align:center; text-decoration: none; font-size:16px; width: 500px; margin:auto;">
                                    vrmallsolutions.com
                                </a>
                            </div>
                            <div style="margin: auto;">
                                <a target="_blank" href="https://theinfiniteplaza.com/login" >
                                    <button class="button">Log in Now</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div style="text-align:center; margin-top:36px">
                        <div style="font-size: 10px; font-family: lato">VR MALL SOLUTIONS</div>
                        <div style="font-size: 10px; font-family: lato">ALL RIGHTS RESERVED</div>
                    </div>
                </div>
            </body>
        </html>
            `;
        let mailerConfig = {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "HonnenTitusv@gmail.com",
            pass: "adonis0129",
        },
        };
        let transporter = nodemailer.createTransport(mailerConfig);

        let mailOptions = {
        from: "<HonnenTitusv>@gmail.com>",
        to: `${req.body.email}`,
        subject: "Some Subject",
        text: "hello",
        html: htmlEmail,
        };

        transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("error:", err);
            res
            .status(500)
            .send({ status: "FAIL", msg: "Internal error: email not sent" });
        } else {
            console.log("Message sent: %s", info.content);
            console.log("Message URL: %s", nodemailer.getTestMessageUrl);
            res.status(200).json({ status: "OK", msg: "Email sent" });
        }
        });
    });
    app.post("/api/wellcomeemail", (req, res) => {
        const htmlEmail = `
        <!DOCTYPE html>
        <html>
            <head>
                <style>
                    .button{
                        width: 222px;
                        height: 50px;
                        margin-top: 54px;
                        margin-bottom: 53px;
                        border-width: 1px;
                        border-radius: 8px;
                        border: none;
                        background-color: #f44336;
                        color: white;
                        text-align: center;
                        text-decoration: none;
                        font-size: 16px;
                        cursor: pointer;
                    }
                    .button:hover {color:black}
                    .button:active {
                        background-color: red;
                        box-shadow: 2px 2px 2px 2px #666;
                        transform: translate(2px);
                    }
                    .page{
                        width: 650px; height:1000px; background-color:#F9F9F9; border:#c7c3c3; border-width:1px; border-style: solid;
                    }
                    .rect{
                        width:600px; background-color:#FFFFFF; margin-left:25px; margin-right:25px;margin-top:22px; border:#c7c3c3; border-width:1px; border-style:solid; border-top-color: red;border-top-width: 5px;
                    }
                </style>
            <head>
            <body>
                <div class="page">
                    <div class="rect">
                        <div style="text-align:center;">
                            <div style="margin-top:57px">
                                <div
                                    style="font-size:40px; font-family: sans-serif; font-weight: bold; text-align:center"
                                >
                                    LOGO
                                </div>
                            </div>
                            <img src="https://theinfiniteplaza.com/static/media/wellcomeemail.9dc81c1f4d575e739a2a.png" alt="" style="width:100%; margin-top:58px;"/> 
                            <div style="font-size:30px;  font-weight: bold; text-align:center; margin-top:28px; font-family: sans-serif;">
                                Welcome Jane Doe!
                            </div>
                            <div style="margin-top:28px">
                                <div style="text-align:center; font-size:16px; width: 500px; margin:auto;">
                                    You will now have your first experience of virtual reality.
                                </div>
                                <div style="text-align:center; text-decoration: none; font-size:16px; width: 438px; margin:auto; margin-top:28px">
                                    While you are in the real world, explore where your next 
                                    adventure of virtual reality may take you...                         
                                </div>
                            </div>
                            <div style="margin: auto;">
                                <a target="_blank" href="https://theinfiniteplaza.com" >
                                    <button class="button">
                                        Get started
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div style="text-align:center; margin-top:36px">
                        <div style="font-size: 10px; font-family: lato">VR MALL SOLUTIONS</div>
                        <div style="font-size: 10px; font-family: lato">ALL RIGHTS RESERVED</div>
                    </div>
                </div>
            </body>
        </html>
            `;
        let mailerConfig = {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "HonnenTitusv@gmail.com",
            pass: "adonis0129",
        },
        };
        let transporter = nodemailer.createTransport(mailerConfig);

        let mailOptions = {
        from: "<HonnenTitusv>@gmail.com>",
        to: `${req.body.email}`,
        subject: "Some Subject",
        text: "hello",
        html: htmlEmail,
        };

        transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("error:", err);
            res
            .status(500)
            .send({ status: "FAIL", msg: "Internal error: email not sent" });
        } else {
            console.log("Message sent: %s", info.content);
            console.log("Message URL: %s", nodemailer.getTestMessageUrl);
            res.status(200).json({ status: "OK", msg: "Email sent" });
        }
        });
    });
};

