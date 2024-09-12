// create /register route
const handleRegister = async(req, res, db, bcrypt) => {
    // Destructuring from req.body
    const { email, name, password } = req.body;

    // If malicious users bypass frontend validation in <Register />
    // like using Postman
    if (!email || !name || !password ) {
        return res.status(400).json('invalid inputs for register submission');
    }

    // Declaring an Async function to hash the password
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds)
    .then(hashedPassword => {
        console.log(`\nhashedPassword result:`);
        console.log(hashedPassword);

        // Create a DB transaction
        return db.transaction(trx => {
            trx.insert({
                hash: hashedPassword,
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
                .then(users => {
                    res.json(users[0]); // send user data as response
                    return trx.commit(); // commit the transaction
                })
                .catch(err => {
                    if (!trx.commit) {
                        trx.rollback();
                        return res.status(400).json({ error: `Unable to fetch API...`, details: err.toString() })
                    }
                    trx.commit();
                })
            })
            .catch(err => {
                console.log(`Error hash password: ${err}`);
            }) // no error => commit transaction
            // in case registration failed => rollback both 'login' && 'users' SQL transactions
        })
        .catch(err => {
                console.log(`Error hashing password: ${err}\n`);
                res.status(400).json({ 
                error: `Unable to fetch API...`, 
                details: err.toString()
                })
            }
        );
    })
}

module.exports = {
    handleRegister: handleRegister
};