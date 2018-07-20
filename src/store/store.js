import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    playlistID: "PLHAe5aDyb50vbEHNCgpkH0FSDNdQWv9Qh",
    submitPlaylistID: 0,
    submitVideoID: 0,
    videoIframe: "",
    playlist: [],
    videoID: "",
    videoIDList: [],
    videoDuration: [],
    videoTitle: [],
    videoChannelTitle: [],
    lyrics: "",
    lyricsError: "No results found in Musixmatch",
    currentVideoTitle: "",
    currrentVideoChannel: "",
  },
  mutations: {
    setPlaylist(state, playlist) {
      state.playlist = [];
      state.playlist = playlist;
    },
    setAllVideoID: state => {
      state.videoIDList = []; // Reset videoIDList
      for (let i = 0; i < state.playlist.length; i++) {
        let videoID = state.playlist[i].snippet.resourceId.videoId;
        state.videoIDList.push(videoID);
      }
    },
    updatePlaylistID(state, playlistID) {
      state.playlistID = playlistID
    },
    updateVideoID(state, videoID) {
      state.videoIDList = []; // Reset videoIDList
      state.videoIDList.push(videoID)
      state.videoID = videoID; // Reset videoIDList
    },
    submitPlaylistID: state => {
      state.submitPlaylistID++;
    },
    submitVideoID: state => {
      state.submitVideoID++;
    },
    resetVideoDetails: (state) => {
      state.videoTitle = [];
      state.videoChannelTitle = [];
      state.videoDuration = [];
    }
  }
})