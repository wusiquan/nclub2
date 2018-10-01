
export default {
  port: process.env.PORT || 3000,
  mongodb: {
    url: 'mongodb://wsq:wsq321@ds115762.mlab.com:15762/club'
  },
  redis: {
    host: 'redis-16420.c15.us-east-1-2.ec2.cloud.redislabs.com',
    port: 16420,
    password: '24yI12cNDD7oHgQ7d0vnQYZtvRU7YkpU'
  },
  $app: {
    "name": "Node.js-club2",
    "description": "一个分享与发现的地方",
    "tabs": ["全部", "问答", "分享", "吐槽", "招聘"]
  }
}