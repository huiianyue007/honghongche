<template>
  <tk-container class="container">
    <tkui-header center slot="header">
      <tkui-button class="icon small" slot="left-menu" @click.native = '$back'>
        <tk-icon>return_a</tk-icon>
      </tkui-button>
      修改密码
    </tkui-header>
    <tk-flex column class="body">
      <tkui-input class="input" v-model="oldPass" label="原密码:" type="password" placeHolder="请输入原密码"></tkui-input>
      <tkui-input class="input" v-model="newPass" label="新密码:" type="password" placeHolder="请输入新密码"></tkui-input>
      <tkui-input class="input" v-model="doublePass" :rulers="eq" label="新密码:" type="password" placeHolder="请再次输入新密码"></tkui-input>
    </tk-flex>
    <div class="gutter">
      <tkui-button class="block primary raised" @click.native = 'change'>确认更改</tkui-button>
    </div>
  </tk-container>
</template>
<script>
  export default {
    data () {
      return {
        oldPass: '',
        newPass: '',
        doublePass: ''
      }
    },
    computed: {
      eq: function () {
        return [{
          name: 'eq',
          value: this.newPass
        }]
      }
    },
    methods: {
      change () {
        if (this.newPass === this.doublePass) {
          this.$tkParse.put(`/users/${this.$store.state.userId}`, {
            'password': this.newPass
          }).then((res) => {
            if (!res.data.error) {
              this.$store.commit('setUserId', null)
              this.$store.commit('setSessionToken', null)
              this.$store.commit('setUserInfo', null)
              this.$tkAjaxGlobal.headers['X-Parse-Session-Token'] = ''
              this.$tkGlobal.toast.add('密码更改成功,请重新登录')
              this.$replace('/login')
            }
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    .gutter {
      margin-top: 50px;
      padding:0 15px;
    }
  }
</style>
