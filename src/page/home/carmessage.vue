<template>
  <tk-container class="container tkui" disableScroll :status="status" @refresh="refresh">
    <tkui-header center slot="header">
      <tkui-button class="icon small" slot="left-menu" @click.native = '$back'>
        <tk-icon>return_a</tk-icon>
      </tkui-button>
      车辆信息
    </tkui-header>
    <tkui-list v-if="carInfo">
      <tkui-list-item class="border" @click.native="go(carInfo.objectId, 'number')">车牌号<span slot="right">{{ carInfo.number }}</span></tkui-list-item>
      <tkui-list-item class="border" @click.native="go(carInfo.objectId, 'type')">车型<span slot="right">{{ carInfo.type }}</span></tkui-list-item>
      <tkui-list-picker ref="city" v-model="region" type="region" label="城市" :regionFilter="regionFilter" emptyMessage="选择一个城市" @selected="selected"></tkui-list-picker>
    </tkui-list>
  </tk-container>
</template>
<script>
  export default {
    data () {
      return {
        result: null,
        status: false,
        area: '',
        region: this.$store.state.carInfo.drivingArea,
        regionFilter: {
          root: '130000'
        },
        id: null
      }
    },
    computed: {
      carInfo () {
        return this.$store.state.carInfo
      }
    },
    methods: {
      go (id, type) {
        this.$push({path: '/carChange', query: {'id': id, 'type': type}})
      },
      refresh () {
        this.status = false
      },
      selected () {
        this.$tkParse.put(`/classes/car/${this.carInfo.objectId}`, {
          drivingArea: this.region
        }).then((res) => {
          this.$store.commit('putCarInfo', {drivingArea: this.region})
          this.$tkGlobal.toast.add('行驶日程区域修改成功')
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    .body-box {
      .item {
        padding:0 15px;
        background-color: white;
        height: 50px;
        border-bottom: 1px solid #dae4e9;
      }
    }
  }
</style>
