const config = {
  vuexStorageKeys: [
    'sessionToken',
    'userId'
  ],
  initPlugins: [
    'init',
    'vuexStorage',
    'userInit',
    'routeAuth'
  ],
  cloudUrl: process.env.cloudUrl ? process.env.cloudUrl : 'http://localhost:13133',
  env: 'app',
  version: '1.0.0',
  appId: 'wxfa9820f30c9821cb',
  merchants: '1490215842',
  key: 'gaoyang130636198405258312ruofeng',
  beeCloudId: 'fe9d9e5d-ddec-4880-9efe-f7790171460d',
  beeCloudSecret: '6c6beee6-58cb-462f-b276-cf6a04dac9d1',
  IOSDownloadUrl: '',
  androidDownloadUrl: 'http://osmnxqxc2.bkt.clouddn.com/8bf5cd6e-2636-48d1-a86f-69b2ca412fb4.apk'
}

export default config
