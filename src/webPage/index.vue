<template>
  <component :is="name"></component>
</template>

<script>
  import pc from './pcAboutUs.vue'
  import mobile from './mobile.vue'
  export default {
    data () {
      return {
        name: 'pc'
      }
    },
    created: function () {
      this.name = this.$tkUa.isDeskTop ? 'pc' : 'mobile'
    },
    metaInfo: {
      title: 'YOYO爱车广告服务app'
    },
    components: {
      pc,
      mobile
    }
  }
</script>
