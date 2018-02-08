<template>
  <tk-container class="container tkui"  infiniteScroll @loadingMore="ajax" @refresh="refresh" :status="status">
    <div class="box">
      <tk-flex class="body-box" v-for="(item, index) in message" :key="index" >
        <div class="full itemContent" v-if="item.type === 'coupon'" @click="goMessage(item)">
          <div :class="item.type"></div>
          <tk-flex column class="right">
            <div class="listTitle">{{item.type | messageType}} - {{ item.coupon.type }}</div>
            <div class="listBody interval">{{ item.coupon.body | word}}</div>
            <tk-flex style="font-size: 12px; color:#6d8796;">
              <tk-icon  class="listIcon" >time</tk-icon>
              <span class="listTime" >{{item.createdAt | date}}</span>
            </tk-flex>
          </tk-flex>
        </div>
        <div class="full itemContent" v-if="item.type === 'info'" @click="goMessage(item)">
          <div :class="item.type"></div>
          <tk-flex column class="right">
            <div class="listTitle">{{item.type | messageType}} - {{ item.title }}</div>
            <div class="listBody interval">{{ item.body | word }}</div>
            <tk-flex style="font-size: 12px; color:#6d8796;">
              <tk-icon  class="listIcon" >time</tk-icon>
              <span class="listTime" >{{item.createdAt | date}}</span>
            </tk-flex>
          </tk-flex>
        </div>
        <div class="full itemContent" v-if="item.type === 'task'" @click="goMessage(item)">
          <div :class="item.type"></div>
          <tk-flex column class="right">
            <div class="listTitle">{{item.type | messageType}} - {{ item.title }}</div>
            <div class="listBody interval">{{ item.body | word}}</div>
            <tk-flex between style="font-size: 12px; color:#6d8796;">
              <div class="listRecruitNumber">招募{{ item.recruitNumber | number}}人&emsp;(已报名{{ item.currentRecruitNumber | number}}人)</div>
              <div>
                <tk-icon  class="listIcon">time</tk-icon>
                <span class="listTime" v-if="item.createdAt">{{item.createdAt | date}}</span>
              </div>
            </tk-flex>
          </tk-flex>
        </div>
      </tk-flex>
    </div>
  </tk-container>
</template>
<script>
  import S from 'string'
  export default {
    data () {
      return {
        status: false,
        perPage: 20
      }
    },
    filters: {
      word (opt) {
        return S(opt).decodeHTMLEntities().humanize().stripTags().left(45).s
      }
    },
    computed: {
      message () {
        return this.$store.state.message
      }
    },
    methods: {
      refresh () {
        this.status = false
      },
      goMessage (item) {
        let name = item.type === 'coupon' ? 'couponDetail' : 'messageDetail'
        let id = item.type === 'coupon' ? item.couponCode.objectId : item.objectId
        this.$push({name: name, query: {'id': id}})
      },
      ajax: function (page = 0, next = () => {}) {
        this.$tkParse.get('/classes/message', {
          params: {
            include: 'coupon,couponCode',
            skip: this.message.length,
            limit: this.perPage,
            order: '-createdAt'
          }
        }).then((res) => {
          if (page === 0 && res.data.results.length === 0 && !this.message) {
            this.status = 'empty'
            next()
          }
          if (res.data.results.length < this.perPage) {
            for (let i = 0; i < res.data.results.length; i++) {
              if (res.data.results[i].pushType === 'specific') {
                if (!res.data.results[i].pushUser) res.data.results.splice(i, 1)
                if (res.data.results[i].pushUser && (res.data.results[i].pushUser.indexOf(this.$store.state.userId) === -1)) {
                  res.data.results.splice(i, 1)
                }
              }
            }
            this.$store.commit('addMessage', res.data.results)
            next('complete')
          } else {
            for (let i = 0; i < res.data.results.length; i++) {
              if (res.data.results[i].pushType === 'specific') {
                if (!res.data.results[i].pushUser) res.data.results.splice(i, 1)
                if (res.data.results[i].pushUser && (res.data.results[i].pushUser.indexOf(this.$store.state.userId) === -1)) {
                  res.data.results.splice(i, 1)
                }
              }
            }
            this.$store.commit('addMessage', res.data.results)
            next('+1')
          }
        }).catch(() => {
          this.status = 'error'
          next()
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/main.scss";
  .box{
    padding:20px 15px;
    .body-box{
      background: white;
      border-radius: 10px;
      margin-bottom:15px;
      .right {
        padding: 16px 16px 16px;
        .interval {
          padding: 4px 0;
        }
        .listTitle{
          font-size:16px;
        }
        .listBody{
          line-height: 1.5;
          font-size:12px;
          color:$secondary-font-color;
          text-overflow: ellipsis;
        }
        .listRecruitNumber{
          color:#ff5858;
        }
        .listIcon{
          width: 13px;
          height: 13px;
          margin-right:5px;
        }
        .listTime{
          color:$secondary-font-color;
        }
      }
    }
    .task{
      width:10px;
      height:90px;
      border-radius:0px 11px 11px 0px/0px 45px 45px 0px;
      background:-webkit-radial-gradient(10px 110px,#fc7d9a 50%,#fcc9bd 100%);
      margin-top:10px;
      float: left;
    }
    .info{
      width:10px;
      height:90px;
      border-radius:0px 11px 11px 0px/0px 45px 45px 0px;
      background:-webkit-radial-gradient(10px 110px,#1dc6e7 50%,#1de8b7 100%);
      margin-top:10px;
      float: left;
    }
    .coupon {
      width:10px;
      height:90px;
      border-radius:0px 11px 11px 0px/0px 45px 45px 0px;
      background:-webkit-radial-gradient(10px 110px,#f3e4a9 50%,#fef463  100%);
      margin-top:10px;
      float: left;
    }
  }
</style>
