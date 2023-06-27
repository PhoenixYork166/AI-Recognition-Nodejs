const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'smart-brain'
    }
});

// console.log(postgres.select('*').from('users'));

// db.select('*').from('users').then(data => {
//     console.log('data: ', data);
// })

const app = express(); 
// app.use(bodyParser.json());

// temp front-end testing db
// const database = {
//     users: [
//         {
//             id: '123',
//             name: 'John',
//             email: 'john@gmail.com',
//             password: 'cookies',
//             entries: 0, 
//             joined: new Date(),
//             raw_hex: [],
//         },
//         {
//             id: '124',
//             name: 'Sally',
//             email: 'sally@gmail.com',
//             password: 'bananas',
//             entries: 0, 
//             joined: new Date(),
//             raw_hex: [],
//         }
//     ],
//     // login: [
//     //     {
//     //         id: '987',
//     //         hash: '', // use bcrypt-nodejs
//     //         email: 'john@gmail.com',
//     //     }
//     // ]
// }

// Will need either app.use(express.json()) || app.use(bodyParser.json())
// to parse json 
app.use(express.json()); 
app.use(cors());

// create a basic route
app.get('/', (req, res) => {
    db
    .select('*')
    .from('users')
    .join('login', function() {
        this
            .on('users.email', '=', 'login.email')
            .orOn('users.id', '=', 'login.id')
    })
    .then(response => {
        if (response) {
            res.status(200).json(response)
        } else {
            res.status(400).json('cannot fetch database')
        }
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })

})

// create /signin route
app.post('/signin', (req, res) => {
    // bcrypt.compare("apples", '$2a$10$2J9/8JWebKrnUW8CCntOzurNR1646g/1erL4QsEMuETelwdHhs6jG', function(err, res) {
    //     console.log('first guess', res)
    // });
    // bcrypt.compare("veggies", '$2a$10$2J9/8JWebKrnUW8CCntOzurNR1646g/1erL4QsEMuETelwdHhs6jG', function(err, res) {
    //     console.log('second guess', res)
    // });
    // console.log('req.body: \n', req.body);
    const { email, password } = req.body;
    db('users')
    .select('email', 'hash')
    .where('email', '=', email)
    .from('login')
    .then(response => {
        console.log(`/signin\nresponse[0].email: ${response[0].email} \nresponse[0].hash: ${response[0].hash}`)
        const isValid = bcrypt.compareSync(password, response[0].hash);
        if (isValid) {
            db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                res.status(200).json(user[0])
            })
            .catch(err => {
                res.status(400).json('login failed')
            })
        }
    })
    .catch(err => {
        res.status(400).json('login failed');
    })
})

// create /register route
app.post('/register', (req, res) => {
    // Destructuring from req.body
    const { email, name, password } = req.body;
    // Hashing users' entered passwords
    const bcryptHash = bcrypt.hashSync(password);
    // Create a DB transaction
    db.transaction(trx => {
        trx.insert({
            hash: bcryptHash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
                console.log(loginEmail[0].email)
                return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0].email,
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0])
                })
        })
        .then(trx.commit) // no error => commit transaction
        .catch(trx.rollback) // in case registration failed
    })
    .catch(err => res.status(400).json('unable to register'));
})

// create /profile/:id route
// grab via req..params props
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;

    db.select('*').from('users').where({
        id: id
    })
    .then(user => {
        if (user.length) {
            res.json(user[0]);
        } else {
            res.status(400).json('user NOT found')
        }
    })
    .catch(err => res.status(400).json('error getting user'));
})

// create /image
// increase entries
app.put('/image', (req, res) => { // PUT to update entries
    const { id, raw_hex } = req.body;

    // To store entries increase to DB
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        console.log(`entries stored to DB: ${entries[0].entries}`);
        res.status(200).json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))

    // db.transaction(trx => {
    //     trx.insert({
    //         raw_hex: raw_hex
    //     })
    //     .into('users')
    //     .returning('raw_hex')
    //     .then(raw_hex => {
    //             console.log(`raw_hex stored to database ${raw_hex[0].raw_hex}`)
    //             return trx('users')
    //             .where('id', '=', id)
    //             .increment('entries', 1)
    //             .returning('entries')
    //             .then(entries => {
    //                 console.log(`entries = ${entries[0].entries}`)
    //                 res.status(200).json(`entries increased to ${entries[0].entries}`);
    //             })
    //     })
    //     .then(trx.commit) // no error => commit transaction
    //     .catch(trx.rollback) // in case registration failed
    // })
    // .catch(err => res.status(400).json('unable to store data to DB :('));
})

// bcrypt - Hashing passwords
// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

// app.listen(port, fn)
// fn will run right after listening to a port
const localhost = 'localhost';
const port = 3000;
app.listen(port, localhost, () => {
    console.log(`app is running on ${localhost}:${port}`);
})

/* API Planning
/ --> res = this is working
/signin --> POST success/fail (posting info to db) [over https not via Query Strings]
/register --> POST = new user object returned (add data to db) [over https not via Query Strings]
/profile/:userId --> GET = user 
/image --> PUT (already have users accounts -> update users' profile)

*/
