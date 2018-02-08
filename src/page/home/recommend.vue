<template>
  <tk-container class="container" disableScroll>
    <tkui-header center slot="header">
      <tkui-button class="icon small" slot="left-menu" @click.native = '$back'>
        <tk-icon>return_a</tk-icon>
      </tkui-button>
      推荐有奖
    </tkui-header>
    <tk-flex center class="bg" bottom>
      <div class="box">
        <qrcode-vue :value="value" :size="size"></qrcode-vue>
      </div>
    </tk-flex>
  </tk-container>
</template>
<script>
  import QrcodeVue from 'qrcode.vue'
  export default {
    data () {
      return {
        value: `http://www.yoyoaiche.com/#/register?id=${this.$store.state.userId}`,
        size: 200
      }
    },
    components: {
      QrcodeVue
    }
  }
</script>
<style lang="scss" scoped>
  .bg {
    background-image: url("../../assets/img/background.png");
    background-size: cover;
    height: 100%;
    .box {
      margin-bottom: 30px;
      padding: 10px;
      background-color: white;
    }
  }
</style>
