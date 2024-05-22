require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
// const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
// const request = require('request');
const { response } = require('express');


const app = express();

// engine setup
// app.engine('handlebars', exphbs);
// app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// static folder
app.use(express.static(__dirname+"/public"));




app.get('/', function (req, res) { 
        res.sendFile(__dirname + "/index.html");
});


app.post('/', function (req, res) {
    
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    
    const output = `
           <p>You have a new Contact Request</p>
           <h3>Contact Details</h3>
           <ul>
           <li>Name: ${name}</li>
           <li>Email: ${email}</li>
           <li>Subject: ${subject}</li>
           </ul>
           <h3>Message</h3>
           <p>${message}</p>
           `;
    

    const msg = {
        from: ` ${email}`,
        to: "bestg4u@gmail.com",
        subject: `${subject}`,
        html: output
    };

    nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "bestg4u@gmail.com",
            pass: "otsuuykxtcugpfqj"
        },
        port: 465,
        host: 'smtp.gmail.com',
    })

        .sendMail(msg, (err, response) => {
            if (err) {
                res.sendFile(__dirname + '/fail.html');
            }else {
                res.sendFile(__dirname + '/success.html');
            }
        });
    
    
    });

app.post('/success', function (req, res) { 
    res.redirect('/');
});

app.post('/fail', function (req, res) {
    res.redirect('/');
});



const port = process.env.PORT || 3000;
app.listen( port, function () { 
    console.log(`Server listening on port ${port}` );
});

