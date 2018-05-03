const request = require('request-promise-native');

const cm = function(creds) {
  let self = this;

  this.endpoint = creds.endpoint;
  this.username = creds.username;
  this.password = creds.password;

  this.headers = {
    'User-Agent': 'node-wrms/0.0.1'
  };

  this.urlForPath = function(path) {
    return this.endpoint + '/' + path;
  }

  this.login = function() {
    if (typeof this.headers.Cookie == 'undefined') {
      var options = {
        method: 'POST',
        url: this.urlForPath('login'),
        formData: {
          username: this.username,
          password: this.password
        }
      };
      return request(options)
        .then((body) => {
          self.headers.Cookie = `PHPSESSID=${JSON.parse(body).sess_id}`;
        });
    }
    else {
      return Promise.resolve();
    }
  }

  this.app = {
    search: (params) => {
      var options = {
        headers: self.headers,
        method: 'GET',
        url: this.urlForPath('search'),
        qs: params
      };
      return this.login().then(() => {
          return request(options)
            .then((body) => {
              const res = JSON.parse(body)
              return Promise.resolve(res)
            });
      });
    }
  };

  return this;
}

module.exports = cm;
