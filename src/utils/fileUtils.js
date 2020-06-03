const { close, open, utimes } = require('fs');

const touch = path => {
  return new Promise((resolve, reject) => {
    const time = new Date();
    utimes(path, time, time, err => {
      if (err) {
        return open(path, 'w', (err, fd) => {
          if (err) return reject(err);
          close(fd, err => (err ? reject(err) : resolve(fd)));
        });
      }
      resolve();
    });
  });
};

module.exports = touch;