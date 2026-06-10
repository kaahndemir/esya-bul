const https = require('https');

function checkAlive(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Redirect
        resolve({ alive: false, reason: 'Redirected to ' + res.headers.location });
      } else if (res.statusCode === 200) {
        resolve({ alive: true });
      } else {
        resolve({ alive: false, reason: 'Status ' + res.statusCode });
      }
    }).on('error', (e) => {
      resolve({ alive: false, reason: e.message });
    });
  });
}

const testUrl = "https://www.letgo.com/tr-tr/item/1"; // fake
checkAlive(testUrl).then(console.log);
