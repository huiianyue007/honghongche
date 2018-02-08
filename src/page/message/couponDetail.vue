<template>
  <tk-container class="container" :status="status" @refresh="refresh">
    <tkui-header center slot="header">
      <tkui-button class="icon" slot="left-menu" @click.native="$back">
        <tk-icon>return_a</tk-icon>
      </tkui-button>
      商品详情
    </tkui-header>
    <tk-flex column center class="body-box" v-if="result">
      <div class="tk-grid-12" style="background:#F1F5F8;padding-bottom: 11px; ">
        <div class="tk-grid-10" style="padding-top: 10px;margin:0 auto;">
          <tk-box ratio="16:9" class="img">
            <tk-flex wrap>
              <div class="f50">￥</div>
              <div class="f100 tk-grid-7">{{result.coupon.score}}</div>
              <div class="f36">{{result.status | couponType}}</div>
            </tk-flex>
          </tk-box>
        </div>
      </div>
      <tk-flex column class="body-bottom">
        <span class="code">{{result.status === 'ready' ? '兑换码：' + result.code  : '兑换码：已使用'}}</span>
        <div class="gutter">
          <tkui-button :class = '[result.status === "ready" ? "primary" : "disable"]' class="block raised" @click.native = 'showCover'>{{result.status === 'ready' ? '确认使用' : '已使用'}}</tkui-button>
        </div>
        <span class="prompting">*请展示给店员确认消费,自己确认优惠券无效</span>
        <div class="tk-grid-12 rule">
          <div class="interval">
            <span>商品介绍</span>
            <p class="interval2">.{{ result.coupon.score }}分{{ result.coupon.type }}*1张</p>
          </div>
          <div class="interval">
            <span>使用说明</span>
            <p class="interval2" v-html="result.coupon.body"></p>
          </div>
          <div class="interval">
            <span>温情提示</span>
            <p class="interval2">.兑换后请到指定店铺出示卡券使用</p>
            <p>.以工作人员实际反馈为准</p>
          </div>
        </div>
      </tk-flex>
    </tk-flex>
    <tkui-dialog :show.sync="bool" center class="dialog1" slot="cover">
      <tk-flex middle column center>
        <tk-flex middle center class="icon1">
          <tk-icon :style="{color:'#09bb07'}">recommend</tk-icon>
        </tk-flex>
        <div class="desc">确认使用吗?</div>
      </tk-flex>
      <template slot="action">
        <button class="tkui-dialog-button" @click="hidden">取消</button>
        <button class="tkui-dialog-button primary" @click="exchange">确定</button>
      </template>
    </tkui-dialog>
  </tk-container>
</template>
<script>
  export default {
    data () {
      return {
        result: null,
        status: false,
        bool: false
      }
    },
    activated () {
      if (!this.result) {
        this.getData()
      }
    },
    computed: {
      couponStatus () {
        return this.result.status !== 'ready'
      }
    },
    methods: {
      showCover () {
        this.bool = true
      },
      hidden () {
        this.bool = false
      },
      exchange () {
        this.$cloudAjax.post('/index/useCoupon', {
          'code': this.result.code,
          'id': this.result.objectId
        }).then(() => {
          this.bool = false
          this.getData()
        }).catch(() => {
          this.status = 'error'
        })
      },
      refresh () {
        this.getData()
      },
      getData () {
        this.status = 'loading'
        this.$tkParse.get(`/classes/couponCode/${this.$route.query.id}`, {
          params: {
            include: 'coupon,user'
          }
        }).then((res) => {
          this.result = res.data
          this.status = false
        }).catch(() => {
          this.status = 'error'
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/main.scss";
  .container {
    .icon1 {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #dae4e9;
    }
    .body-box {
      .img{
        background: url("../../assets/img/coupons1.png");
        background-size: cover;
      }
      .f50{
        font-size:50px;
        color:$header-color;
        margin:10px 0 0 35px;
      }
      .f100{
        font-size:100px;
        color:$header-color;
      }
      .f36{
        font-size:36px;
        color:$header-color;
        margin-left:160px;
      }
    }
    .body-bottom {
      width:100%;
      padding:0 15px;
      .code {
        text-align: center;
        padding-top: 35px;
        font-size: 20px;
      }
      .gutter {
        margin-top: 25px;
      }
      .prompting {
        color: #e73a1d;
        font-size: 12px;
      }
      .rule {
        padding: 25px 0 75px;
        span{
          color: #233038;
          font-size: 16px;
        }
        p{
          color: #6D8796;
          font-size: 14px;
          /*padding-top: 10px;*/
        }
      }
    }
  }
  .interval{
    padding-top: 20px;
  }
  .interval2{
    padding-top: 10px;
  }
</style>
