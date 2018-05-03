require('dotenv').config()
const FOO = require('./foo')
const creds = {
  endpoint: process.env.FOO_URL || 'http://very.test',
  username: process.env.FOO_USERNAME || 'example',
  password: process.env.FOO_PASSWORD || 'example'
};

var foo = new FOO(creds);

test('Simple test', () => {
  expect(typeof foo.login).toBe('function');
});

test('Login sets a cookie', done => {
  foo.login()
    .then(function(res) {
      expect(typeof foo.headers.Cookie).toBe('string');
      done();
    })
});

test('Search gets a result', done => {
  foo.login().then(() => {
      foo.app.search({search: 'quux'})
        .then((val) => {
          expect(typeof val.results).toBe('object');
        })
        .catch((err) => {
          console.log(err);
        })
      done();
    })
});
