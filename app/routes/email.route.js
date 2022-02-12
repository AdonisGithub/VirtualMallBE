const nodemailer = require("nodemailer");
module.exports = function (app) {
    app.post("/api/email", (req, res) => {
        const htmlEmail = `
                <!DOCTYPE html>
                    <html>
                        <head>
                            <script>
                                function resetpassword(){
                                    console.log("Here");
                                    window.open("http://165.232.157.54/resetpassword");
                                }
                            </script>
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
                                                style="font-size:40px;  font-weight: bold; text-align:center"
                                            >
                                                LOGO
                                            </div>
                                        </div>
                                        <div style="font-size:50px;  font-weight: bold; text-align:center; margin-top:71px;">
                                            Reset Password
                                        </div>
                                        <div style="margin-top:109px">
                                            <div
                                                style="
                                                    text-align:center;
                                                    font-size: 16px;
                                                    width: 500px;
                                                    margin:auto;
                                                "
                                            >
                                                If you did not make this request, just ignore this email. Otherwise
                                                please click the button below to reset your password.
                                            </div>
                                        </div>
                                        <div style="margin: auto;">
                                            <button class="button" onclick="resetpassword()">
                                                Reset Password
                                            </button>
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


const controller = require("../controllers/email.controller");
module.exports = function(app) {
    app.post(
        "/api/email",
        controller.sendEmail
      );
}