const HAS_LOGIN = "has_login_key";
const ACCESS_TOKEN = "access_token_key";
const REFRESH_TOKEN = "refresh_token_key";
const USER_INFO = "user_info_obj";
export default {
  // 写入热门搜索时间戳
  setHotWords(val) {
    uni.setStorageSync("hotWords", val);
  },
  // 获取热门搜索时间戳
  getHotWords() {
    return uni.getStorageSync(`hotWords`);
  },
  // 写入用户信息
  setUserInfo(val) {
    uni.setStorageSync(USER_INFO, val);
  },
  // 获取用户信息
  getUserInfo() {
    return uni.getStorageSync(USER_INFO);
  },
  // 写入登录
  setHasLogin(val) {
    uni.setStorageSync(HAS_LOGIN, val);
  },
  // 获取是否登录
  getHasLogin() {
    return uni.getStorageSync(HAS_LOGIN);
  },
  // 写入accessToken
  setAccessToken(val) {
    uni.setStorageSync(ACCESS_TOKEN, val);
  },
  // 获取accessToken
  getAccessToken() {
    return uni.getStorageSync(ACCESS_TOKEN);
  },
  // 删除token
  removeAccessToken() {
    uni.removeStorageSync(ACCESS_TOKEN);
  },
  // 写入刷新token
  setRefreshToken(val) {
    uni.setStorageSync(REFRESH_TOKEN, val);
  },
  // 获取刷新token
  getRefreshToken() {
    return uni.getStorageSync(REFRESH_TOKEN);
  },
  // 删除token
  removeRefreshToken() {
    uni.removeStorageSync(REFRESH_TOKEN);
  },
	// 写入热门搜索时间戳
	setReadCount(val) {
	  uni.setStorageSync("readCount", val);
	},
	// 获取热门搜索时间戳
	getReadCount() {
	  return uni.getStorageSync(`readCount`);
	},
};
