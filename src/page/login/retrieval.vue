<template>
  <tk-container class="container" disableScroll :status="status" @refresh="refresh">
    <tkui-header center slot="header">
      <tkui-button class="icon small" slot="left-menu" @click.native = '$back'>
        <tk-icon>return_a</tk-icon>
      </tkui-button>
      找回密码
    </tkui-header>
    <tk-flex column class="body">
      <tkui-input class="input" v-model="phoneNumber" rulers="mobile" label="手机号:" type="text" placeHolder="请输入注册手机号">
        <span slot="after" @click="getSmsCode" :class = '{"active": num < 250 && num > 0}' class="smsCodeBtn">{{num < 250 && num > 0 ? (Math.floor(num/10)) + 's' + '重新发送' : '获取验证码'}}</span>
      </tkui-input>
      <tkui-input class="input" v-model="smsCode" label="验证码:" type="text" placeHolder="请输入注册验证码"></tkui-input>
      <tkui-input class="input" v-model="newPassword" label="新密码:" type="password" placeHolder="请输入新密码"></tkui-input>
      <tkui-input class="input" v-model="oldPassword" :rulers="eq" label="新密码:" type="password" placeHolder="再次输入新密码"></tkui-input>
      <div class="interval">
        <tkui-button class="block raised btn" :class = '[verify ? "primary" : "disable"]' @click.native = 'retrieval'>重置密码</tkui-button>
      </div>
    </tk-flex>
  </tk-container>
</template>
<script>
  export default {
    data () {
      return {
        phoneNumber: '',
        newPassword: '',
        oldPassword: '',
        smsCode: '',
        status: false,
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
        return this.phoneNumber && this.newPassword && this.newPassword === this.oldPassword && this.smsCode
      },
      eq () {
        return [{
          name: 'eq',
          value: this.newPassword
        }]
      }
    },
    methods: {
      retrieval () {
        if (!this.verify) return false
        this.$tkParse.post('/resetPasswordByPhone', {
          phone: this.phoneNumber,
          code: this.smsCode,
          password: this.newPassword
        }).then(() => {
          this.$tkGlobal.toast.add('找回成功,请重新登录')
          this.$back()
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
          'phone': this.phoneNumber,
          'templateId': 'RD1qK3'
        }).then((res) => {
          this.$tkGlobal.toast.add('验证码已发送,请查收。')
        })
      },
      refresh () {
        this.status = false
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/scss/main';
  .container{
    background: white;
  }
  .body{
    margin-top: 20px;
    /*padding: 0 15px;*/
    .input{
      width:100%;
    }
    .btn{
      margin-top:30px;
    }
    .interval{
      padding:15px;
    }
    .smsCodeBtn {
      font-size: 16px;
      color: #09BB07;
    }
    .active {
      color: #8297A4;
    }
  }
</style>
