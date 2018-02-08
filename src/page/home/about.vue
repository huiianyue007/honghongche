<template>
  <tk-container class="container">
    <tkui-header center slot="header">
      <tkui-button class="icon small" slot="left-menu" @click.native = '$back()'>
        <tk-icon>return_a</tk-icon>
      </tkui-button>
      关于我们
    </tkui-header>
    <tk-flex column class="container-box">
      <tk-flex column class="body-box fill">
        <tk-flex column center>
          <tk-box class="logo" ratio="4:1"></tk-box>
          <tk-flex column class="middle">
            <p style="font-weight: 600;margin-bottom: 10px">关于我们</p>
            <span style="text-indent:2em;">
              <strong>YOYO爱车 — 您开车、我加油。</strong>
              YOYO爱车是一款专门为私家车车主提供资源
              共享服务的手机软件，通过手机软件小呦车主们可以
              在日常的驾驶行程中，顺便赚一些油费贴补一下您的爱车；同
              时也可以享受到完全免费或超低折扣的洗车、保养等其他服务。
              微信搜索公众号“呦呦爱车”，关注我们。
            </span>
          </tk-flex>
        </tk-flex>
        <tk-flex column class="info">
          <p style="font-weight: 600;margin-bottom: 10px">联系我们</p>
          <p>微信服务号：YOYO爱车俱乐部</p>
          <p>客服：kefu@yoyoaiche.com</p>
          <p>市场合作：marketing@yoyoaiche.com</p>
          <p>公司：石家庄市蓝拓商务中心2511</p>
        </tk-flex>
      </tk-flex>
      <tk-flex column center class="bottom">
        <span>Copyright©2017-2037</span>
        <span>河北若风科技有限责任公司</span>
      </tk-flex>
    </tk-flex>
  </tk-container>
</template>
<style lang="scss" scoped>
  .container {
    background-color: white;
    .container-box {
      min-height: 100%;
      .bottom {
        margin-bottom: 30px;
        color: #8297A4;
        font-size: 12px;
        line-height: 30px;
      }
    }
    .body-box {
      font-size:16px;
      padding:36px 15px 0;
      .logo{
        background: url("../../assets/img/logo.png");
        background-size: cover;
        width: 165px;
        height: 44px;
      }
    }
    .middle {
      margin-top: 60px;
      span {
        padding-bottom: 15px;
        line-height: 25px;
      }
    }
    .info {
      padding-top:30px;
      line-height: 25px;
      span {
        padding-bottom: 15px;
      }
    }
  }
</style>
