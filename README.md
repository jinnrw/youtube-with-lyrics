# YouTube with Lyrics

---
## Features:
YouTube
- Fetch all videos in a given playlist (default set to mine)
- Fetch details of each video from [YouTube Data API](https://developers.google.com/youtube/v3/)

Musixmatch
- Given Musizmatch only provides 30% of its lyrics for non-commercial use, I'm not using their api to get data
- Instead, fetch lyrics by matching song title and artist name
- Embed iFrame from Musixmatch

## Stacks:
- Frontend: Vue.js  
- HTTP client: [axios](https://github.com/axios/axios)  
- API: YouTube Data API  
