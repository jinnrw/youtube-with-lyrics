<template>
  <div class="playlist">
    <div id="video" v-html="videoIframe"></div>
    <div class="video-list">
      <div v-for="(video, i) in playlist" v-bind:key="video.snippet.resourceId.videoId" 
      @click="updateVideo(video.snippet.resourceId.videoId, video.snippet.title, videoChannelTitle[i] )" class="video-item">
        <div class="video-item_thumb">
          <img v-bind:src="video.snippet.thumbnails.medium.url" alt="">
        </div>
        <div class="titles">
          <h4 class="video-title">{{ video.snippet.title }}</h4>
         <p>{{ videoChannelTitle[i] }}</p>
        </div>
        <p class="channel-title">{{ durationConvert(videoDuration[i]) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const jsonp = require("jsonp");
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");

export default {
  name: "Playlist",
  // data() {
  //   // return {
  //   //   videoIframe: "",
  //   //   playlist: [],
  //   //   videoIDList: [],
  //   //   videoDuration: [],
  //   //   videoChannelTitle: [],
  //   //   lyrics: ""
  //   // };
  // },
  computed: {
    videoIframe() {
      return this.$store.state.videoIframe;
    },
    playlist() {
      return this.$store.state.playlist;
    },
    videoIDList() {
      return this.$store.state.videoIDList;
    },
    videoDuration() {
      return this.$store.state.videoDuration;
    },
    videoChannelTitle() {
      return this.$store.state.videoChannelTitle;
    },
    lyrics() {
      return this.$store.state.lyrics;
    }
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
            this.embedVideo(id);
            this.$store.state.playlist = playlist;
            this.$store.commit("getAllVideoID");
          })
          .catch(function(error) {
            console.log(error);
          });
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
              let videoDetails = response.data.items;
              let firstVideoDetailsSnippet = videoDetails[0].snippet;
              for (let i = 0; i < videoDetails.length; i++) {
                let duration = videoDetails[i].contentDetails.duration;
                let channelTitle = videoDetails[i].snippet.channelTitle;
                this.videoDuration.push(duration);
                this.videoChannelTitle.push(channelTitle);
              }
              this.updateLyrics(firstVideoDetailsSnippet.title, firstVideoDetailsSnippet.channelTitle);
              this.getCurrentVideo(firstVideoDetailsSnippet.title, firstVideoDetailsSnippet.channelTitle);
            })
            .catch(function(error) {
              console.log(error);
            });
        return request;
      }
    };

    async function getYoutubeData() {
      try {
        const resPlaylist = await service.getPlaylist();
        const resVideoID = await service.getVideoID();
      } catch (error) {
        console.error(error);
      }
    }
    getYoutubeData();
  },
  methods: {
    embedVideo(id) {
      this.$store.state.videoIframe = `
      <iframe id="video-iframe" width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    },
    updateVideo(id, video, channel) {
      this.embedVideo(id);
      this.updateLyrics(video, channel);
      this.getCurrentVideo(video, channel)
    },
    updateLyrics(video, channel) {
      var key = "56d2a192d33f91c1c6d3700e72dac916";
      var q_track = video.replace(/ /g, "%20");
      var q_artist = channel.replace(/ /g, "%20");
      var URL =
        "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=" +
        q_track +
        "&q_artist=" +
        q_artist +
        "&apikey=" +
        key;
      jsonp(URL, null, (err, data) => {
        if (err) {
          console.error(err.message);
        } else {
          if (typeof data.message.body !== 'undefined' && data.message.body.length == 0) {
            this.$store.state.lyrics = this.$store.state.lyricsError;
          } else {
            this.$store.state.lyrics = data.message.body.lyrics.lyrics_body;
          }
        }
      });
    },
     getCurrentVideo(video, channel) {
      this.$store.state.currentVideoTitle = video;
      this.$store.state.currentVideoChannel = channel;
     },
    durationConvert(time) {
      return moment.duration(time, "minutes").format();
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
      padding-bottom: 10px;
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
    max-height: 100%;
  }
}

.playlist {
  margin-right: 60px;
}

#video-iframe {
  width: 100%;
}
</style>
