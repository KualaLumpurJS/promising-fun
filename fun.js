const axios = require('axios');
const assert = require('assert');

function render(data) {
  return new Promise((resolve) => {
    // Simulate rendering
    setTimeout(resolve, 300);
  })
}

axios.get('https://jsonplaceholder.typicode.com/todos')
  .then((response) => {
    // See https://jsonplaceholder.typicode.com/todos for expected result
    assert(Array.isArray(response.data));

    // result is an array of object that look like this:
    console.log(response.data[0]);
    assert.deepEqual(response.data[0], {
      id: 1,
      title: "delectus aut autem",
      completed: false,
      userId: 1,
    });

    // TODO: YOUR CODE HERE to call https://jsonplaceholder.typicode.com/users and merge the data

    // return new Promise(...)...
  })
  .catch((err) => { console.error('FAILED TEST', err.message); }) // have to print, because Promises swallow errors
  .then((result) => {
    // Let's say that instead of that as a front end developer (for some reason) what I really
    // want is something that looks like this:
    assert.deepEqual(result[0], {
      id: 1,
      title: "delectus aut autem",
      completed: false,
      user: {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
      },
    });

    // TODO
    // At this point for some reason I want to inform the server that the data has been loaded (think analytics)
    // Do a POST (via axios.post) to https://jsonplaceholder.typicode.com/todos-loaded
    // This creates a new promise, which we will not return from this .then, because we don't
    // wish to wait for the API call to complete.

    // Promise 1
    // axios.post(...)

    // Promise 2
    return render(result);

    // Notice that right above we fired off two promises in succession, without chaining them together.
    // This means that we executed both in PARALLEL, each working independently of each other.
  })
  .catch((err) => { console.error('FAILED TEST', err.message); });
