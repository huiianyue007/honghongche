<template>
  <tk-container class="container" :status="status" @refresh="refresh">
    <tkui-header center slot="header">
      <tkui-button class="icon small" slot="left-menu" @click.native = '$back'>
        <tk-icon>return_a</tk-icon>
      </tkui-button>
      意见反馈
    </tkui-header>
    <tk-flex column class="body-box">
      <textarea placeholder="请给我们意见建议" name="opinion" cols="30" rows="10" class="opinion" v-model="message"></textarea>
      <div class="gutter">
        <tkui-button class="block primary raised" @click.native = 'submit'>提交</tkui-button>
      </div>
    </tk-flex>
  </tk-container>
</template>
<script>
  export default {
    data () {
      return {
        message: '',
        status: false
      }
    },
    methods: {
      submit () {
        this.$tkParse.post('/classes/feedback', {
          'body': this.message,
          'user': this.$store.state.userId
        }).then((res) => {
          if (!res.data.error) {
            this.$tkGlobal.toast.add('感谢您的反馈!')
            this.$back()
          }
        }).catch(() => {
          this.status = 'error'
        })
      },
      refresh () {
        this.status = false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    .body-box {
      padding: 25px 15px;
      .opinion {
        width:100%;
        border:1px solid #dae4e9;
        /*color: #8297a4;*/
      }
      .gutter {
        margin-top: 50px;
      }
    }
  }
  textarea::placeholder{
    color:#8297a4;
  }

</style>
