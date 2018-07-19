import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    playlistID: "PLHAe5aDyb50vbEHNCgpkH0FSDNdQWv9Qh",
    submitPlaylistID: false,
    videoIframe: "",
    playlist: [],
    videoIDList: [],
    videoDuration: [],
    videoChannelTitle: [],
    lyrics: "",
    lyricsError: "No results found in Musixmatch",
    currentVideoTitle: "",
    currrentVideoChannel: "",
    index: 0
  },
  mutations: {
    setPlaylist(state, playlist) {
      state.playlist = playlist;
    },
    setAllVideoID: state => {
      for (let i = 0; i < state.playlist.length; i++) {
        let videoID = state.playlist[i].snippet.resourceId.videoId;
        state.videoIDList.push(videoID);
      }
    },
    updatePlaylistID(state, playlistID) {
      state.playlistID = playlistID
    },
    submitPlaylistID: state => {
      state.submitPlaylistID = !state.submitPlaylistID;
    },
    resetVideoChannelTitle: (state, resetVideoChannelTitle) => {
      // Object.keys(state).forEach(key => {
      //   state[key] = s[key]
      // })
        
      console.log("reset videoChannelTitle" + state.videoChannelTitle);
    }
  }
})