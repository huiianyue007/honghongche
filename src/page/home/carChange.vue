<template>
  <tk-container class="container" disableScroll>
    <tkui-header center slot="header">
      <tkui-button class="icon small" slot="left-menu" @click.native="$back">
        <tk-icon>return_a</tk-icon>
      </tkui-button>
      {{$route.query.type === 'number' ? '车牌号' : $route.query.type === 'type' ? '车型' : '行驶区域'}}
      <tkui-button slot="right-menu" class="icon small" @click.native="change">确认</tkui-button>
    </tkui-header>
    <tkui-input ref="carNum" v-model="textInput" v-if="$route.query.type === 'number'" class="border" rulers="plateNumber"></tkui-input>
    <tkui-list-select type="radio" v-model="textInput2" :items="items" v-if="$route.query.type === 'type'" border></tkui-list-select>
  </tk-container>
</template>
<script>
export default {
  data () {
    return {
      textInput: this.$store.state.carInfo.number,
      textInput2: this.$store.state.carInfo.type,
      region: '',
      regionFilter: {
        root: '130000'
      },
      items: {
        'SUV': 'SUV',
        '普通五座车': '普通五座车',
        '7座面包车': '7座面包车'
      }
    }
  },
  computed: {
    carInfo () {
      return this.$store.state.carInfo
    }
  },
  methods: {
    change () {
      if (this.$route.query.type === 'number') {
        if (this.textInput === '') {
          this.$tkGlobal.toast.add('内容不能为空')
          return false
        }
        this.$tkParse.put(`/classes/car/${this.$route.query.id}`, {
          number: this.textInput
        }).then((res) => {
          this.$store.commit('putCarInfo', {number: this.textInput})
          this.$tkGlobal.toast.add('车牌号修改成功')
          this.$back()
        })
      } else if (this.$route.query.type === 'type') {
        this.$tkParse.put(`/classes/car/${this.$route.query.id}`, {
          type: this.textInput2
        }).then((res) => {
          this.$store.commit('putCarInfo', {type: this.textInput2})
          this.$tkGlobal.toast.add('车型修改成功')
          this.$back()
        })
      }
    }
  },
  activated () {
    if (this.$route.query.type === 'number') {
      this.$refs.carNum.focus()
    }
  }
}
</script>
<style lang="scss" scoped>
.borderTransparent{
  border: transparent;
}
.w100{
  width: 100% !important;
  border: none;
}
</style>
