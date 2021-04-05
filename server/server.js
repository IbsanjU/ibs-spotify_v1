// cd ../server
// to initiate package.json
// npm init -y
// install express and spotify-web-api-node
// to parse body 
// npm i body-parser
// npm i dotenv

require('dotenv').config()

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const SpotifyWebApi = require('spotify-web-api-node');
const lyricsFinder = require('lyrics-finder')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/refresh', (req, res) => {
   const refreshToken = req.body.refreshToken
   // console.log('hi')


   const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRECT,
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
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRECT,
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


app.get('/lyrics', async (req, res) => {
   const lyrics = (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
   // console.log(lyricsFinder(req.query.artist, req.query.track))
   res.json({ lyrics })
})

app.listen(3001)