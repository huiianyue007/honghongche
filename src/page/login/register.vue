<template>
  <tk-container class="container" disableScroll>
    <tkui-header center slot="header">
      <tkui-button class="icon small" slot="left-menu" @click.native = '$back'>
        <tk-icon>return_a</tk-icon>
      </tkui-button>
      新用户注册
    </tkui-header>
    <div class="body">
      <tkui-input type="text" v-model="phonenumber" rulers="mobile" class="shuru" placeHolder="请输入手机号">
        <tk-icon slot="before">mobile_phone</tk-icon>
        <span class="smsCodeBtn" slot="after" @click="getSmsCode" :class = '{"active": num < 250 && num > 0}'>
          {{num < 250 && num > 0 ? (Math.floor(num/10)) + 's' + '重新发送' : '获取验证码'}}
        </span>
      </tkui-input>
      <tkui-input type="text" v-model="smsCode" class="shuru" placeHolder="请输入验证码">
        <tk-icon slot="before">verification_code</tk-icon>
      </tkui-input>
      <tkui-input type="password" v-model="password" class="shuru" placeHolder="请输入新密码">
        <tk-icon slot="before">password</tk-icon>
      </tkui-input>
      <tkui-input type="password" :rulers="eq" v-model="OldPassword" class="shuru" placeHolder="请再次输入新密码">
        <tk-icon slot="before">password</tk-icon>
      </tkui-input>
      <div class="interval">
        <tkui-button class="block raised btn" :class = '[verify ? "primary" : "disable"]' @click.native="next">下一步</tkui-button>
        <tkui-toggle  v-model="check"></tkui-toggle>
        <span class="font">我已阅读并同意<span class="go" @click="$push('/registerPrivacyPolicy')">《程序使用协议和隐私政策》</span></span>
      </div>
    </div>
  </tk-container>
</template>
<script>
  export default {
    data () {
      return {
        check: true,
        phonenumber: '',
        password: '',
        smsCode: '',
        OldPassword: '',
        num: 250
      }
    },
    watch: {
      num (val) {
        if (val <= 0) {
          clearInterval(this.time)
          this.num = 250
        }
      }
    },
    computed: {
      verify () {
        return this.phonenumber && this.password
      },
      eq () {
        return [{
          name: 'eq',
          value: this.password
        }]
      }
    },
    methods: {
      next () {
        if (!this.verify) return false
        this.$tkParse.post('/signinByPhone', {
          phone: this.phonenumber,
          password: this.password,
          code: this.smsCode
        }).then(res => {
          this.$store.commit('setUserId', res.data.objectId)
          this.$store.commit('setSessionToken', res.data.sessionToken)
          this.$store.commit('setUserInfo', res.data)
          this.$router.push('/login/register2')
        }).catch(error => {
          this.$tkGlobal.toast.add(error.data.error)
        })
      },
      getSmsCode () {
        if (this.num !== 250) return false
        if (this.time) {
          clearInterval(this.time)
        }
        this.time = setInterval(() => {
          this.num--
        }, 100)
        this.$tkParse.post('/sms/sendCode', {
          'phone': this.phonenumber,
          'templateId': 'RD1qK3'
        }).then((res) => {
          this.$tkGlobal.toast.add('验证码已发送,请查收。')
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/scss/main';
  .container{
    background: white;
  }
  .tkui-button {
    margin:0;
  }
  .body {
    margin-top: 20px;
    .inputBtn {
      border-bottom: 1px solid #dae4e9;
      height: 50px;
      .icon{
        margin-right: 15px;
      }
      .shuru {
        width:100%;
      }
    }
    .smsCodeBtn {
      font-size: 16px;
      color: #09BB07;
    }
    .active {
      color: #8297A4;
    }
    .layout{
      margin: 25px 0;
      .layout_title{
        font-size: 16px;
        color: #233038;
        font-weight: 600;
        height:30px;
        line-height:30px;
        margin-bottom: 10px;
      }
      .layout-body {
        height: 40px;
        label{
          text-align: center;
          input{
            margin-right: 10px;
          }
        }
        select{
          margin:0 10px;
          padding: $gutter-min;
          outline:none;
          border:1px solid $border-color;
        }
      }
    }
    .btn{
      margin:46px 0 15px;
    }
    .rule {
      .go {
        color: $primary-color;
        padding-bottom: 30px;
      }
      span {
        margin-left: 5px;
        color: #8297a4;
        font-size: 12px;
      }
    }
  }
  .interval{
    padding:0 15px;
  }
  .go {
    color: $primary-color;
    padding-top: 15px;
    padding-bottom: 30px;
    font-size: 12px;
  }
  .font{
    padding-bottom: 30px;
    padding-top: 15px;
    font-size: 12px;
  }
</style>
