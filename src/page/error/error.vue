<template>
  <tk-container class="container tkui">
    <tk-flex center column>
      <img src="../../assets/img/error.png" alt="">
      <p>无法链接服务器</p>
      <span>请查看网络设置</span>
      <tkui-button class="btn1 border primary" @click.native="refresh">重新加载</tkui-button>
    </tk-flex>
  </tk-container>
</template>
<script>
  export default {
    props: {
      message: String
    },
    methods: {
      refresh () {
        this.$emit('refresh')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    img {
      padding-top: 90px;
      width: 178px;
    }
    p {
      padding-top: 25px;
      color: #666666;
      font-size: 20px;
    }
    span {
      color: #999999;
      font-size: 14px;
      padding-top: 10px;
      padding-bottom: 56px;
    }
    .btn1 {
      margin-bottom: 30px;
    }
  }
</style>
