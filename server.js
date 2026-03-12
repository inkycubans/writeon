const express = require('express');
const path = require('path');
const https = require('https');
const querystring = require('querystring');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DROPBOX_APP_KEY = 'eflbkkx6hhk190b';
const DROPBOX_APP_SECRET = 'q0xfyd957v2u29w';
const REDIRECT_URI = 'https://writeon-production-d435.up.railway.app/dropbox-callback';

// Dropbox OAuth callback
app.get('/dropbox-callback', (req, res) => {
  const code = req.query.code;
  const error = req.query.error;

  if (error || !code) {
    return res.redirect('/?dropbox_error=' + (error || 'no_code'));
  }

  const postData = querystring.stringify({
    code: code,
    grant_type: 'authorization_code',
    client_id: DROPBOX_APP_KEY,
    client_secret: DROPBOX_APP_SECRET,
    redirect_uri: REDIRECT_URI,
  });

  const options = {
    hostname: 'api.dropboxapi.com',
    path: '/oauth2/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  const request = https.request(options, (response) => {
    let data = '';
    response.on('data', chunk => data += chunk);
    response.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        if (parsed.access_token) {
          res.redirect('/?dropbox_token=' + encodeURIComponent(parsed.access_token) +
            (parsed.refresh_token ? '&dropbox_refresh=' + encodeURIComponent(parsed.refresh_token) : ''));
        } else {
          res.redirect('/?dropbox_error=' + encodeURIComponent(parsed.error_description || 'token_error'));
        }
      } catch(e) {
        res.redirect('/?dropbox_error=parse_error');
      }
    });
  });

  request.on('error', () => res.redirect('/?dropbox_error=network_error'));
  request.write(postData);
  request.end();
});

// Servera index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`WriteOn körs på port ${PORT}`));
