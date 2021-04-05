// cd ../server
// to initiate package.json
// npm init -y
// install express and spotify-web-api-node
// to parse body 
// npm i body-parser

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/refresh', (req, res) => {
   const refreshToken = req.body.refreshToken
   console.log('hi')


   const spotifyApi = new SpotifyWebApi({
      redirectUri: 'http://localhost:3000',
      clientId: '944b34232a274a958da6413ce5bb7416',
      clientSecret: 'c7193fffd5404f9f93b06ca67e8e8807',
      refreshToken
   })

   spotifyApi
      .refreshAccessToken().then(data => {
         // console.log(data.body)
         res.json({
            accessToken: data.body.accessToken,
            expiresIn: data.body.expiresIn,
         })
      }).catch((err) => {
         console.log(err)
         res.sendStatus(400)
      })
})

app.post('/login', (req, res) => {
   const code = req.body.code
   const spotifyApi = new SpotifyWebApi({
      redirectUri: 'http://localhost:3000',
      clientId: '944b34232a274a958da6413ce5bb7416',
      clientSecret: 'c7193fffd5404f9f93b06ca67e8e8807'
   })

   spotifyApi.authorizationCodeGrant(code).then(data => {
      res.json({
         accessToken: data.body.access_token,
         refreshToken: data.body.refresh_token,
         expiresIn: data.body.expires_in
      })
   }).catch((err) => {
      console.log(err)
      res.sendStatus(400)
   })
})

app.listen(3001)