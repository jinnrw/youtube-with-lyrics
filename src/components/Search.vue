<template>
  <div class="search">
    <div class="search-box" v-show="searchByPlaylist">
      <label for=""></label>
      <input type="text" placeholder="Playlist ID" v-model="playlistID">
      <button @click="submitPlaylistID">Search</button>  
    </div>
    <div class="search-box" v-show="!searchByPlaylist">
      <label for=""></label>
      <input type="text" placeholder="Video ID" v-model="videoID">
      <button @click="submitVideoID">Search</button>  
    </div>
    <div class="search-type">
      <div class="type_by-playlist">
        <input id="search-by-playlist" type="radio" v-bind:value="true" v-model="searchByPlaylist">
        <label for="search-by-playlist">By Playlist ID</label>
      </div>
      <div class="type_by-video">
        <input id="search-by-video" type="radio" v-bind:value="false" v-model="searchByPlaylist">
        <label for="search-by-video">By Video ID</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchByPlaylist: true
    };
  },
  computed: {
    playlistID: {
      get() {
        return this.$store.state.playlistID;
      },
      set(value) {
        this.$store.commit("updatePlaylistID", value);
      }
    },
    videoID: {
      get() {
        return this.$store.state.videoID;
      },
      set(value) {
        this.$store.commit("updateVideoID", value);
      }
    }
  },
  methods: {
    submitPlaylistID() {
      this.$store.commit("submitPlaylistID");
    },
    submitVideoID() {
      this.$store.commit("submitVideoID");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.search {
  flex: 1;
  display: flex;
  align-items: center;
  width: 800px;
  max-width: 800px;
}

.search-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 24px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin-right: 16px;

  input {
    width: 100%;
    line-height: 24px;
    padding: 4px 6px;
    border: 1px solid #d3d3d3;
  }

  button {
    width: 65px;
    cursor: pointer;
    border: 1px solid #d3d3d3;
    border-left: none;
    background-color: #f8f8f8;
    border-radius: 0 2px 2px 0;
    padding: 4px 6px;
    line-height: 24px;
    margin: 0;
  }
}

.search-type {
  min-width: 160px;
  display: flex;
  flex-direction: column;

  .type_by-playlist {
    margin-right: 8px;
  }
}
</style>
