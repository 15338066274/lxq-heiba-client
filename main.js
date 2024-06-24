import Vue from 'vue'
import App from './App'

const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 1];
	return prePage.route;
}

Vue.config.productionTip = false
Vue.prototype.$scss = require("@/uni.scss")
Vue.prototype.$tools = require('@/utils/tools')
Vue.prototype.$store = store
Vue.prototype.$pub = {msg,prePage}
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}
Vue.prototype.$adpid = "1111111111"

App.mpType = 'app'

// 全局注册
import RechargeDialog from 'components/recharge-dialog'
Vue.component('recharge-dialog', RechargeDialog)

// 引入全局 uView 框架
import uView from '@/uni_modules/uview-ui';
Vue.use(uView);

// 引入uView对小程序分享的mixin封装
let mpShare = require('@/uni_modules/uview-ui/libs/mixin/mpShare.js');
let mpShareTime = require('@/uni_modules/uview-ui/libs/mixin/mpShareTime.js');
Vue.mixin(mpShare)
Vue.mixin(mpShareTime)

// 全局存储 vuex 的封装
import store from '@/store';

// 引入 uView 提供的对 vuex 的简写法文件
let vuexStore = require('@/store/$u.mixin.js');
Vue.mixin(vuexStore);

const app = new Vue({
	store,
	...App
})

app.$mount()
