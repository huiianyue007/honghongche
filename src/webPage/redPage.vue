<template>
  <tk-container class="container">
    <div class="container-body">
      <div class="form" >
        <p class="invite-message">您的好友邀请您注册</p>
        <div class="input-wrap">
          <input v-model="phone" placeholder="请输入您的手机号">
        </div>
        <div class="input-wrap">
          <input v-model="code" :placeholder="codePlaceholder" @click="sendMessage">
          <div class="code-message" v-if="!codePlaceholder" @click="sendMessage">{{codeMessage}}</div>
        </div>
        <div class="input-wrap">
          <input v-model="password" placeholder="请输入密码" type="password">
        </div>
        <button class="button" @click="register">立即注册</button>
      </div>
      <div class="ruler">
        <div class="title">活动规则</div>
        <p>1、邀请您的用户将获得 {{score}} 积分。</p>
        <p>2、积分可以在app中用于兑换洗车券和加油券等产品。</p>
      </div>
      <div class="copyright">版权所有©河北若风科技有限责任公司</div>
    </div>
  </tk-container>
</template>
<script>
  export default {
    data () {
      return {
        phone: '',
        password: '',
        score: 100,
        code: '',
        num: 0,
        codePlaceholder: '发送验证码',
        waitCode: false
      }
    },
    computed: {
      codeMessage () {
        if (this.waitCode) {
          return this.num + '秒重发'
        } else {
          return '重新发送'
        }
      }
    },
    methods: {
      sendMessage () {
        this.codePlaceholder = ''
        if (!this.waitCode) {
          if (!this.isPhone()) {
            this.$tkGlobal.toast.add('请输入正确的手机号')
            return
          }
          this.$tkParse.post('/sms/sendCode', {
            'phone': this.phone,
            'templateId': 'RD1qK3'
          }).then((res) => {
            this.waitCode = true
            this.countDown()
          }).catch(() => {
            this.$tkGlobal.toast.add('验证码发送失败，请稍后重试。')
          })
        }
      },
      isPhone () {
        return (/^1[3|4|5|7|8][0-9]{9}$/).test(this.phone)
      },
      countDown () {
        this.num = 60
        let timeId = setInterval(() => {
          this.num--
          if (this.num <= 0) {
            clearInterval(timeId)
            this.waitCode = false
            this.num = 0
          }
        }, 1000)
      },
      register () {
        if (!this.isPhone() || !this.code || !this.password) {
          this.$tkGlobal.toast.add('请填写注册信息。')
          return
        }
        let userId = this.$route.query.id
        this.$cloudAjax.post('/index/invite', {
          phone: this.phone,
          code: this.code,
          password: this.password,
          userId: userId
        }).then(() => {
          this.$tkGlobal.toast.add('注册成功, 请下载app')
          this.$router.push('/')
        }).catch(e => {
          this.$tkGlobal.toast.add(e.data)
        })
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
$yellow: #ffde00;
$red: #D83A09;
.container{
  background-color: $red;
}
.container-body {
  background: url("../assets/img/background_map.png");
  background-repeat: no-repeat;
  background-size: 100%;
  background-color: $red;
  background-position: top;
  padding: 220px 37px 0 37px;
}
.invite-message {
  text-align: center;
  padding: 16px;
  font-size: 12px;
  color: white;
}
.ruler {
  margin: 30px 0;
  color: $yellow;
  .title{
    text-align: center;
    font-size: 16px;
    margin-bottom: 16px;
  }
  p{
    line-height: 1.5;
  }
}
.form {
  .input-wrap {
    border: 1px solid $yellow;
    height: 40px;
    width: 100%;
    margin-bottom: 15px;
    position: relative;
    .code-message {
      position: absolute;
      height: 40px;
      line-height: 40px;
      color: $yellow;
      right: 0;
      top: 0;
      padding: 0 16px;
      font-size: 14px;
    }
    input{
      color: $yellow;
      width: 100%;
      border: none;
      text-align: center;
      line-height: 40px;
      height: 40px;
      font-size: 14px;
      &::placeholder {
        color: $yellow;
        text-align: center;
      }
    }
  }
  .button {
    color: $red;
    background: $yellow;
    height: 40px;
    line-height: 40px;
    width: 100%;
    font-size: 18px;
    margin: 6px 0;
  }
}
.copyright {
  color: $yellow;
  text-align: center;
  font-size: 11px;
  margin-top: 18px;
  margin-bottom: 18px;
}
</style>

