require('dotenv').config()
const CM = require('./cursed-mattress')
const creds = {
  endpoint: process.env.CURSEDMATTRESS_URL || 'http://very.test',
  username: process.env.CURSEDMATTRESS_USERNAME || 'example',
  password: process.env.CURSEDMATTRESS_PASSWORD || 'example'
};

var cm = new CM(creds);

test('Simple test', () => {
  expect(typeof cm.login).toBe('function');
});

test('Login sets a cookie', done => {
  cm.login()
    .then(function(res) {
      expect(typeof cm.headers.Cookie).toBe('string');
      done();
    })
});

test('Search gets a result', done => {
  cm.login().then(() => {
      cm.app.search({search: 'quux'})
        .then((val) => {
          expect(typeof val.results).toBe('object');
        })
        .catch((err) => {
          console.log(err);
        })
      done();
    })
});
