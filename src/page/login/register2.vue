<template>
  <tk-container class="container" disableScroll>
    <tkui-header center slot="header">
      <tkui-button class="icon small" slot="left-menu" @click.native = '$back'>
        <tk-icon>return_a</tk-icon>
      </tkui-button>
      请填写车辆信息
    </tkui-header>
    <div class="body">
      <tkui-input type="text" v-model="plateNumber" rulers="plateNumber" class="shuru" placeHolder="请输入车牌号">
        <tk-icon slot="before">plate</tk-icon>
      </tkui-input>
      <tkui-input wrapLabel label="车型" type="radio" v-model="Models" :items="items"></tkui-input>
      <tkui-list class="big">
        <tkui-list-picker class="divider" v-model="region" type="region" label="日常行驶区域" :regionFilter="regionFilter" emptyMessage="选择一个城市"></tkui-list-picker>
      </tkui-list>
      <div class="interval">
        <tkui-button class="block raised btn" :class = '[verify ? "primary" : "disable"]' @click.native="register">提交</tkui-button>
      </div>
    </div>
  </tk-container>
</template>
<script>
  export default {
    data () {
      return {
        check: true,
        plateNumber: '',
        Models: '',
        region: '',
        regionFilter: {
          root: '130000'
        },
        items: {
          'suv': 'SUV',
          '5seat': '普通五座车',
          '7seat': '7座面包车'
        }
      }
    },
    computed: {
      verify () {
        return this.plateNumber && this.check && this.region
      }
    },
    methods: {
      register () {
        if (!this.verify) {
          return false
        }
        this.$tkParse.post('/classes/car', {
          'drivingArea': this.region,
          'type': this.Models,
          'number': this.plateNumber,
          'user': this.$store.state.userId
        }).then((response) => {
          if (!response.data.error) {
            this.$tkParse.get(`/classes/car/${response.data.objectId}`).then((res) => {
              this.$store.commit('setCarInfo', res.data)
              this.$tkGlobal.toast.add('车辆信息已保存')
              this.$replace('/')
            }).catch((err) => {
              console.log(err)
            })
            this.$store.commit('setCarId', response.data.objectId)
          } else {
            this.$replace('/login')
          }
        }).catch(() => {
        })
      }
    }
  }
</script>

<style scoped lang="scss" >
  @import '../../assets/scss/main';
  .container{
    background: white;
  }
  .body {
    margin-top: 20px;
    .inputBtn {
      border-bottom: 1px solid #dae4e9;
      height: 50px;
      margin-bottom: 20px;
      .icon{
        margin-right: 15px;
      }
      .shuru {
        width:100%;
      }
    }
    .layout{
      margin: 25px 0;
      .layout_title{
        font-size: 16px;
        color: #233038;
        font-weight: 600;
        height:30px;
        line-height:30px;
        margin-bottom: 10px;
      }
      .layout-body {
        height: 40px;
        label{
          text-align: center;
          input{
            margin-right: 10px;
          }
        }
        select{
          margin:0 10px;
          padding: $gutter-min;
          outline:none;
          border:1px solid $border-color;
        }
      }
    }
    .btn{
      margin:46px 0 15px;
    }
  }
  .interval{
    padding:0 15px;
  }
</style>
