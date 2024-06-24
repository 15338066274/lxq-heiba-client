const timestamp = (parseInt(Date.now() / 1000)).toString()
const token = 'e744c8afe557f806f5bde804f5d716d4';

/**
 * showdoc
 * @catalog  公共功能·工具·请求http
 * @title 请求http
 * @description 请求http
 * @url  utils/tools/req
 * @param url:接口域名，param:传参数，method:访问方式get，post  
 */
const req = (url = '', param = {}, method = "POST") => {
	param.timestamp = timestamp
	param.openid = uni.getStorageSync('openid')
	let userInfo = uni.getStorageSync('userInfo')
	if(!param.phone){
		param.phone = typeof userInfo.phone != 'undefined' ? userInfo.phone : ''
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			data: param,
			header: {
				'content-type': 'application/json; charset=UTF-8',
				'token': token ? token : ''
			},
			method,
			success(res) {
				resolve(res.data)
			},
			fail(res) {
				reject(res)
			}
		})
	})
}

const getQueryString = (url, name)=> {
  var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
  var r = url.substr(1).match(reg)
  if (r != null) {
    console.log("r = " + r)
    console.log("r[2] = " + r[2])
    return r[2]
  }
  return '';
}


/**
 * showdoc
 * @catalog  公共功能·工具·微信登录
 * @title 微信登录
 * @description 微信登录
 * @url  utils/tools/login
 * @param opt:login,phone,all 
 */
const login = (opt = 'login', type = 'click') => {
	return new Promise((resolve, reject) => {
		if (type == 'show') {
			let noLogin = uni.getStorageSync('noLogin')
			if (noLogin) {
				resolve()
				return;
			};
		}
		let userInfo = uni.getStorageSync('userInfo')
		switch (opt) {
			case 'login':
				if (!userInfo) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
				break
			case 'phone':
				if (typeof userInfo.phone == 'undefined' || !userInfo.phone) {
					uni.navigateTo({
						url: '/pages/login/login?opt=phone'
					})
				}
				break
			case 'all':
				if (!userInfo) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				} else {
					if (typeof userInfo.phone == 'undefined' || !userInfo.phone) {
						uni.navigateTo({
							url: '/pages/login/login?opt=phone'
						})
					}
				}
				break
		}
		resolve()
	})
}



/**
 * showdoc
 * @catalog  公共功能·工具·乘法
 * @title 乘法
 * @description 乘法
 * @url  utils/tools/mul
 * @param num1,num2 
 */
const mul = (num1, num2) => {
	var r1, r2, m, n;
	try {
		r1 = num1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = num2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2));
	n = (r1 >= r2) ? r1 : r2;
	return (((num1 * m) * (num2 * m)) / (m * m)).toFixed(n);
}
/**
 * showdoc
 * @catalog  公共功能·工具·加法
 * @title 加法
 * @description 加法
 * @url  utils/tools/add
 * @param num1,num2 
 */
const add = (num1, num2) => {
	var r1, r2, m, n;
	try {
		r1 = num1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = num2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2));
	n = (r1 >= r2) ? r1 : r2;
	return ((num1 * m + num2 * m) / m).toFixed(n);
}
/**
 * showdoc
 * @catalog  公共功能·工具·减法
 * @title 减法
 * @description 减法
 * @url  utils/tools/sub
 * @param num1,num2 
 */
const sub = (num1, num2) => {
	var r1, r2, m, n;
	try {
		r1 = num1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = num2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	n = (r1 >= r2) ? r1 : r2;
	m = Math.pow(10, Math.max(r1, r2));
	return ((num1 * m - num2 * m) / m).toFixed(n);
}
/**
 * showdoc
 * @catalog  公共功能·工具·除法
 * @title 除法
 * @description 除法
 * @url  utils/tools/div
 * @param num1,num2 
 */
const div = (num1, num2) => {
	var r1 = 0,
		r2 = 0,
		m, n;
	try {
		r1 = num1.toString().split(".")[1].length
	} catch (e) {}
	try {
		r2 = num2.toString().split(".")[1].length
	} catch (e) {}

	m = Number(num1.toString().replace(".", ""));

	n = Number(num2.toString().replace(".", ""));
	return (m / n) * Math.pow(10, r2 - r1);
}
/**
 * showdoc
 * @catalog  公共功能·工具·格式化时间
 * @title 格式化时间
 * @description 格式化时间
 * @url  utils/tools/formatTime
 * @param timestamp:时间戳,type:返回类型:all:2020-01-01 10:10:10,date:2020-01-01,time:10:10,date&time:01-01 10:10
 */
const formatTime = (timestamp = '', type = 'all') => {
	console.log(timestamp)
	timestamp = timestamp>9999999999?timestamp:(timestamp * 1000)
	let date = timestamp ? new Date(timestamp) : new Date()
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()
	switch (type) {
		case 'all':
			return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber)
				.join(':')
			break
		case 'date':
			return [year, month, day].map(formatNumber).join('-')
			break
		case 'time':
			return [hour, minute].map(formatNumber).join(':')
			break
		case 'date&time':
			return [month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
			break
	}
}
const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}
/**
 * showdoc
 * @catalog  公共功能·工具·格式化价格
 * @title 格式化价格
 * @description 格式化价格
 * @url  utils/tools/formatPrice
 * @param price
 * @return  10.00
 */
const formatPrice = (price) => {
	price = price || 0
	price = parseFloat(price);
	return price.toFixed(1);
}
/**
 * showdoc
 * @catalog  公共功能·工具·隐藏手机
 * @title 隐藏手机
 * @description 隐藏手机
 * @url  utils/tools/hidePhone
 * @param phone
 * @return  135****5544
 */
const hidePhone = (phone) => {
	if (!phone) return ''
	let reg = /^(\d{3})\d{4}(\d{4})$/;
	phone = phone.toString()
	return phone.replace(reg, "$1****$2")
}


/**
 * showdoc
 * @catalog  公共功能·工具·检测图片协议，主要用于检测海报图片协议
 * @title 检测图片协议，主要用于检测海报图片协议
 * @description 检测图片协议，主要用于检测海报图片协议
 * @url  utils/tools/hidePhone
 * @param imgPath图片地址
 * @return  newPath
 */
const checkImgHttp = (imgPath) => {
	let newPath = '';
	let pathArr = imgPath.split('://');
	// #ifdef H5
	let ishttps = 'https:' == window.location.protocol ? true : false;
	ishttps ? (pathArr[0] = 'https') : (pathArr[0] = 'http');
	// #endif
	// #ifdef MP-WEIXIN
	pathArr[0] = 'https'
	// #endif
	newPath = pathArr.join('://');
	return newPath;
}
/**
 * showdoc
 * @catalog  公共功能·工具·随机数
 * @title 随机数
 * @description 随机数
 * @url  utils/tools/random
 * @param min number 最小数
 * @param max number 最大数  
 */
const random = (min, max) => {
	if (min >= 0 && max > 0 && max >= min) {
		let gab = max - min + 1;
		return Math.floor(Math.random() * gab + min);
	} else {
		return 0;
	}
}
/**
 * showdoc
 * @catalog  公共功能·工具·拨打手机
 * @title 拨打手机
 * @description 拨打手机
 * @url  utils/tools/callPhone
 * @param phoneNumber
 */
const callPhone = (phoneNumber = '') => {
	let num = phoneNumber.toString()
	console.log(num)
	uni.makePhoneCall({
		phoneNumber: num,
		fail(err) {
			console.log('makePhoneCall出错', err)
		},
	});
}
/**
 * showdoc
 * @catalog  公共功能·工具·打开导航
 * @title 打开导航
 * @description 打开导航
 * @url  utils/tools/openLocation
 * @param longitude number 经度
 * @param latitude number 纬度
 */
const openLocation = (longitude, latitude) => {
	if (!longitude || !latitude) return;
	uni.openLocation({
		longitude: longitude,
		latitude: latitude,
	})
}

/**
 * showdoc
 * @catalog  公共功能·工具·经纬度转距离
 * @title 经纬度转距离
 * @description 经纬度转距离
 * @url  utils/tools/getDistance
 * @param phoneNumber
 */
const getDistance = (lat1, lng1, lat2, lng2) => {
	let radLat1 = Rad(lat1);
	let radLat2 = Rad(lat2);
	let a = radLat1 - radLat2;
	let b = Rad(lng1) - Rad(lng2);
	let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
		Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
	s = s * 6378.137; // EARTH_RADIUS;
	s = Math.round(s * 10000) / 10000; //输出为公里
	return s > 0 ? s.toFixed(2) + ' km' : parseInt(s * 1000) + ' m';
}

const Rad = (deg) => {
	return deg * (Math.PI / 180)
}

/**
 * showdoc
 * @catalog  公共功能·工具·uuid全局唯一标识符
 * @title uuid全局唯一标识符
 * @description 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
 * @param len number uuid的长度
 * @param firstU boolean 将返回的首字母置为"u"
 * @param radix number 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
 */
const guid = (len = 32, firstW, radix = null) => {
	let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	let uuid = [];
	radix = radix || chars.length;

	if (len) {
		// 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
		for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
	} else {
		let r;
		// rfc4122标准要求返回的uuid中,某些位为固定的字符
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';

		for (let i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random() * 16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}
	// 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
	if (firstW) {
		return firstW + uuid.join('');
	} else {
		return uuid.join('');
	}
}
// 图片处理-选择图片
const chooseImage = (count = 1) => {
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: count, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: res => {
				resolve(res.tempFilePaths);
			}
		});
	}).catch(e => {
		reject(e)
	})
}
// 图片处理-上传图片
const uploadImage = (url, path, formData = {}) => {
	uni.showLoading({
		title: '上传中'
	});
	return new Promise((resolve, reject) => {
		formData.timestamp = timestamp
		uni.uploadFile({
			url: url,
			filePath: path,
			formData: formData,
			name: 'file',
			header: {
				'token': token ? token : ''
			},
			success: res => {
				res = JSON.parse(res.data);
				console.log(res)
				if (res.code === 200) {
					uni.hideLoading()
					uni.showToast({
						title: '上传成功',
						icon: 'none'
					});
					resolve(res.data)
				} else {
					uni.hideLoading()
					uni.showModal({
						title: '上传失败',
						content: res.msg
					});
				}
			}
		});
	}).catch(e => {
		reject(e)
	})
}
// 图片处理-预览图片
const previewImage = (urls = [], current = 0) => {
	uni.previewImage({
		urls: urls,
		current: current,
		indicator: 'default',
		loop: true,
		fail(err) {
			console.log('previewImage出错', urls, err)
		},
	})
}
// 图片处理-获取图片信息
const getImageInfo = (src = '') => {
	return new Promise((resolve, reject) => {
		uni.getImageInfo({
			src: src,
			success: (image) => {
				resolve(image)
			},
			fail(err) {
				console.log('getImageInfo出错', src, err)
			},
		})
	}).catch(e => {
		reject(e)
	})

}
//  缓存页面数据
const setPageCache = (page = '', data = '') => {
	if (!page || !data) return;
	uni.setStorage({
		key: page,
		data: data
	})
}
//获取页面缓存
const getPageCache = (page = '') => {
	if (!page) return;
	return uni.getStorageSync(page)
}

const toPage = (page = '', opt = 0) => {
	if (!page) return;
	if (opt == 1) {
		uni.reLaunch({
			url: '/' + page
		})
		return;
	}
	uni.navigateTo({
		url: '/' + page
	})
}

module.exports = {
	req,
	login,
	mul,
	add,
	sub,
	div,
	formatTime,
	formatPrice,
	hidePhone,
	checkImgHttp,
	getImageInfo,
	chooseImage,
	previewImage,
	uploadImage,
	callPhone,
	setPageCache,
	getPageCache,
	toPage,
	random,
	guid,
	openLocation,
	getDistance,
	getQueryString,
}
