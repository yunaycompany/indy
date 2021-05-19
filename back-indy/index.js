const express = require('express');
const cookieParser = require('cookie-parser');
var session = require('express-session');
var dotenv =require( "dotenv");
var cors = require ('cors');
const app = express();
const port = 5900 || process.env.PORT;
const  handleErrors  = require('./middleware/handleErrors')
const {router} = require('./routes');

const poolHandle = require('./helpers/pool')
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(session({
    secret: 'wow very secret',
    cookie: {
      maxAge: 600000,
      secure: true
    },
    saveUninitialized: false,
    resave: false,
    walletHandle : null,
    unset: 'destroy'
  }));


app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:8080"
        ],
        credentials: true,
            exposedHeaders: ['set-cookie']
    })
);

app.use("/api", router);
app.use(handleErrors);


app.listen(port, async() => {
    dotenv.config(); 

    console.log("Express Listening at http://localhost:" + port);

});
