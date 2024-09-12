const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const rootController = require('./controllers/root');
const registerController = require('./controllers/register');
const signinController = require('./controllers/signin');
const profileController = require('./controllers/profile');
const imageController = require('./controllers/image');
const fetch = require('node-fetch');

/* Connecting to PostgreSQL DB hosted on Render.com */
// const db = knex({
//     client: 'pg',
//     connection: {
//         host: 'dpg-cisb4sp8g3n42om1jhl0-a',
//         user: 'phoenix',
//         password: 'qoU5tWEwVwULETFa6JZOkSZXCwzCrBsO',
//         database: 'smartbrain_wgbb'
//     }
// });

// Connecting to local dev server & dev db postgreSQL 
const db = knex({
 client: 'pg',
 connection: {
     host: '127.0.0.1',
     user: 'postgres',
     password: 'test',
     database: 'smart-brain'
}
})

// Describing table named 'users' on our local dev server
console.log(`\n`);
db.select('*').from('pg_stat_activity')
.then((dbConnection) => {
    // console.log(`PostgreSQL dbConnection:\n`);
    // console.log(dbConnection);
    // console.log(`\n`);

    // Mapping connection json to display connected database name
    const databaseName = dbConnection.filter(item => item.datname === 'smart-brain');
    
    // console.log(`Connected Database Information:\n`);
    // console.log(databaseName);
    // console.log(`\n`);
})
.catch(err => {
    console.log(`Error verifying PostgreSQL connection:\n${err}`);
    console.log(`\n`);
})

// Logging whether connection to PostgreSQL on Render.com is successful
db.raw("SELECT 1")
.then( () => {
    console.log(`PostgreSQL connected!!\n`);
})
.catch(err => {
    console.log(`PostgreSQL not connected\nErrors: ${err}`);
});

// Using Express middleware
const app = express(); 
// app.use(bodyParser.json());

// Will need either app.use(express.json()) || app.use(bodyParser.json())
// to parse json 
app.use(express.json()); 

// Using CORS modules
app.use(cors());

// create a basic route for root
app.get('/', (req, res) => { rootController.handleRoot(req, res, db) } )

// create /signin route
app.post('/signin', (req, res) => { signinController.handleSignin(req, res, db, bcrypt) } )

// create /register route
app.post('/register', (req, res) => { registerController.handleRegister(req, res, db, bcrypt) } )

// create /profile/:id route
// grab via req..params props
app.get('/profile/:id', (req, res) => { profileController.handleProfileGet(req, res, db) } )

// create /image
// increase entries
app.put('/image', (req, res) => { imageController.handleImage(req, res, db) } )
app.post('/celebrityimage', (req, res) => { imageController.handleCelebrityApi(req, res, fetch) } )
app.post('/colorimage', (req, res) => { imageController.handleColorApi(req, res, fetch) } )
app.post('/ageimage', (req, res) => { imageController.handleAgeApi(req, res, fetch) } )

// app.listen(port, fn)
// fn will run right after listening to a port
const localhost = 'localhost';
const port = process.env.PORT || 3000;
// const DATABASE_URL = process.env.DATABASE_URL
app.listen(port, () => {
    console.log(`Node app is up & running on port: ${port}`);
    console.log(`\n`);
})
