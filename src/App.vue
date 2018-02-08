<template>
  <div id="app">
    <transition
      v-on:before-enter="$tkHistory.beforeEnter"
      v-on:before-leave="$tkHistory.beforeLeave"
      v-on:enter="$tkHistory.enter"
      v-on:leave="$tkHistory.leave"
      v-bind:css="false">
      <tk-history>
        <router-view></router-view>
      </tk-history>
    </transition>
    <tk-global :components="components"></tk-global>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      components: [{
        name: 'toast',
        component: 'tk-toast'
      }]
    }
  }
}
</script>

<style>
#app {
  height: 100vh;
}
</style>
