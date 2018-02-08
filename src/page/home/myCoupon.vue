<template>
  <tk-container class="container tkui" infiniteScroll @loadingMore="ajax" :status="status" @refresh="refresh">
    <tkui-header center slot="header">
      <tkui-button class="icon small" slot="left-menu" @click.native = '$back'>
        <tk-icon>return_a</tk-icon>
      </tkui-button>
      我的卡券
    </tkui-header>
    <tk-flex column class="body-box" v-if="result">
      <tk-flex column class="couponList" v-for="(item, index) in result" :key="index" @click.native="goDetail(item.objectId)">
        <tk-box v-if="item.source === 'exchange' && item.coupon" class="couponItem" :style = "item.status === 'ready'? {backgroundImage: `url(${ exchangeBeforeWash })`}: {backgroundImage: `url(${ afterWash })`}">
          <tk-flex column between class="itemContent" :class = '[item.status === "ready" ? "exchangeFont" : "used"]'>
            <p>{{item.coupon.type}} （兑）</p>
            <tk-flex bottom class="middleScore">
              <div>{{item.coupon.score}}<span>分</span></div>
            </tk-flex>
            <span class="bottom self-bottom">兑换码：{{item.status === 'ready' ? item.code  : item.status === 'used' ? '已使用' : '已过期'}}</span>
          </tk-flex>
        </tk-box>
        <tk-box v-if="item.source === 'buy' && item.coupon" class="couponItem" :style = "item.status === 'ready'? {backgroundImage: `url(${ buyBeforeWash })`}: {backgroundImage: `url(${ afterWash })`}">
          <tk-flex column between class="itemContent" :class = '[item.status === "ready" ? "buyFont" : "used"]'>
            <p >{{item.coupon.type}} （购）</p>
            <tk-flex bottom class="middleScore">
              <div>{{item.coupon.score}}<span>分</span></div>
            </tk-flex>
            <span class="bottom self-bottom">兑换码：{{item.status === 'ready' ? item.code  : item.status === 'used' ? '已使用' : '已过期'}}</span>
          </tk-flex>
        </tk-box>
      </tk-flex>
    </tk-flex>
  </tk-container>
</template>
<script>
  import buyBeforeWash from '../../assets/img/coupons3.png'
  import exchangeBeforeWash from '../../assets/img/coupons2.png'
  import afterWash from '../../assets/img/coupons4.png'
  export default {
    data () {
      return {
        result: [],
        status: false,
        perPage: 20,
        createTime: null,
        exchangeBeforeWash: exchangeBeforeWash,
        afterWash: afterWash,
        buyBeforeWash: buyBeforeWash
      }
    },
    filters: {
      splitTime (opt) {
        return opt.split('T')[0]
      }
    },
    methods: {
      ajax: function (page = 0, next = () => {}) {
        // 什么叫分页？
        this.$tkParse.get('/classes/couponCode', {
          params: {
            skip: this.result.length,
            limit: this.perPage,
            order: '-createdAt',
            where: {
              user: this.$store.state.userId
            },
            include: 'coupon,user'
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
            next('complete')
            this.result = this.result.concat(res.data.results)
          } else {
            this.result = this.result.concat(res.data.results)
            next('+1')
          }
        }).catch(() => {
          this.status = 'error'
        })
      },
      goDetail (id) {
        this.$push({path: '/message/coupondetail', query: {'id': id}})
      },
      refresh () {
        this.status = false
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/main.scss";
  .container {
    .body-box {
      width:100%;
      padding: 15px 15px 0;
      .couponList {
        .couponItem{
          background-size:cover;
          position: relative;
          height: 155px;
          margin-bottom: 15px;
          .itemContent {
            border-radius: 5px;
            padding: 15px;
            font-size: 20px;
            margin-bottom: 5px;
            .middleScore {
              div {
                font-size: 50px;
                span{
                  font-size: 18px;
                  position: relative;
                  top: -2px;
                  left: 5px;
                }
              }
            }
            .bottom {
              font-size: 16px;
              color: #233038;
              margin-top: 15px;
            }
          }
        }
      }
    }
  }
  .exchangeFont{
    color: #0085AB;
  }
  .buyFont{
    color: $primary-color;
  }
  .used {
    color: #999999;
  }
</style>
