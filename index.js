var express = require('express');
var http = require('http');
var path = require('path');
var nodemailer = require('nodemailer');
const { readFileSync } = require('fs');

var app = express();
var server = http.Server(app);
const port = process.env.PORT || 5000;
let URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;
REACT_APP_DEV_URI = 'http://localhost:5000'
REACT_APP_PROD_URI = 'https://potfolio-website-peach.vercel.app'

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'index.html')))


//Serving files of my project
app.use((req, res, next) => {

    if (req.url === '/send_email') {
        // If the request is for sending an email, skip the file serving logic
        return next(); // Move to the next middleware
    }
    const extension = path.extname(req.url);

    let contentType;
    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.woff2':
            contentType = 'font/woff2';
            break;
        case '.ttf':
            contentType = 'font/ttf';
            break;
        case '.pdf':
            contentType = 'application/pdf';
            break;
        default:
            contentType = 'text/html';
            break;
    }

    let filePath;
    if (contentType === 'text/html' && req.url === '/') {
        filePath = path.join(__dirname, 'index.html');
    } else {
        filePath = path.join(__dirname, req.url);
    }


    try {
        const data = readFileSync(filePath,
            !contentType.includes('image') && !contentType.includes('font') && !contentType.includes('pdf') ? 'utf8' : '');
        res.setHeader('Content-Type', contentType);
        res.send(data);
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(404).send('404 Not Found');
    }
});

//Form Route and NodeMailer
app.post(`${URI}/send_email`, (req, res) => {
    var fullname = req.body.fullname
    var email = req.body.email
    var number = req.body.number
    var subject = req.body.subject
    var message = req.body.message
    var to = 'gahramanovalamann@gmail.com'

    var transporter = nodemailer.createTransport({
        port: 465,
        host: 'smtp.gmail.com',
        tls: {
            ciphers: "SSLv3",
        },
        secure: true,
        service: 'gmail',
        auth: {
            user: "gahramanovalamann@gmail.com",
            pass: 'mttzdglfxomgvnmi'
        }
    })

    var mailOptions = {
        from: email,
        to: to,
        subject: subject,
        text: `${message}, number:${number}, fullName:${fullname}`
    }

    new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log(`Email send: ${info.response}`);
                resolve(info);
            }
            res.redirect("/")
        })
    }).then((data) => {
        console.log(data, 'promise');
    })

})
//initialize web server
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})