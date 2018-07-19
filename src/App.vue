<template>
  <div id="app">
    <Search />  
    <main>
      <Playlist />  
      <Lyrics />  
    </main>
    
  </div>
</template>

<script>
import Search from "./components/Search.vue";
import Playlist from "./components/Playlist.vue";
import Lyrics from "./components/Lyrics.vue";

export default {
  name: "app",
  components: {
    Search,
    Playlist,
    Lyrics
  }
};
</script>

<style lang="scss">
// Variables
$link-color: #5677fc;


body {
  margin: 0;
}

h1,
h2,
h3,
h4,
p {
  margin: 0;
}

a {
  color: $link-color;
}

header {
  height: 50px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 60px;
}

main {
  display: flex;
  justify-content: center;
  padding-bottom: 60px;
}
</style>
