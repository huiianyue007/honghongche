<template>
  <tk-container  disableScroll class="container">
    <tkui-header center slot="header">
      登录
    </tkui-header>
    <div class="body">
      <tk-flex middle class="layout">
        <tkui-input type="text" v-model="phonenumber" rulers="mobile" class="shuru" placeHolder="请输入手机号">
          <tk-icon slot="before">mobile_phone</tk-icon>
        </tkui-input>
      </tk-flex>
      <tk-flex middle class="layout">
        <tkui-input type="password" v-model="password" class="shuru" placeHolder="请输入密码">
          <tk-icon slot="before">password</tk-icon>
        </tkui-input>
      </tk-flex>
      <div class="interval">
        <tk-flex middle between class = 'setting'>
          <router-link to = '/login/register' class="go">新用户注册</router-link>
          <span class="go" @click="goRetrieval()">忘记密码?</span>
        </tk-flex>
        <tkui-button class="block raised btn" :class = '[verify ? "primary" : "disable"]' @click.native = 'login'>登录</tkui-button>
        <tk-flex middle class="rule">
          <tkui-toggle :value="check" @click.native="check = !check"></tkui-toggle>
          <span>我已阅读并表示同意<span class="go" @click="$push('/loginServiceStandard')">《服务标准和合作协议》</span></span>
        </tk-flex>
      </div>
    </div>
  </tk-container>
</template>
<script>
  export default {
    data () {
      return {
        phonenumber: '',
        password: '',
        checkBool: null,
        check: true,
        status: ''
      }
    },
    computed: {
      verify () {
        return this.phonenumber && this.password && this.check
      }
    },
    methods: {
      login () {
        this.$tkParse.post('/loginByPhone', {
          'phone': this.phonenumber,
          'password': this.password
        }).then(res => {
          this.$store.commit('setUserId', res.data.objectId)
          this.$store.commit('setSessionToken', res.data.sessionToken)
          this.$store.commit('setUserInfo', res.data)
          this.$tkParse.get('/classes/car', {
            params: {
              where: {
                user: this.$store.state.userId
              }
            }
          }).then((res) => {
            this.$store.commit('setCarInfo', res.data.results[0])
            this.$replace('/')
          })
        }).catch((error) => {
          this.$tkGlobal.toast.add(error.data.error)
        })
      },
      goRetrieval () {
        this.$push('/login/retrieval')
      },
      refresh () {
        this.status = false
      }
    }
  }
</script>
<style lang = 'scss' scoped>
  @import '../../assets/scss/main';
  .container{
    background: white;
  }
  .body {
    margin-top: 20px;
    .interval{
      padding:0 15px;
    }
    .layout{
      .shuru {
        width:100%;
      }
    }
    .setting {
      height: 60px;
      .go{
        color: $primary-color;
        font-weight: 600;
      }
    }
    .btn{
      margin:30px 0 15px;
    }
    .rule {
      .go {
        color: $primary-color;
      }
      span {
        margin-left: 5px;
        color: #8297a4;
        font-size: 12px;
      }
    }
  }
</style>
