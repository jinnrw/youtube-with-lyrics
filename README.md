# YouTube with Lyrics

![YouTube with Lyrics](https://jinnwang-site.web.app/img/youtube-with-lyrics.png)

## Live Demo
View [live demo](https://youtube-with-lyrics.vercel.app/) here.

## Features
#### YouTube
- Fetch all videos in a given playlist (default set to mine)
- Fetch details of each video from YouTube Data API

#### Musixmatch
- Musizmatch only provides 30% of its lyrics for non-commercial use
- Use [matcher.lyrics.get](https://developer.musixmatch.com/documentation/api-reference/matcher-lyrics-get) API method
  - param: `(q_track, q_artist)`


#### Javascript Promises: Asyns & Await  
When requesting for a playlist using [Playlists API](https://developers.google.com/youtube/v3/docs/playlists/list), the data responsed back doesn't include details like video duration or channel name. The workaround was once I get all the videoIDs from the first call, then use async & await for making a second call with [Videos API](https://developers.google.com/youtube/v3/docs/videos/list) to fetch details of those videos.
 
## How to Seach
You can search by a `Playlist ID` or `Video ID`, it will make a HTTP request accordingly.  

Example:  
The playlist ID is what's after `?list=`  
https://www.youtube.com/playlist?list=PLHAe5aDyb50vbEHNCgpkH0FSDNdQWv9Qh  
The video ID is what's after `?v=`  
https://www.youtube.com/watch?v=OPKTk5vUtDY
 
 
 
## Stacks
#### Frontend 
- Vue.js  
- Vuex (State Management)
- Moment.js (Video duration format)

#### HTTP client  
- [axios](https://github.com/axios/axios)  

#### API  
- [YouTube Data API](https://developers.google.com/youtube/v3/) 
- [Musixmatch API](https://developer.musixmatch.com/documentation/api-reference/matcher-lyrics-get)

## Run on local
1. Clone or Fork repo.
2. Run `npm install`
3. Run `npm run serve`
