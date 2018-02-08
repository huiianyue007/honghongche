<template>
  <div class="container">
    <tk-box class="bg">
    </tk-box>
    <tk-flex class="body">
      <div class="tk-grid-4" >
        <div class="bodyAboutUs">关于我们</div>
        <div class="contactUs">联系我们</div>
      </div>
      <div class="tk-grid-10" >
        <strong>关于YOYO爱车</strong>
        <p style="font-size: 20px; padding: 29px 0 39px;">YOYO爱车 — 您开车、我加油。YOYO爱车是一款专门为私家车车主提供资源共享服务的手机软件，通过手机软件车主们可以在日常的驾驶行程中，顺便赚一些油费贴补一下您的爱车；同时也可以享受到完全免费或超低折扣的洗车、保养等其他服务。
          <br>微信搜索公众号“YOYO爱车俱乐部”，关注我们。
        </p>
        <tk-box class="green"></tk-box>
        <p style="margin: 48px 0 29px; font-size: 28px;color: #09BA07;">联系我们</p>
        <div class="message">
          <p>客户服务中心：400-606-0062 <span style="float: right;">微信服务号：YOYO爱车俱乐部</span></p>
          <p> 客服邮箱：kefu@honghongche.com</p>
          <p>市场合作：marketing@honghongche.com</p>
          <p>公司地址：朝阳区驼房营南路8号 新华科技大厦A座1319室</p>
        </div>
      </div>
    </tk-flex>
  </div>
</template>

<script></script>

<style scoped lang="scss" rel="stylesheet/scss">
.bg{
  background: url("../assets/img/banner.png");
  background-size: cover;
  height: 480px;
  width: 100%;
}
.body{
  padding: 50px 360px 86px;
}
.green{
  height: 480px;
  width: 100%;
  background: url("../assets/img/img5 (1).png");
  background-size: cover;
}
.message{
  width: 669px;
  font-size: 20px;
  p{
    padding-top: 10px;
  }
}

.bodyAboutUs{
  width: 220px;
  height:76px;
  color:white;
  background-color: #09BA07;
  text-align: center;
  line-height: 76px;
  font-size: 24px;
}
.contactUs{
  width: 220px;
  height:76px;
  text-align: center;
  line-height: 76px;
  border:1px solid #EBEBEB;
  font-size: 24px;
}
strong{
  font-size: 28px;
  color: #09BA07;
}
</style>
