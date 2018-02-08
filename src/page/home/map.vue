<template>
  <tk-container class="container" disableScroll>
    <tkui-header center slot="header">
      <tkui-button slot="left-menu" class="icon" @click.native="$back">
        <tk-icon >return_a</tk-icon>
      </tkui-button>
      聚优惠
    </tkui-header>
    <div id="container"></div>
    <tk-cover slot="body-cover" :color = 'color' :show="showShop" :hideOnClick = 'false' center bottom transition through>
      <tk-flex  middle bottom class="pay" column v-if="shopInfo">
        <p class="f1">{{shopInfo.name}}</p>
        <p class="f2 interval">{{shopInfo.address}}</p>
        <tk-flex style="padding: 20px 0;" v-if="page">
          <tk-flex>
            <tk-box ratio="4:3" class="img">
              <tk-flex column class="imgContent">
                <p class="f35">{{page.score}}<span class="f">分</span></p>
                <tk-flex right class="f14">{{page.shop.type === 'carWash' ? '洗车券' : '加油券'}}</tk-flex>
              </tk-flex>
            </tk-box>
            <div style="padding-left:10px;" class="self-bottom">
              <p class="f1">{{page.score}}分{{page.shop.type === 'carWash' ? '洗车券' : '加油券'}}<img src="../../assets/img/iscount.png" alt="" style="height: 15px;width: 15px;margin-left: 7px;"></p>
              <p style="font-size: 23px;color: #E73A1D;margin-top: 10px;">￥{{page.salePrice}}元</p>
            </div>
          </tk-flex>
        </tk-flex>
        <tk-flex v-else class="notHaveCoupon">
          <tk-flex>
            <tk-box class="notCoupon">
             <tk-icon class="notCouponIcon">volume2</tk-icon>
            </tk-box>
            <div style="padding-left: 9px;">
              <p class="f1">此店铺暂无优惠信息</p>
              <p class="f2" style="padding-top: 16px;">请查看其他店铺</p>
            </div>
          </tk-flex>
        </tk-flex>
        <tkui-button v-if="page" class="block raised primary" @click.native="buy">立即购买</tkui-button>
      </tk-flex>
    </tk-cover>
    <tkui-dialog :show.sync="succeedBool" center slot="cover">
      <tk-flex middle column center>
        <tk-flex middle center class="icon1">
          <tk-icon :style="{color:'#09bb07'}">recommend</tk-icon>
        </tk-flex>
        <div class="desc">支付成功</div>
        <div style="color: #6d8796;">请在我的-卡券中心查看</div>
      </tk-flex>
    </tkui-dialog>
  </tk-container>
</template>
<script>
  export default {
    data () {
      return {
        map: null,
        center: null,
        showShop: false,
        color: 'rgba(0, 0, 0, 0)',
        result: null,
        scaleControl: null,
        centerPositionLat: 38.043224,
        centerPositionLon: 114.511828,
        markers: [],
        markers2: [],
        shopInfo: null,
        page: null,
        current: null,
        wid: null,
        timestamp: null,
        paySrc: null,
        urlData: null,
        orderInfo: null,
        timer: null,
        positionInitFailed: false,
        idle: true,
        waitIdleTimeId: null,
        succeedBool: false
      }
    },
    activated () {
      this.getCenterPositon()
    },
    deactivated () {
      if (window.plus) {
        window.plus.geolocation.clearWatch(this.wid)
        this.wid = null
      }
    },
    methods: {
      getData () {
        let self = this
        this.$tkParse.get('/classes/shop').then(res => {
          this.result = res.data.results
          for (let i = 0; i < this.result.length; i++) {
            if (self.result[i].type === 'GAS') {
              let latLng = new window.qq.maps.LatLng(this.result[i].geoPointer.latitude, this.result[i].geoPointer.longitude)
              let iconBeforeGas = new window.qq.maps.MarkerImage('http://osmnxqxc2.bkt.clouddn.com/a5ba3b0c-30cd-4ecd-a0ab-aa13e7bc881e.png')
              let marker = new window.qq.maps.Marker({
                position: latLng,
                map: this.map
              })
              marker.setIcon(iconBeforeGas)
              window.qq.maps.event.addListener(marker, 'click', function () {
                self.idle = false
                clearTimeout(self.waitIdleTimeId)
                self.$tkParse.get('/classes/shop', {
                  params: {
                    where: {
                      objectId: self.result[i].objectId
                    }
                  }
                }).then((res) => {
                  self.shopInfo = res.data.results[0]
                }).catch(() => {
                  self.shopInfo = null
                  self.$tkGlobal.toast.add('获取数据失败')
                })
                self.$tkParse.get('/classes/coupon', {
                  params: {
                    include: 'shop',
                    where: {
                      'shop': self.result[i].objectId
                    }
                  }
                }).then(res => {
                  self.page = res.data.results[0]
                }).catch(() => {
                  self.page = null
                  self.$tkGlobal.toast.add('获取数据失败')
                })
                for (let j = 0; j < self.markers.length; j++) {
                  self.markers[j].setIcon(iconBeforeGas)
                }
                for (let j = 0; j < self.markers2.length; j++) {
                  self.markers2[j].setIcon(new window.qq.maps.MarkerImage('http://osmnxqxc2.bkt.clouddn.com/1e2ec443-59b1-4304-9b44-953be85a9355.png'))
                }
                self.showShop = true
                let iconAfterGas = new window.qq.maps.MarkerImage('http://osmnxqxc2.bkt.clouddn.com/93044dfc-a636-4810-9700-f38a4723c5e6.png')
                marker.setIcon(iconAfterGas)
              })
              this.markers.push(marker)
            } else if (self.result[i].type === 'carWash') {
              let latLng = new window.qq.maps.LatLng(this.result[i].geoPointer.latitude, this.result[i].geoPointer.longitude)
              let iconBeforeCar = new window.qq.maps.MarkerImage('http://osmnxqxc2.bkt.clouddn.com/1e2ec443-59b1-4304-9b44-953be85a9355.png')
              let marker2 = new window.qq.maps.Marker({
                position: latLng,
                map: this.map
              })
              marker2.setIcon(iconBeforeCar)
              window.qq.maps.event.addListener(marker2, 'click', function () {
                self.idle = false
                clearTimeout(self.waitIdleTimeId)
                self.$tkParse.get('/classes/shop', {
                  params: {
                    where: {
                      objectId: self.result[i].objectId
                    }
                  }
                }).then((res) => {
                  self.shopInfo = res.data.results[0]
                }).catch(() => {
                  self.shopInfo = null
                  self.$tkGlobal.toast.add('获取数据失败')
                })
                self.$tkParse.get('/classes/coupon', {
                  params: {
                    include: 'shop',
                    where: {
                      'shop': self.result[i].objectId
                    }
                  }
                }).then(res => {
                  self.page = res.data.results[0]
                }).catch(() => {
                  self.page = null
                  self.$tkGlobal.toast.add('获取数据失败')
                })
                for (let j = 0; j < self.markers.length; j++) {
                  self.markers[j].setIcon(new window.qq.maps.MarkerImage('http://osmnxqxc2.bkt.clouddn.com/a5ba3b0c-30cd-4ecd-a0ab-aa13e7bc881e.png'))
                }
                for (let j = 0; j < self.markers2.length; j++) {
                  self.markers2[j].setIcon(iconBeforeCar)
                }
                self.showShop = true
                let iconAfterCar = new window.qq.maps.MarkerImage('http://osmnxqxc2.bkt.clouddn.com/be51d5dc-e9a9-49e8-92ac-f9cc5fbc904e.png')
                marker2.setIcon(iconAfterCar)
              })
              this.markers2.push(marker2)
            }
          }
        })
      },
      getCenterPositon () {
        this.init()
        this.getData()
        if (!this.map) return
        this.wid = window.plus.geolocation.watchPosition((a) => {
          let latlng = new window.qq.maps.LatLng(a.coords.latitude, a.coords.longitude)
          if (this.positionMarker) {
            this.positionMarker.setPosition(latlng)
            if (this.idle) {
              this.map.panTo(latlng)
            }
          } else {
            this.positionMarker = new window.qq.maps.Marker({
              position: latlng,
              map: this.map
            })
            this.map.panTo(latlng)
          }
        }, (e) => {
          if (!this.positionMarker && !this.positionInitFailed) {
            this.$tkGlobal.toast.add('获取定位信息失败')
            this.positionInitFailed = true
          }
        })
      },
      init () {
        let self = this
        this.map = new window.qq.maps.Map(document.getElementById('container'), {
          center: new window.qq.maps.LatLng(self.centerPositionLat, self.centerPositionLon),      // 地图的中心地理坐标。
          zoom: 15,
          zoomControl: true,       // 缩放控件的初始启用/停用状态。
          scaleControl: true
        })
        this.scaleControl = new window.qq.maps.ScaleControl({
          align: window.qq.maps.ALIGN.BOTTOM_LEFT,
          margin: window.qq.maps.Size(85, 15),
          map: this.map
        })
        window.qq.maps.event.addListener(this.map, 'click', function () {
          self.showShop = false
          self.page = null
          self.waitIdleTimeId = setTimeout(() => {
            this.idle = true
          }, 3000)
          for (let j = 0; j < self.markers.length; j++) {
            self.markers[j].setIcon(new window.qq.maps.MarkerImage('http://osmnxqxc2.bkt.clouddn.com/a5ba3b0c-30cd-4ecd-a0ab-aa13e7bc881e.png'))
          }
          for (let j = 0; j < self.markers2.length; j++) {
            self.markers2[j].setIcon(new window.qq.maps.MarkerImage('http://osmnxqxc2.bkt.clouddn.com/1e2ec443-59b1-4304-9b44-953be85a9355.png'))
          }
        })
        window.qq.maps.event.addListener(this.map, 'idle', () => {
          this.waitIdleTimeId = setTimeout(() => {
            this.idle = true
          }, 3000)
        })
        window.qq.maps.event.addListener(this.map, 'bounds_changed', () => {
          this.idle = false
          clearTimeout(this.waitIdleTimeId)
        })
      },
      plusReady () {
        let self = this
        window.plus.payment.getChannels(function (channels) {
          for (let i in channels) {
            let channel = channels[i]
            if (channel.id === 'wxpay') {
              self.pay(channel)
            }
          }
        }, function (e) {
          self.$tkGlobal.toast.add('获取支付通道失败：' + e.message)
        })
      },
      pay (channel) {
        this.$tkGlobal.toast.add('微信支付启动中')
        let self = this
        this.$cloudAjax.post('/index/createOrder', {
          channel: 'WX_APP',
          couponId: self.page.objectId
        }).then((res) => {
          let resultData = res.data
          window.plus.payment.request(channel, resultData.order, function (response) {
            self.$cloudAjax.post('/index/orderSuccess', {
              'orderId': resultData.orderId,
              'userId': self.$store.state.userId,
              'couponId': self.page.objectId,
              'para': resultData.urlData
            }).then(response => {
              self.$tkGlobal.toast.add('支付成功,请在我的卡券中查看')
            }).catch(() => {
              self.$tkGlobal.toast.add('出现异常，如果您没有获取到卡券请联系客服')
            })
          }, function (e) {
            self.$tkGlobal.toast.add('支付失败')
          })
        })
      },
      buy () {
        if (window.plus) {
          this.plusReady()
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../assets/scss/main";
  .icon1 {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #dae4e9;
  }
  .pay{
    width: 100%;
    min-height: 258px;
    padding: 20px 15px;
    background: white;
  }
  .img{
    background: url("../../assets/img/coupons1.png");
    background-size: cover;
    width: 120px;
    height: 75px;
    .imgContent{
      padding: 6px 9px;
    }
  }
  .f{
    padding-left: 5px;
    font-size: 12px;
    color:$header-color;
  }
  .f35{
    font-size:35px;
    color:$header-color;
  }
  .f14{
    font-size:14px;
    color:$header-color;
  }
  .f1{
    color: #2E3A5A;
    font-size: 18px;
  }
  .f2{
    color: #6D8796;
    font-size: 14px;
  }
  .f3{
    color: #6D8796;
    font-size: 12px;
  }
  .interval{
    padding:9px 0 20px;
    border-bottom: 1px solid #DAE4E9;
  }
  #container{
    width: 100%;
    height: 100%;
  }
  .notHaveCoupon{
    padding: 31px 0;
  }
  .notCoupon{
    width: 80px;
    height: 57px;
  }
  .notCouponIcon{
    width: 80px;
    height: 57px;
    color: $secondary-font-color;
  }
</style>
