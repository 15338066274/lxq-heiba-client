// 开发环境
const dev = {
	productName: '阆上', // 产品名称
	companyName: '阆上', // 公司名称
	productVersion: 'V1.0.0', // 产品版本号
	baseUrl: "https://api-dev.langup.cn/api/UploadCOS",
	ossUrl: 'https://langshangcos-1301624890.cos.ap-nanjing.myqcloud.com/',
	password: '46f94c8de14fb36680850768ff1b7f2a',
	domain: 'api-dev.langup.cn'
}
// 生产环境
const prod = {
	productName: '阆上', // 产品名称
	companyName: '阆上', // 公司名称
	productVersion: 'V1.0.0', // 产品版本号
  baseUrl: "https://api.langup.cn/api/UploadCOS",
	ossUrl: 'https://langshangcos-1301624890.cos.ap-nanjing.myqcloud.com/',
	password: 'acc191e9d2b4e6a0edaa7f196360e25b',
	domain: 'api.langup.cn'
};

//默认生产环境
let config = dev;
if (process.env.NODE_ENV == "development") {
  config = dev;
} else {
  config = prod;
}

//微信小程序，app的打包方式建议为生产环境，所以这块直接条件编译赋值
// #ifdef MP-WEIXIN || APP-PLUS
config = dev;
// #endif

export default config;