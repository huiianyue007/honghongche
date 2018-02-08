<template>
  <tk-container class="container tkui" disableScroll :status="status" @refresh="refresh">
    <tkui-header center slot="header">
      <tkui-button class="icon small" slot="left-menu" @click.native = '$back'>
        <tk-icon>return_a</tk-icon>
      </tkui-button>
      个人主页
    </tkui-header>
    <tk-flex class="head" column @click.native="checkImage">
      <tk-flex between middle>
        <span class="item">头像</span>
        <tk-flex middle>
          <div class="touxiang" v-if="userInfo" :style = "{backgroundImage: `url(${userInfo.avatar ? userInfo.avatar: image}`}"></div>
          <!--<div class="touxiang" v-else :style = "{backgroundImage: `url(${image}`}"></div>-->
          <tk-icon>return</tk-icon>
        </tk-flex>
      </tk-flex>
    </tk-flex>
    <tk-flex between middle class="name">
      <span class="item">手机号</span>
      <tk-flex middle class="right">
        <span v-if="userInfo">{{ userInfo.phone }}</span>
      </tk-flex>
    </tk-flex>
    <tk-flex middle between class="changePass" @click.native="gochangePass">
      <span class="item">修改密码</span>
      <tk-icon>return</tk-icon>
    </tk-flex>
    <div class="gutter">
      <tkui-button class="block primary raised" @click.native = 'loginOut'>退出登录</tkui-button>
    </div>
  </tk-container>
</template>
<script>
  export default {
    data () {
      return {
        nickname: '',
        status: false,
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
      gochangePass () {
        this.$push('/home/changepass')
      },
      loginOut () {
        this.$store.commit('setUserId', null)
        this.$store.commit('setSessionToken', null)
        this.$store.commit('setUserInfo', null)
        this.$store.commit('setCarInfo', null)
        this.$tkGlobal.toast.add('登出成功')
        this.$replace('/login')
      },
      change () {
        this.$store.commit('setNickname', this.nickname)
      },
      checkImage () {
        this.$tkParse.setSessionToken(this.$store.state.sessionToken)
        this.$tkFile.pick().then(file => {
          this.$tkParse.post('/files', file.buffer, {
            'Content-Type': 'image/jpeg'
          }).then((res) => {
            this.$store.state.userInfo.avatar = res.data.url
            this.$tkParse.put(`/users/${this.$store.state.userId}`, {
              avatar: res.data.url
            }).then((response) => {
              this.$store.commit('putUserInfo', {avatar: res.data.url})
              this.$tkGlobal.toast.add('上传成功')
            }).catch(() => {
              this.status = 'error'
            })
          }).catch(e => {
            this.status = 'error'
          })
        })
      },
      refresh () {
        this.status = false
        this.getData()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    .item {
      color: #233038;
      font-size: 16px;
    }
    .head {
      width:100%;
      padding:10px 15px;
      background-color: white;
      border-bottom: 1px solid #dae4e9;
      .touxiang {
        width: 50px;
        height: 50px;
        margin-right: 15px;
        background-size: cover;
      }
    }
    .name {
      width:100%;
      height: 50px;
      padding:0 15px;
      background-color: white;
      .right {
        .describe {
          font-size: 18px;
          color: #8297a4;
          padding-right: 12px;
        }
      }
    }
    .changePass {
      height: 50px;
      margin-top: 15px;
      padding:0 15px;
      background-color: white;
    }
    .gutter {
      margin-top: 50px;
      padding:0 15px;
    }
  }
</style>
