<template>
  <tk-container class="container tkui">
    <div class="box">
      <tk-flex average>
        <tkui-list>
          <tkui-list-item class="divider" @click.native="go('/home/mycar')">
            <tk-icon slot="left" :style="{color:'#5da6f7'}">vehicle</tk-icon>
            车辆信息
            <tk-icon slot="right" class="w15h14">return</tk-icon>
          </tkui-list-item>
          <tkui-list-item @click.native="go('/cooperation')">
            <tk-icon slot="left" :style="{color:'#f98758'}">cooperation</tk-icon>
            合作介绍
            <tk-icon slot="right" class="w15h14">return</tk-icon>
          </tkui-list-item>
        </tkui-list>
      </tk-flex>
      <tk-flex average style="margin-top: 15px;">
        <tkui-list>
          <tkui-list-item class="divider" @click.native="go('/home/myCoupon')">
            <tk-icon slot="left" :style="{color:'#1bcfe8'}">volume</tk-icon>
            我的卡券
            <tk-icon slot="right" class="w15h14">return</tk-icon>
          </tkui-list-item>
          <tkui-list-item class="divider" @click.native="go('/home/myTask')">
            <tk-icon slot="left">task</tk-icon>
            我的任务
            <tk-icon slot="right" class="w15h14">return</tk-icon>
          </tkui-list-item>
          <tkui-list-item @click.native="go('/home/recommend')">
            <tk-icon slot="left" :style="{color:'#e73a1d'}">recommend</tk-icon>
            推荐有奖
            <tk-icon slot="right" class="w15h14">return</tk-icon>
          </tkui-list-item>
        </tkui-list>
      </tk-flex>
      <tk-flex average style="margin-top: 15px;">
        <tkui-list>
          <tkui-list-item @click.native="go('/home/more')">
            <tk-icon slot="left" :style="{color:'#f98858 '}">more</tk-icon>
            <span style="color:#233038;">更多</span>
            <tk-icon slot="right" class="w15h14">return</tk-icon>
          </tkui-list-item>
        </tkui-list>
      </tk-flex>
    </div>
  </tk-container>
</template>
<script>
  export default {
    methods: {
      go (url) {
        this.$push(url)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/main.scss";
  .box{
    padding-top:35px;
    /*min-height:700px;*/
    font-size: 16px;
  }
  .w15h14{
    width: 15px;
    height:14px;
  }
</style>

