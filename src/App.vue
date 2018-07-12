<template>
  <div id="app">
    <Search />  
    <Playlist />  
    <Lyrics />  
  </div>
</template>

<script>
import Search from './components/Search.vue'
import Playlist from './components/Playlist.vue'
import Lyrics from './components/Lyrics.vue'

export default {
  name: 'app',
  components: {
    Search,
    Playlist,
    Lyrics
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

header {
  height: 50px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 60px;
}
</style>
