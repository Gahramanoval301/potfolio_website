var express = require('express');
var http = require('http');
var path = require('path');
var nodemailer = require('nodemailer');

var app = express();
var server = http.Server(app);
var port = 5000;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'index.html')))
app.use(express.static('./assets'))

//Route 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.post('/send_email', (req, res) => {
    var fullname = req.body.fullname
    var email = req.body.email
    var number = req.body.number
    var subject = req.body.subject
    var message = req.body.message
    var to = 'gahramanovalamann@gmail.com'

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "gahramanovalamann@gmail.com",
            pass: ''
        }
    })

    var mailOptions = {
        from: email,
        to: to,
        subject: subject,
        text: message
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(`Email send: ${info.response}`);
        }
        express.response.redirect("/")
    })


})
//initialize web server
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})