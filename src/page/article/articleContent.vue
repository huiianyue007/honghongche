<template>
  <tk-container class="container tkui" :status="status" @refresh="refresh">
    <tkui-header center slot="header">
      <tkui-button class="icon" slot="left-menu" @click.native="$back">
        <tk-icon>return_a</tk-icon>
      </tkui-button>
      文章详情
    </tkui-header>
    <div v-if="result">
      <div>
        <tk-box ratio="15:8" class="img tk-grid-12" :style = "{backgroundImage: `url(${ result.banner })`}"></tk-box>
        <div class="articleBody bWhite">
          <div class="f18 interval">{{ result.title }}</div>
          <div class="f14 interval">{{ result.createdAt | splitTime}}</div>
          <div class="secondFont interval2" v-html="result.body"></div>
        </div>
      </div>
    </div>
  </tk-container>
</template>
<script>
  export default {
    data () {
      return {
        result: null,
        status: false
      }
    },
    activated () {
      if (!this.result) {
        this.getData()
      }
    },
    filters: {
      splitTime (opt) {
        return opt.split('T')[0]
      }
    },
    methods: {
      refresh () {
        this.status = false
        this.getData()
      },
      getData () {
        this.status = 'loading'
        this.$tkParse.get(`/classes/article/${this.$route.query.id}`).then((res) => {
          this.status = false
          this.result = res.data
        }).catch(() => {
          this.status = 'error'
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/main.scss";
  .img{
    /*background: url("../../assets/img/carTitle.png");*/
    background-size: cover;
  }
  .articleBody{
    padding:15px;
  }
  .bWhite{
    background: white;
  }
  .secondFont{
    img {
      max-width: 100%;
    }
  }
  .f18{
    font-size:$title-font-size;
    font-weight: 600;
  }
  .f14{
    font-size:$font-size;
    font-weight: 600;
  }
  .interval{
    margin-bottom: 15px;
  }
  .interval2{
    margin-bottom: 19px;
  }
</style>
