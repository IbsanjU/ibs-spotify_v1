import React from 'react'
// To play tracks
// npm i react-spotify-web-playback


export default function TrackSearchResult({ track, chooseTrack }) {
   // console.log(track)

   function handlePlay() {
      chooseTrack(track)
   }
   return (
      <div className="d-flex m-2 align-items-center"
         style={{ cursor: "pointer" }}
         onClick={handlePlay}>
         <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
         <div className="ml-3">
            <div>{track.title}</div>
            <div className="text-muted">{track.artist}</div>
         </div>
      </div>
   )
}
