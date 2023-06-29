// create / route
const handleRoot = (req, res, db) => {
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
};

module.exports = {
    handleRoot: handleRoot
};
