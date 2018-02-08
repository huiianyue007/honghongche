<template>
  <tk-container class="container tkui" disableScroll>
    <tkui-header center slot="header">
      <tkui-button class="icon" @click.native="$router.go(-1)" slot="left-menu">
        <tk-icon>return_a</tk-icon>
      </tkui-button>
      车险优惠
    </tkui-header>
    <tk-flex middle center style="padding-top: 100px;">
      <div>
        <tk-box ratio="342:321" class="box">
        </tk-box>
        <div class="text">
          非常抱歉,此功能暂未开放<br>
          程序员在努力开拓中
        </div>
      </div>
    </tk-flex>
  </tk-container>
</template>
<script>

</script>
<style lang="scss" scoped>
  @import "../../assets/scss/main.scss";
  .box{
    background: url("../../assets/img/expect.png");
    background-size: cover;
  }
  .text{
    padding-top:17px;
  }
</style>
