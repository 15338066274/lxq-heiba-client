import Request from "@/lib/request/index.js"
import { refreshTokenFn } from "@/api/login.js"
import storage from "@/utils/storage.js"
import api from "@/config/api.js"


let isNavigateTo = false

function cleanStorage() {
	uni.showToast({
		title: "你的登录状态已过期，请重新登录",
		icon: "none",
		duration: 1500,
	});
	if (uni.showLoading()) {
		uni.hideLoading();
	}

	storage.setHasLogin(false);
	storage.setAccessToken("");
	storage.setRefreshToken("");
	console.log("清空token");
	storage.setUserInfo({});


	if (!isNavigateTo) {
		isNavigateTo = true
		// 防抖处理跳转
		// #ifndef MP-WEIXIN
		uni.navigateTo({
			url: "/pages/login/index",
		});
		//  #endif
	}
}

let http = new Request();


http.setConfig((config) => {
	/* 设置全局配置 */
	config.baseURL = api.common;
	config.header = {
		...config.header,
	};
	config.validateStatus = (statusCode) => {
		// 不论什么状态,统一在正确中处理
		return true;
	};
	return config;
});

http.interceptors.request.use(
	(config) => {
		/* 请求之前拦截器。可以使用async await 做异步操作 */
		let accessToken = storage.getAccessToken();		
		if (accessToken) {
			const timestamp = parseInt(new Date().getTime() / 1000);
			const _params = {
				timestamp
			};
			let params = config.params || {};
			params = {
				...params,
				..._params
			};

			config.params = params;
			config.header.Authorization = 'Bearer ' + accessToken;
		}
		config.header = {
			...config.header
		};
		return config;
	},
	(config) => {
		return Promise.reject(config);
	}
);


// 是否正在刷新的标记
let isRefreshing = false;
//重试队列
let requests = [];
// 必须使用异步函数，注意
http.interceptors.response.use(
	async (response) => {
		const { statusCode, data, config } = response
		if(config.url === '/TokenAuth/Authenticate') {
			storage.setAccessToken(data.result.accessToken);
		}
		isNavigateTo = false
		let token = storage.getAccessToken();
		if ((token && statusCode === 403) || data.status === 403) {
			if (!isRefreshing) {
				console.log('旧token', token)
				isRefreshing = true;
				storage.setAccessToken('')
				let oldRefreshToken = storage.getRefreshToken();
				//调用刷新token的接口
				return refreshTokenFn(oldRefreshToken)
					.then((res) => {
						let { accessToken, refreshToken } = res.data.result;
						storage.setAccessToken(accessToken);
						storage.setRefreshToken(refreshToken);

						response.header.accessToken = `${accessToken}`;
						// token 刷新后将数组的方法重新执行
						console.log('接口队列', requests, '新token', accessToken)
						requests.forEach((cb) => cb(accessToken));
						requests = []; // 重新请求完清空
						return http.request(response.config);
					}).catch((err) => {
						console.log('刷新token报错' + oldRefreshToken, err)
						cleanStorage();
						return Promise.reject(err);
					}).finally(() => {
						isRefreshing = false;
					});
			} else {
				return new Promise((resolve) => {
					// 用函数形式将 resolve 存入，等待刷新后再执行
					requests.push((token) => {
						response.header.accessToken = `${token}`;
						resolve(http.request(response.config));
					});
				});
			}
			// 如果当前返回没登录
		} else if (
			(!token && !storage.getRefreshToken() && response.statusCode === 403) ||
			response.data.code === 403
		) {
			console.log('没有token 以及刷新token 内容', token, storage.getRefreshToken())
			cleanStorage();
			// 如果当前状态码为正常但是success为不正常时
		} else if ((statusCode == 200 && !data.result.success) || statusCode == 400) {
			if (data.result.message) {
				uni.showToast({
					title: data.result.message,
					icon: "none",
					duration: 1500,
				});
			}
		}
		return response;
	},
	(error) => {
		return error;
	}
);

export {
	http
};

export const Method = {
	GET: "GET",
	POST: "POST",
	PUT: "PUT",
	DELETE: "DELETE",
};
