<template>
  <div class="container">
    <tk-flex column class="body-box">
      <tk-box ratio="16:9" class="banner"></tk-box>
      <tk-flex class="content" column>
        <p>关于YOYO爱车</p>
        <span style="padding-bottom: 20px;">YOYO爱车 — 您开车、我加油。YOYO爱车是一款专门为私家车车主提供资源共享服务的手机软件，通过手机软件车主们可以在日常的驾驶行程中，顺便赚一些油费贴补一下您的爱车；同时也可以享受到完全免费或超低折扣的洗车、保养等其他服务。
          <br>微信搜索公众号“YOYO爱车俱乐部”，关注我们。</span>
        <tk-box ratio="16:9" class="image"></tk-box>
        <p>联系我们</p>
        <span>客户服务中心：400-606-0062</span>
        <span>微信服务号：YOYO爱车俱乐部</span>
        <span>客服邮箱：kefu@honghongche.com</span>
        <span>市场合作：marketing@honghongche.com</span>
        <span class="bottom">公司地址：朝阳区驼房营南路8号 新华科技大厦A座1319室</span>
      </tk-flex>
    </tk-flex>
  </div>
</template>
<style lang="scss" scoped>
  @import '../assets/scss/main';
  .container {
    height:100%;
    .body-box {
      .banner {
        background-image: url("../assets/img/mobilebanner.png");
        background-size: cover;
      }
      .content {
        padding:0 15px;
        .image {
          background-image: url("../assets/img/mobileimg5.png");
          background-size: cover;
        }
        p {
          color: #09BA07;
          font-size: 18px;
          padding:15px 0;
        }
        span {
          color: #082307;
          font-size: 14px;
          line-height: 25px;
        }
        .bottom {
          padding-bottom: 20px;
        }
      }
    }
  }
</style>
