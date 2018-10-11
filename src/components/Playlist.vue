<template>
  <div class="playlist">
    <div id="video" v-html="videoIframe"></div>
    <div class="video-list">
      <div v-for="(video, i) in playlist" v-bind:key="videoIDList[i]" 
      @click="updateVideo(videoIDList[i], videoTitle[i], videoChannelTitle[i])" class="video-item" v-bind:class="{active: videoTitle[i] === currentVideoTitle}">
        <div class="video-item_thumb">
          <img v-bind:src="video.snippet.thumbnails.medium.url" alt="">
        </div>
        <div class="titles">
          <h4 class="video-title">{{ videoTitle[i] }}</h4>
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
  data() {
    return {

    };
  },
  computed: {
    playlistID() {
      return this.$store.state.playlistID;
    },
    submitPlaylistID() {
      return this.$store.state.submitPlaylistID;
    },
    submitVideoID() {
      return this.$store.state.submitVideoID;
    },
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
    videoTitle() {
      return this.$store.state.videoTitle;
    },
    videoChannelTitle() {
      return this.$store.state.videoChannelTitle;
    },
    currentVideoTitle() {
      return this.$store.state.currentVideoTitle;
    }
  },
  mounted() {
    this.updateYoutubeData("getPlaylist");
  },
  watch: {
    submitPlaylistID: function() {
      this.updateYoutubeData("getPlaylist");
    },
    submitVideoID: function() {
      this.updateYoutubeData("getVideo");
    }
  },
  methods: {
    updateYoutubeData(type) {
      const service = {
        getPlaylist: () => {
          var key = "AIzaSyCGw4DYb8KrW9c0E7H6kwFdmcs-k49clBU";
          var playlistId = this.$store.state.playlistID;
          var URL = "https://www.googleapis.com/youtube/v3/playlistItems";
          var options = {
            part: "snippet",
            key: key,
            maxResults: 50,
            playlistId: playlistId
          };
          const request = axios
            .get(URL, {
              params: options
            })
            .then(response => {
              let id = response.data.items[0].snippet.resourceId.videoId;
              let playlist = response.data.items;
              this.$store.commit("setPlaylist", playlist);
              this.$store.commit("setAllVideoID");
            })
            .catch(function(error) {
              console.log(error);
            });
          return request;
        },
        getVideo: () => {
          var key = "AIzaSyCGw4DYb8KrW9c0E7H6kwFdmcs-k49clBU";
          var URL = "https://www.googleapis.com/youtube/v3/videos";
          var options = {
            part: "snippet,contentDetails",
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
                let firstVideoID = videoDetails[0].id;
                // When getVideo, assign the single video response to Playlist
                if (type === "getVideo") {
                  this.$store.commit("setPlaylist", videoDetails);
                }
                this.$store.commit("resetVideoDetails");
                for (let i = 0; i < videoDetails.length; i++) {
                  let duration = videoDetails[i].contentDetails.duration;
                  let videoTitle = videoDetails[i].snippet.title;
                  let channelTitle = videoDetails[i].snippet.channelTitle;
                  this.$store.state.videoTitle.push(videoTitle);
                  this.$store.state.videoChannelTitle.push(channelTitle);
                  this.$store.state.videoDuration.push(duration);
                }
                  // console.log(this.$store.state.videoChannelTitle);

                this.embedVideo(firstVideoID);
                this.updateLyrics(
                  firstVideoDetailsSnippet.title,
                  firstVideoDetailsSnippet.channelTitle
                );
                this.getCurrentVideo(
                  firstVideoDetailsSnippet.title,
                  firstVideoDetailsSnippet.channelTitle
                );
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
          const resVideoID = await service.getVideo();
        } catch (error) {
          console.error(error);
        }
      }

      if (type === "getPlaylist") {
        getYoutubeData();
      } else {
        service.getVideo();
      }
    },
    embedVideo(id) {
      this.$store.state.videoIframe = `
      <iframe id="video-iframe" width="560" height="315" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    },
    updateVideo(id, video, channel) {
      this.embedVideo(id);
      this.updateLyrics(video, channel);
      this.getCurrentVideo(video, channel);
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
          if (
            typeof data.message.body !== "undefined" &&
            data.message.body.length == 0
          ) {
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
  background-color: #f8f8f8;
  margin-bottom: 60px;
}

.video-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;
  border-bottom: 1px solid #f8f8f8;
  cursor: pointer;
  transition: 0.3s background-color ease; 

  &.active {
    background-color: #f8f8f8;
  }

  &:hover {
    background-color: #f8f8f8;
  }

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
