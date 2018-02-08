<template>
  <tk-container class="container">
    <tk-flex center middle column class="wrap">
      <tk-flex class="interval">
        <tk-box ratio="4:1" class="logo"></tk-box>
      </tk-flex>
      <div class="phone"></div>
      <p class="text interval">YOYO爱车 — 您开车、我加油。YOYO爱车是一款专门为私家车车主提供资源共享服务的手机软件，通过手机软件车主们可以在日常的驾驶行程中，顺便赚一些油费贴补一下您的爱车；同时也可以享受到完全免费或超低折扣的洗车、保养等其他服务。
        <br>微信搜索公众号“YOYO爱车俱乐部”，关注我们。</p>
      <tkui-button class="btn1 interval" @click.native="download" :class="{disable : !androidUrl}">Android版下载</tkui-button>
      <tkui-button class="btn2" :class="{disable : !IOSUrl}">iphone版下载</tkui-button>
    </tk-flex>
  </tk-container>
</template>

<script>
  import config from 'config'
  export default {
    data () {
      return {
        androidUrl: config.androidDownloadUrl,
        IOSUrl: config.IOSDownloadUrl
      }
    },
    methods: {
      download () {
        if (this.$tkUa.isWechat) {
          this.$emit('showCover')
        } else {
          window.open(this.androidUrl)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
.container{
  background: url("../assets/img/bg2.png");
  background-size: cover;
}
.wrap{
  padding: 37px 0;
}
.logo{
  background: url("../assets/img/logo.png");
  background-size: cover;
  height: 44px;
  width: 165px;
}
.phone{
  background: url("../assets/img/phone1.png");
  background-size: cover;
  height: 420px;
  width: 340px;
}
.btn1{
  background: url("../assets/img/button1.png");
  background-size: cover;
  color: white;
  font-size:17px;
  width: 200px;
  height:40px;
  text-align: center;
  line-height: 40px;
}
.btn2{
  background: url("../assets/img/button2.png");
  background-size: cover;
  color: white;
  font-size:17px;
  width: 200px;
  height:40px;
  text-align: center;
  filter: grayscale(100%)
}
.text{
  color: #082307 ;
  font-size:14px;
  padding: 0 25px;
}
.p1{
  color: #333;
  font-size: 15px;
}
.p2{
  color: #666;
  font-size:12px;
}
.interval{
  margin-bottom: 22px;
}
</style>
