// requires
const express = require( 'express' );
const app = express();

// uses (this is the folder into which we will put our static files like HTML)
app.use( express.static( 'server/public' ) );

// global variables
let port = 5000;

// spin up server
app.listen( port, ()=>{
    console.log( 'server is up on:', port );

}) // end spin up server

// basic
app.get( 'thingy', ( req, res )=>{
    console.log('/thingy get hit');
    res.send( 'meow' );
}) // end basic route