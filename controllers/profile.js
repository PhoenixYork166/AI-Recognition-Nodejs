const handleProfileGet = (req, res, db) => {
    const { id } = req.params;

    db.select('*').from('users').where({
        id: id
    })
    .then(user => {
        if (user.length) {
            // returned a Nested JSON => select 1st object user[0]
            // res.json(user[0]);
            res.json({ 
                status: 'Succeeded in retrieving a User', 
                data: user[0] 
            });
        }
        res.status(404).json({ status: 'Error', message: 'User NOT found' });
    })
    .catch(err => res.status(400).json({ error: `error getting user`, details: err.toString() }));
};

module.exports = {
    handleProfileGet: handleProfileGet
};