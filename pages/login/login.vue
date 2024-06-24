<template>
	<view class="login-container">
		<view class="login-warp">
			<view class="logo">
				<u--image
				    :src="logo"
				    width="189rpx"
				    height="84rpx"
				></u--image>
				<view class="logo-txt">
					<text class="txt">阆上</text>
				</view>
			</view>
			<view class="login-btn">
				<view class="logo_btn">
					<view class="login-reg">根据国家网络安全法要求，阆上需要获取以下信息<br>您的公开信息（昵称）</view>
					<!-- #ifdef MP-WEIXIN -->
					<u-button type="primary" class="btn_login" text="快速登录" color="#1684FC" bindtap="getPhoneNumber" @click="getUserProfile()"></u-button>
					<!-- #endif -->
				</view>
				<view class="popup-radio">
					<u-radio-group
						v-model="enablePrivacy"
						placement="row"
						@change="groupChange"
						size="20"
					>
						<u-radio name="1">
							同意阆上<text class="bule" @click="goDetail('agreement')">《服务条款》</text>和
							<text class="bule" @click="goDetail('privacy')">《隐私政策》</text>
						</u-radio>
					</u-radio-group>
					</view>
			</view>
		</view>
  </view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import storage from "@/utils/storage";
	import { loginByWeiXin } from "@/api/login";
	export default {
		data() {
			return {
				logo: require("@/static/logo.png"),
				code: "",
				enablePrivacy: 0
			};
		},
		components: {},
		onLoad() {},
		onShow() {},
		onHide() {},
		methods: {
			...mapMutations(['login', 'getUserInfo']),
			goDetail(e) {
				uni.navigateTo({
					url: '/pages/mine/agreement?id=' + e,
				});
			},
			goPhoneLogin() {
				uni.navigateTo({
					url: '/pages/phoneLogin/index'
				});
			},
			//获取用户信息
			async getUserProfile(e) {
				if (!this.enablePrivacy){
					
					return false
				}
			  let that = this;
			  //获取code
			  await uni.login({
			    success: (res) => {
			      that.code = res.code;
			    },
			  });
					
				// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				await uni.getUserProfile({
					desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						console.log('res_', res)
						let iv = res.iv;
						let encryptedData = res.encryptedData;
						this.getPhoneByCode(that.code, iv)
					}
				});
			},
			getPhoneByCode(code, codePhone){
				uni.showLoading({
					title: "正在登录中..."
				})
				let params = {
					code: code,
					codePhone: codePhone
				}
				loginByWeiXin(params).then(res => {
					const result = res.data.result
					if(result.success) {
						/**
						 * 个人信息存储到缓存userInfo中
						 */
						storage.setUserInfo(result.data);
						storage.setHasLogin(true);
						this.login(true)
						this.getUserInfo(result.data)
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/index/index?type=tag'
							})
						}, 500)
					}
				});
			},
			groupChange(data){
				this.enablePrivacy = data
			},
			handleTips(data) {
				if(data) {
					this.groupChange(1)
					this.getUserProfile()
				}
			}
		}
	};
</script>
<style lang="scss" scoped>
	@import "./login.scss";
</style>
