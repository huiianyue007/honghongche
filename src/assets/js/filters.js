import moment from 'moment'
export function messageType (type) {
  let types = {
    task: '任务',
    coupon: '卡券',
    info: '消息',
    default: '消息'
  }
  return types[type] || types.default
}

export function taskStatus (status) {
  let statusList = {
    registered: '已申请',
    started: '进行中',
    uploadedPhoto: '照片审核中',
    completed: '已完成',
    cancel: '已取消',
    default: '已关闭'
  }
  return statusList[status] || statusList.default
}

export function couponType (status) {
  let statusList = {
    ready: '未使用',
    used: '已使用',
    expired: '已过期',
    default: '未使用'
  }
  return statusList[status] || statusList.default
}

export function number (num) {
  return num || 0
}

export function Date (date) {
  return moment(date).format('YYYY-MM-DD')
}
