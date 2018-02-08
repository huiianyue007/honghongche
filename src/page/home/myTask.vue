<template>
  <tk-container class="container tkui" :status="status" @refresh="refresh" :infiniteScroll="infiniteScroll" @loadingMore="ajax">
    <tkui-header center slot="header">
      <tkui-button class="icon small" slot="left-menu" @click.native = '$back'>
        <tk-icon>return_a</tk-icon>
      </tkui-button>
      我的任务
    </tkui-header>
    <div class="box" v-if="result">
      <tk-flex class="body-box" v-for="(item, index) in result" :key="index" @click.native="go(item.message.objectId, item.message.type)">
        <div class="task"></div>
        <tk-flex column class="right">
          <div class="listTitle">{{ item.message.title }}</div>
          <div class="listBody interval">{{ item.message.body | word}}</div>
          <tk-flex between middle style="font-size: 12px; color:#6d8796;">
            <div class="listRecruitNumber">{{item.status | taskStatus}}</div>
            <tk-flex middle>
              <tk-icon  class="listIcon">time</tk-icon>
              <span v-if="item.message.createdAt">{{item.message.createdAt | date}}</span>
            </tk-flex>
          </tk-flex>
        </tk-flex>
      </tk-flex>
    </div>
  </tk-container>
</template>
<script>
  import S from 'string'
  export default {
    data () {
      return {
        result: [],
        status: false,
        perPage: 20,
        infiniteScroll: true
      }
    },
    filters: {
      word (opt) {
        return S(opt).decodeHTMLEntities().humanize().stripTags().left(45).s
      },
      splitTime (value) {
        return value.split('T')[0]
      }
    },
    methods: {
      ajax: function (page = 0, next = () => {}) {
        this.$tkParse.get('/classes/userTask', {
          params: {
            skip: this.result.length,
            limit: this.perPage,
            order: '-createdAt',
            where: {
              user: this.$store.state.userId
            },
            include: 'message,user'
          }
        }).then((res) => {
          console.log(res)
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
            this.infiniteScroll = false
          } else {
            this.result = this.result.concat(res.data.results)
            next('+1')
          }
        }).catch(() => {
          this.status = 'error'
        })
      },
      go (opt) {
        this.$push({path: '/message/detail', query: {'id': opt}})
      },
      refresh () {
        this.status = false
        this.ajax()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .box{
    padding:20px 15px;
    background: #EFF3F6;
    .body-box{
      background: white;
      border-radius: 10px;
      margin-bottom:15px;
      .right {
        width:100%;
        padding: 16px 0;
        padding-right: 15px;
        padding-left: 20px;
        .interval {
          padding: 9px 0;
        }
        .listTitle{
          font-size:16px;
        }
        .listBody{
          font-size:12px;
          color:#6d8796;
        }
        .listRecruitNumber{
          color:#ff5858;
        }
        .listIcon{
          width: 13px;
          height: 13px;
          margin-right: 5px;
        }
      }
    }
    .task{
      width:10px;
      height:90px;
      background:-webkit-radial-gradient(10px 110px,#fc7d9a 50%,#fcc9bd 100%);
      border-radius:0px 11px 11px 0px/0px 45px 45px 0px;
      margin-top:10px;
    }
  }
</style>
