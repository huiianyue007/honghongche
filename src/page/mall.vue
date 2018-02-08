<template>
  <tk-container class="container tkui" :status="status" @refresh="refresh">
    <tkui-header center slot="header">
      <tkui-button slot="left-menu" class="icon" @click.native="$back">
        <tk-icon >return_a</tk-icon>
      </tkui-button>
      积分商城
    </tkui-header>
    <tk-flex style="padding:10px 15px;background: white;" middle center>
      <div class="userImg" v-if="userInfo.avatar" :style = "{backgroundImage: `url(${userInfo.avatar})`}" ></div>
      <div class="userImg"  v-else :style = "{backgroundImage: `url(${image})`}" ></div>
      <div style="margin-left: 15px;font-size: 16px;" class="fill">
        {{ userInfo.phone }}
        <div style="font-size: 12px;">{{ carInfo.number }}</div>
      </div>
      <tk-flex>
        <div style="font-size: 18px;">积分：{{ userInfo.score ? userInfo.score : 0 }}</div>
      </tk-flex>
    </tk-flex>
    <tk-flex wrap  class="exchange">
      <div class="exchangeArea">
        <tkui-button slot="left-menu" class="icon">
          <tk-icon style="color: #09bb07;">recommend</tk-icon>
        </tkui-button>
        兑换专区
      </div>
      <tk-flex wrap class="nine" style="width: 100%;">
        <div class="tk-grid-4 couponBox" v-for="(item, index) in result" @click="go(item.objectId)">
          <tk-flex column center>
            <tk-flex column class="couponInner">
              <tk-flex column class="couponImg">
                <div class="f31">{{ item.score }}</div>
                <tk-flex right class="f11">{{ item.type }}</tk-flex>
              </tk-flex>
              <div class="money">{{ item.score }}分</div>
              <div class="coupon">{{ item.type }}</div>
              <div class="pointExchange"><span>{{ item.score }}</span>积分兑换</div>
            </tk-flex>
          </tk-flex>
        </div>
      </tk-flex>
    </tk-flex>
  </tk-container>
</template>
<script>
  export default {
    data () {
      return {
        result: null,
        result2: null,
        name: 'zyz',
        status: false,
        image: 'http://osmnxqxc2.bkt.clouddn.com/9971f09d-ed6b-4181-bfdb-95caae0730ae.png'
      }
    },
    activated () {
      if (!this.result) {
        this.getData()
      }
    },
    computed: {
      carInfo () {
        return this.$store.state.carInfo
      },
      userInfo () {
        return this.$store.state.userInfo
      }
    },
    methods: {
      go (id) {
        this.$push({path: '/goodsDetail', query: {'id': id}})
      },
      getData () {
        this.status = 'loading'
        this.$tkParse.get('/classes/coupon', {
          params: {
            where: {
              shop: {
                $exists: false
              }
            }
          }
        }).then((res) => {
          this.result = res.data.results
          console.log(this.result)
          this.status = false
        }).catch(() => {
          this.status = 'error'
        })
      },
      refresh () {
        this.status = false
        this.getData()
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "../assets/scss/main.scss";
.container{
  .nine{
    margin-top:1px;
    .tk-grid-4{
    }
    .couponBox{
      border-bottom:1px solid #DAE4E9;
      border-right:1px solid #DAE4E9;
      background: white;
      padding: 15px;
      &:nth-child(3n+0){
        .couponInner {
          border-right: 0;
        }
      }
      .couponInner{
        .couponImg{
          width:90px;
          padding: 5px;
          background: url("../assets/img/coupons1.png");
          background-size: cover;
          div{
            color:white;
          }
        }
        .money{
          font-size:18px;
          margin-top:10px;
        }
        .coupon{
          font-size:14px;
          color:$secondary-font-color;
        }
        .pointExchange{
          font-size:16px;
          span{
            color: $primary-color;
            font-size: 16px;
          }
        }
      }
    }
  }
}
.userImg{
  width: 59px;
  height: 59px;
  background-size:cover;
}
.exchange{
  margin-top: 15px;
  .exchangeArea{
    width: 100%;
    background: white;
    height: 45px;
    color: #09bb07;
    font-size:16px;
  }
}
.borderBR{
  border-bottom:1px solid #dae4e9;
  border-right:1px solid #dae4e9;
}
.borderB{
  border-bottom:1px solid #dae4e9;
}
.borderBL{
  border-bottom:1px solid #dae4e9;
  border-left:1px solid #dae4e9;
}
.f31{
  font-size: 31px;
}
</style>
