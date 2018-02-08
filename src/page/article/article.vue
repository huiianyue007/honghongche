<template>
  <tk-container class="container tkui" :status="status" @refresh="refresh" infiniteScroll @loadingMore="ajax">
    <tkui-header center slot="header">
      <tkui-button class="icon" slot="left-menu" @click.native="$back">
        <tk-icon>return_a</tk-icon>
      </tkui-button>
      {{ $route.query.type === 'health'? '健康知识': '汽车养护'}}
    </tkui-header>
    <tk-flex column center v-if="result">
      <div class="tk-grid-11 interval" v-for="(item, index) in result">
        <div :key="index" @click="goMessage(item.objectId)">
          <tk-box ratio="7:3" class="articleImg" :style = "{backgroundImage: `url(${ item.banner })`}"></tk-box>
          <tkui-list>
            <tkui-list-item class="divider f18">{{ item.title }}</tkui-list-item>
            <tkui-list-item  class="secondFont f14">
              <div slot="left" >{{ item.createdAt | splitTime }}</div>
              <div slot="right">
                查看详情
                <tk-icon class="icon">return</tk-icon>
              </div>
            </tkui-list-item>
          </tkui-list>
        </div>
      </div>
    </tk-flex>
  </tk-container>
</template>
<script>
  export default {
    data () {
      return {
        result: [],
        status: false,
        perPage: 20,
        imgUrl: null
      }
    },
    filters: {
      splitTime (opt) {
        return opt.split('T')[0]
      }
    },
    methods: {
      ajax: function (page = 0, next = () => {}) {
        if (this.$route.query.type === 'car') {
          this.$tkParse.get('/classes/article', {
            params: {
              where: {
                'type': 'carMaintenance'
              },
              skip: this.result.length,
              limit: this.perPage,
              order: '-createdAt'
            }
          }).then((res) => {
            if (page === 0 && res.data.results.length === 0) {
              this.status = 'empty'
              next()
              return
            }
            if (page === 0 && res.data.results.length < this.perPage) {
              this.result = res.data.results
              next('complete')
              return
            }
            if (res.data.results.length < this.perPage) {
              this.result = this.result.concat(res.data.results)
              next('complete')
            } else {
              this.result = this.result.concat(res.data.results)
              next('+1')
            }
          }).catch(() => {
            this.status = 'error'
            next()
          })
        } else if (this.$route.query.type === 'health') {
          this.$tkParse.get('/classes/article', {
            params: {
              where: {
                'type': 'health'
              },
              skip: this.result.length,
              limit: this.perPage,
              order: '-createdAt'
            }
          }).then((res) => {
            if (page === 0 && res.data.results.length === 0) {
              this.status = 'empty'
              next()
              return
            }
            if (page === 0 && res.data.results.length < this.perPage) {
              this.result = res.data.results
              next('complete')
              return
            }
            if (res.data.results.length < this.perPage) {
              this.result = this.result.concat(res.data.results)
              next('complete')
            } else {
              this.result = this.result.concat(res.data.results)
              next('+1')
            }
          }).catch(() => {
            this.status = 'error'
            next()
          })
        }
      },
      goMessage (id) {
        this.$push({path: '/article/articleContent', query: {'id': id}})
      },
      refresh () {
        this.status = false
        this.ajax()
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "../../assets/scss/main.scss";
.articleImg{
  background-size: cover;
}
.interval{
  margin:10px 0 12px 0;
}
.secondFont{
  color:$secondary-font-color;
}
.f18{
  font-size:$title-font-size;
}
.f14{
  font-size:$font-size;
}
.icon{
  width:10px;
  height:18px;
}
</style>
