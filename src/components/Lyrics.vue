<template>
  <div class="lyrics">
    <div class="lyrics_content">
      <h2 class="lyrics_title">{{ currentVideoTitle }}</h2>
      <p class="lyrics_channel">{{ currentVideoChannel }}</p>
      <p class="lyrics_body">{{ lyrics }}</p>
      <div class="musixmatch-disclaimer">
        <p>Lyrics are from Musixmatch API</p>
 <p class="musixmatch-link">Visit <a href="https://www.musixmatch.com" target="_blank">Musixmatch</a> for full lyrics</p>
      </div>
     
    </div>
  </div>
</template>

<script>
export default {
  name: "Lyrics",
  props: {},
  computed: {
    currentVideoTitle() {
      return this.$store.state.currentVideoTitle;
    },
    currentVideoChannel() {
      return this.$store.state.currentVideoChannel;
    },
    lyrics() {
      return this.$store.state.lyrics;
    }
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.lyrics {
  width: 40%;
  margin-left: 60px;
  color: #2c3e50;
}

.lyrics_content {
  // position: sticky;
  // top: 20px;
  // right: 0;
  margin: 0;

  .lyrics_title {
    font-size: 45px;
    margin-bottom: 10px;
  }

  .lyrics_channel {
    font-size: 21px;
  }
  .lyrics_body {
    white-space: pre-wrap;
    word-break: break-word;
    margin-top: 16px;
    padding-top: 16px;
    padding-top: 1rem;
    font-size: 18px;
    line-height: 1.7;
    font-weight: 400;
  }
}

.musixmatch-disclaimer {
  font-size: 14px;
  line-height: 18px;
  margin-top: 30px;
  padding: 10px 0;

  .musixmatch-link {
  }
}
</style>
