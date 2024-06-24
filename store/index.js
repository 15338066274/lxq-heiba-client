import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import storage from "@/utils/storage";

const store = new Vuex.Store({
	// 下面这些值仅为示例，使用过程中请删除
	state: {
		hasLogin: storage.getHasLogin(),
		userInfo: storage.getUserInfo(),
	},
	mutations: {
		login(state, data) {
		  state.hasLogin = data;
		},
		getUserInfo(state, data) {
			state.userInfo = data;
		} // test55
	}
})

export default store
