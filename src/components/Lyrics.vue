<template>
  <div class="lyrics">
    <h2 class="lyrics_title">{{ this.$store.state.currentVideoTitle }}</h2>
    <p class="lyrics_channel">{{ this.$store.state.currentVideoChannel }}</p>
   <p class="lyrics_content">{{ this.$store.state.lyrics }}</p>
  </div>
</template>

<script>
export default {
  name: "Lyrics",
  props: {},
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

.lyrics_title {
  font-size: 45px;
  margin-bottom: 10px;
}

.lyrics_channel {
  font-size: 21px;
}

.lyrics_content {
  position: sticky;
  top: 20px;
  right: 0;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  margin-top: 16px;
  padding-top: 16px;
  padding-top: 1rem;
  font-size: 18px;
  line-height: 1.7;
  font-weight: 400;
}
</style>
