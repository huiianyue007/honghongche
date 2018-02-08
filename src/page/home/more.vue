<template>
  <tk-container class="container tkui" disableScroll>
    <tkui-header center slot="header">
      <tkui-button class="icon small" slot="left-menu" @click.native = '$back'>
        <tk-icon>return_a</tk-icon>
      </tkui-button>
      更多
    </tkui-header>
    <tk-flex column class="body-box">
      <tk-flex middle between class="item topItem" @click.native="upgrade">
        <span>版本更新</span>
        <tk-flex middle>
          <span>已经是最新版本</span>
          <tk-icon>return</tk-icon>
        </tk-flex>
      </tk-flex>
      <tk-flex middle between class="item bottomItem" @click.native="$push('/home/opinion')">
        <span>意见反馈</span>
        <tk-icon>return</tk-icon>
      </tk-flex>
      <tk-flex middle between class="item bottomItem" @click.native="$push('/home/about')">
        <span>关于我们</span>
        <tk-icon>return</tk-icon>
      </tk-flex>
    </tk-flex>
    <tk-cover  slot="cover" :color="color" :show="show" :hideOnClick="true" @click.native="hidden">
      <tk-flex middle center class="con_con">
        <div>{{ txt }}</div>
      </tk-flex>
    </tk-cover>
  </tk-container>
</template>
<script>
  import config from 'config'
  export default {
    data () {
      return {
        color: 'rgba(0, 0, 0, .4)',
        show: false,
        txt: ''
      }
    },
    methods: {
      hidden () {
        this.show = false
      },
      upgrade () {
        if (this.$tkUa.isPlus && this.$tkUa.isAndorid) {
          this.show = true
          this.txt = '当前版本号' + config.version + '\n版本号' + window.plus.runtime.version
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    .body-box {
      .item {
        height: 50px;
        background-color: white;
        padding:0 15px;
      }
      .topItem {
        margin-bottom: 20px;
      }
      .bottomItem {
        border-bottom: 1px solid #dae4e9;
      }
    }
  }
  .con_con{
    background-color:#fff;
    width:290px;
    min-height:140px;
    border-radius: 9px;
  }
</style>
