<template>
  <div class="playlist">
    <div id="video" v-html="videoIframe"></div>
    <div class="video-list">
      <div v-for="(video, i) in playlist" v-bind:key="video.snippet.resourceId.videoId" 
      @click="updateVideo(video.snippet.resourceId.videoId)" class="video-item">
        <div class="video-item_thumb">
          <img v-bind:src="video.snippet.thumbnails.medium.url" alt="">
        </div>
        <div class="titles">
          <h4 class="video-title">{{ video.snippet.title }}</h4>
          <p class="channel-title">{{ videoDuration[i] }}</p>
        </div>
        
        <h4>{{ videoChannelTitle[i] }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Playlist",
  data() {
    return {
      videoIframe: "",
      playlist: [],
      videoIDList: [],
      videoDuration: [],
      videoChannelTitle: []
    };
  },
  mounted() {
    const service = {
      getPlaylist: () => {
        var key = "AIzaSyCGw4DYb8KrW9c0E7H6kwFdmcs-k49clBU";
        var playlistId = "PLHAe5aDyb50vbEHNCgpkH0FSDNdQWv9Qh";
        var URL = "https://www.googleapis.com/youtube/v3/playlistItems";
        var options = {
          part: "snippet",
          key: key,
          maxResults: 10,
          playlistId: playlistId
        };
        const request = axios
          .get(URL, {
            params: options
          })
          .then(response => {
            let id = response.data.items[0].snippet.resourceId.videoId;
            let playlist = response.data.items;
            for (let i = 0; i < playlist.length; i++) {
              let videoID = playlist[i].snippet.resourceId.videoId;
              this.videoIDList.push(videoID);
              // console.log(this.videoIDList);
            }

            this.embedVideo(id);
            this.playlist = playlist;
          })
          .catch(function(error) {
            console.log(error);
          });

        console.log("get playist: " + request);
        return request;
      },
      getVideoID: () => {
        var key = "AIzaSyCGw4DYb8KrW9c0E7H6kwFdmcs-k49clBU";
        var URL = "https://www.googleapis.com/youtube/v3/videos";
        var options = {
          part: "snippet,contentDetails,statistics",
          key: key,
          maxResults: 10,
          id: this.videoIDList.join()
        };
        const request =
          // GET YouTube Content Details via VideoID
          axios
            .get(URL, {
              params: options
            })
            .then(response => {
              console.log(response.data.items.contentDetails);
              let videoDetails = response.data.items;
              for (let i = 0; i < videoDetails.length; i++) {
                let duration = videoDetails[i].contentDetails.duration;
                let channelTitle = videoDetails[i].snippet.channelTitle;
                this.videoDuration.push(duration);
                this.videoChannelTitle.push(channelTitle);
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        return request;
      }
    };

    // Want to use async/await? Add the `async` keyword to your outer function/method.
    async function getYoutubeData() {
      try {
        const resPlaylist = await service.getPlaylist();
        const resVideoID = await service.getVideoID();

        // console.log("resPlaylist: " + resPlaylist);
        // console.log("resVIdeoID: " + resVideoID);
      } catch (error) {
        console.error(error);
      }
    }
    getYoutubeData();
    // this.getVideoContentDetails();
  },
  methods: {
    embedVideo(id) {
      this.videoIframe = `
      <iframe id="video-iframe" width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    },
    updateVideo(id) {
      this.embedVideo(id);
    }
  }
};
</script>
<style scoped lang="scss">
#video {
  margin-bottom: 60px;
}

.video-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;
  border-bottom: 1px solid #f2f2f2;
  cursor: pointer;

  .titles {
    flex: 1;

    .video-title {
        padding-bottom: 10px
    }
  }
}

.video-item_thumb {
  width: 50px;
  height: 50px;
  margin-right: 16px;
  border-radius: 2px;
  overflow: hidden;

  img {
    // max-width: 100%;
    max-height: 100%;
  }
}
</style>
