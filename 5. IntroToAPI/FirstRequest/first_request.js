const axios = require('axios')

// chaining
axios.get('http://jsonplaceholder.typicode.com/todos/1')
    .then(function (response) {
        //handle success
        console.log(response.data) //response.data.useId ... etc
    })
    .catch(function (error) {
        // handle error
        console.log(error)
    })
    .finally(function () {
        // always executed
    })
