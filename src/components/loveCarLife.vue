<template>
  <tk-container class="container tkui">
    <div class="box">
      <tk-flex  class="menu" wrap>
        <div class="tk-grid-4 bBR" @click="go('/mall', 'mall')">
          <tk-box ratio="25:22" class="tkBox">
            <div  class="menuImg img1 w32h32"  ></div>
            积分商城
          </tk-box>
        </div>
        <div class="tk-grid-4 bBR" @click="go('/article/article', 'health')">
          <tk-box ratio="25:22" class="tkBox">
            <div  class="menuImg  img2 w32h32" ></div>
            健康知识
          </tk-box>
        </div>
        <div class="tk-grid-4" style="border-bottom: 1px solid #D7DEE3;" @click="go('/article/article', 'car')">
          <tk-box ratio="25:22" class="tkBox " >
            <div  class="menuImg img3 w46h32" ></div>
            汽车养护
          </tk-box>
        </div>
        <div class="tk-grid-4" style="border-right:1px solid #D7DEE3;" @click="goMap">
          <tk-box ratio="25:22" class="tkBox" >
            <div  class="menuImg  img4 w43h36" ></div>
            聚优惠
          </tk-box>
        </div>
        <!--<div class="tk-grid-4" @click="go('/error/carInsuranceCheap', 'unfinished')">-->
          <!--<tk-box ratio="25:22" class="tkBox">-->
            <!--<div  class="menuImg img5 w32h32" ></div>-->
            <!--车险优惠-->
          <!--</tk-box>-->
        <!--</div>-->
      </tk-flex>
    </div>
  </tk-container>
</template>
<script>
  export default {
    data () {
      return {
        id: null,
        f: null,
        url: '',
        color: 'rgba(0, 0, 0, .4)'
      }
    },
    methods: {
      go (url, type) {
        this.$push({path: url, query: {'type': type}})
      },
      goMap () {
        this.$push('/home/map')
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/main.scss";
  .box{
    padding-top:20px;
  }
  .menu{
    .tkBox{
      width: 100%;
      background: $table-background-color;
      text-align: center;
      font-size: 14px;
      .menuImg{
        margin: 25% auto 14px;
      }
      .img1{
        background: url("../assets/img/shop.png");
        background-size: cover;
      }
      .img2{
        background: url("../assets/img/heart.png");
        background-size: cover;
      }
      .img3{
        background: url("../assets/img/car.png");
        background-size: cover;
      }
      .img4{
        background: url("../assets/img/Discount.png");
        background-size: cover;
      }
      .img5{
        background: url("../assets/img/wallet.png");
        background-size: cover;
      }
    }
  }
  .bBR{
    border-bottom:1px solid #D7DEE3;
    border-right:1px solid #D7DEE3;
  }
  .w32h32{
    width: 32px;
    height:32px;
  }
  .w43h36{
    width: 43px;
    height:36px;
  }
  .w46h32{
    width:46px;
    height:32px;
  }
  .con_con{
    background-color:#fff;
    width:290px;
    min-height:140px;
    border-radius: 9px;
    postion:relative;
    .icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #dae4e9;
    }
    .message{
      flex:1;
      margin-top:29px;
      width:100%;
      text-align:center;
      padding-bottom: 15px;
      .title {
        font-size: 18px;
        font-weight: bold;
        line-height: 1.11;
        text-align: center;
        color: #333;
      }
      .desc{
        font-size: 16px;
        width:210px;
        line-height: 1.64;
        text-align: center;
        color:#6d8796;
        margin:10px auto;
      }
    }
    .footer{
      postion:absolute;
      bottom:0;
      left:0;
      text-align:center;
      width:100%;
      border-top: 1px solid #f5f5f5;
      .button{
        line-height:47px;
        color: #666;
        &.active{
          color:#09bb07;
        }
        &.submit{
          border-left: 1px solid #f5f5f5;
        }
      }
    }
  }
</style>
