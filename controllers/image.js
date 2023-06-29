// PUT to update entries
const handleImage = (req, res, db) => {

const { id } = req.body;
// To store entries increase to DB
db('users')
.where('id', '=', id)
.increment('entries', 1)
.returning('entries')
.then(entries => {
    console.log(`entries stored to DB: ${entries[0].entries}`);
    // return updated entries for frontend
    res.status(200).json(entries[0].entries);
})
.catch(err => res.status(400).json(`unable to get entries\n${err}`))
};

module.exports = {
    handleImage: handleImage
};

