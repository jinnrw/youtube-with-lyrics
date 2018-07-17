import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    videoIframe: "",
    playlist: [],
    videoIDList: [],
    videoDuration: [],
    videoChannelTitle: [],
    lyrics: "",
    lyricsError: "No results found in Musixmatch",
    currentVideoTitle: "",
    currrentVideoChannel: ""
  },
  mutations: {
    getAllVideoID: state => {
      for (let i = 0; i < state.playlist.length; i++) {
        let videoID = state.playlist[i].snippet.resourceId.videoId;
        state.videoIDList.push(videoID);
      }
    }
  }
})