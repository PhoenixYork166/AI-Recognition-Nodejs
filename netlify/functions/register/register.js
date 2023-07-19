// create /register route
const handleRegister = (req, res, db, bcrypt) => {
    // Destructuring from req.body
    const { email, name, password } = req.body;

    // If malicious users bypass frontend validation in <Register />
    // like using Postman
    if (!email || !name || !password ) {
        res.status(400).json('invalid inputs for register submission');
    }
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
        // in case registration failed => rollback both 'login' && 'users' SQL transactions
        .catch(trx.rollback) 
    })
    .catch(err => res.status(400).json(`unable to register\n${err}`));
}

module.exports = {
    handleRegister: handleRegister
};