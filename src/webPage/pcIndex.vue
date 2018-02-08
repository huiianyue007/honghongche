<template>
  <div class="container">
    <tk-flex middle center>
      <div class="phone">
      </div>
      <div class="right">
        <tk-flex middle>
          <div class="logo"></div>
          <div style="margin-left: 19px;">
          </div>
        </tk-flex>
        <p class="text interval">YOYO爱车 — 您开车、我加油。YOYO爱车是一款专门为私家车车主提供资源共享服务的手机软件，通过手机软件车主们可以在日常的驾驶行程中，顺便赚一些油费贴补一下您的爱车；同时也可以享受到完全免费或超低折扣的洗车、保养等其他服务。
          <br>微信搜索公众号“YOYO爱车俱乐部”，关注我们。
        </p>
        <tk-flex middle center class="qr">
          <tk-flex center column>
            <div class="box" v-if="androidUrl">
              <qrcode-vue class="android" :value="androidUrl" :size="size" level="H"></qrcode-vue>
            </div>
            <tk-flex class="ios" center middle v-else>
              <span style="font-size: 30px;font-weight: 600;color: #666666;">敬请期待</span>
            </tk-flex>
            <tkui-button class="androidBtn" :class="{disable: !androidUrl}" @click.native="downloadApp">Android版下载</tkui-button>
          </tk-flex>
          <tk-flex center column>
            <tk-flex class="ios" center middle v-if="!IOSUrl">
              <span style="font-size: 30px;font-weight: 600;color: #666666;">敬请期待</span>
            </tk-flex>
            <div class="box" v-else>
              <qrcode-vue class="android" :value="IOSUrl" :size="size" level="H"></qrcode-vue>
            </div>
            <tkui-button class="IOSbtn" :class="{disable: !IOSUrl}">iphone版下载</tkui-button>
          </tk-flex>
        </tk-flex>
      </div>
    </tk-flex>
  </div>
</template>

<script>
  import QrcodeVue from 'qrcode.vue'
  import config from 'config'
  export default {
    data () {
      return {
        size: 200,
        androidUrl: config.androidDownloadUrl,
        IOSUrl: config.IOSDownloadUrl
      }
    },
    methods: {
      downloadApp () {
        window.open(this.androidUrl)
      }
    },
    components: {
      QrcodeVue
    }
  }
</script>

<style scoped lang="scss">
.container{
  background: url("../assets/img/bg1.jpg");
  background-size: cover;
  min-width: 1200px;
}
.phone{
  background: url("../assets/img/phone1.png");
  background-size: cover;
  height: 839px;
  min-width: 678px;
}
.right{
  width:800px;
}
.logo{
  background: url("../assets/img/logo.png");
  background-size: cover;
  height: 88px;
  width: 322px;
  margin-right: 10px;
}
.p1{
  color: #333;
  font-size: 31px;
}
.p2{
  color: #666;
  font-size:25px;
}

.android{
  width: 204px;
  height:204px;
  margin:0 auto;
  color: #082307;
  font-size: 24px;
}
.ios{
  width: 220px;
  height:220px;
  border: 1px solid black;
}
.androidBtn{
  background: url("../assets/img/button1.png");
  background-size: cover;
  color: white;
  font-size:24px;
  width: 284px;
  height:60px;
  margin-top:24px;
}
.IOSbtn{
  background-image: url("../assets/img/button2.png");
  background-size: cover;
  color: white;
  font-size:24px;
  width: 284px;
  height:60px;
  margin-top:24px;
  filter: grayscale(100%)
}
.qr{
  width:753px;
  height:364px;
  background-color:rgba(255,255,255,0.4);
  border-radius: 10px;
  .box {
    padding: 8px;
    background-color: white;
  }
}
.interval{
  margin:65px 0 40px 0;
}
</style>
