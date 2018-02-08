<template>
  <tk-container class="container" :mobileView="false">
    <tk-flex between class="header" slot="header">
      <tk-box ratio="16:9" class="logo"></tk-box>
      <tk-flex>
        <div class="downLoadDefault"  @click='tabToggle("tab1");' :class="{'selected': currentView === 'tab1'}">手机版下载</div>
        <div class="downLoadDefault"  @click='tabToggle("tab2");' :class="{'selected': currentView === 'tab2'}">关于我们</div>
      </tk-flex>
    </tk-flex>
    <component :is="currentView"></component>
    <div class="footer">
      <p>Copyright©2014 YOYO爱车有限公司 石ICP备14020964号</p>
    </div>
  </tk-container>
</template>

<script>
  import pcAboutContent from './pcAboutContent.vue'
  import pcDownLoad from './pcIndex.vue'
  export default {
    name: 'pcAboutUs',
    components: {
      tab1: pcDownLoad,
      tab2: pcAboutContent
    },
    data () {
      return {
        currentView: 'tab1'
      }
    },
    methods: {
      tabToggle: function (tabText) {
        this.currentView = tabText
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.container{
  .header{
    padding: 0 360px;
    .logo{
      background: url("../assets/img/logo.png");
      background-size: cover;
      width: 216px;
      height: 60px;
    }
  }
  .bg{
    background: url("../assets/img/banner.png");
    background-size: cover;
    height: 480px;
    width: 100%;
  }
  .body{
    padding: 50px 360px 86px;
  }
  .footer{
    height:80px;
    background-color: #7E7C7C;
    p{
      text-align: center;
      line-height: 80px;
      color: #BEBEBE;
      font-size:16px;
    }
  }
}
.downLoadDefault{
  margin-right: 77px;
  width: 142px;
  height:79px;
  font-size:20px;
  text-align: center;
  line-height: 79px;
}
.selected{
  width: 142px;
  height:79px;
  background-color: #F3F7FA;
  color: #09BA07;
  text-align: center;
  line-height: 79px;
  border-bottom: 10px solid #09BA07;
  font-size:20px;
}
</style>
