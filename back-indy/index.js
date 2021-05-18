const express = require('express');
var session = require('express-session');
var dotenv =require( "dotenv");
var cors = require ('cors');
const app = express();
const port = 5900 || process.env.PORT;
const  handleErrors  = require('./middleware/handleErrors')
const {router} = require('./routes');

const poolHandle = require('./helpers/pool')

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(session({
    secret : 'SECRET',
    resave : false,
    saveUninitialized : false,
    walletHandle : null
}));



app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:8080"
        ]
    })
);

app.use("/api", router);
app.use(handleErrors);


app.listen(port, async() => {
    dotenv.config(); 

    console.log("Express Listening at http://localhost:" + port);

});
