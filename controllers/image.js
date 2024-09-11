const rootDir = require('../util/path');
require('dotenv').config({ path: `${rootDir}/controllers/.env`});

// PUT to update entries
/* Declaring a custom callback to accept passed-in param 'imageUrl' */
const returnClarifaiRequestOptions = (imageUrl) => {
    const PAT = process.env.PAT;
    const USER_ID = process.env.USER_ID;
    const APP_ID = process.env.APP_ID;
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

const handleCelebrityApi = (req, res, fetch) => {
    const input = req.body.input;
    console.log(`req.body.input:\n${input}\ntypeof req.body.input:\n${typeof input}\n`);

    const API_BASE_URL = 'https://api.clarifai.com/v2/models/' +
          'celebrity-face-detection' +
          '/outputs';

    fetch(
        API_BASE_URL,
        returnClarifaiRequestOptions(input)
      )
      .then(response => {
        if (!response?.ok) {
          console.error(`\nFetched API\nYet failed to retrieve data...\n`);
          throw new Error(`Failed to fetch from API, status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (!data) {
          throw new Error(`\nNo data returned by fetching ${API_BASE_URL}\n`);
        }
        res.status(200).json(data);
      })
      .catch(err => {
        console.error(`\nError during fetch operation: ${err}\n`);
        res.status(502).json({ error: `Unable to fetch API...`, details: err.toString() });
      });
};

const handleColorApi = (req, res, fetch) => {
    const input = req.body.input;
    console.log(`\nreq.body.input:\n${input}\ntypeof input:\n${typeof input}\n`);
    const API_BASE_URL = 'https://api.clarifai.com/v2/models/' +
          'color-recognition' +
          '/outputs';
    // fetch
    fetch(
        API_BASE_URL,
        returnClarifaiRequestOptions(input)
      )
      .then(response => {
        if (!response?.ok) {
          console.error(`\nFetched API\nYet failed to retrieve data...\n`);
          throw new Error(`Failed to fetch from API, status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (!data) {
          throw new Error(`No data returned by fetching ${API_BASE_URL}`);
        }
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(502).json({ error: `Unable to fetch API...`, details: err.toString() });
      });
};

const handleAgeApi = (req, res, fetch) => {
    const input = req.body.input;
    console.log(`req.body.input:\n${input}\ntypeof req.body.input:\n${typeof input}`);
    const API_BASE_URL = 'https://api.clarifai.com/v2/models/' +
          'age-demographics-recognition' +
          '/outputs';

    // fetch
    fetch(
        API_BASE_URL,
        returnClarifaiRequestOptions(input)
      )
      .then(response => {
        if (!response?.ok) {
          console.error(`\nFetched API\nYet failed to retrieve data...\n`);
          throw new Error(`Failed to fetch from API, status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (!data) {
          throw new Error(`No data returned by fetching ${API_BASE_URL}`);
        }
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(502).json({ error: `Unable to fetch API...`, details: err.toString() });
      });
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
.catch(err => res.status(400).json({ error: `Unable to get entries`, details: err.toString() }));
};

module.exports = {
    handleImage: handleImage,
    handleCelebrityApi: handleCelebrityApi,
    handleColorApi: handleColorApi,
    handleAgeApi: handleAgeApi
};

