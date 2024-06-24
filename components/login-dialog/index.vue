<template>
	<u-popup :show="isShow" :round="10" mode="bottom" @close="close" closeable>
		<view class="popup-wrap">
			<view class="popup-box">
				<view class="popup-logo">
					<image :src="imgUrl" class="dev_image" />
				</view>
				<view class="popup-btn">
					<u-button v-if="!enablePrivacy" type="primary" text="手机号快捷登录" color="#168ecd" shape="circle" @click="getLogin"></u-button>
					<!-- #ifdef MP-WEIXIN -->
					<u-button v-else type="primary" text="手机号快捷登录" color="#168ecd" shape="circle" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"></u-button>
					<!-- #endif -->
					<!-- #ifdef MP-TOUTIAO -->
					<view class="weixin_auth_modal">
						<view class='content'>
							<view>申请获取以下权限</view>
							<view>获得你的公开信息(昵称，头像、地区等)</view>
						</view>
						<u-button type="primary" text="抖音一键登录" color="#168ecd" shape="circle" @click="getDYuserinfo"></u-button>
					</view>
					<!-- #endif -->
				</view>
				<view class="popup-radio">
					<u-radio-group
						v-model="enablePrivacy"
						placement="row"
						@change="groupChange"
					>
						<u-radio name="1">
							登录即表示已阅读并同意<text class="bule" @click="goDetail('agreement')">《用户须知》</text>和<text class="bule" @click="goDetail('privacy')">《隐私政策》</text>
						</u-radio>
					</u-radio-group>
					</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
import storage from "@/utils/storage";
import {
	mapState,
	mapMutations
} from 'vuex';
export default {
	data() {
		return {
			imgUrl: require("@/static/logo.png"),
			isShow: false,
			enablePrivacy: false
		}
	},
	methods: {
		...mapMutations(['login', 'getUserInfo']),
		show(row) {
			this.$nextTick(() => {
				this.isShow = true
			})
		},
		close() {
			this.isShow = false
			this.enablePrivacy = false
		},
		getLogin() {
			if (!this.enablePrivacy) return this.$pub.msg('请同意用户隐私');
		},
		// 获取用户手机号码
		getPhoneNumber(e){
			if (e.detail.errMsg === "getPhoneNumber:ok") {
				uni.login({
				  success: res => {
					  if(res.errMsg === 'login:ok') {
						  this.isShow = false
						  this.getPhoneByCode(res.code, e.detail.code)
					  }
				  }
				});
			} else {
				return false;
			}
		},
		// 通过code获取用户手机号码
		getPhoneByCode(code, codePhone){
			let params = '?code=' + code + '&codePhone=' + codePhone
			this.$u.api.loginByWeiXin(params).then(res => {
				if(res.result.success) {
					/**
					 * 个人信息存储到缓存userInfo中
					 */
					storage.setUserInfo(res.result.data);
					storage.setHasLogin(true);
					this.login(true)
					this.getUserInfo(res.result.data)
					this.$emit('handleLogin', res.result.data)
				} else {
					uni.$u.toast(res.result.message);
				}
			});
		},
		goDetail: function(e) {
			uni.navigateTo({
				url: '/pages/mine/agreement?id' + e,
			});
		},
		// 抖音小程序
		getDYuserinfo() {
			uni.login({
			  provider: 'toutiao',
			  success: res => {
				  if(res.errMsg === 'login:ok') {
					  console.log('loginRes', res)
					  uni.getUserInfo({
						  provider: 'toutiao',
						  withCredentials: true,
						  success: resUser => {
							  console.log('resUser', resUser)
							  this.isShow = false
							  this.getDYByCode(res.code, resUser.encryptedData, resUser.iv)
						  }
					  })
				  }
			  }
			});
		},
		// 抖音通过code获取用户信息
		getDYByCode(code, encryptedData, iv){
			let params = {
				code: code,
				encryptedData: encryptedData,
				iv: iv
			}
			this.$u.api.loginByDouYin(params).then(res => {
				this.getUser = res.result.data
				uni.setStorageSync('lifeData', this.getUser);
				this.login(true);
				this.$emit('handleLogin', this.getUser)
			});
		},
		groupChange(data){
			data === '1' ? this.enablePrivacy = true : this.enablePrivacy = false
		}
	}
}
</script>
<style lang="scss" scoped>
.popup-wrap{
	padding: 45px 24px;
	.popup-box{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.popup-logo{
			margin: 0 auto 40px;
			display: flex;
			justify-content: center;
			.dev_image{
				width: 60px;
				height: 60px;
			}
		}
		.popup-btn{
			margin: 0 auto 20px;
			width: 100%;
		}
		.popup-radio{
			margin: 0 auto 20px;
			font-size: 14px;
			.bule{
				color: $uni_color;
			}
		}
	}
}
</style>