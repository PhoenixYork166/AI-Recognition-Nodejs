const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express(); 
// app.use(bodyParser.json());

// temp front-end testing db
const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0, 
            joined: new Date(),
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0, 
            joined: new Date(),
        }
    ],
    // login: [
    //     {
    //         id: '987',
    //         hash: '', // use bcrypt-nodejs
    //         email: 'john@gmail.com',
    //     }
    // ]
}

// Will need either app.use(express.json()) || app.use(bodyParser.json())
// to parse json 
app.use(express.json()); 
app.use(cors());

// create a basic route
app.get('/', (req, res) => {
    console.log('req.body: ', req.body);
    res.send(database.users); // checking current users

})

// create /signin route
app.post('/signin', (req, res) => {
    // bcrypt.compare("apples", '$2a$10$2J9/8JWebKrnUW8CCntOzurNR1646g/1erL4QsEMuETelwdHhs6jG', function(err, res) {
    //     console.log('first guess', res)
    // });
    // bcrypt.compare("veggies", '$2a$10$2J9/8JWebKrnUW8CCntOzurNR1646g/1erL4QsEMuETelwdHhs6jG', function(err, res) {
    //     console.log('second guess', res)
    // });
    console.log('req.body: \n', req.body);

    const len = database.users.length;
    for (let i=0; i<len; i++) {
        
        if (req.body.email === database.users[i].email && req.body.password === database.users[i].password) {
            // res.json('success');
            res.json(database.users[i]) // Returning a real user from our mock database
        } else {
            res.status(400).json('error logging in');
        }
        // res.send('signing');
    }
    
})

// create /register route
app.post('/register', (req, res) => {

    // Destructuring from req.body
    const { email, name, password } = req.body;
    // bcrypt.hash(password, null, null, function(err, hash) {
    //     if (err) {
    //         console.log('bcrypt hashing error: ', err)
    //     }
    //     console.log('hash: ', hash);
    // });

    // Find out last user id in number
    const last_id = Number(database.users.map(user => user.id).at(-1));

    database.users.push({
        id: (last_id+1).toString(),
        name: name,
        email: email,
        // password: password, // Do NOT return password on /register submission
        entries: 0, // for score tracking
        joined: new Date(),
    })
    // response returns the latest registered user as json - user: { props1: value1, props2: value2}
    res.json(database.users[[database.users.length-1]]); 
})

// create /profile/:id route
// grab via req..params props
app.get('/profile/:id', (req, res) => {
    // req.params = {
    //     id,
    //     name,
    //     email,
    //     password,
    //     entries,
    //     joined
    // }
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
        
    })
    if (!found) {
        res.status(400).json('user not found');
    }
})

// create /image
// increase entries
app.put('/image', (req, res) => { // PUT to update entries
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries ++ // increase entries
            return res.json(user.entries);
        }
        
    })
    if (!found) {
        res.status(400).json('not found');
    }
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
