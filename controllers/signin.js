// create /signin route
const handleSignin = (req, res, db, bcrypt) => {
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
        // console.log(`/signin\nresponse[0].email: ${response[0].email} \nresponse[0].hash: ${response[0].hash}`)

        // Comparing users' password input from req.body.password
        // to server-side fetched json
        const isValid = bcrypt.compareSync(password, response[0].hash);

        // If they match up
        if (isValid) {
            // return SELECT * FROM users WHERE email = req.body.email;
            // Will give a user json object
            db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                res.status(200).json(user[0])
            })
            .catch(err => {
                res.status(400).json(`login failed...\n${err}`)
            })
        } else {
            res.status(400).json('login failed');
        }
    })
    .catch(err => {
        res.status(400).json(`login failed...\n${err}`);
    })
};

module.exports = {
    handleSignin: handleSignin
};