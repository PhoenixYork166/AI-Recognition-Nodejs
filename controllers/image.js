
// PUT to update entries
const returnClarifaiRequestOptions = imageUrl => {
    const PAT = 'b3e95c6890e443c29885edab45529224';
  
    const USER_ID = 'phoenixyork166';
    const APP_ID = 'my-app';
    const IMAGE_URL = imageUrl;
  
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL
            }
          }
        }
      ]
    });
  
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Key ' + PAT
      },
      body: raw
    };
    return requestOptions;
  };

//   console.log(returnClarifaiRequestOptions("https://upload.wikimedia.org/wikipedia/commons/4/4d/Beautiful_landscape.JPG"));

const handleCelebrityApi = (req, res) => {
    console.log(`req.body.input:\n${req.body.input}\ntypeof req.body.input:\n${typeof req.body.input}`);
    // fetch
    fetch(
        'https://api.clarifai.com/v2/models/' +
          'celebrity-face-detection' +
          '/outputs',
        returnClarifaiRequestOptions(req.body.input)
      )
      .then(response => response.json())
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => res.status(400).json(`unable to fetch API\n${err}`));
};

const handleColorApi = (req, res) => {
    console.log(`req.body.input:\n${req.body.input}\ntypeof req.body.input:\n${typeof req.body.input}`);
    // fetch
    fetch(
        'https://api.clarifai.com/v2/models/' +
          'color-recognition' +
          '/outputs',
        returnClarifaiRequestOptions(req.body.input)
      )
      .then(response => response.json())
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => res.status(400).json(`unable to fetch API\n${err}`));
};

const handleAgeApi = (req, res) => {
    console.log(`req.body.input:\n${req.body.input}\ntypeof req.body.input:\n${typeof req.body.input}`);
    // fetch
    fetch(
        'https://api.clarifai.com/v2/models/' +
          'age-demographics-recognition' +
          '/outputs',
        returnClarifaiRequestOptions(req.body.input)
      )
      .then(response => response.json())
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(400).json(`unable to fetch API\n${err}`));
};
  

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
    handleImage: handleImage,
    handleCelebrityApi: handleCelebrityApi,
    handleColorApi: handleColorApi,
    handleAgeApi: handleAgeApi
};

