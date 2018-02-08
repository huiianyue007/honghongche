<template>
  <tk-container class="container tkui" :status="status" @refresh="refresh"  disableScroll>
    <div class="head" slot="header">
      <tk-flex middle @click.native="goUser"  v-if="userInfo">
        <div class="userImg" :style = "{backgroundImage: `url(${userInfo.avatar ? userInfo.avatar: image})`}" ></div>
        <div class="fill" style="font-size: 16px;">
          {{ userInfo.phone }}
          <div v-if="carInfo" style="font-size: 12px;">{{ carInfo.number }}</div>
        </div>
        <tk-flex style="font-size: 14px;">
          积分：{{ userInfo.score ? userInfo.score : 0}}
        </tk-flex>
      </tk-flex>
      <tk-flex between class="tab"  style="margin-top: 25px;">
        <div  @click='tabToggle("tab1");' :class="{'toggle': currentView === 'tab1'}">消息</div>
        <div  @click='tabToggle("tab2");' :class="{'toggle': currentView === 'tab2'}">爱车生活</div>
        <div  @click='tabToggle("tab3");' :class="{'toggle': currentView === 'tab3'}">我的</div>
      </tk-flex>
    </div>
    <div style="width: 100%;height: 100%;margin-top: 7px;">
      <component :is="currentView" :dataResult="childResult"></component>
    </div>
  </tk-container>
</template>
<script>
  import message from '../components/message.vue'
  import loveCarLife from '../components/loveCarLife.vue'
  import my from '../components/my.vue'
  export default {
    name: 'index',
    components: {
      tab1: message,
      tab2: loveCarLife,
      tab3: my
    },
    data () {
      return {
        currentView: 'tab1',
        result: null,
        length: null,
        scrollHeight: 0,
        num: 4,
        infiniteScroll: false,
        onLoading: false,
        status: false,
        lastNum: 0,
        childResult: null,
        image: 'http://osmnxqxc2.bkt.clouddn.com/9971f09d-ed6b-4181-bfdb-95caae0730ae.png'
      }
    },
    computed: {
      carInfo () {
        return this.$store.state.carInfo
      },
      userInfo () {
        return this.$store.state.userInfo
      }
    },
    methods: {
      tabToggle: function (tabText) {
        this.currentView = tabText
      },
      goUser () {
        if (this.$store.state.userId) {
          this.$push('/home/user')
        } else {
          this.$push('/login')
        }
      },
      refresh () {
        this.status = false
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/main.scss";
  .head{
    padding: 15px 15px 0;
    background: $primary-color;
    color: $header-color;
    z-index:100;
    box-shadow: 0 1px 8px #16ac19;
    .userImg{
      width: 60px;
      height: 60px;
      margin-right: 15px;
      background-size: cover;
    }
    .grade{
      height: 13px;
      width: 1px;
      background: $header-color;
      margin:3px 10px;
    }
    .tab {
      color: #c9f9cd;
      div {
        padding-bottom: 10px;
        width: 70px;
        text-align: center;
        font-size:16px;
      }
    }
  }
  .toggle {
    color: white;
    border-bottom: 2px solid white;
    font-size: 17px !important;
  }
</style>
