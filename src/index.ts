const axios = require('axios').default;


axios.get('https://official-joke-api.appspot.com/random_joke')
  .then(function (response: object) {
    console.log(response);
  })
  .catch(function (error: any) {
    console.log(error.response);
  });