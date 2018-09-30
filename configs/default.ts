
export default {
  port: process.env.PORT || 3000,
  mongodb: {
    url: 'mongodb://wsq:wsq321@ds115762.mlab.com:15762/club'
  },
  $app: {
    "tabs": ["全部", "问答", "分享", "吐槽", "招聘"]
  }
}