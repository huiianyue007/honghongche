import config from './default'
let args = process.env.args ? process.env.args : {}
if (typeof args === 'string') {
  args = JSON.parse(args)
}
let customConfig = args.config ? require('./' + args.config).default : {}
export default Object.assign({}, config, customConfig, args)
