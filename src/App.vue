<template>
  <div id="app">
    <header>
      <div class="app-name">YouTube with Lyrics</div>
      <Search />  
    </header>
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
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 60px;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 32px);
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  margin-bottom: 80px;

  .app-name {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 200px;
    font-size: 20px;
    font-weight: bold;
  }

  &:after {
    bottom: -5px;
    box-shadow: inset 0px 4px 8px -3px rgba(17, 17, 17, .06);
    content: "";
    height: 5px;
    left: 0px;
    opacity: 1;
    pointer-events: none;
    position: absolute;
    right: 0px;
    width: 100%;
    z-index: 2050;
  }
}

main {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  padding-bottom: 60px;
}
</style>
