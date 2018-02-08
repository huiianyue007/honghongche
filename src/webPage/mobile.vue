<template>
  <tk-container class="container" disableScroll>
    <tk-flex slot="header" between class="header">
      <tk-flex center middle>
        <tk-box ratio="11:3" class="logo"></tk-box>
      </tk-flex>
      <tk-flex>
        <tk-flex center middle class="left nav" @click.native="tab('download')" :class="{'active': currentView === 'download'}">
          <span>手机版下载</span>
        </tk-flex>
        <tk-flex center middle class="right nav" @click.native="tab('contact')" :class="{'active': currentView === 'contact'}">
          <span>关于我们</span>
        </tk-flex>
      </tk-flex>
    </tk-flex>
    <component :is="currentView" @showCover="showCover"></component>
    <tk-flex class="foot" center middle>
      <span>Copyright©2014 YOYO爱车有限公司 石ICP备14020964号</span>
    </tk-flex>
    <tk-cover slot="cover" :color = 'color' :show.sync="show" hideOnClick top transition top right>
      <!--<div class="coverImg"></div>-->
      <img src="../assets/img/web1.png" alt="" class="coverImg">
    </tk-cover>
  </tk-container>
</template>
<script>
  import contact from './mobilecontact'
  import download from './mobileDownload.vue'
  export default {
    data () {
      return {
        currentView: 'download',
        color: 'rgba(0, 0, 0, .5)',
        show: false
      }
    },
    methods: {
      tab (opt) {
        this.currentView = opt
      },
      showCover () {
        console.log(this.show)
        this.show = true
      },
      hidden () {
        this.show = false
      }
    },
    components: {
      contact,
      download
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    background-color: white;
    .coverImg {
      max-width:100%;
    }
    .header {
      padding:0 15px;
      .active {
        background-color: #F3F7FA;
        color: #09BA07 !important;
        border-bottom: 2px solid #09BA07;
      }
      .logo {
        background: url("../assets/img/logo.png");
        background-size: cover;
        width: 110px;
        height: 30px;
      }
      .nav {
        padding: 10px 0;
        width: 70px;
        color: #333333;
        font-size: 12px;
      }
      .left {
        margin-right: 10px;
      }
    }
    .foot {
      font-size: 8px;
      color: #BEBEBE;
      height: 40px;
      background-color: #7E7C7C;
    }
  }
  .coverImg{
    max-width: 100%;
    width: 270px;
  }
</style>
