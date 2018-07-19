<template>
  <div class="search">
    <div>
      <label for=""></label>
      <input type="text" placeholder="Playlist ID" v-model="playlistID">
      <button @click="submitPlaylistID">Submit</button>  
    </div>
    <div>
      <label for=""></label>
      <input type="text" placeholder="Video ID">
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  computed: {
    playlistID: {
      get() {
        return this.$store.state.playlistID;
      },
      set(value) {
        this.$store.commit("updatePlaylistID", value);
      }
    }
  },
  methods: {
    submitPlaylistID() {
      this.$store.commit("submitPlaylistID");
      console.log(this.$store.state.submitPlaylistID);
      
      console.log("submited");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
