 <template>
  <tk-container class="container tkui" :status="status" @refresh="refresh">
    <tkui-header center slot="header">
      <tkui-button class="icon" slot="left-menu" @click.native="$back">
        <tk-icon>return_a</tk-icon>
      </tkui-button>
      商品详情
    </tkui-header>
    <div v-if="result">
      <tk-flex column style="padding-top: 10px;" >
        <div class="tk-grid-10 tk-grid-offset-1">
          <tk-box ratio="16:9" class="img">
            <tk-flex wrap>
              <div class="f105">{{ result.score }}<span class="f30">分</span></div>
              <div class="f36">{{ result.type }}</div>
            </tk-flex>
          </tk-box>
        </div>
        <div class="tk-grid-12 intervalPadding listBg">
          <div class="interval">
            <div class="f16">商品介绍</div>
            <div class="f14 p10">.{{ result.score }}分{{ result.type }}*1张</div>
          </div>
          <div class="interval">
            <div class="f16">使用说明</div>
            <div class="f14 p10" v-html="result.body"></div>
          </div>
          <div class="interval">
            <div class="f16">温情提示</div>
            <div class="f14 p10">.卡券最终解释权归“YOYO爱车”所有</div>
          </div>
        </div>
      </tk-flex>
    </div>
    <tkui-dialog :show.sync="bool" center class="dialog1" slot="cover">
      <tk-flex middle column center>
        <tk-flex middle center class="icon1">
          <tk-icon :style="{color:'#09bb07'}">integral</tk-icon>
        </tk-flex>
        <div class="desc">确认兑换吗?</div>
      </tk-flex>
      <template slot="action">
        <button class="tkui-dialog-button" @click="hidden">取消</button>
        <button class="tkui-dialog-button primary" @click="submit">确定</button>
      </template>
    </tkui-dialog>
    <tkui-dialog :show.sync="succeedBool" center slot="cover">
      <tk-flex middle column center>
        <tk-flex middle center class="icon1">
          <tk-icon :style="{color:'#09bb07'}">recommend</tk-icon>
        </tk-flex>
        <div class="desc">兑换成功</div>
        <div style="color: #6d8796;">请在我的-卡券中心查看</div>
      </tk-flex>
    </tkui-dialog>
    <tk-flex class="box" average middle slot="footer" v-if="result">
      <div class="f16">单价：<span class="blue">{{result.score}}</span>积分</div>
      <tk-flex right>
        <tkui-button class="raised primary" @click.native="exchange">兑换</tkui-button>
      </tk-flex>
    </tk-flex>
  </tk-container>
</template>
<script>
  export default {
    data () {
      return {
        result: null,
        bool: false,
        couponScore: null,
        color: 'rgba(0, 0, 0, .1)',
        succeedBool: false,
        status: false
      }
    },
    activated () {
      if (!this.result) {
        this.getData()
      }
    },
    methods: {
      exchange () {
        this.bool = true
      },
      getData () {
        this.$tkParse.get(`/classes/coupon/${this.$route.query.id}`).then((res) => {
          this.result = res.data
          this.couponScore = res.data.score
        }).catch(() => {
          this.status = 'error'
        })
      },
      hidden () {
        this.bool = false
      },
      refresh () {
        this.status = false
        this.getData()
      },
      async submit () {
        let res = await this.$tkParse.get(`/users/me`)
        let userScore = res.data.score ? parseInt(res.data.score) : 0
        let couponScore = this.couponScore * 1
        if (userScore < couponScore) {
          this.$tkGlobal.toast.add('您的分值不足以兑换该卡券')
          return
        }
        this.$cloudAjax.post('/index/exchangeCoupon', {
          couponId: this.$route.query.id
        }).then((res) => {
          this.bool = false
          this.succeedBool = true
          // 获取最新的积分
          this.$tkParse.get(`/users/me`).then((response) => {
            this.$store.commit('setUserInfo', response.data)
          }).catch(e => {
            // 获取失败，前端临时处理积分
            let userInfo = this.$store.state.userInfo
            userInfo.score = userScore - couponScore
            this.$store.commit('setUserInfo', userInfo)
          })
        }).catch((e) => {
          this.$tkGlobal.toast.add(e.data)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/main.scss";
  .container {
    .icon1 {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #dae4e9;
    }
    .desc{
      font-size: 16px;
      width:210px;
      line-height: 1.64;
      text-align: center;
      color: #8f8f8f;
    }
  }
  .img{
    background: url("../assets/img/coupons1.png");
    background-size: cover;
    padding: 20px 25px 15px;
  }
  .box{
    padding:9px 0 9px 15px;
    background: $list-background-color;
    margin-top:10px;
    .blue{
      color:$primary-color;
    }
  }
  .intervalPadding{
    padding:15px;
    .interval{
      padding-top: 25px;
      .f16{
        font-size:16px;
      }
      .f14{
        font-size:14px;
        color:$secondary-font-color;
      }
      .p10{
        padding-top: 10px;
      }
    }

  }
  .listBg{
    background: $list-background-color;
    margin-top:10px;
    min-height: 334px;
  }

  .f30{
    font-size:50px;
    color:$header-color;
    /*margin:10px 0 0 35px;*/
  }
  .f105{
    font-size:105px;
    color:$header-color;
  }
  .f36{
    font-size:36px;
    color:$header-color;
    margin-left:160px;
  }
</style>
