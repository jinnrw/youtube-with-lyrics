<template>
  <div class="playlist">
    <div id="video" v-html="embedVideo"></div>
    <div id="list">
      <div v-for="video in playlist" v-bind:key="video.snippet.resourceId.videoId">
        <img v-bind:src="video.snippet.thumbnails.medium.url" alt="" class="thumb">
        <h4>{{ video.snippet.title }}</h4>
        <h4>{{ video.snippet.title }}</h4>
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
      embedVideo: "",
      playlist: []
    };
  },
  mounted() {
    var key = "AIzaSyCGw4DYb8KrW9c0E7H6kwFdmcs-k49clBU";
    var playlistId = "PLHAe5aDyb50vbEHNCgpkH0FSDNdQWv9Qh";
    var URL = "https://www.googleapis.com/youtube/v3/playlistItems";
    var options = {
      part: "snippet",
      key: key,
      maxResults: 10,
      playlistId: playlistId
    };

    // Fetch data from YouTube Data API
    axios
      .get(URL, {
        params: options
      })
      .then(response => {
        // this.results = response.data.results;
        let id = response.data.items[0].snippet.resourceId.videoId;
        let playlist = response.data.items;
        console.log(playlist);
        this.embedBideo(id);
        this.playlist = playlist;
      })
      .catch(function(error) {
        console.log(error);
      });

    // $.getJSON(URL, options, function(data) {
    //   var id = data.items[0].snippet.resourceId.videoId;
    //   showVideo(id);
    //   resultsLoop(data);
    // });
  },
  methods: {
    embedBideo(id) {
      this.embedVideo = `
      <iframe id="video-iframe" width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    }
  }
};
</script>
<style scoped>
  .thumb {
    width: 50px;
  }
</style>
