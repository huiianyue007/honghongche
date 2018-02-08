<template>
  <tk-container class="container tkui" :status="status" @refresh="init" ref="scrollViewContainer">
    <tkui-header center slot="header">
      <tkui-button class="icon small" slot="left-menu" @click.native = '$back'>
        <tk-icon>return_a</tk-icon>
      </tkui-button>
      <span v-if="result">{{result.type | messageType}}<span v-if="userTask">({{userTask.status | taskStatus}})</span></span>
    </tkui-header>
    <div class="body" v-if="result">
      <tk-box ratio="15:8" :style="banner"></tk-box>
      <tk-flex column v-if="result.type === 'task'" class="body-box">
        <tk-flex column class="top">
          <tk-flex column center>
            <span class="littleTitle">{{result.title}}</span>
          </tk-flex>
          <span class="people">招募{{result.recruitNumber}}人(已报名{{result.currentRecruitNumber}}人)</span>
        </tk-flex>
        <tk-flex class="time" column middle>
          <p v-if="result.taskBeginDate && result.taskEndDate">任务时间:<span>{{result.taskBeginDate | date}} 至 {{result.taskEndDate | date}}</span></p>
        </tk-flex>
        <tk-flex class="time" column middle>
          <p v-if="result.enrollBeginDate && result.enrollEndDate">报名时间:<span>{{result.enrollBeginDate | date}} 至 {{result.enrollEndDate | date}}</span></p>
        </tk-flex>
        <tk-flex column class="detail">
          <span class="detailTitle">任务详情</span>
          <div class="detailBody" v-html="result.body"></div>
        </tk-flex>
        <div class="imgBox" v-if="needSubmitPhoto || hasPhoto" id="image">
          <tk-loading :complete = 'complete' type="pulse" height="200px">
            <tk-flex class="upload" @click.native="getImage" center middle>
              <tk-box style="width: 100%;background-size: cover" v-if="imgUrl" ratio="16:9" :style = "{backgroundImage: `url(${imgUrl ? imgUrl: ''})`}">
              </tk-box>
              <tk-flex v-else middle center column>
                <tk-icon :style="{color:'#6d8796'}">camera</tk-icon>
                <span>点击拍摄照片</span>
              </tk-flex>
            </tk-flex>
          </tk-loading>
          <p class="date" v-if="result.taskEndDate">*需要您在{{result.taskEndDate | date}}后拍摄有广告的车身上传</p>
        </div>
      </tk-flex>
      <tk-flex column v-if="result.type === 'info'" class="infoBox">
        <span class="infoTitle">{{result.title}}</span>
        <span class="infoTime">{{result.createdAt | date}}</span>
        <div class="infoBody" v-html="result.body"></div>
      </tk-flex>
    </div>
    <tk-flex class="gutter" slot="footer" v-if="(needSubmitPhoto || acceptTask) && result.type === 'task'">
      <tkui-button class="block raised" v-if="needSubmitPhoto" @click.native="submitPhoto" :class = '[userTask.status === "completed" ? "disable" : "primary"]'>{{userTask.status === 'completed' ? '已提交': '提交'}}</tkui-button>
      <tkui-button class="block primary raised" v-if="acceptTask" @click.native="accept">接受任务</tkui-button>
    </tk-flex>
  </tk-container>
</template>
<script>
  export default {
    data () {
      return {
        result: null,
        userTask: null,
        coupon: null,
        id: null,
        gentry: null,
        imgUrl: null,
        imageInfo: null,
        image: {
          result: false,
          mas: '',
          data: null
        },
        status: false,
        type: 'image',
        from: 'camera',
        file: null,
        complete: true,
        allUserTask: null
      }
    },
    computed: {
      storeMessage () {
        return this.$store.state.message.find(item => item.id === this.$route.query.id)
      },
      banner () {
        return {
          'background-image': 'url(' + this.result.banner + ')',
          'background-size': 'cover'
        }
      },
      needSubmitPhoto () {
        return this.userTask && (this.userTask.status === 'started' || this.userTask.status === 'uploadedPhoto') && this.result && this.result.taskEndDate && new Date().getTime() > new Date(this.result.taskEndDate).getTime()
      },
      hasPhoto () {
        return this.userTask && this.userTask.photo
      },
      acceptTask () {
        return !this.userTask &&  // 没有接受该任务的纪录
          this.result && // 已获取到任务内容
          this.result.recruitNumber > this.result.currentRecruitNumber && // 仍有名额
          new Date().getTime() < new Date(this.result.enrollEndDate).getTime() &&  // 当前时间小于报名截止时间
          new Date().getTime() > new Date(this.result.enrollBeginDate).getTime()   // 当前时间大于报名起始时间
      }
    },
    activated () {
      if (this.storeMessage) {
        this.result = this.storeMessage
      }
      this.init()
    },
    methods: {
      async init () {
        try {
          await this.getMessage()
          if (this.result.type === 'task') {
            await this.getTask()
            await this.getAllTask()
          }
          this.status = false
        } catch (e) {
          this.status = 'error'
        }
      },
      async getMessage () {
        if (!this.result) {
          this.status = 'loading'
          let res = await this.$tkParse.get(`/classes/message/${this.$route.query.id}`)
          this.result = res.data
        }
      },
      async getAllTask () {
        this.status = 'loading'
        let res = await this.$tkParse.get('/classes/userTask', {
          params: {
            include: 'message,user',
            where: {
              user: this.$store.state.userId,
              status: {
                $in: ['started', 'uploadedPhoto']
              }
            }
          }
        })
        if (res.data.results[0]) {
          this.allUserTask = res.data.results[0]
        }
      },
      async getTask () {
        this.status = 'loading'
        let res = await this.$tkParse.get('/classes/userTask', {
          params: {
            'include': 'message,user',
            where: {
              user: this.$store.state.userId,
              message: this.$route.query.id,
              status: {
                $nin: ['cancel']
              }
            }
          }
        })
        if (res.data.results[0]) {
          this.userTask = res.data.results[0]
          this.imgUrl = this.userTask.photo
        }
      },
      async accept () {
        if (this.allUserTask) {
          this.$tkGlobal.toast.add('已有任务,不可重复接受')
          return
        }
        let num = this.result.currentRecruitNumber + 1
        await this.$tkParse.put(`/classes/message/${this.result.objectId}`, {
          currentRecruitNumber: num
        }).catch(() => {})
        this.$tkParse.post('/classes/userTask', {
          status: 'started',
          message: this.result.objectId,
          user: this.$store.state.userId
        }).then((res) => {
          this.$set(this.result, 'status', 'started')
          this.$tkGlobal.toast.add('报名成功')
          this.init()
        }).catch(() => {
          this.$tkGlobal.toast.add('报名失败，请稍后重试')
        })
      },
      submitPhoto () {
        if (!this.imgUrl) {
          this.$tkGlobal.toast.add('请上传照片')
          return
        }
        this.$tkParse.put(`/classes/userTask/${this.userTask.objectId}`, {
          photo: this.imgUrl,
          status: 'uploadedPhoto'
        }).then((res) => {
          this.$tkGlobal.toast.add('提交成功,等待审核')
          this.init()
        })
      },
      getImage () {
        this.$tkFile.pick({
          type: this.type,
          from: this.from
        }).then(file => {
          this.complete = false
          this.$tkParse.post('/files', file.buffer)
          .then((res) => {
            this.complete = true
            this.imgUrl = res.data.url
          }).catch(e => {
            this.complete = true
            this.status = 'error'
          })
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/main.scss";
  .container {
    .body{
      width: 100%;
    }
    .body-box {
      .top {
        background-color: white;
        padding: 0 15px 0;
        margin-bottom: 10px;
        .littleTitle {
          padding: 20px 0 15px;
          font-size: 18px;
          font-weight: 600;
        }
        .coupon {
          color: #ff5858;
          font-size: 16px;
          padding-bottom: 15px;
        }
        .people {
          padding-bottom: 15px;
          font-size: 14px;
        }
      }
      .time {
        height: 45px;
        padding:0 15px;
        font-size: 14px;
        background-color: white;
        margin-bottom: 1px;
      }
      .detail {
        margin-top: 10px;
        background-color: white;
        padding:15px 15px 30px;
        border-bottom:1px solid #dae4e9;
        margin-bottom: 15px;
        .detailTitle {
          font-size: 16px;
          padding-bottom: 15px;
        }
        .detailBody {
          color:$secondary-font-color;
          img {
            max-width: 100%;
          }
        }
      }
      .imgBox {
        background: white;
        padding:10px 15px 0;
        margin-bottom: 10px;
        .upload {
          height: 200px;
          background-color: #dae4e9;
        }
      }
      .date {
        color: #ff5858;
        font-size: 10px;
        padding-top: 10px;
        padding-bottom: 35px;
      }
      .photo {
        height: 200px;
      }
    }
    .infoBox {
      background-color: white;
      padding:0 15px 20px;
      .infoTitle {
        text-align: center;
        font-size: 18px;
        padding-top: 20px;
        font-weight:600;
      }
      .infoTime {
        font-size: 14px;
        padding-top: 15px;
        font-weight:600;
      }
      .infoBody {
        padding-top: 15px;
        color:$secondary-font-color;
        img {
          max-width: 100%;
        }
      }
    }
    .gutter {
      background-color: white;
      padding: 10px 15px;
    }
  }
</style>
