import moment from 'moment'
import 'moment/locale/zh-cn'

const diffForHumans = (data, format = 'YYYYMMDD H:mm:ss') => {
  moment.locale('zh-cn')
  return moment(data, format).fromNow()
}

export default {
  diffForHumans
}
