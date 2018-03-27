const express = require('express');
const { join } = require('path');

const app = express();

app.use(express.static(join(__dirname, '../dist/static')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/static/index.html'));
});

let server;

const runServer = async () => {
  try {
    await new Promise((resolve, reject) => {
      server = app
        .listen(8888, () => {
          console.info('Server is up at http://localhost:8888');
          resolve();
        })
        .on('error', err => {
          reject(err);
        });
    });
  } catch (error) {
    console.error(error);
  }
};

const closeServer = async () => {
  try {
    await new Promise((resolve, reject) => {
      console.info('Closing the server. Farewell.');
      server.close(err => (err ? reject(err) : resolve()));
    });
  } catch (error) {
    console.error(error);
  }
};

require.main === module && runServer().catch(err => console.error(err));
